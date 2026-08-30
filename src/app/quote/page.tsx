import type { Metadata } from 'next';
import { PhoneCall, Clock, ShieldCheck } from 'lucide-react';
import { SITE } from '@/data/site';
import QuoteForm from '@/components/QuoteForm';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';

export const metadata: Metadata = {
  title: 'Free Lawn Care Quote in Walker, Denham Springs & Watson',
  description:
    'Request a free lawn care quote from Southern Buck Lawn in Walker. Tell us about the yard and Michael calls back within 24 hours.',
  alternates: { canonical: '/quote' },
  openGraph: { url: `${SITE.url}/quote` },
};

export default function QuotePage() {
  return (
    <section className="bg-surface pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-2xl lg:grid-cols-5">
          <div className="space-y-8 bg-primary p-9 text-white lg:col-span-2">
            <div>
              <h1 className="font-anton text-4xl uppercase leading-tight">
                Get a Fast, <span className="text-sage">Free</span> Quote
              </h1>
              <p className="mt-4 font-barlow text-lg text-white/85">
                Tell me what you need and where the property is. I look at every request and call back within one business day to walk it or confirm the next step.
              </p>
            </div>

            <div className="space-y-4">
              <a href={SITE.phoneHref} className="flex items-center gap-3 font-barlow text-lg hover:text-sage">
                <PhoneCall className="h-6 w-6 text-safety-orange" /> {SITE.phone}
              </a>
              <ObfuscatedEmail className="flex items-center gap-3 font-barlow text-lg hover:text-sage" iconClassName="h-6 w-6 text-safety-orange" />
              <p className="flex items-center gap-3 font-barlow text-lg">
                <Clock className="h-6 w-6 text-safety-orange" /> Open 7 days &middot; Mon&ndash;Fri 6AM&ndash;6:30PM
              </p>
              <p className="flex items-center gap-3 font-barlow text-lg">
                <ShieldCheck className="h-6 w-6 text-safety-orange" /> Insured (general liability)
              </p>
            </div>

            <div className="border-t border-white/15 pt-6">
              <p className="font-barlow text-sm uppercase tracking-widest text-sage">Home turf</p>
              <p className="mt-1 font-barlow text-lg text-white/85">Walker 70785 &middot; Denham Springs 70726 &middot; Watson 70786</p>
            </div>
          </div>

          <div className="p-7 sm:p-10 lg:col-span-3">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
