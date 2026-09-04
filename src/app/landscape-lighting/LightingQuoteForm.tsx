'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { SITE } from '@/data/site';
import { trackEvent } from '@/lib/ga';
import { AMBER, ASH, BEST_TIMES, CHARCOAL, GOLD, INK, INTERESTS, WARM } from './lighting-content';

const inputClass =
  'w-full rounded-lg border bg-[#16161C] px-3 py-2.5 text-sm text-[#F4EDE3] outline-none transition placeholder:text-[#F4EDE3]/35 focus:border-[#E8A54B] focus:ring-2 focus:ring-[#E8A54B]/25';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: GOLD, fontFamily: 'var(--font-lighting-sans), Manrope, sans-serif' }}
      >
        {label}
        {required ? <span style={{ color: AMBER }}> *</span> : null}
      </span>
      {children}
    </label>
  );
}

export default function LightingQuoteForm({ id }: { id?: string }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    interest: INTERESTS[1],
    bestTime: BEST_TIMES[3],
    sourcePage: '',
    landingPage: '',
    referrer: '',
    campaign: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const campaign = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .map((key) => (params.get(key) ? `${key}=${params.get(key)}` : ''))
      .filter(Boolean)
      .join('&');
    const landingPage =
      sessionStorage.getItem('sbl_landing_page') || `${window.location.pathname}${window.location.search}`;
    const firstCampaign = sessionStorage.getItem('sbl_campaign') || campaign;
    const firstReferrer = sessionStorage.getItem('sbl_referrer') || document.referrer;
    sessionStorage.setItem('sbl_landing_page', landingPage);
    if (firstCampaign) sessionStorage.setItem('sbl_campaign', firstCampaign);
    if (firstReferrer) sessionStorage.setItem('sbl_referrer', firstReferrer);
    setForm((previous) => ({
      ...previous,
      sourcePage: window.location.href,
      landingPage,
      referrer: firstReferrer,
      campaign: firstCampaign,
    }));
  }, []);

  const update = (key: keyof typeof form, value: string) =>
    setForm((previous) => ({ ...previous, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    trackEvent('form_submit_attempt', { form_name: 'lighting_quote', service: form.interest });

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Quote Request',
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          propertyType: 'Residential',
          service: `Landscape Lighting — ${form.interest}`,
          message: `Lighting interest: ${form.interest}. Best time to reach: ${form.bestTime}.`,
          sourcePage: form.sourcePage,
          landingPage: form.landingPage,
          referrer: form.referrer,
          campaign: form.campaign,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || 'We could not send your request.');
      }
      setStatus('sent');
      trackEvent('generate_lead', { form_name: 'lighting_quote', service: form.interest });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'We could not send your request.');
      trackEvent('form_submit_error', { form_name: 'lighting_quote' });
    }
  };

  if (status === 'sent') {
    return (
      <div
        id={id}
        className="rounded-2xl border p-8 text-center"
        style={{ background: CHARCOAL, borderColor: ASH }}
        role="status"
      >
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: `${AMBER}22`, color: AMBER }}
        >
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3
          className="text-xl"
          style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
        >
          Thanks — we received your request.
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: `${WARM}cc` }}>
          A lighting professional will review your needs and contact you shortly. Michael usually calls within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={submit}
      className="relative overflow-hidden rounded-2xl border p-5 shadow-2xl sm:p-6"
      style={{
        background: `linear-gradient(160deg, ${CHARCOAL}f2 0%, ${INK}f5 100%)`,
        borderColor: ASH,
        backdropFilter: 'blur(12px)',
      }}
      aria-busy={status === 'sending'}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${AMBER}38 0%, transparent 70%)` }}
      />
      <div className="relative space-y-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
            Free lighting quote
          </p>
          <h2
            className="mt-1 text-xl leading-snug sm:text-2xl"
            style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
          >
            See What Professional Lighting Could Do for Your Home
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Name" required>
            <input
              required
              minLength={2}
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Your name"
              className={inputClass}
              style={{ borderColor: ASH }}
            />
          </Field>
          <Field label="Phone" required>
            <input
              required
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              pattern="[0-9()+.\\- ]{10,}"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="(225) 555-0123"
              className={inputClass}
              style={{ borderColor: ASH }}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Email">
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@email.com"
              className={inputClass}
              style={{ borderColor: ASH }}
            />
          </Field>
          <Field label="Property address or ZIP" required>
            <input
              required
              name="address"
              autoComplete="street-address"
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              placeholder="Address or ZIP"
              className={inputClass}
              style={{ borderColor: ASH }}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="What are you interested in?">
            <select
              name="interest"
              value={form.interest}
              onChange={(e) => update('interest', e.target.value)}
              className={inputClass}
              style={{ borderColor: ASH }}
            >
              {INTERESTS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Best time to reach me">
            <select
              name="bestTime"
              value={form.bestTime}
              onChange={(e) => update('bestTime', e.target.value)}
              className={inputClass}
              style={{ borderColor: ASH }}
            >
              {BEST_TIMES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {status === 'error' && (
          <p className="text-sm font-semibold" style={{ color: '#F5A8A8' }} role="alert">
            {errorMessage} You can also call {SITE.phone} or email {SITE.email}.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(232,165,75,0.35)] disabled:cursor-wait disabled:opacity-70"
          style={{
            background: AMBER,
            color: INK,
            fontFamily: 'var(--font-lighting-sans), Manrope, sans-serif',
          }}
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            'Show Me My Lighting Options'
          )}
        </button>
        <p className="text-center text-[11px] leading-relaxed" style={{ color: `${WARM}99` }}>
          By submitting this form, you agree to be contacted about your lighting request. Your information will not be
          sold.
        </p>
      </div>
    </form>
  );
}
