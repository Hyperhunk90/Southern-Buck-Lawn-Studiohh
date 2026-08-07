import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, PhoneCall } from 'lucide-react';
import { LOCATIONS } from '@/data/locations';
import { SITE } from '@/data/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Service Areas | Lawn Care in Walker, Denham Springs & Baton Rouge',
  description:
    'Southern Buck Lawn serves Walker, Denham Springs, Baton Rouge, and Livingston Parish with weekly mowing, weed control, and landscaping. Find your town and see how we work your yard.',
  alternates: { canonical: '/service-areas' },
};

export default function ServiceAreasIndex() {
  return (
    <>
      <header className="bg-midnight-moss px-4 pb-16 pt-32 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto mb-5 flex max-w-3xl justify-center">
          <Breadcrumbs trail={[{ name: 'Service Areas', href: '/service-areas' }]} />
        </div>
        <p className="mb-3 font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">Where we work</p>
        <h1 className="mx-auto max-w-3xl font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
          Lawn Care Service Areas Across Livingston Parish &amp; Baton Rouge
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-barlow text-lg text-white/75">
          Based in Walker, we cover the towns and parishes around us every week. Pick your area to see how we handle the
          soil, the weeds, and the grass right where you live.
        </p>
      </header>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          {LOCATIONS.map((l, i) => (
            <Link
              key={l.slug}
              href={`/service-areas/${l.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all hover:shadow-xl md:grid-cols-5"
            >
              <div className={`relative h-60 md:col-span-2 md:h-auto ${i % 2 ? 'md:order-2' : ''}`}>
                <Image src={l.image} alt={l.imageAlt} fill className="object-cover" sizes="(max-width:768px) 100vw, 40vw" />
              </div>
              <div className="space-y-3 p-7 md:col-span-3">
                <p className="inline-flex items-center gap-2 font-barlow text-sm font-bold uppercase tracking-[0.2em] text-safety-orange-deep">
                  <MapPin className="h-4 w-4" /> {l.name}
                </p>
                <h2 className="font-anton text-2xl uppercase text-primary">{l.h1}</h2>
                <p className="font-barlow text-lg text-gray-600">{l.intro}</p>
                <span className="inline-flex items-center gap-2 font-barlow font-extrabold uppercase text-primary transition-all group-hover:gap-3 group-hover:text-safety-orange-deep">
                  See {l.name.replace(', LA', '')} details <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-safety-orange py-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 lg:flex-row lg:text-left lg:px-8">
          <h2 className="font-anton text-3xl uppercase text-midnight-moss">Not Sure If We Cover You? Just Ask.</h2>
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
