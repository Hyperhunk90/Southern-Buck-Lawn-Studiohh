import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { SITE } from '@/data/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Lawn Care & Landscaping Services in Walker & Baton Rouge',
  description:
    'Mowing, weed control, fertilization, landscape design, mulch, and commercial grounds maintenance across Walker, Denham Springs, and Baton Rouge. See every service from Southern Buck Lawn.',
  alternates: { canonical: '/services' },
};

export default function ServicesIndex() {
  return (
    <>
      <header className="bg-midnight-moss px-4 pb-16 pt-32 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto mb-5 flex max-w-3xl justify-center">
          <Breadcrumbs trail={[{ name: 'Services', href: '/services' }]} />
        </div>
        <p className="mb-3 font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">Everything we do</p>
        <h1 className="mx-auto max-w-3xl font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
          Lawn Care and Landscaping Services in Walker, Louisiana
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-barlow text-lg text-white/75">
          From a weekly cut to a full bed rebuild, we keep yards and commercial grounds sharp across Walker, Denham Springs, Baton Rouge, and Livingston Parish. Pick a service to see how we handle it.
        </p>
      </header>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all hover:shadow-xl md:grid-cols-5"
            >
              <div className={`relative h-60 md:col-span-2 md:h-auto ${i % 2 ? 'md:order-2' : ''}`}>
                <Image src={s.image} alt={s.imageAlt} fill className="object-cover" sizes="(max-width:768px) 100vw, 40vw" quality={60} />
              </div>
              <div className="space-y-3 p-7 md:col-span-3">
                <h2 className="font-anton text-2xl uppercase text-primary">{s.title}</h2>
                <p className="font-barlow text-base font-semibold uppercase tracking-wide text-safety-orange-deep">{s.subtitle}</p>
                <p className="font-barlow text-lg text-gray-600">{s.quickSummary}</p>
                <p className="font-barlow text-base text-gray-500">{s.pricingRange}</p>
                <span className="inline-flex items-center gap-2 font-barlow font-extrabold uppercase text-primary transition-all group-hover:gap-3 group-hover:text-safety-orange-deep">
                  See the details <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-safety-orange py-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 lg:flex-row lg:text-left lg:px-8">
          <h2 className="font-anton text-3xl uppercase text-midnight-moss">Not Sure What You Need? Just Ask.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="rounded-lg bg-midnight-moss px-7 py-4 font-anton uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105">
              Get a Free Quote
            </Link>
            <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 rounded-lg border-2 border-midnight-moss px-7 py-4 font-anton uppercase tracking-wider text-midnight-moss">
              <PhoneCall className="h-5 w-5" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
