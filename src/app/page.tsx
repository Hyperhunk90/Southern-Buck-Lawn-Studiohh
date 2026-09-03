import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck, Award, PhoneCall, MapPin, ArrowRight, Star, Check, Leaf, Scissors, Building2, Sprout,
} from 'lucide-react';
import { SITE, AREA_NAV } from '@/data/site';
import { SERVICES } from '@/data/services';
import { REVIEWS } from '@/data/reviews';
import BusinessJsonLd from '@/components/BusinessJsonLd';
import dynamic from 'next/dynamic';
const ServiceAreaMap = dynamic(() => import('@/components/ServiceAreaMap'));
const ReviewBadgeBar = dynamic(() => import('@/components/ReviewBadgeBar'));

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: SITE.url },
};

const serviceIcons: Record<string, React.ReactNode> = {
  'lawn-mowing': <Scissors className="h-7 w-7" />,
  'weed-control': <Sprout className="h-7 w-7" />,
  'landscape-design': <Leaf className="h-7 w-7" />,
  'commercial-grounds': <Building2 className="h-7 w-7" />,
};

const gallery = [
  { src: '/images/sbl-project-photo-02.webp', alt: 'Brick house at dusk with path lights along the walkway, Southern Buck Lawn lighting job', w: 1125, h: 2000 },
  { src: '/images/sbl-project-photo-04.webp', alt: 'Commercial palm and pine-straw beds, Southern Buck Lawn job', w: 2000, h: 1125 },
  { src: '/images/sbl-project-photo-11.webp', alt: 'Michael Dantone, owner of Southern Buck Lawn, in a branded shirt with a shovel', w: 1125, h: 2000 },
  { src: '/images/sbl-project-photo-01.webp', alt: 'Southern Buck Lawn work trailer', w: 2000, h: 1125 },
];

const buckPoints = [
  'Owner-operated since June 2024',
  'Same day every week',
  'Free, no-pressure estimates',
  'Insured — general liability',
];

export default function Home() {
  return (
    <>
      <BusinessJsonLd />
      <header className="relative overflow-hidden bg-deep-forest pt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/sbl-project-photo-08.webp"
            alt="White ranch house with daytime hedge and bed work by Southern Buck Lawn"
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
              Yards Worth <span className="text-safety-orange">Showing Off.</span>
            </h1>
            <p className="max-w-xl font-archivo text-lg leading-relaxed text-white/85 sm:text-xl">
              Weekly mowing, weed control, hedge trimming, and bed work from a shop on Brett Drive. I run Walker, Denham Springs, and Watson. Your yard gets me, on the same day, every week.
            </p>
            <div className="inline-flex items-center gap-4 rounded-full border border-white/15 bg-black/25 p-2.5 pr-6 backdrop-blur-sm">
              <Image
                src="/images/michael-dantone-southern-buck-lawn-walker.webp"
                alt="Michael Dantone, owner of Southern Buck Lawn in Walker, Louisiana"
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
                Get a Free Quote <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/55 bg-white/10 px-8 py-4 font-anton text-lg uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <PhoneCall className="h-5 w-5" /> {SITE.phone}
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 font-archivo text-sm font-semibold text-white/85">
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange" /> Free estimates</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange" /> Insured (GL)</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange" /> Satisfaction guaranteed</span>
            </div>
          </div>
        </div>
      </header>
      <section className="bg-safety-orange py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-x-4 gap-y-1 px-4 text-center sm:flex-row sm:px-6 lg:px-8">
          <span className="font-anton text-2xl uppercase tracking-wide text-midnight-moss sm:text-3xl">Free estimates &middot; 24-hour callback</span>
          <span className="font-archivo text-base font-semibold text-midnight-moss">New customers welcome &mdash; same day every week, owner on the job.</span>
        </div>
      </section>
      <section className="border-b border-cream-line bg-cream py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: <ShieldCheck className="h-7 w-7" />, t: 'Insured', s: 'General liability' },
            { icon: <Award className="h-7 w-7" />, t: 'Owner-Operated', s: 'Since June 2024' },
            { icon: <PhoneCall className="h-7 w-7" />, t: '24-Hour Callback', s: 'I answer fast' },
            { icon: <MapPin className="h-7 w-7" />, t: 'Local & Hometown', s: 'Based in Walker, LA' },
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
      <section id="services" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-caveat text-3xl font-bold text-safety-orange-deep">What I do</p>
            <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">Services That Keep Your Place Sharp</h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
          </div>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-cream-line bg-cream shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 23vw" quality={60} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-moss/55 to-transparent" />
                  <div className="absolute bottom-3 left-4 inline-flex rounded-xl bg-cream/95 p-3 text-primary shadow">{serviceIcons[s.slug]}</div>
                </div>
                <div className="flex grow flex-col p-6">
                  <h3 className="font-anton text-xl uppercase leading-tight text-midnight-moss">{s.title}</h3>
                  <p className="mt-2 grow font-archivo text-base text-bark">{s.quickSummary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-archivo text-sm font-extrabold uppercase tracking-wide text-safety-orange-deep transition-all group-hover:gap-3">
                    See service details <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-midnight-moss py-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="font-caveat text-3xl font-bold text-sage">For property managers and HOA boards</p>
            <h2 className="mt-1 font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">One Operator. One Schedule. No Chasing Contractors.</h2>
            <p className="mt-4 max-w-3xl font-archivo text-lg leading-relaxed text-white/80">
              I maintain office grounds, retail frontage, entrances, and common areas on the Walker, Denham Springs, and Watson route. Bid packages include a clear scope, a service schedule, insurance paperwork, and one person to call.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/quote?property=Commercial&utm_source=website&utm_medium=internal&utm_campaign=commercial_bid" className="inline-flex items-center justify-center gap-2 rounded-xl bg-safety-orange px-7 py-4 font-anton text-lg uppercase tracking-wide text-midnight-moss shadow-lg transition-transform hover:scale-105">
              Request a Site Walk <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/services/commercial-grounds" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3.5 font-archivo font-bold text-white hover:bg-white/10">
              Commercial capabilities
            </Link>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-deep-forest">
        <Image
          src="/images/sbl-project-photo-10.webp"
          alt="White ranch house with daytime hedge and bed work, another frame of the same Southern Buck Lawn job"
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
      <section id="work" className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Job photos</p>
            <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">Work From the Route</h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
            <p className="mx-auto mt-4 max-w-2xl font-archivo text-lg text-bark">
              Lighting, a commercial palm job, the owner on site, and the work trailer. Captions match the files. Dedicated Walker, Denham, and Watson yard shots still need to be added.
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
        </div>
      </section>
      <section id="about" className="bg-primary py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="flex-none">
            <div className="flex h-60 w-60 items-center justify-center rounded-3xl bg-forest-dark shadow-2xl sm:h-72 sm:w-72">
              <Image
                src="/images/southern-buck-lawn-buck-mascot.webp"
                alt="Southern Buck Lawn deer mascot in overalls"
                width={300}
                height={300}
                className="h-52 w-52 object-contain sm:h-60 sm:w-60"
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-caveat text-3xl font-bold text-sage">Why folks call me back</p>
            <h2 className="mt-1 font-anton text-4xl uppercase tracking-wide text-white sm:text-5xl">Meet the Buck Behind the Work</h2>
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
            <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">Walker, Denham Springs, and Watson</h2>
            <div className="h-1 w-24 rounded bg-safety-orange" />
            <p className="font-archivo text-lg text-bark">
              Those three towns are the weekly route. Pick yours to see how I handle the soil and the grass where you live. If you are a little off the corridor, ask &mdash; I will tell you if it fits.
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
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Lock in your spot</p>
          <h2 className="mt-1 font-anton text-4xl uppercase leading-tight tracking-wide text-midnight-moss sm:text-5xl">Ready for a Yard You&rsquo;re Proud Of?</h2>
          <p className="mx-auto mt-4 max-w-2xl font-archivo text-lg text-bark">
            Free estimate, 24-hour callback, no pressure. Call or text and I will come look at it.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/quote" className="group flex items-center justify-center gap-2 rounded-xl bg-safety-orange px-8 py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-xl transition-all hover:scale-105 active:scale-95">
              Get My Free Quote <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={SITE.phoneHref} className="flex items-center justify-center gap-3 rounded-xl bg-midnight-moss px-8 py-4 font-anton text-lg uppercase tracking-wider text-white shadow-xl transition-transform hover:scale-105">
              <PhoneCall className="h-5 w-5 text-safety-orange" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
