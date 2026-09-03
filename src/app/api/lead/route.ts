import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 20_000;
const MAX_FIELD_LENGTH = 2_000;
const ALLOWED_TYPES = new Set(['Quote Request', 'Contact Message', 'REO / Property Preservation Lead']);
const ALLOWED_PROPERTY_TYPES = new Set(['Residential', 'Commercial', 'HOA / Multi-property', 'Not sure', '']);

function text(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function readLimitedJson(req: NextRequest) {
  if (!req.body) throw new Error('EMPTY_BODY');

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error('BODY_TOO_LARGE');
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(body));
}

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
    }

    const raw = await readLimitedJson(req);
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const type = text(raw.type, 40) || 'Quote Request';
    const name = text(raw.name, 120);
    const phone = text(raw.phone, 40);
    const email = text(raw.email, 254).toLowerCase();
    const address = text(raw.address, 250);
    const propertyType = text(raw.propertyType, 40);
    const companyName = text(raw.companyName, 160);
    const service = text(raw.service, 160);
    const lotSize = text(raw.lotSize, 100);
    const frequency = text(raw.frequency, 100);
    const message = text(raw.message);
    const sourcePage = text(raw.sourcePage, 300);
    const landingPage = text(raw.landingPage, 300);
    const referrer = text(raw.referrer, 500);
    const campaign = text(raw.campaign, 300);

    if (!ALLOWED_TYPES.has(type)) {
      return NextResponse.json({ error: 'Invalid form type.' }, { status: 400 });
    }
    if (!name || name.length < 2 || !phone || phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json({ error: 'Enter a valid name and 10-digit phone number.' }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }
    if (!ALLOWED_PROPERTY_TYPES.has(propertyType)) {
      return NextResponse.json({ error: 'Invalid property type.' }, { status: 400 });
    }
    if ((propertyType === 'Commercial' || propertyType === 'HOA / Multi-property') && !companyName) {
      return NextResponse.json({ error: 'Business, HOA, or property name is required.' }, { status: 400 });
    }
    if (type === 'Quote Request' && !address) {
      return NextResponse.json({ error: 'Service address or city is required.' }, { status: 400 });
    }
    if (type === 'REO / Property Preservation Lead' && (!address || !companyName)) {
      return NextResponse.json({ error: 'Company and property address are required.' }, { status: 400 });
    }
    if (type === 'Contact Message' && !message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.LEAD_TO_EMAIL;
    const from = process.env.LEAD_FROM_EMAIL;
    if (!apiKey || !to || !from) {
      console.error('Lead email is not configured.');
      return NextResponse.json({ error: 'Email is not configured yet.' }, { status: 503 });
    }

    const rows = [
      ['Type', type],
      ['Name', name],
      ['Phone', phone],
      ['Email', email],
      ['Property type', propertyType],
      ['Company / HOA', companyName],
      ['Address / City', address],
      ['Service', service],
      ['Property size', lotSize],
      ['Frequency', frequency],
      ['Message', message],
      ['Submitted from', sourcePage],
      ['First landing page', landingPage],
      ['Campaign', campaign],
      ['Referrer', referrer],
    ].filter(([, value]) => value);

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email || undefined,
      subject: `${propertyType ? `${propertyType} ` : ''}${type} from ${name}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
      html: `
        <h2 style="font-family:Arial,sans-serif;color:#23491a;">New ${escapeHtml(type)} — Southern Buck Lawn</h2>
        <table style="font-family:Arial,sans-serif;border-collapse:collapse;max-width:720px;">
          ${rows.map(([label, value]) => `<tr><td style="padding:7px 12px;font-weight:bold;background:#f5f2e9;border:1px solid #e5dfd0;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:7px 12px;border:1px solid #e5dfd0;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`).join('')}
        </table>
      `,
    });

    if (error) {
      console.error('Resend send error:', error);
      return NextResponse.json({ error: 'Failed to send.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'BODY_TOO_LARGE') {
      return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
    }
    if (error instanceof SyntaxError || (error instanceof Error && error.message === 'EMPTY_BODY')) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
    console.error('Lead send error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 });
  }
}
