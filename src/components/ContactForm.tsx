'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/ga';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', sourcePage: '', landingPage: '', referrer: '', campaign: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const campaign = UTM_KEYS.map((key) => params.get(key) ? `${key}=${params.get(key)}` : '').filter(Boolean).join('&');
    const currentLandingPage = `${window.location.pathname}${window.location.search}`;
    let landingPage = currentLandingPage;
    let firstCampaign = campaign;
    let firstReferrer = document.referrer || '';

    try {
      const storedLandingPage = sessionStorage.getItem('sbl_landing_page');
      const storedCampaign = sessionStorage.getItem('sbl_campaign');
      const storedReferrer = sessionStorage.getItem('sbl_referrer');
      landingPage = storedLandingPage ?? currentLandingPage;
      firstCampaign = storedCampaign ?? campaign;
      firstReferrer = storedReferrer ?? firstReferrer;

      if (storedLandingPage === null) sessionStorage.setItem('sbl_landing_page', currentLandingPage);
      if (storedCampaign === null) sessionStorage.setItem('sbl_campaign', campaign);
      if (storedReferrer === null) sessionStorage.setItem('sbl_referrer', firstReferrer);
    } catch {
      // Keep the contact form usable when browser storage is unavailable.
    }

    setForm((previous) => ({ ...previous, sourcePage: window.location.href, landingPage, referrer: firstReferrer, campaign: firstCampaign }));
  }, []);

  const update = (key: string, value: string) => setForm((previous) => ({ ...previous, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    trackEvent('form_submit_attempt', { form_name: 'contact' });
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Contact Message', ...form }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.ok !== true) throw new Error(result?.error || 'We could not send your message.');
      setStatus('sent');
      trackEvent('generate_lead', { form_name: 'contact' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'We could not send your message.');
      trackEvent('form_submit_error', { form_name: 'contact' });
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-lg" role="status">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 className="h-9 w-9" /></div>
        <h3 className="mb-2 font-anton text-2xl uppercase text-midnight-moss">Message sent</h3>
        <p className="max-w-md font-barlow text-lg text-gray-600">Thanks for reaching out. Michael will get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5" aria-busy={status === 'sending'}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" required><input required minLength={2} name="name" autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className={inputClass} /></Field>
        <Field label="Phone" required><input required type="tel" name="phone" pattern="[0-9()+. -]{10,}" autoComplete="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(225) 555-0123" className={inputClass} /></Field>
      </div>
      <Field label="Email"><input type="email" name="email" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@email.com" className={inputClass} /></Field>
      <Field label="Message" required><textarea required name="message" rows={5} maxLength={2000} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="How can we help?" className={inputClass} /></Field>
      {status === 'error' && <p className="font-barlow text-base font-semibold text-red-700" role="alert">{errorMessage} You can also call (225) 369-4434.</p>}
      <button type="submit" disabled={status === 'sending'} className="flex w-full items-center justify-center gap-2 rounded-lg bg-safety-orange py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-lg transition-colors hover:bg-orange-hot disabled:cursor-wait disabled:opacity-70">
        {status === 'sending' ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</> : <>Send Message <Send className="h-5 w-5" /></>}
      </button>
      <p className="text-center font-barlow text-sm text-gray-500">
        Your information stays with Southern Buck Lawn.{' '}
        <Link href="/privacy" className="underline decoration-safety-orange underline-offset-2 hover:text-midnight-moss">Privacy</Link>
      </p>
    </form>
  );
}

const inputClass = 'w-full rounded-lg border-2 border-primary/15 bg-white p-3 font-barlow text-base text-midnight-moss outline-none transition-all placeholder:text-gray-400 focus:border-safety-orange focus:ring-2 focus:ring-safety-orange/20';
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5"><span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">{label} {required && <span className="text-safety-orange-deep">*</span>}</span>{children}</label>;
}
