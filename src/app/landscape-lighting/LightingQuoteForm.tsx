'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { trackEvent } from '@/lib/ga';
import { SITE } from '@/data/site';
import styles from './lighting.module.css';

const INTERESTS = [
  'Pathway lighting',
  'Landscape lighting',
  'Home accent lighting',
  'Security lighting',
  'Full property design',
  'Not sure yet',
];

const REACH_TIMES = [
  'Morning',
  'Afternoon',
  'Evening',
  'Anytime',
];

export default function LightingQuoteForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: INTERESTS[1],
    bestTime: REACH_TIMES[3],
    propertyType: 'Residential',
    message: '',
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

  const update = (key: string, value: string) => setForm((previous) => ({ ...previous, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    trackEvent('form_submit_attempt', {
      form_name: 'lighting_quote',
      service: form.service,
      property_type: form.propertyType,
    });

    const message = [
      form.message.trim(),
      `Best time to reach: ${form.bestTime}`,
      `Lighting interest: ${form.service}`,
    ]
      .filter(Boolean)
      .join('\n');

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
          propertyType: form.propertyType,
          service: `Landscape Lighting — ${form.service}`,
          message,
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
      trackEvent('generate_lead', {
        form_name: 'lighting_quote',
        service: form.service,
        property_type: form.propertyType,
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'We could not send your request.');
      trackEvent('form_submit_error', { form_name: 'lighting_quote' });
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-[var(--ash)] bg-[rgba(7,7,10,0.55)] p-6 text-center" role="status">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(232,165,75,0.15)] text-[var(--amber)]">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mb-2 text-xl text-[var(--warm-white)]">Thanks — we received your request.</h3>
        <p className="text-[0.975rem] leading-relaxed text-[var(--warm-muted)]">
          A lighting professional will review your needs and contact you shortly. Michael usually
          calls within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3.5" aria-busy={status === 'sending'} id="lighting-quote-form">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <label className={styles.fieldLabel}>
          Name *
          <input
            required
            minLength={2}
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your name"
            className={styles.fieldControl}
          />
        </label>
        <label className={styles.fieldLabel}>
          Phone *
          <input
            required
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            pattern="[0-9()+. -]{10,}"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="(225) 555-0123"
            className={styles.fieldControl}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <label className={styles.fieldLabel}>
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@email.com"
            className={styles.fieldControl}
          />
        </label>
        <label className={styles.fieldLabel}>
          Property address or ZIP *
          <input
            required
            name="address"
            autoComplete="street-address"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            placeholder="Street, city, or ZIP"
            className={styles.fieldControl}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <label className={styles.fieldLabel}>
          What are you interested in?
          <select
            name="service"
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
            className={styles.fieldControl}
          >
            {INTERESTS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.fieldLabel}>
          Best time to reach me
          <select
            name="bestTime"
            value={form.bestTime}
            onChange={(e) => update('bestTime', e.target.value)}
            className={styles.fieldControl}
          >
            {REACH_TIMES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {status === 'error' && (
        <p className="text-sm font-semibold text-[#f0a8a8]" role="alert">
          {errorMessage} You can also call {SITE.phone}.
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className={`${styles.ctaPrimary} w-full`}>
        {status === 'sending' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Show Me My Lighting Options <Send className="h-4 w-4" />
          </>
        )}
      </button>

      <p className={styles.muted}>
        By submitting this form, you agree to be contacted about your lighting request. Your
        information will not be sold.{' '}
        <Link href="/privacy" className="underline decoration-[var(--soft-gold)] underline-offset-2">
          Privacy
        </Link>
      </p>
    </form>
  );
}
