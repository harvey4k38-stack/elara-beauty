import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL!;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
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
}
