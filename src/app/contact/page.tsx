import type { Metadata } from 'next';
import Link from 'next/link';
import { PhoneCall, MapPin, Clock, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SITE, DEFAULT_OG_IMAGE, SERVICE_NAV } from '@/data/site';
import ContactForm from '@/components/ContactForm';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: { absolute: 'Contact Southern Buck Lawn in Walker, LA' },
  description:
    'Call, text, or message Southern Buck Lawn in Walker. NAP: 28790 Brett Dr, Walker LA 70785. (225) 369-4434 · sbl@southernbucklawn.com. Free quotes.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: `${SITE.url}/contact`,
    title: 'Contact Southern Buck Lawn in Walker, LA',
    description:
      'Call, text, or message Michael in Walker. Serving Walker, Denham Springs, and Watson.',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Southern Buck Lawn in Walker, LA',
    images: [{ url: DEFAULT_OG_IMAGE.url, alt: DEFAULT_OG_IMAGE.alt }],
  },
};

export default function ContactPage() {
  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['ContactPage', 'WebPage'],
    '@id': `${SITE.url}/contact#webpage`,
    name: 'Contact Southern Buck Lawn',
    url: `${SITE.url}/contact`,
    description:
      'Call, text, or message Southern Buck Lawn in Walker, Louisiana for lawn care and landscaping.',
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#business` },
    mainEntity: {
      '@type': 'LocalBusiness',
      '@id': `${SITE.url}/#business`,
      name: SITE.name,
      telephone: SITE.phoneInternational,
      email: SITE.email,
      url: SITE.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.street,
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        postalCode: SITE.postalCode,
        addressCountry: 'US',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '06:00',
          closes: '18:30',
        },
      ],
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE.url}/contact` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="bg-midnight-moss px-4 pb-14 pt-32 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto mb-5 flex max-w-3xl justify-center">
          <Breadcrumbs trail={[{ name: 'Contact', href: '/contact' }]} />
        </div>
        <p className="mb-3 font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">Get in touch</p>
        <h1 className="font-anton text-4xl uppercase tracking-wide sm:text-5xl">Contact Southern Buck Lawn</h1>
        <p className="mx-auto mt-4 max-w-2xl font-barlow text-lg text-white/75">
          Question, or ready to get on the schedule? Call, text, or send the form. I call back.
        </p>
      </header>

      <section className="bg-surface py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-7">
            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <h2 className="font-anton text-xl uppercase text-primary">Southern Buck Lawn</h2>
              <p className="mt-2 font-barlow text-base text-gray-600">
                Owner-operated by {SITE.owner} · Sole proprietorship (not an LLC)
              </p>
              <address className="mt-4 not-italic font-barlow text-lg text-midnight-moss">
                {SITE.street}<br />
                {SITE.city}, {SITE.region} {SITE.postalCode}
              </address>
              <p className="mt-3 font-barlow text-base text-gray-600">
                Home turf: Walker, Denham Springs, and Watson.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a href={SITE.phoneHref} className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:border-safety-orange">
                <PhoneCall className="h-7 w-7 text-safety-orange" />
                <span className="font-anton text-lg uppercase text-midnight-moss">Call</span>
                <span className="font-barlow text-lg text-gray-600">{SITE.phone}</span>
              </a>
              <a href={SITE.smsHref} className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:border-safety-orange">
                <MessageSquare className="h-7 w-7 text-safety-orange" />
                <span className="font-anton text-lg uppercase text-midnight-moss">Text / SMS</span>
                <span className="font-barlow text-lg text-gray-600">{SITE.phone}</span>
              </a>
              <ObfuscatedEmail variant="card" className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:border-safety-orange" />
              <div className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                <MapPin className="h-7 w-7 text-safety-orange" />
                <span className="font-anton text-lg uppercase text-midnight-moss">Based In</span>
                <span className="font-barlow text-lg text-gray-600">{SITE.street}, {SITE.city}, {SITE.region} {SITE.postalCode}</span>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm sm:col-span-2">
                <Clock className="h-7 w-7 text-safety-orange" />
                <span className="font-anton text-lg uppercase text-midnight-moss">Hours</span>
                <span className="font-barlow text-base text-gray-600">
                  {SITE.hours.map(({ days, time }) => `${days} ${time}`).join(', ')} (America/Chicago)
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-mist-green p-6">
              <h2 className="font-anton text-xl uppercase text-primary">What happens after you call or text</h2>
              <ul className="mt-4 space-y-3">
                {[
                  'I answer when I can between jobs; if I miss you, I call or text back the same day when possible.',
                  'We confirm the property address and what you need — mowing, beds, lighting, or a one-time cleanup.',
                  'I look at the yard (in person or from details you send) and give you a clear free estimate.',
                  'No pressure. If it is a fit, we set a start date on the Walker / Denham Springs / Watson route.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-barlow text-base text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-safety-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 font-anton text-xl uppercase text-primary">Services &amp; free quote</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {SERVICE_NAV.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center justify-between rounded-xl border border-primary/10 bg-white px-4 py-3 font-barlow text-base text-midnight-moss shadow-sm hover:border-safety-orange"
                  >
                    {s.label} <ArrowRight className="h-4 w-4 text-safety-orange" />
                  </Link>
                ))}
                <Link
                  href="/landscape-lighting"
                  className="flex items-center justify-between rounded-xl border border-primary/10 bg-white px-4 py-3 font-barlow text-base text-midnight-moss shadow-sm hover:border-safety-orange"
                >
                  Landscape Lighting <ArrowRight className="h-4 w-4 text-safety-orange" />
                </Link>
                <Link
                  href="/quote"
                  className="flex items-center justify-center gap-2 rounded-xl bg-safety-orange px-4 py-3 font-anton text-base uppercase tracking-wider text-midnight-moss shadow-md hover:scale-[1.02] sm:col-span-2"
                >
                  Request a Free Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <p className="font-barlow text-lg text-gray-600">
              Weekly route: Walker, Denham Springs, and Watson. Off that corridor? Ask first.
            </p>
            <ServiceAreaMap />
          </div>

          <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-lg sm:p-8">
            <h2 className="mb-5 font-anton text-2xl uppercase text-primary">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
