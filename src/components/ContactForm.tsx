'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/ga';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Contact Message', ...form }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      trackEvent('generate_lead', { form: 'contact' });
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
        <h3 className="mb-2 font-anton text-2xl uppercase text-midnight-moss">Message sent</h3>
        <p className="max-w-md font-barlow text-lg text-gray-600">
          Thanks for reaching out. We will get back to you shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border-2 border-primary/10 p-3 font-barlow text-base outline-none transition-all focus:border-safety-orange';

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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">Name *</span>
          <input required autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">Phone *</span>
          <input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(225) 555-0123" className={inputClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">Email</span>
        <input type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@email.com" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">Message *</span>
        <textarea required rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="How can we help?" className={inputClass} />
      </label>

      {status === 'error' && (
        <p className="font-barlow text-base font-semibold text-red-600">
          Something went wrong. Please give us a call instead.
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
            Send Message <Send className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}
