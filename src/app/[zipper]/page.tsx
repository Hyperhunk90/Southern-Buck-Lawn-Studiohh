import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight, PhoneCall, MapPin } from 'lucide-react';
import { ZIPPER_COMBOS, getZipper, getZipperFaqs } from '@/data/zipper';
import { getService } from '@/data/services';
import { getLocation } from '@/data/locations';
import { SITE } from '@/data/site';
import QuoteForm from '@/components/QuoteForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqSection from '@/components/FaqSection';

export function generateStaticParams() {
  return ZIPPER_COMBOS.map((z) => ({ zipper: z.slug }));
}

// Only the known zipper slugs render here; anything else 404s.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ zipper: string }> }): Promise<Metadata> {
  const { zipper } = await params;
  const combo = getZipper(zipper);
  if (!combo) return {};
  const service = getService(combo.serviceSlug);
  return {
    title: combo.metaTitle,
    description: combo.metaDescription,
    keywords: [combo.primaryKeyword],
    alternates: { canonical: `/${combo.slug}` },
    openGraph: {
      title: combo.metaTitle,
      description: combo.metaDescription,
      url: `${SITE.url}/${combo.slug}`,
      images: service ? [{ url: service.image }] : undefined,
    },
  };
}

export default async function ZipperPage({ params }: { params: Promise<{ zipper: string }> }) {
  const { zipper } = await params;
  const combo = getZipper(zipper);
  if (!combo) notFound();

  const service = getService(combo.serviceSlug);
  const location = getLocation(combo.citySlug);
  if (!service || !location) notFound();

  // Sibling zipper pages for internal linking: same service in other cities.
  const otherCities = ZIPPER_COMBOS.filter(
    (z) => z.serviceSlug === combo.serviceSlug && z.slug !== combo.slug,
  );
  const faqs = getZipperFaqs(combo);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${combo.serviceTitle} in ${combo.cityName}, LA`,
    serviceType: combo.serviceTitle,
    description: combo.metaDescription,
    url: `${SITE.url}/${combo.slug}`,
    provider: { '@type': 'LocalBusiness', '@id': `${SITE.url}/#business`, name: SITE.name },
    areaServed: { '@type': 'City', name: combo.cityName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hero */}
      <header className="relative overflow-hidden bg-midnight-moss pt-28 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-5">
            <Breadcrumbs trail={[{ name: combo.serviceTitle, href: `/services/${combo.serviceSlug}` }, { name: `${combo.serviceTitle} in ${combo.cityName}`, href: `/${combo.slug}` }]} />
            <p className="inline-flex items-center gap-2 font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">
              <MapPin className="h-4 w-4" /> {combo.cityName}, LA
            </p>
            <h1 className="font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">{combo.h1}</h1>
            <p className="font-barlow text-xl text-white/80">{combo.intro[0]}</p>
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
            {combo.intro.slice(1).map((p, i) => (
              <p key={i} className="font-barlow text-lg leading-relaxed text-gray-700">{p}</p>
            ))}

            <h2 className="pt-2 font-anton text-2xl uppercase text-primary">What You Get</h2>
            <ul className="space-y-3">
              {service.localBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 font-barlow text-lg text-gray-700">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-safety-orange" /> {b}
                </li>
              ))}
            </ul>

            {/* Local context pulled from the city silo */}
            <h2 className="pt-4 font-anton text-2xl uppercase text-primary">Built for {combo.cityName} Yards</h2>
            <p className="font-barlow text-lg leading-relaxed text-gray-700">{location.soilNote}</p>
            <p className="font-barlow text-lg leading-relaxed text-gray-700">{location.pestNote}</p>

            {/* Internal links: service hub + city page */}
            <div className="rounded-xl border border-primary/10 bg-mist-green p-5">
              <p className="font-barlow text-lg text-gray-700">
                Learn more about our{' '}
                <Link href={`/services/${combo.serviceSlug}`} className="font-bold text-primary underline decoration-safety-orange underline-offset-2 hover:text-safety-orange-deep">
                  {combo.serviceTitle.toLowerCase()}
                </Link>{' '}
                service, or see everything we do in{' '}
                <Link href={`/service-areas/${combo.citySlug}`} className="font-bold text-primary underline decoration-safety-orange underline-offset-2 hover:text-safety-orange-deep">
                  {combo.cityName}
                </Link>
                .
              </p>
            </div>

            {/* Same service, other towns */}
            <h2 className="pt-4 font-anton text-2xl uppercase text-primary">{combo.serviceTitle} Nearby</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {otherCities.map((z) => (
                <Link
                  key={z.slug}
                  href={`/${z.slug}`}
                  className="flex items-center justify-between rounded-xl border border-primary/10 bg-white px-5 py-4 font-anton text-base uppercase text-midnight-moss shadow-sm transition-all hover:border-safety-orange hover:text-safety-orange-deep"
                >
                  {z.cityName} <ArrowRight className="h-5 w-5 text-safety-orange" />
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <FaqSection faqs={faqs} heading={`${combo.serviceTitle} in ${combo.cityName} FAQs`} />
            </div>
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
              <p className="font-anton text-lg uppercase text-primary">Why Southern Buck</p>
              <ul className="mt-3 space-y-2 font-barlow text-base text-gray-700">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-safety-orange" /> Local and hometown</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-safety-orange" /> Licensed and insured</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-safety-orange" /> Same crew, same day</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-safety-orange" /> 24-hour callback</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-mist-green py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-anton text-3xl uppercase text-primary">Free {combo.serviceTitle} Quote in {combo.cityName}</h2>
            <p className="mt-2 font-barlow text-lg text-gray-600">Fill this out and we call you back within 24 hours.</p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-lg sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
