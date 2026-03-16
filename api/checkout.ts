import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY || '').trim());
const APP_URL = (process.env.APP_URL || 'https://www.elarabeauty.me').trim().replace(/\/$/, '');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { items } = req.body as { items: { id: string; name: string; price: number; image: string; quantity: number }[] };
  if (!items?.length) return res.status(400).json({ error: 'No items' });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map(item => ({
        price_data: {
          currency: 'gbp',
          product_data: { name: item.name, images: item.image.startsWith('/') ? [] : [item.image] },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: { allowed_countries: ['GB', 'US', 'CA', 'AU', 'IE', 'FR', 'DE', 'NL', 'SE', 'NO', 'DK'] },
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'gbp' },
          display_name: 'Free Delivery',
          delivery_estimate: { minimum: { unit: 'business_day', value: 3 }, maximum: { unit: 'business_day', value: 5 } },
        },
      }],
      success_url: `${APP_URL}?checkout=success`,
      cancel_url: `${APP_URL}?checkout=cancelled`,
    });
    return res.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err?.message || 'Failed to create checkout session' });
  }
}
