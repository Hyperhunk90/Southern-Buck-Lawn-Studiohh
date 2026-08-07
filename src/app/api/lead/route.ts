import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/db/index';
import { leads } from '@/db/schema';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { type = 'Lead', name, phone, email, address, service, lotSize, frequency, message, company } = data;

    // Honeypot check
    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    }

    // Save lead to Cloud SQL database
    if (process.env.SQL_HOST && process.env.SQL_USER) {
      try {
        await db.insert(leads).values({
          name,
          phone,
          email: email || null,
          address: address || null,
          service: service || type,
          message: [lotSize ? `Yard size: ${lotSize}` : '', frequency ? `Frequency: ${frequency}` : '', message || '']
            .filter(Boolean)
            .join(' | '),
        });
      } catch (dbErr) {
        console.error('Failed to insert lead into Cloud SQL:', dbErr);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.LEAD_TO_EMAIL;
    const from = process.env.LEAD_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      console.log('Lead saved to DB. Resend not fully configured, returning success:', { name, phone });
      return NextResponse.json({ ok: true, saved: true });
    }

    const resend = new Resend(apiKey);

    const rows = [
      ['Type', type],
      ['Name', name],
      ['Phone', phone],
      ['Email', email],
      ['Address / City', address],
      ['Service', service],
      ['Yard size', lotSize],
      ['Frequency', frequency],
      ['Message', message],
    ].filter(([, v]) => v);

    const textBody = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
    const htmlBody = `
      <h2 style="font-family:sans-serif;color:#15663a;">New ${type} — Southern Buck Lawn</h2>
      <table style="font-family:sans-serif;border-collapse:collapse;">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px;font-weight:bold;background:#f3f6f1;">${k}</td><td style="padding:6px 12px;">${String(
                v,
              ).replace(/</g, '&lt;')}</td></tr>`,
          )
          .join('')}
      </table>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email || undefined,
      subject: `New ${type} from ${name}`,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend send error:', error);
      return NextResponse.json({ ok: true, emailError: 'Email error, lead recorded.' });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Lead send error:', err);
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 500 });
  }
}

