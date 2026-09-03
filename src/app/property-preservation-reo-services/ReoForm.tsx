'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { trackEvent } from '@/lib/ga';
import { SITE } from '@/data/site';

export default function ReoForm() {
  const [form, setForm] = useState({
    firmName: '',
    nameTitle: '',
    phone: '',
    address: '',
    service: 'Trash-Out',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');


  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Combine custom fields into the message payload for the backend
    const messagePayload = `Asset Management Firm: ${form.firmName}\nName & Title: ${form.nameTitle}`;

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'REO / Property Preservation Lead',
          propertyType: 'Commercial',
          companyName: form.firmName,
          name: form.nameTitle || form.firmName || 'Unknown',
          phone: form.phone,
          address: form.address,
          service: form.service,
          message: messagePayload,
        }),
      });

      const result = await res.json().catch(() => ({}));
      if (!res.ok || result?.ok !== true) throw new Error('failed');
      setStatus('sent');
      trackEvent('generate_lead', { form_name: 'reo_form', property_type: 'Commercial', service: form.service });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-xl">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="mb-2 font-anton text-3xl uppercase tracking-wide text-midnight-moss">Work Order Received</h3>
        <p className="max-w-md font-barlow text-lg text-gray-700">
          We have received your details. We will be in touch shortly to confirm scheduling.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border-2 border-primary/10 bg-white p-4 font-barlow text-base text-midnight-moss outline-none transition-all focus:border-safety-orange placeholder:text-gray-400 shadow-sm';

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl bg-light-tan p-6 shadow-xl sm:p-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">
            Company / Asset Management Firm
          </span>
          <input
            required
            name="firmName"
            autoComplete="organization"
            value={form.firmName}
            onChange={(e) => update('firmName', e.target.value)}
            placeholder="Firm Name"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">
            Your Name & Title
          </span>
          <input
            required
            name="nameTitle"
            autoComplete="name"
            value={form.nameTitle}
            onChange={(e) => update('nameTitle', e.target.value)}
            placeholder="John Doe, Asset Manager"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">
            Contact Phone Number *
          </span>
          <input
            required
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="(555) 555-5555"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">
            Service Needed
          </span>
          <select
            required
            name="service"
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
            className={inputClass + " cursor-pointer appearance-none"}
          >
            <option value="Trash-Out">Trash-Out & Debris Removal</option>
            <option value="Lawn Maintenance">Lawn & Yard Maintenance</option>
            <option value="Initial Secure">Initial Secure & Board-Up</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">
          Property Address *
        </span>
        <input
          required
          name="address"
          autoComplete="street-address"
          value={form.address}
          onChange={(e) => update('address', e.target.value)}
          placeholder="123 Main St, Walker, LA"
          className={inputClass}
        />
      </label>

      <div className="flex items-start gap-3 rounded-xl border border-primary/10 bg-white p-4">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-safety-orange" />
        <p className="font-barlow text-sm text-gray-700">
          Have a scope of work, PDF, or property photos? Submit this form, then email the attachments to{' '}
          <a href={SITE.emailHref} className="font-bold text-safety-orange-deep hover:underline">{SITE.email}</a>.
        </p>
      </div>

      {status === 'error' && (
        <p className="font-barlow text-base font-semibold text-red-600 text-center">
          Something went wrong. Please email your request directly to sbl@southernbucklawn.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-safety-orange py-5 font-anton text-xl uppercase tracking-wider text-midnight-moss shadow-lg transition-all hover:-translate-y-1 hover:bg-orange-hot hover:shadow-xl disabled:pointer-events-none disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" /> Processing...
          </>
        ) : (
          <>
            Submit Work Order Request <Send className="h-6 w-6" />
          </>
        )}
      </button>
    </form>
  );
}
