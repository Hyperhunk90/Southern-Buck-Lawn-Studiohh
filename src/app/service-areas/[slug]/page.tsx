import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PhoneCall, MapPin, Sprout, Bug, Star } from 'lucide-react';
import { LOCATIONS, getLocation } from '@/data/locations';
import { SERVICE_NAV, SITE } from '@/data/site';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import QuoteForm from '@/components/QuoteForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqSection from '@/components/FaqSection';

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) return {};
  return {
    title: l.metaTitle,
    description: l.metaDescription,
    keywords: l.keywords,
    alternates: { canonical: `/service-areas/${l.slug}` },
    openGraph: {
      title: l.metaTitle,
      description: l.metaDescription,
      url: `${SITE.url}/service-areas/${l.slug}`,
      images: [{ url: l.image }],
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: loc.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <header className="relative overflow-hidden bg-midnight-moss pt-28 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-5">
            <Breadcrumbs trail={[{ name: 'Service Areas', href: '/service-areas' }, { name: loc.name, href: `/service-areas/${loc.slug}` }]} />
            <p className="inline-flex items-center gap-2 font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">
              <MapPin className="h-4 w-4" /> {loc.name}
            </p>
            <h1 className="font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">{loc.h1}</h1>
            <p className="font-barlow text-xl text-white/80">{loc.intro}</p>
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
            <Image src={loc.image} alt={loc.imageAlt} width={800} height={600} sizes="(max-width: 1024px) 90vw, 600px" quality={60} className="h-80 w-full object-cover" priority />
          </div>
        </div>
      </header>

      {/* Local detail */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-anton text-3xl uppercase text-primary">Lawn Care Built for {loc.name.replace(', LA', '')}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <p className="flex items-center gap-2 font-anton text-xl uppercase text-midnight-moss">
                <Sprout className="h-6 w-6 text-safety-orange" /> Your Soil
              </p>
              <p className="mt-2 font-barlow text-lg text-gray-700">{loc.soilNote}</p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <p className="flex items-center gap-2 font-anton text-xl uppercase text-midnight-moss">
                <Bug className="h-6 w-6 text-safety-orange" /> Local Pests &amp; Weeds
              </p>
              <p className="mt-2 font-barlow text-lg text-gray-700">{loc.pestNote}</p>
            </div>
          </div>

          <h2 className="mt-12 font-anton text-3xl uppercase text-primary">Areas We Cover Here</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {loc.neighborhoods.map((n) => (
              <span key={n} className="rounded-full border border-primary/10 bg-mist-green px-4 py-1.5 font-barlow text-base font-semibold text-midnight-moss">
                {n}
              </span>
            ))}
          </div>

          {/* Internal links to services */}
          <h2 className="mt-12 font-anton text-3xl uppercase text-primary">Services in {loc.name.replace(', LA', '')}</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICE_NAV.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center justify-between rounded-xl border border-primary/10 bg-white px-5 py-4 font-anton text-lg uppercase text-midnight-moss shadow-sm transition-all hover:border-safety-orange hover:text-safety-orange-deep"
              >
                {s.label} <ArrowRight className="h-5 w-5 text-safety-orange" />
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <FaqSection faqs={loc.faqs} heading={`${loc.name.replace(', LA', '')} Lawn Care Questions`} />
          </div>
        </div>
      </section>

      {/* Reviews — only render when real reviews exist */}
      {loc.reviews.length > 0 && (
        <section className="bg-mist-green py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-anton text-3xl uppercase text-primary">What {loc.name.replace(', LA', '')} Says</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {loc.reviews.map((r, i) => (
                <div key={i} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                  <div className="mb-2 flex gap-1 text-safety-orange">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-safety-orange" />
                    ))}
                  </div>
                  <p className="font-barlow text-lg italic text-gray-700">&ldquo;{r.text}&rdquo;</p>
                  <p className="mt-3 font-anton text-base uppercase text-midnight-moss">
                    {r.author} <span className="font-barlow font-normal normal-case text-gray-500">&middot; {r.area}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ServiceAreaMap label={`Serving ${loc.name.replace(', LA', '')} & Nearby`} />
        </div>
      </section>

      {/* Quote */}
      <section className="bg-mist-green py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-anton text-3xl uppercase text-primary">Free Quote in {loc.name.replace(', LA', '')}</h2>
            <p className="mt-2 font-barlow text-lg text-gray-600">Tell us about your yard and we will call you back within 24 hours.</p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-lg sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
