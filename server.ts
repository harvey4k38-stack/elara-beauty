import express from 'express';
import { Resend } from 'resend';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL!;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
const APP_URL = process.env.APP_URL || 'http://localhost:3005';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Stripe webhook needs raw body — must be before express.json()
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;
  try {
    event = webhookSecret
      ? stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
      : JSON.parse(req.body.toString());
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
});

app.use(express.json());

// --- Contact ---
app.post('/api/contact', async (req, res) => {
  const { name, email, issue } = req.body;
  if (!name || !email || !issue) return res.status(400).json({ error: 'Missing fields' });
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Contact Form — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #1a1a1a;">
          <h2 style="font-size: 24px; font-weight: 400; margin-bottom: 32px; border-bottom: 1px solid #e5e5e5; padding-bottom: 16px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; width: 120px;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;">${name}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #999;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;"><a href="mailto:${email}" style="color: #b8976a;">${email}</a></td></tr>
            <tr><td style="padding: 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; vertical-align: top; padding-top: 16px;">Message</td><td style="padding: 12px 0; font-size: 15px; line-height: 1.6; padding-top: 16px;">${issue.replace(/\n/g, '<br/>')}</td></tr>
          </table>
          <p style="margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #e5e5e5; padding-top: 16px;">Elara Beauty · Sent via contact form</p>
        </div>
      `,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

// --- Newsletter ---
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Welcome to Elara Beauty',
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #1a1a1a;">
            <h1 style="font-size: 28px; font-weight: 400; text-align: center; letter-spacing: 0.05em; margin-bottom: 8px;">ELARA BEAUTY</h1>
            <p style="text-align: center; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 40px;">Welcome to the Community</p>
            <div style="background: #faf8f5; border-radius: 16px; padding: 32px; margin-bottom: 32px; text-align: center;">
              <p style="font-size: 18px; margin: 0 0 12px;">Thank you for joining us.</p>
              <p style="font-size: 14px; color: #666; margin: 0 0 24px;">You'll be the first to hear about new launches, exclusive offers, and skincare tips from Elara Beauty.</p>
              <p style="font-size: 22px; font-weight: 400; color: #b8976a; margin: 0;">10% off your first order</p>
              <p style="font-size: 13px; color: #999; margin: 8px 0 0;">Use code <strong style="color: #1a1a1a;">WELCOME10</strong> at checkout</p>
            </div>
            <p style="margin-top: 40px; font-size: 11px; color: #ccc; text-align: center; border-top: 1px solid #f0f0f0; padding-top: 24px;">Elara Beauty · Science-Backed Skincare</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `New Newsletter Subscriber — ${email}`,
        html: `<p style="font-family: sans-serif;">New subscriber: <strong>${email}</strong></p>`,
      }),
    ]);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed' });
  }
});

// --- Stripe Checkout ---
app.post('/api/checkout', async (req, res) => {
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
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

const PORT = process.env.API_PORT || 3006;
app.listen(PORT, () => console.log(`Elara API running on port ${PORT}`));
