import type { Metadata } from 'next';
import { PhoneCall, Clock, ShieldCheck } from 'lucide-react';
import { SITE, DEFAULT_OG_IMAGE } from '@/data/site';
import QuoteForm from '@/components/QuoteForm';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';

export const metadata: Metadata = {
  title: { absolute: 'Free Lawn Care Quote in Walker, LA | Southern Buck Lawn' },
  description:
    'Request a free lawn care quote from Southern Buck Lawn in Walker. Tell us about the yard — Michael calls back within one business day. Walker, Denham Springs, Watson.',
  alternates: { canonical: '/quote' },
  openGraph: {
    type: 'website',
    url: `${SITE.url}/quote`,
    title: 'Free Lawn Care Quote in Walker, LA | Southern Buck Lawn',
    description:
      'Request a free estimate. Michael reviews every request and calls back within one business day.',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lawn Care Quote in Walker, LA | Southern Buck Lawn',
    images: [{ url: DEFAULT_OG_IMAGE.url, alt: DEFAULT_OG_IMAGE.alt }],
  },
};

export default function QuotePage() {
  const webpageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE.url}/quote#webpage`,
    name: 'Free Lawn Care Quote',
    url: `${SITE.url}/quote`,
    description:
      'Request a free lawn care and landscaping estimate from Southern Buck Lawn in Walker, Louisiana.',
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#business` },
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}/quote#free-estimate`,
    name: 'Free Lawn Care Estimate',
    serviceType: 'Free estimate',
    description:
      'No-obligation free estimate for lawn mowing, weed control, landscape beds, commercial grounds, lighting, and property preservation on the Walker route.',
    url: `${SITE.url}/quote`,
    provider: { '@id': `${SITE.url}/#business` },
    areaServed: SITE.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
      addressRegion: 'LA',
    })),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free estimate — no obligation',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Free Quote', item: `${SITE.url}/quote` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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
                  <Clock className="h-6 w-6 text-safety-orange" /> {SITE.hours.map(({ days, time }) => `${days} ${time}`).join(', ')}
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
    </>
  );
}
