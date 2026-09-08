'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck, Award, PhoneCall, MapPin, ArrowRight, Check,
} from 'lucide-react';
import { SITE } from '@/data/site';
import { GOOGLE_RATING } from '@/data/reviews';

export default function HomeHero() {
  return (
    <>

    <header className="relative overflow-hidden bg-deep-forest pt-20">
      <div className="absolute inset-0">
        <Image
          src="/images/residential-lawn-stripes-magnum.webp"
          alt="Freshly striped green residential lawn with an orange Bad Boy Magnum zero-turn parked by the driveway."
          fill
          priority
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/90 via-deep-forest/70 to-deep-forest/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/85 via-transparent to-deep-forest/40" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-sage/50 bg-safety-orange/20 px-4 py-1.5 font-archivo text-xs font-bold uppercase tracking-widest text-sage">
            <MapPin className="h-4 w-4" /> Walker &middot; Denham Springs &middot; Watson
          </span>
          <p className="font-caveat text-3xl font-bold text-sage sm:text-4xl">Owner-operated in Walker since June 2024</p>
          <h1 className="font-anton text-5xl uppercase leading-[0.95] tracking-wide text-white sm:text-7xl">
            Your Property Deserves <span className="text-safety-orange">Better Than a Rushed Cut.</span>
          </h1>
          <p className="max-w-xl font-archivo text-lg leading-relaxed text-white/85 sm:text-xl">
            Lawn care, landscaping, landscape lighting, and property preservation for homeowners, businesses, and property pros in Walker, Denham Springs, and Watson. Detailed work that keeps the place looking cared for — not a swipe down the middle of a long route.
          </p>
          <div className="inline-flex items-center gap-4 rounded-full border border-white/15 bg-black/25 p-2.5 pr-6 backdrop-blur-sm">
            <Image
              src="/images/michael-dantone-owner.webp"
              alt="Headshot of Michael Dantone, owner of Southern Buck Lawn, in a company polo."
              width={56}
              height={56}
              loading="eager"
              className="h-14 w-14 rounded-full border-2 border-safety-orange object-cover object-top"
            />
            <div className="leading-tight">
              <p className="font-anton text-lg uppercase tracking-wide text-white">Michael Dantone</p>
              <p className="font-archivo text-sm font-semibold uppercase tracking-wider text-sage">The Landscape Mayor</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Link href="/quote" className="group flex items-center justify-center gap-2 rounded-xl bg-safety-orange px-8 py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-xl transition-all hover:scale-105 active:scale-95">
              Request a Free Estimate <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/55 bg-white/10 px-8 py-4 font-anton text-lg uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20">
              <PhoneCall className="h-5 w-5" /> {SITE.phone}
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 font-archivo text-sm font-semibold text-white/85">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange" /> Free estimates</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange" /> Insured (GL)</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange" /> {GOOGLE_RATING.score.toFixed(1)} on Google ({GOOGLE_RATING.count} reviews)</span>
          </div>
        </div>
      </div>
    </header>

    <section className="bg-safety-orange py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-x-4 gap-y-1 px-4 text-center sm:flex-row sm:px-6 lg:px-8">
        <span className="font-anton text-2xl uppercase tracking-wide text-midnight-moss sm:text-3xl">Free estimates &middot; 24-hour callback</span>
        <span className="font-archivo text-base font-semibold text-midnight-moss">Tell me about your property — I follow up with the next step.</span>
      </div>
    </section>

    <section className="border-b border-cream-line bg-cream py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          { icon: <ShieldCheck className="h-7 w-7" />, t: 'Insured', s: 'General liability' },
          { icon: <Award className="h-7 w-7" />, t: 'Owner-Operated', s: 'Since June 2024' },
          { icon: <PhoneCall className="h-7 w-7" />, t: '24-Hour Callback', s: 'I answer fast' },
          { icon: <MapPin className="h-7 w-7" />, t: 'Local Route', s: 'Walker · Denham · Watson' },
        ].map((item) => (
          <div key={item.t} className="flex items-center gap-3">
            <div className="rounded-xl bg-leaf-tile p-3 text-primary">{item.icon}</div>
            <div>
              <p className="font-anton text-lg uppercase leading-tight text-midnight-moss">{item.t}</p>
              <p className="font-archivo text-xs font-semibold uppercase tracking-wider text-bark">{item.s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Consistent care shows</p>
          <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">Property Care That Shows in the Details</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
          <p className="mt-5 font-archivo text-lg leading-relaxed text-bark">
            Your lawn and landscape are often the first thing people notice. Whether you are protecting curb appeal at home, keeping a commercial frontage sharp, or prepping an investment property for its next stage, the details matter. I focus on thorough work and a finished look — not rushing through a route.
          </p>
          <Link href="/quote" className="mt-6 inline-flex items-center gap-2 font-archivo text-base font-extrabold uppercase tracking-wide text-safety-orange-deep hover:gap-3">
            Start with a free estimate <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
