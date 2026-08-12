import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight, PhoneCall, CircleHelp } from 'lucide-react';
import { SERVICES, getService } from '@/data/services';
import { ZIPPER_COMBOS } from '@/data/zipper';
import { AREA_NAV, SITE } from '@/data/site';
import QuoteForm from '@/components/QuoteForm';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      url: `${SITE.url}/services/${s.slug}`,
      images: [{ url: s.image }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);
  const cityPages = ZIPPER_COMBOS.filter((z) => z.serviceSlug === service.slug);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: `${SITE.url}/services/${service.slug}`,
    provider: { '@type': 'LocalBusiness', '@id': `${SITE.url}/#business`, name: SITE.name },
    areaServed: SITE.serviceAreas.map((a) => ({ '@type': 'City', name: a })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hero */}
      <header className="relative overflow-hidden bg-midnight-moss pt-28 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-5">
            <Breadcrumbs trail={[{ name: 'Services', href: '/services' }, { name: service.title, href: `/services/${service.slug}` }]} />
            <p className="font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">{service.subtitle}</p>
            <h1 className="font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">{service.h1}</h1>
            <p className="font-barlow text-xl text-white/80">{service.quickSummary}</p>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Link href="/quote" className="flex items-center justify-center gap-2 rounded-lg bg-safety-orange px-7 py-3.5 font-anton uppercase tracking-wider text-midnight-moss shadow-lg transition-transform hover:scale-105">
                Get a Free Quote <ArrowRight className="h-5 w-5" />
              </Link>
              <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-deep-forest px-7 py-3.5 font-anton uppercase tracking-wider text-white hover:bg-primary">
                <PhoneCall className="h-5 w-5" /> {SITE.phone}
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image src={service.image} alt={service.imageAlt} width={800} height={600} sizes="(max-width: 1024px) 90vw, 600px" quality={60} className="h-80 w-full object-cover" priority />
          </div>
        </div>
      </header>

      {/* Body */}
      <section className="bg-surface py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="space-y-6 lg:col-span-2">
            {service.detailedContent.map((p, i) => (
              <p key={i} className="font-barlow text-lg leading-relaxed text-gray-700">{p}</p>
            ))}

            <h2 className="pt-4 font-anton text-2xl uppercase text-primary">What You Get</h2>
            <ul className="space-y-3">
              {service.localBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 font-barlow text-lg text-gray-700">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-safety-orange" /> {b}
                </li>
              ))}
            </ul>

            {/* Internal links to areas */}
            <h2 className="pt-4 font-anton text-2xl uppercase text-primary">Where We Offer This</h2>
            <p className="font-barlow text-lg text-gray-700">
              We bring {service.title.toLowerCase()} to homes and businesses across the area. See the local details for{' '}
              {AREA_NAV.map((a, i) => (
                <span key={a.href}>
                  <Link href={a.href} className="font-bold text-primary underline decoration-safety-orange underline-offset-2 hover:text-safety-orange-deep">
                    {a.label.replace(', LA', '')}
                  </Link>
                  {i < AREA_NAV.length - 1 ? (i === AREA_NAV.length - 2 ? ', and ' : ', ') : '.'}
                </span>
              ))}
            </p>

            {/* FAQ */}
            <h2 className="pt-4 font-anton text-2xl uppercase text-primary">Questions Folks Ask</h2>
            <div className="space-y-5">
              {service.faqs.map((f) => (
                <div key={f.question} className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
                  <p className="flex items-start gap-2 font-anton text-lg uppercase text-midnight-moss">
                    <CircleHelp className="mt-0.5 h-5 w-5 flex-shrink-0 text-safety-orange" /> {f.question}
                  </p>
                  <p className="mt-2 font-barlow text-lg text-gray-700">{f.answer}</p>
                </div>
              ))}
            </div>

            {cityPages.length > 0 && (
              <>
                <h2 className="pt-4 font-anton text-2xl uppercase text-primary">{service.title} by Town</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {cityPages.map((z) => (
                    <Link
                      key={z.slug}
                      href={`/${z.slug}`}
                      className="flex items-center justify-between rounded-xl border border-primary/10 bg-white px-5 py-4 font-anton text-base uppercase text-midnight-moss shadow-sm transition-all hover:border-safety-orange hover:text-safety-orange-deep"
                    >
                      {z.cityName} <ArrowRight className="h-5 w-5 text-safety-orange" />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <p className="font-barlow text-sm font-bold uppercase tracking-wider text-safety-orange-deep">Typical pricing</p>
              <p className="mt-1 font-anton text-xl uppercase text-midnight-moss">{service.pricingRange}</p>
              <p className="mt-2 font-barlow text-base text-gray-600">Every yard is different. We give you a firm number after a quick look, free.</p>
              <Link href="/quote" className="mt-4 block rounded-lg bg-safety-orange py-3 text-center font-anton uppercase tracking-wider text-midnight-moss shadow transition-transform hover:scale-105">
                Get My Quote
              </Link>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-mist-green p-6">
              <p className="font-anton text-lg uppercase text-primary">Other Services</p>
              <ul className="mt-3 space-y-2">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="flex items-center gap-2 font-barlow text-base font-semibold text-midnight-moss hover:text-safety-orange-deep">
                      <ArrowRight className="h-4 w-4 text-safety-orange" /> {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Inline quote form */}
      <section className="bg-mist-green py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-anton text-3xl uppercase text-primary">Get Your Free {service.title} Quote</h2>
            <p className="mt-2 font-barlow text-lg text-gray-600">Fill this out and Michael calls you back within 24 hours.</p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-lg sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
