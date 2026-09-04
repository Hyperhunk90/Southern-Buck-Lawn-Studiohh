'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
} from 'lucide-react';
import { processSteps } from '@/data/homepage';

export default function HomeMid() {
  return (
    <>

    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Who I work with</p>
          <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">Service Plans for Every Kind of Property</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Homeowners',
              body: 'You want the place to look its best without managing every lawn and bed detail yourself. Dependable weekly care and bed work from a neighbor who answers the phone.',
              href: '/quote?property=Residential',
              cta: 'Improve my curb appeal',
            },
            {
              title: 'Commercial & businesses',
              body: 'Your exterior speaks before anyone walks in. Recurring landscape and grounds care on a set schedule for sites I can keep on the Walker route.',
              href: '/services/commercial-grounds',
              cta: 'Request commercial service',
            },
            {
              title: 'Realtors, banks & asset managers',
              body: 'Property condition affects showings, inspections, and timelines. Local support for preservation and maintenance across Walker, Denham Springs, and Watson.',
              href: '/property-preservation-reo-services',
              cta: 'Submit an asset service request',
            },
          ].map((card) => (
            <div key={card.title} className="flex flex-col rounded-2xl border border-cream-line bg-cream p-7 shadow-sm">
              <h3 className="font-anton text-2xl uppercase text-midnight-moss">{card.title}</h3>
              <p className="mt-3 grow font-archivo text-base leading-relaxed text-bark">{card.body}</p>
              <Link href={card.href} className="mt-5 inline-flex items-center gap-2 font-archivo text-sm font-extrabold uppercase tracking-wide text-safety-orange-deep hover:gap-3">
                {card.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Simple process</p>
          <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">A Straightforward Way to Get Your Property Back on Track</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.title} className="rounded-2xl border border-cream-line bg-white p-6 shadow-sm">
              <p className="font-anton text-xl uppercase text-midnight-moss">{step.title}</p>
              <p className="mt-3 font-archivo text-base leading-relaxed text-bark">{step.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/quote" className="inline-flex items-center gap-2 rounded-xl bg-safety-orange px-8 py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-xl transition-all hover:scale-105">
            Submit a Service Request <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-deep-forest">
      <Image
        src="/images/azalea-bed-after-black-mulch.webp"
        alt="Fresh black-mulch bed with red azaleas and clean black edging along a light stucco house."
        fill
        sizes="100vw"
        quality={60}
        style={{ objectFit: 'cover', objectPosition: '50% 56%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/95 via-deep-forest/65 to-deep-forest/5" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="font-caveat text-3xl font-bold text-sage">Real results, real yards</p>
          <h2 className="mt-1 font-anton text-4xl uppercase leading-[0.98] tracking-wide text-white sm:text-5xl">
            Real Jobs, <br className="hidden sm:block" />Real Yards
          </h2>
          <p className="mt-5 font-archivo text-lg leading-relaxed text-white/90">
            Photos on this site are actual job files, captioned for what is in the frame. No stock, no fake before-and-afters, no invented city labels.
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
