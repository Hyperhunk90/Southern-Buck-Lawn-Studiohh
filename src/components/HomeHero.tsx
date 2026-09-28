import Link from 'next/link';
import {
  ShieldCheck, Award, PhoneCall, MapPin, ArrowRight, Check,
} from 'lucide-react';
import { SITE } from '@/data/site';
import { GOOGLE_RATING } from '@/data/reviews';
import FramedPhoto from '@/components/FramedPhoto';
import BuckWatermark from '@/components/BuckWatermark';

export default function HomeHero() {
  return (
    <>
    <header className="relative overflow-hidden bg-cream pt-24 pb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 top-16 hidden h-44 w-44 -scale-x-100 bg-contain bg-no-repeat opacity-70 md:block"
        style={{ backgroundImage: 'url(/images/decor/leaf-spray.svg)' }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-primary/25 bg-leaf-tile px-4 py-1.5 font-rye text-[0.72rem] tracking-wide text-primary">
              <MapPin className="h-4 w-4" /> Walker &middot; Denham Springs &middot; Watson
            </span>
            <p className="mt-5 font-caveat text-3xl font-bold text-safety-orange-deep sm:text-4xl">
              Owner-operated in Walker since June 2024
            </p>
            <h1 className="mt-1 font-anton text-6xl leading-[0.9] text-midnight-moss sm:text-7xl lg:text-8xl">
              Your Property Deserves{' '}
              <span className="text-safety-orange-deep">Better Than a Rushed Cut.</span>
            </h1>
            <p className="mt-6 max-w-xl font-archivo text-lg leading-relaxed text-bark">
              Lawn care, landscaping, landscape lighting, and property preservation for homeowners, businesses, and property pros in Walker, Denham Springs, and Watson. Detailed work that keeps the place looking cared for — not a swipe down the middle of a long route.
            </p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/quote"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-midnight-moss/15 bg-safety-orange px-8 py-4 font-btn text-lg uppercase tracking-wide text-midnight-moss shadow-[0_6px_0_0_rgba(42,32,19,0.35)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_0_rgba(42,32,19,0.35)]"
              >
                Request a Free Estimate <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-transparent px-8 py-4 font-btn text-lg uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-cream"
              >
                <PhoneCall className="h-5 w-5" /> {SITE.phone}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-archivo text-sm font-semibold text-bark">
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange-deep" /> Free estimates</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange-deep" /> Insured (GL)</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange-deep" /> {GOOGLE_RATING.score.toFixed(1)} on Google ({GOOGLE_RATING.count} reviews)</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mr-0">
            <FramedPhoto
              src="/images/walker-la-weiss-rd-striped-front-lawn.webp"
              alt="Freshly mowed front lawn with crisp diagonal stripes on Weiss Rd in Walker, LA, with an American flag and brick house in the background."
              aspect="aspect-[4/3]"
              sizes="(max-width: 1023px) 90vw, 46vw"
              priority
              corner="twig"
              cornerPos="tl"
              tape
              className="rotate-2"
            />
            <FramedPhoto
              src="/images/michael-dantone-owner.webp"
              alt="Headshot of Michael Dantone, owner of Southern Buck Lawn, in a company polo."
              aspect="aspect-square"
              sizes="(max-width: 1023px) 40vw, 18vw"
              corner="leaf"
              cornerPos="br"
              className="absolute -bottom-8 -left-6 w-36 -rotate-6 sm:w-44"
            />
            <div className="absolute -bottom-1 left-32 hidden rotate-2 font-caveat text-2xl font-bold text-midnight-moss sm:left-40 sm:block">
              — Michael, your neighbor
            </div>
          </div>
        </div>
      </div>
    </header>

    <section className="bg-safety-orange py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-x-4 gap-y-1 px-4 text-center sm:flex-row sm:px-6 lg:px-8">
        <span className="font-anton text-3xl tracking-wide text-midnight-moss sm:text-4xl">Free estimates &middot; 24-hour callback</span>
        <span className="font-archivo text-base font-semibold text-midnight-moss">Tell me about your property — I follow up with the next step.</span>
      </div>
    </section>

    <section className="border-y-2 border-cream-line bg-surface py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          { icon: <ShieldCheck className="h-7 w-7" />, t: 'Insured', s: 'General liability' },
          { icon: <Award className="h-7 w-7" />, t: 'Owner-Operated', s: 'Since June 2024' },
          { icon: <PhoneCall className="h-7 w-7" />, t: '24-Hour Callback', s: 'I answer fast' },
          { icon: <MapPin className="h-7 w-7" />, t: 'Local Route', s: 'Walker · Denham · Watson' },
        ].map((item) => (
          <div key={item.t} className="flex items-center gap-3">
            <div className="rounded-xl border-2 border-cream-line bg-leaf-tile p-3 text-primary">{item.icon}</div>
            <div>
              <p className="font-anton text-2xl leading-none text-midnight-moss">{item.t}</p>
              <p className="font-archivo text-xs font-semibold uppercase tracking-wider text-bark">{item.s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="relative overflow-hidden bg-cream py-16">
      <BuckWatermark side="right" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-rye text-lg text-safety-orange-deep">Consistent care shows</p>
          <h2 className="mt-2 font-anton text-5xl tracking-wide text-midnight-moss sm:text-6xl">Property Care That Shows in the Details</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
          <p className="dropcap mt-6 text-left font-archivo text-lg leading-relaxed text-bark">
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
