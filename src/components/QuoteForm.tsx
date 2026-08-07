'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2, Star } from 'lucide-react';
import { trackEvent } from '@/lib/ga';
import { GOOGLE_RATING } from '@/data/reviews';

const SERVICES = [
  'Weekly Lawn Mowing & Edging',
  'Weed Control & Fertilization',
  'Landscape Design & Mulch',
  'Commercial Grounds Maintenance',
  'Full Cleanup / One-Time Job',
  'Not Sure Yet',
];

const LOT_SIZES = [
  'Small yard (under 1/4 acre)',
  'Average yard (1/4 to 1/2 acre)',
  'Large yard (1/2 to 1 acre)',
  'Acreage (1 acre or more)',
];

const FREQUENCIES = ['Weekly', 'Every other week', 'Monthly', 'One time', 'Not sure'];

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: SERVICES[0],
    lotSize: LOT_SIZES[1],
    frequency: FREQUENCIES[0],
    message: '',
    company: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Quote Request', ...form }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      trackEvent('generate_lead', { form: 'quote', service: form.service });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-lg">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mb-2 font-anton text-2xl uppercase text-midnight-moss">Quote request sent</h3>
        <p className="max-w-md font-barlow text-lg text-gray-600">
          Thanks, {form.name.split(' ')[0] || 'neighbor'}. Michael will look over your yard details and call you back within 24 hours with a free on-site estimate. No obligation, no pressure.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Honeypot — hidden from people, irresistible to bots. Leave empty. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg bg-mist-green px-4 py-2.5 text-center">
        <span className="flex items-center gap-1 text-safety-orange-deep">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-safety-orange-deep" />
          ))}
        </span>
        <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">
          {GOOGLE_RATING.score.toFixed(1)} on Google · Licensed &amp; Insured · Free estimates
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <input required autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className={inputClass} />
        </Field>
        <Field label="Phone" required>
          <input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(225) 555-0123" className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email">
          <input type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@email.com" className={inputClass} />
        </Field>
        <Field label="Service address or city" required>
          <input required autoComplete="street-address" value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Street or city (Walker, Denham Springs...)" className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Field label="What do you need?">
          <select value={form.service} onChange={(e) => update('service', e.target.value)} className={inputClass}>
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Yard size">
          <select value={form.lotSize} onChange={(e) => update('lotSize', e.target.value)} className={inputClass}>
            {LOT_SIZES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="How often?">
          <select value={form.frequency} onChange={(e) => update('frequency', e.target.value)} className={inputClass}>
            {FREQUENCIES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Tell us about your yard">
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Gate code, problem spots, anything you want us to know..."
          className={inputClass}
        />
      </Field>

      {status === 'error' && (
        <p className="font-barlow text-base font-semibold text-red-600">
          Something went wrong sending that. Give us a call instead and we will get you taken care of.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-safety-orange py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-lg transition-colors hover:bg-orange-hot disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send My Quote Request <Send className="h-5 w-5" />
          </>
        )}
      </button>
      <p className="text-center font-barlow text-sm text-gray-500">
        Free estimate. We call you back within 24 hours. We never sell your info.
      </p>
    </form>
  );
}

const inputClass =
  'w-full rounded-lg border-2 border-primary/10 p-3 font-barlow text-base outline-none transition-all focus:border-safety-orange';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">
        {label} {required && <span className="text-safety-orange-deep">*</span>}
      </span>
      {children}
    </label>
  );
}
