'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, Loader2, Star } from 'lucide-react';
import { trackEvent } from '@/lib/ga';
import { GOOGLE_RATING } from '@/data/reviews';

const SERVICES = [
  'Weekly Lawn Mowing & Edging',
  'Weed Control & Fertilization',
  'Landscape Design & Mulch',
  'Commercial Grounds Maintenance',
  'Landscape Lighting',
  'Full Cleanup / One-Time Job',
  'Not Sure Yet',
] as const;
export type QuoteService = (typeof SERVICES)[number];

const SERVICE_QUERY_MAP: Record<string, QuoteService> = {
  'lawn-mowing': 'Weekly Lawn Mowing & Edging',
  'weed-control': 'Weed Control & Fertilization',
  'landscape-design': 'Landscape Design & Mulch',
  'commercial-grounds': 'Commercial Grounds Maintenance',
  'landscape-lighting': 'Landscape Lighting',
  'full-cleanup': 'Full Cleanup / One-Time Job',
  'one-time-job': 'Full Cleanup / One-Time Job',
  cleanup: 'Full Cleanup / One-Time Job',
  'not-sure': 'Not Sure Yet',
};

type QuoteFormProps = {
  defaultService?: QuoteService;
};

function isQuoteService(value: string | undefined): value is QuoteService {
  return Boolean(value && SERVICES.some((service) => service === value));
}

function resolveService(value: string | null): QuoteService | undefined {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return undefined;
  return SERVICE_QUERY_MAP[normalized] || SERVICES.find((service) => service.toLowerCase() === normalized);
}

function serviceForPathname(pathname: string): QuoteService | undefined {
  if (pathname === '/landscape-lighting') return SERVICE_QUERY_MAP['landscape-lighting'];
  const match = pathname.match(/^\/services\/([^/]+)\/?$/);
  return match ? SERVICE_QUERY_MAP[match[1].toLowerCase()] : undefined;
}

const PROPERTY_TYPES = ['Residential', 'Commercial', 'HOA / Multi-property', 'Not sure'];
const LOT_SIZES = ['Small yard (under 1/4 acre)', 'Average yard (1/4 to 1/2 acre)', 'Large yard (1/2 to 1 acre)', 'Acreage / commercial property'];
const FREQUENCIES = ['Weekly', 'Every other week', 'Monthly', 'One time', 'Requesting a maintenance contract', 'Not sure'];

export default function QuoteForm({ defaultService = SERVICES[0] }: QuoteFormProps) {
  const safeDefaultService = isQuoteService(defaultService) ? defaultService : SERVICES[0];
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', propertyType: 'Residential', companyName: '',
    service: safeDefaultService, lotSize: LOT_SIZES[1], frequency: FREQUENCIES[0], message: '',
    sourcePage: '', landingPage: '', referrer: '', campaign: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const campaign = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .map((key) => params.get(key) ? `${key}=${params.get(key)}` : '')
      .filter(Boolean)
      .join('&');
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

      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
        const storageKey = `sbl_${key}`;
        if (sessionStorage.getItem(storageKey) === null) {
          sessionStorage.setItem(storageKey, params.get(key) || '');
        }
      }
    } catch {
      // Keep the form usable when browser storage is unavailable.
    }

    const requestedService = resolveService(params.get('service')) || serviceForPathname(window.location.pathname);
    setForm((previous) => ({
      ...previous,
      sourcePage: window.location.href,
      landingPage,
      referrer: firstReferrer,
      campaign: firstCampaign,
      propertyType: params.get('property') && PROPERTY_TYPES.includes(params.get('property')!) ? params.get('property')! : previous.propertyType,
      service: requestedService || previous.service,
    }));
  }, []);

  const update = (key: string, value: string) => setForm((previous) => ({ ...previous, [key]: value }));
  const showBusinessFields = form.propertyType === 'Commercial' || form.propertyType === 'HOA / Multi-property';

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    trackEvent('form_submit_attempt', { form_name: 'quote', service: form.service, property_type: form.propertyType });

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Quote Request', ...form }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.ok !== true) throw new Error(result?.error || 'We could not send your request.');
      setStatus('sent');
      trackEvent('generate_lead', {
        form_name: 'quote',
        service: form.service,
        property_type: form.propertyType,
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'We could not send your request.');
      trackEvent('form_submit_error', { form_name: 'quote' });
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-lg" role="status">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 className="h-9 w-9" /></div>
        <h3 className="mb-2 font-anton text-2xl uppercase text-midnight-moss">Your request is in</h3>
        <p className="max-w-md font-barlow text-lg text-gray-600">
          Thanks, {form.name.split(' ')[0] || 'neighbor'}. Michael will review the details and call you within one business day to set up the next step.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5" aria-busy={status === 'sending'}>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg bg-mist-green px-4 py-2.5 text-center">
        <span className="flex items-center gap-1 text-safety-orange-deep" aria-label={`${GOOGLE_RATING.score} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-safety-orange-deep" />)}
        </span>
        <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">{GOOGLE_RATING.score.toFixed(1)} on Google · Insured · Free estimates</span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" required><input required minLength={2} name="name" autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className={inputClass} /></Field>
        <Field label="Phone" required><input required type="tel" name="phone" inputMode="tel" autoComplete="tel" pattern="[0-9()+. -]{10,}" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(225) 555-0123" className={inputClass} /></Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email"><input type="email" name="email" autoComplete="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@email.com" className={inputClass} /></Field>
        <Field label="Service address or city" required><input required name="address" autoComplete="street-address" value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Street address or city" className={inputClass} /></Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Property type"><select name="propertyType" value={form.propertyType} onChange={(e) => update('propertyType', e.target.value)} className={inputClass}>{PROPERTY_TYPES.map((item) => <option key={item}>{item}</option>)}</select></Field>
        {showBusinessFields ? (
          <Field label="Business, HOA, or property name" required><input required name="companyName" autoComplete="organization" value={form.companyName} onChange={(e) => update('companyName', e.target.value)} placeholder="Property or organization name" className={inputClass} /></Field>
        ) : (
          <Field label="What do you need?"><select name="service" value={form.service} onChange={(e) => update('service', e.target.value)} className={inputClass}>{SERVICES.map((item) => <option key={item}>{item}</option>)}</select></Field>
        )}
      </div>

      {showBusinessFields && <Field label="What do you need?"><select name="service" value={form.service} onChange={(e) => update('service', e.target.value)} className={inputClass}>{SERVICES.map((item) => <option key={item}>{item}</option>)}</select></Field>}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Property size"><select name="lotSize" value={form.lotSize} onChange={(e) => update('lotSize', e.target.value)} className={inputClass}>{LOT_SIZES.map((item) => <option key={item}>{item}</option>)}</select></Field>
        <Field label="Service schedule"><select name="frequency" value={form.frequency} onChange={(e) => update('frequency', e.target.value)} className={inputClass}>{FREQUENCIES.map((item) => <option key={item}>{item}</option>)}</select></Field>
      </div>

      <Field label={showBusinessFields ? 'Scope, bid date, and site details' : 'Tell us about your yard'}>
        <textarea name="message" rows={4} maxLength={2000} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder={showBusinessFields ? 'Number of acres, entrances or common areas, current service issues, and bid deadline...' : 'Gate code, problem spots, or anything you want us to know...'} className={inputClass} />
      </Field>

      {status === 'error' && <p className="font-barlow text-base font-semibold text-red-700" role="alert">{errorMessage} You can also call (225) 369-4434.</p>}

      <button type="submit" disabled={status === 'sending'} className="flex w-full items-center justify-center gap-2 rounded-lg bg-safety-orange py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-lg transition-colors hover:bg-orange-hot disabled:cursor-wait disabled:opacity-70">
        {status === 'sending' ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</> : <>Request My Free Estimate <Send className="h-5 w-5" /></>}
      </button>
      <p className="text-center font-barlow text-sm text-gray-500">
        No obligation. Your information stays with Southern Buck Lawn.{' '}
        <Link href="/privacy" className="underline decoration-safety-orange underline-offset-2 hover:text-midnight-moss">Privacy</Link>
      </p>
    </form>
  );
}

const inputClass = 'w-full rounded-lg border-2 border-primary/15 bg-white p-3 font-barlow text-base text-midnight-moss outline-none transition-all placeholder:text-gray-400 focus:border-safety-orange focus:ring-2 focus:ring-safety-orange/20';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5"><span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">{label} {required && <span className="text-safety-orange-deep">*</span>}</span>{children}</label>;
}
