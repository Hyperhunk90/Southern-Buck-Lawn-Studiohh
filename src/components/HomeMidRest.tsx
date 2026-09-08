'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Star, Check,
} from 'lucide-react';
import { AREA_NAV } from '@/data/site';
import { REVIEWS } from '@/data/reviews';
import { gallery, faqs, buckPoints } from '@/data/homepage';
import dynamic from 'next/dynamic';
const ServiceAreaMap = dynamic(() => import('@/components/ServiceAreaMap'));
const ReviewBadgeBar = dynamic(() => import('@/components/ReviewBadgeBar'));

export default function HomeMidRest() {
  return (
    <>
    <section id="work" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Job photos</p>
          <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">Work From the Route</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
          <p className="mx-auto mt-4 max-w-2xl font-archivo text-lg text-bark">
            Residential Magnum stripes, an azalea black-mulch after, commercial grounds with the trailer, and Walker stripes. Captions match the files. No stock. Owner headshot in the about section.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {gallery.map((g) => (
            <div key={g.src} className="overflow-hidden rounded-2xl border border-cream-line bg-white p-2 shadow-sm">
              <Image
                src={g.src}
                alt={g.alt}
                width={g.w}
                height={g.h}
                sizes="(max-width: 640px) 92vw, 46vw"
                quality={60}
                className="h-72 w-full rounded-xl"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/gallery" className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 font-archivo font-extrabold uppercase tracking-wide text-primary transition-colors hover:border-safety-orange hover:bg-safety-orange hover:text-midnight-moss">
            View all job photos <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>

    <section id="about" className="bg-primary py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:px-8">
        <div className="flex-none">
          <div className="overflow-hidden rounded-3xl bg-forest-dark shadow-2xl">
            <Image
              src="/images/michael-dantone-owner.webp"
              alt="Headshot of Michael Dantone, owner of Southern Buck Lawn, in a company polo."
              width={300}
              height={300}
              className="h-60 w-60 object-cover object-top sm:h-72 sm:w-72"
            />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-caveat text-3xl font-bold text-sage">One operator</p>
          <h2 className="mt-1 font-anton text-4xl uppercase tracking-wide text-white sm:text-5xl">Meet the Owner Behind the Work</h2>
          <div className="mt-4 h-1 w-24 rounded bg-safety-orange" />
          <p className="mt-5 max-w-2xl font-archivo text-lg leading-relaxed text-white/90">
            I&rsquo;m Michael Dantone. I run Southern Buck Lawn out of Walker &mdash; 28790 Brett Drive. Owner-operated since June 2024. Folks around here call me the Landscape Mayor, and I earned it one yard at a time. This is a one-man shop, not a franchise. When you call, you get me. Same day every week, yard left better than I found it.
          </p>
          <div className="mt-7 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {buckPoints.map((p) => (
              <div key={p} className="flex items-center gap-3 font-archivo text-base font-semibold text-white">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-safety-orange">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </span>
                {p}
              </div>
            ))}
          </div>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 border-b-2 border-safety-orange font-archivo text-lg font-extrabold uppercase tracking-wide text-white transition-all hover:gap-3 hover:border-sage hover:text-sage">
            More about Michael <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>

    <section className="bg-surface py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Where I work</p>
          <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">Proudly Serving Walker, Denham Springs, and Watson</h2>
          <div className="h-1 w-24 rounded bg-safety-orange" />
          <p className="font-archivo text-lg text-bark">
            Those three towns are the weekly route. Pick yours to see how I handle the soil and the grass where you live. If you are a little off the corridor, ask &mdash; I will confirm whether your location fits before promising.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AREA_NAV.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center justify-between rounded-xl border border-cream-line bg-cream px-5 py-4 font-anton text-lg uppercase text-midnight-moss shadow-sm transition-all hover:border-safety-orange hover:text-safety-orange-deep"
              >
                {a.label} <ArrowRight className="h-5 w-5 text-safety-orange" />
              </Link>
            ))}
          </div>
        </div>
        <ServiceAreaMap />
      </div>
    </section>

    <section className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="font-caveat text-3xl font-bold text-safety-orange-deep">What folks say</p>
          <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">I Earn It One Yard at a Time</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure key={r.author} className="flex flex-col rounded-2xl border border-cream-line bg-white p-6 shadow-sm">
              <div className="mb-3 flex gap-0.5 text-safety-orange">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-safety-orange" />
                ))}
              </div>
              <blockquote className="grow font-archivo text-lg leading-relaxed text-midnight-moss/80">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-4 flex items-center justify-between border-t border-cream-line pt-3">
                <span className="font-anton text-base uppercase text-midnight-moss">{r.author}</span>
                <span className="font-archivo text-sm uppercase tracking-wider text-bark">{r.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12">
          <ReviewBadgeBar />
        </div>
      </div>
    </section>

    <section className="bg-surface py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Common questions</p>
          <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">FAQ</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-cream-line bg-cream p-6 shadow-sm">
              <h3 className="font-anton text-xl uppercase text-midnight-moss">{f.q}</h3>
              <p className="mt-2 font-archivo text-base leading-relaxed text-bark">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
