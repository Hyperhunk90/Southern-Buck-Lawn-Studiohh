import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck, Award, PhoneCall, MapPin, ArrowRight, Star, Check, Leaf, Scissors, Building2, Sprout,
} from 'lucide-react';
import { SITE, AREA_NAV } from '@/data/site';
import { SERVICES } from '@/data/services';
import { REVIEWS } from '@/data/reviews';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import ReviewBadgeBar from '@/components/ReviewBadgeBar';

const serviceIcons: Record<string, React.ReactNode> = {
  'lawn-mowing': <Scissors className="h-7 w-7" />,
  'weed-control': <Sprout className="h-7 w-7" />,
  'landscape-design': <Leaf className="h-7 w-7" />,
  'commercial-grounds': <Building2 className="h-7 w-7" />,
};

const gallery = [
  { src: '/images/lawn-mowing-stripes-backyard-walker-la.webp', alt: 'Bold mowing stripes across a Walker, Louisiana backyard with a shade tree in the middle, by Southern Buck Lawn', w: 563, h: 1000 },
  { src: '/images/commercial-lawn-stripes-rkm-baton-rouge.webp', alt: 'Crisp mowing stripes on the commercial lawn at the RKM location in Baton Rouge, maintained by Southern Buck Lawn', w: 1300, h: 720 },
  { src: '/images/commercial-wildflowers-rkm-headquarters-clinton-la.webp', alt: 'Wildflowers and manicured grounds at RKM headquarters in Clinton, Louisiana, kept up by Southern Buck Lawn', w: 1600, h: 900 },
  { src: '/images/black-mulch-install-before-after.webp', alt: 'Before and after black mulch install on a Louisiana front bed by Southern Buck Lawn', w: 1344, h: 768 },
  { src: '/images/flower-bed-mulch-transformation-before-after-louisiana.webp', alt: 'Three-stage flower bed transformation with black mulch and stone border by Southern Buck Lawn in Louisiana', w: 900, h: 1600 },
  { src: '/images/hedge-trimming-after.jpg', alt: 'Cleaned up hedge trimming and bed in Baton Rouge', w: 800, h: 1422 },
];

const buckPoints = [
  'Locally owned & operated',
  'Same crew, same day, every week',
  'Free, no-pressure estimates',
  'Licensed, insured & guaranteed',
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <header className="relative overflow-hidden bg-deep-forest pt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/southern-buck-hero-banner.svg"
            alt="Southern Buck Lawn graphic banner featuring SouthernCare mascot and lawn care services"
            fill
            priority
            sizes="100vw"
            quality={90}
            referrerPolicy="no-referrer"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Black overlay tint set to 40% opacity over the background to darken it */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/80 via-deep-forest/50 to-transparent pointer-events-none" />
        </div>

        <div 
          className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-cover bg-center"
          style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/southern-buck-hero-banner.svg')" }}
        >
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-sage/50 bg-safety-orange/20 px-4 py-1.5 font-archivo text-xs font-bold uppercase tracking-widest text-sage">
              <MapPin className="h-4 w-4" /> New customers &middot; Walker &middot; Denham Springs &middot; Baton Rouge
            </span>

            <p className="font-caveat text-3xl font-bold text-sage sm:text-4xl">Locally owned in Walker, Louisiana</p>

            <h1 className="font-anton text-5xl uppercase leading-[0.95] tracking-wide text-white sm:text-7xl">
              Yards Worth <span className="text-safety-orange">Showing Off.</span>
            </h1>

            <p className="max-w-xl font-archivo text-lg leading-relaxed text-white/85 sm:text-xl">
              Weekly mowing, weed control, hedge &amp; shrub trimming, and full landscape design across Walker, Denham Springs, and Greater Baton Rouge. We treat your yard like it&rsquo;s our own.
            </p>

            <div className="inline-flex items-center gap-4 rounded-full border border-white/15 bg-black/25 p-2.5 pr-6 backdrop-blur-sm">
              <Image
                src="/images/michael-dantone-southern-buck-lawn-walker.webp"
                alt="Michael Dantone, owner of Southern Buck Lawn in Walker, Louisiana"
                width={56}
                height={56}
                loading="eager"
                referrerPolicy="no-referrer"
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
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange" /> Licensed &amp; insured</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-safety-orange" /> Satisfaction guaranteed</span>
            </div>
          </div>
        </div>
      </header>

      {/* OFFER STRIP */}
      <section className="bg-safety-orange py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-x-4 gap-y-1 px-4 text-center sm:flex-row sm:px-6 lg:px-8">
          <span className="font-anton text-2xl uppercase tracking-wide text-midnight-moss sm:text-3xl">Free estimates &middot; 24-hour callback</span>
          <span className="font-archivo text-base font-semibold text-midnight-moss">New customers welcome &mdash; same crew, same day, every week.</span>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-cream-line bg-cream py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: <ShieldCheck className="h-7 w-7" />, t: 'Fully Licensed', s: 'Residential & commercial' },
            { icon: <Award className="h-7 w-7" />, t: 'Insured', s: 'Your property protected' },
            { icon: <PhoneCall className="h-7 w-7" />, t: '24-Hour Callback', s: 'We answer fast' },
            { icon: <MapPin className="h-7 w-7" />, t: 'Local & Hometown', s: 'Born and raised here' },
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

      {/* SERVICES */}
      <section id="services" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-caveat text-3xl font-bold text-safety-orange-deep">What we do</p>
            <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">Services That Keep Your Place Sharp</h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
          </div>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-cream-line bg-cream p-7 shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex w-fit rounded-2xl bg-leaf-tile p-3.5 text-primary">{serviceIcons[s.slug]}</div>
                <h3 className="font-anton text-xl uppercase leading-tight text-midnight-moss">{s.title}</h3>
                <p className="mt-2 grow font-archivo text-base text-bark">{s.quickSummary}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-archivo text-sm font-extrabold uppercase tracking-wide text-safety-orange-deep transition-all group-hover:gap-3">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF BAND — real results */}
      <section className="relative overflow-hidden bg-deep-forest">
        <Image
          src="/images/residential-backyard-lawn-mowing-stripes-louisiana.webp"
          alt="Freshly striped backyard lawn mowed by Southern Buck Lawn in Louisiana"
          fill
          sizes="100vw"
          quality={60}
          referrerPolicy="no-referrer"
          style={{ objectFit: 'cover', objectPosition: '50% 56%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/95 via-deep-forest/65 to-deep-forest/5" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="font-caveat text-3xl font-bold text-sage">Real results, real yards</p>
            <h2 className="mt-1 font-anton text-4xl uppercase leading-[0.98] tracking-wide text-white sm:text-5xl">
              Stripes That Show <br className="hidden sm:block" />From the Street
            </h2>
            <p className="mt-5 font-archivo text-lg leading-relaxed text-white/90">
              Clean lines, healthy turf, and a finish you&rsquo;ll be proud to pull up to. No stock photos and no filters &mdash; just real work from right here in Livingston Parish and Baton Rouge.
            </p>
          </div>
        </div>
      </section>

      {/* RECENT WORK */}
      <section id="work" className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Before &amp; after</p>
            <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">Recent Work Around Town</h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
            <p className="mx-auto mt-4 max-w-2xl font-archivo text-lg text-bark">
              Every photo here is real work from right here in Livingston Parish and Baton Rouge. No stock photos, no filters.
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
                  referrerPolicy="no-referrer"
                  className="h-72 w-full rounded-xl"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-xl bg-midnight-moss px-8 py-4 font-archivo text-base font-extrabold uppercase tracking-wide text-white shadow-lg transition-all hover:bg-safety-orange hover:text-midnight-moss hover:scale-105"
            >
              Explore Full Interactive Project Gallery &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT — Meet the Buck */}
      <section id="about" className="bg-primary py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="flex-none">
            <div className="flex h-60 w-60 items-center justify-center rounded-3xl bg-forest-dark shadow-2xl sm:h-72 sm:w-72">
              <Image
                src="/images/owner.webp"
                alt="Southern Buck Lawn owner"
                width={300}
                height={300}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover rounded-3xl"
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-caveat text-3xl font-bold text-sage">Why folks call us back</p>
            <h2 className="mt-1 font-anton text-4xl uppercase tracking-wide text-white sm:text-5xl">Meet the Buck Behind the Work</h2>
            <div className="mt-4 h-1 w-24 rounded bg-safety-orange" />
            <p className="mt-5 max-w-2xl font-archivo text-lg leading-relaxed text-white/90">
              I&rsquo;m Michael Dantone, and I run Southern Buck Lawn out of Walker. Folks around here call me the Landscape Mayor, and I earned it one yard at a time. We&rsquo;re a tight crew, not a franchise, so when you call, you get me or somebody I trained &mdash; a crew that shows up on time and leaves your yard looking better than they found it.
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
            <Link href="/quote" className="mt-8 inline-flex items-center gap-2 border-b-2 border-safety-orange font-archivo text-lg font-extrabold uppercase tracking-wide text-white transition-all hover:gap-3 hover:border-sage hover:text-sage">
              Schedule a free walk-through <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Where we work</p>
            <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">We Cover Your Corner of Louisiana</h2>
            <div className="h-1 w-24 rounded bg-safety-orange" />
            <p className="font-archivo text-lg text-bark">
              Pick your town to see how we handle the soil, the weeds, and the grass right where you live.
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

      {/* REVIEWS / SOCIAL PROOF */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="font-caveat text-3xl font-bold text-safety-orange-deep">What folks say</p>
            <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">We Earn It One Yard at a Time</h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* FINAL CTA */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-caveat text-3xl font-bold text-safety-orange-deep">Lock in your spot</p>
          <h2 className="mt-1 font-anton text-4xl uppercase leading-tight tracking-wide text-midnight-moss sm:text-5xl">Ready for a Yard You&rsquo;re Proud Of?</h2>
          <p className="mx-auto mt-4 max-w-2xl font-archivo text-lg text-bark">
            Free estimate, 24-hour callback, no pressure. Call or text for the best-looking yard on the street.
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
