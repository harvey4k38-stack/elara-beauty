import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
const APP_URL = process.env.APP_URL!;

export const config = {
  api: { bodyParser: false },
};

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', chunk => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature']!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const rawBody = await getRawBody(req);

  let event: Stripe.Event;
  try {
    event = webhookSecret
      ? stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
      : JSON.parse(rawBody.toString());
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(400).send('Webhook Error');
  }

  if (event.type === 'checkout.session.completed') {
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ['line_items'],
    });
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Valued Customer';
    const total = ((session.amount_total ?? 0) / 100).toFixed(2);
    const items = session.line_items?.data ?? [];
    const shipping = session.shipping_details;

    if (customerEmail) {
      const itemRows = items.map(item => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;">${item.description}</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; text-align: right;">£${((item.amount_total ?? 0) / 100).toFixed(2)}</td>
        </tr>`).join('');

      await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        subject: 'Your Elara Beauty Order Confirmation',
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #1a1a1a;">
            <h1 style="font-size: 28px; font-weight: 400; text-align: center; letter-spacing: 0.05em; margin-bottom: 8px;">ELARA BEAUTY</h1>
            <p style="text-align: center; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 40px;">Order Confirmation</p>
            <div style="background: #faf8f5; border-radius: 16px; padding: 32px; margin-bottom: 32px;">
              <p style="font-size: 18px; margin: 0 0 8px;">Thank you, ${customerName}.</p>
              <p style="font-size: 14px; color: #666; margin: 0;">Your order has been confirmed and will be on its way soon.</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <thead>
                <tr>
                  <th style="text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; padding-bottom: 12px; border-bottom: 2px solid #f0f0f0;">Product</th>
                  <th style="text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; padding-bottom: 12px; border-bottom: 2px solid #f0f0f0;">Qty</th>
                  <th style="text-align: right; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; padding-bottom: 12px; border-bottom: 2px solid #f0f0f0;">Price</th>
                </tr>
              </thead>
              <tbody>${itemRows}</tbody>
            </table>
            <div style="text-align: right; margin-bottom: 32px;">
              <p style="font-size: 12px; color: #999; margin: 4px 0;">Delivery: <span style="color: #b8976a;">Free</span></p>
              <p style="font-size: 18px; font-weight: 600; margin: 4px 0;">Total: £${total}</p>
            </div>
            ${shipping ? `
            <div style="border-top: 1px solid #f0f0f0; padding-top: 24px; margin-bottom: 32px;">
              <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 8px;">Delivering to</p>
              <p style="font-size: 14px; margin: 0;">${shipping.name}</p>
              <p style="font-size: 14px; color: #666; margin: 4px 0;">${[shipping.address?.line1, shipping.address?.line2, shipping.address?.city, shipping.address?.postal_code, shipping.address?.country].filter(Boolean).join(', ')}</p>
            </div>` : ''}
            <p style="font-size: 13px; color: #666; line-height: 1.6;">If you have any questions about your order, please <a href="${APP_URL}" style="color: #b8976a;">contact us</a> and we'll be happy to help.</p>
            <p style="margin-top: 40px; font-size: 11px; color: #ccc; text-align: center; border-top: 1px solid #f0f0f0; padding-top: 24px;">Elara Beauty · Science-Backed Skincare</p>
          </div>
        `,
      });
    }
  }

  res.json({ received: true });
}
