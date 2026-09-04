import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight, PhoneCall, CircleHelp } from 'lucide-react';
import { SERVICES, getService } from '@/data/services';
import { POSTS } from '@/data/blog';
import { PROJECTS } from '@/data/projects';
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
      images: [{ url: s.image, alt: s.imageAlt }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);
  const relatedPosts = service.relatedPostSlugs.flatMap((postSlug) => {
    const post = POSTS.find((candidate) => candidate.slug === postSlug);
    return post ? [post] : [];
  });
  const serviceProjects = PROJECTS.filter((project) => project.serviceSlug === service.slug).slice(0, 3);

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
    areaServed: SITE.serviceAreas.map((a) => ({ '@type': 'City', name: `${a}, Louisiana` })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

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

            <h2 className="pt-4 font-anton text-2xl uppercase text-primary">Where I Offer This</h2>
            <p className="font-barlow text-lg text-gray-700">
              {service.title} on the weekly route:{' '}
              {AREA_NAV.map((a, i) => (
                <span key={a.href}>
                  <Link href={a.href} className="font-bold text-primary underline decoration-safety-orange underline-offset-2 hover:text-safety-orange-deep">
                    {a.label.replace(', LA', '')}
                  </Link>
                  {i < AREA_NAV.length - 1 ? (i === AREA_NAV.length - 2 ? ', and ' : ', ') : '.'}
                </span>
              ))}
            </p>

            {relatedPosts.length > 0 && (
              <section aria-labelledby="local-lawn-guides-heading" className="pt-4">
                <h2 id="local-lawn-guides-heading" className="font-anton text-2xl uppercase text-primary">Local Lawn Guides</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {relatedPosts.map((post) => (
                    <article key={post.slug} className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
                      <h3 className="font-anton text-lg uppercase text-midnight-moss">
                        <Link href={`/blog/${post.slug}`} className="hover:text-safety-orange-deep">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 font-barlow text-base leading-relaxed text-gray-600">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex items-center gap-2 font-barlow font-bold text-primary hover:text-safety-orange-deep">
                        Read the guide <ArrowRight className="h-4 w-4" />
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}

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
          </div>

          <aside className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <p className="font-barlow text-sm font-bold uppercase tracking-wider text-safety-orange-deep">How I quote</p>
              <p className="mt-1 font-anton text-xl uppercase text-midnight-moss">{service.pricingRange}</p>
              <p className="mt-2 font-barlow text-base text-gray-600">Every yard is different. I give you a firm number after a quick look, free.</p>
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

      {serviceProjects.length > 0 && (
        <section className="bg-white py-16" aria-labelledby="actual-job-photos-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-barlow text-sm font-bold uppercase tracking-[0.25em] text-safety-orange-deep">Actual Southern Buck Lawn Work</p>
              <h2 id="actual-job-photos-heading" className="mt-2 font-anton text-3xl uppercase text-primary">
                Actual {service.title} Job Photos
              </h2>
              <p className="mt-3 font-barlow text-lg text-gray-600">
                These photos come from Southern Buck Lawn jobs and appear here only when the project is tagged to this exact service.
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {serviceProjects.map((project) => (
                <article key={project.id} className="overflow-hidden rounded-2xl border border-primary/10 bg-surface shadow-sm">
                  <div className="relative">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={800}
                      height={600}
                      sizes="(max-width: 768px) 90vw, 33vw"
                      quality={60}
                      className="h-64 w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-midnight-moss/90 px-3 py-1 font-barlow text-xs font-bold uppercase tracking-wider text-white">
                      Actual job photo
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="font-barlow text-sm font-bold uppercase tracking-wider text-safety-orange-deep">{project.serviceLabel}</p>
                    <h3 className="mt-1 font-anton text-xl uppercase text-midnight-moss">{project.title}</h3>
                    <p className="mt-2 font-barlow text-base leading-relaxed text-gray-600">{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/gallery" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-anton uppercase tracking-wider text-white hover:bg-deep-forest">
                View All Actual Job Photos <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

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
