import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL!;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
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
}
