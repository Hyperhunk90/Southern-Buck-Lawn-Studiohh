'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2, UploadCloud } from 'lucide-react';
import { trackEvent } from '@/lib/ga';

export default function ReoForm() {
  const [form, setForm] = useState({
    firmName: '',
    nameTitle: '',
    phone: '',
    address: '',
    service: 'Trash-Out',
    company: '', // Honeypot
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [file, setFile] = useState<File | null>(null);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Combine custom fields into the message payload for the backend
    const messagePayload = `Asset Management Firm: ${form.firmName}\nName & Title: ${form.nameTitle}\nHas Attachment: ${file ? 'Yes (Emailed separately)' : 'No'}`;

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'REO / Property Preservation Lead',
          name: form.nameTitle || form.firmName || 'Unknown',
          phone: form.phone,
          address: form.address,
          service: form.service,
          message: messagePayload,
          company: form.company, // Honeypot
        }),
      });

      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      trackEvent('generate_lead', { form: 'reo_form' });
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
          We have received your details. {file && "Since you indicated you have files, please email them directly to sbl@southernbucklawn.com if you haven't already."} We will be in touch shortly to confirm scheduling.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border-2 border-primary/10 bg-white p-4 font-barlow text-base text-midnight-moss outline-none transition-all focus:border-safety-orange placeholder:text-gray-400 shadow-sm';

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl bg-light-tan p-6 shadow-xl sm:p-10">
      {/* Honeypot */}
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
        <label className="flex flex-col gap-2">
          <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">
            Company / Asset Management Firm
          </span>
          <input
            required
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
            inputMode="tel"
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
          value={form.address}
          onChange={(e) => update('address', e.target.value)}
          placeholder="123 Main St, Walker, LA"
          className={inputClass}
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="font-barlow text-sm font-bold uppercase tracking-wide text-midnight-moss">
          Upload Scope of Work / Photos
        </span>
        <label className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/20 bg-white p-8 transition-colors hover:border-safety-orange hover:bg-orange-50">
          <div className="flex flex-col items-center gap-3 text-center">
            <UploadCloud className="h-10 w-10 text-primary/40 group-hover:text-safety-orange transition-colors" />
            <div className="font-barlow text-base text-midnight-moss">
              {file ? (
                <span className="font-bold text-safety-orange">{file.name}</span>
              ) : (
                <>
                  <span className="font-bold">Click to upload</span> or drag and drop
                </>
              )}
            </div>
            {!file && <p className="font-barlow text-sm text-gray-500">PDF, JPG, PNG up to 10MB</p>}
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </label>
        {file && (
          <p className="mt-1 font-barlow text-sm text-gray-600">
            * Note: For very large files or multiple photos, please email them directly to <a href="mailto:sbl@southernbucklawn.com" className="font-bold text-safety-orange hover:underline">sbl@southernbucklawn.com</a> after submitting.
          </p>
        )}
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
