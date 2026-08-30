import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lightbulb,
  Trees,
  ShieldCheck,
  Sofa,
  Sparkles,
  BadgeCheck,
  Wrench,
  PiggyBank,
  ArrowRight,
  Star,
} from 'lucide-react';
import { SITE } from '@/data/site';
import { REVIEWS } from '@/data/reviews';

export const metadata: Metadata = {
  title: 'Outdoor Landscape Lighting in Walker, Denham Springs & Watson',
  description:
    'Custom outdoor landscape lighting from Southern Buck Lawn. Path lights, tree uplighting, and patio glow in Walker, Denham Springs, and Watson. Built with 13 years of industrial electrical background. Free estimate, 24-hour callback.',
  alternates: { canonical: '/landscape-lighting' },
  openGraph: {
    title: 'Outdoor Landscape Lighting',
    description:
      'Path lighting, tree uplighting, and patio lighting from the Walker shop. 13 years industrial electrical. Walker, Denham Springs, and Watson.',
    url: `${SITE.url}/landscape-lighting`,
    images: [{ url: '/images/sbl-project-photo-02.webp', alt: 'Brick house at dusk with path lights along the walk' }],
  },
};

const SERVICES = [
  {
    icon: Lightbulb,
    title: 'Path & Walkway Lighting',
    body: 'Light the way to your door. Low-voltage path lights that make your walk safe and your front yard glow after dark.',
  },
  {
    icon: Trees,
    title: 'Tree & Uplighting',
    body: 'Show off those live oaks and crape myrtles. Uplights wash your trees and the front of the house in warm light.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Flood Lights',
    body: 'Keep the place seen and safe. Bright, smart-timed flood lighting for driveways, side yards, and dark corners.',
  },
  {
    icon: Sofa,
    title: 'Patio & Outdoor Living',
    body: 'Use the yard after sundown. Soft lighting for patios, decks, and outdoor kitchens so the party keeps going.',
  },
];

const WHY = [
  { icon: Sparkles, label: 'Custom Design' },
  { icon: BadgeCheck, label: 'Insured (GL)' },
  { icon: Wrench, label: '13 Years Electrical' },
  { icon: PiggyBank, label: 'Free Estimates' },
];

export default function LandscapeLightingPage() {
  const reviews = REVIEWS.slice(0, 3);

  return (
    <div className="min-h-screen bg-surface font-barlow text-midnight-moss">
      <section className="relative overflow-hidden bg-midnight-moss text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/sbl-project-photo-02.webp"
            alt="Brick house at dusk with path lights along the walk, Southern Buck Lawn lighting work"
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
            quality={60}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-moss/95 via-midnight-moss/80 to-midnight-moss/50" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 sm:py-24 md:grid-cols-5">
          <div className="space-y-5 md:col-span-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-safety-orange px-4 py-1 font-barlow text-xs font-extrabold uppercase tracking-widest text-midnight-moss">
              <Lightbulb className="h-4 w-4" /> Pro-Grade Outdoor Lighting
            </p>
            <h1 className="font-anton text-4xl uppercase leading-[0.95] tracking-wide text-white sm:text-6xl">
              Outdoor <span className="text-safety-orange">Landscape</span> Lighting
            </h1>
            <p className="font-barlow text-xl italic text-white/85">Southern Care. The Landscape Mayor.</p>
            <p className="max-w-xl font-barlow text-lg text-white/80">
              Low-voltage path lights, architectural uplighting, and warm outdoor living glow. I install it with 13 years of industrial electrical background behind the work. Christmas lighting is not a live service on this site.
            </p>
            <div className="pt-2">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 rounded-full bg-safety-orange px-8 py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Get a Free Quote <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative hidden justify-center md:col-span-2 md:flex">
            <Image
              src="/images/southern-buck-lawn-mascot-waving.png"
              alt="Southern Buck Lawn deer mascot"
              width={320}
              height={600}
              priority
              className="h-auto max-h-[420px] w-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-deep-forest px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-anton text-3xl uppercase tracking-wide sm:text-4xl">Our Lighting Services</h2>
          <p className="mx-auto mt-2 max-w-xl text-center font-barlow text-white/85">
            One operator, one standard. I design it, install it, and stand behind it.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="flex flex-col items-center rounded-2xl bg-white/5 p-6 text-center backdrop-blur">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-safety-orange/20 text-safety-orange shadow-inner">
                  <s.icon className="h-8 w-8" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-anton text-lg uppercase leading-tight text-white">{s.title}</h3>
                <p className="mt-2 font-barlow text-sm text-white/80">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-4 py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-3xl border border-black/5 bg-white p-8 shadow-sm sm:grid-cols-5 sm:p-12">
          <div className="flex justify-center sm:col-span-2">
            <Image
              src="/images/southern-buck-lawn-mascot-waving.png"
              alt="Southern Buck Lawn, the Landscape Mayor"
              width={260}
              height={480}
              className="h-auto max-h-[280px] w-auto"
            />
          </div>
          <div className="sm:col-span-3 space-y-4">
            <h2 className="font-anton text-3xl uppercase text-deep-forest">Backed by 13 Years Electrical Precision</h2>
            <p className="font-barlow text-lg text-midnight-moss/80">
              I am Michael Dantone, owner of Southern Buck Lawn since 2013. With 13 years of industrial electrical background, I treat outdoor lighting installs with technical precision &mdash; watertight connections, balanced circuits, and fixtures that last in this humidity. That electrical work is not a landscape horticulture license. If a lighting install is not a fit, I will tell you that up front.
            </p>

            <h3 className="pt-2 font-anton text-xl uppercase text-deep-forest">Why Choose Us</h3>
            <div className="grid grid-cols-2 gap-4">
              {WHY.map((w) => (
                <div key={w.label} className="flex items-center gap-2">
                  <w.icon className="h-5 w-5 flex-shrink-0 text-safety-orange" />
                  <span className="font-barlow font-semibold text-midnight-moss">{w.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist-green px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-anton text-3xl uppercase text-deep-forest">Customer Feedback</h2>
          <p className="mt-2 text-center font-barlow text-midnight-moss/70">Real Google reviews from property owners. Family reviews are not shown here.</p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure
                key={r.author}
                className="flex flex-col justify-between rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex gap-1 text-safety-orange">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-safety-orange" />
                    ))}
                  </div>
                  <blockquote className="mt-4 font-barlow text-midnight-moss/85">&ldquo;{r.text}&rdquo;</blockquote>
                </div>
                <figcaption className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                  <span className="font-anton text-base uppercase tracking-wide text-deep-forest">{r.author}</span>
                  <span className="font-barlow text-xs uppercase tracking-wider text-gray-500">{r.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midnight-moss px-4 py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-anton text-3xl uppercase text-white sm:text-4xl">Ready to Transform Your Nighttime Curb Appeal?</h2>
            <p className="mt-2 font-barlow text-lg text-white/80">Free estimate, fast response. I quote after I look at it.</p>
          </div>
          <Link
            href="/quote"
            className="whitespace-nowrap rounded-full bg-safety-orange px-10 py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-xl transition-transform hover:scale-105"
          >
            Request Free Estimate
          </Link>
        </div>
      </section>
    </div>
  );
}
