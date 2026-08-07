import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  Lightbulb,
  Trees,
  ShieldCheck,
  Sofa,
  Sparkles,
  BadgeCheck,
  Wrench,
  PiggyBank,
  ArrowRight,
  PhoneCall,
  Star,
  Facebook,
} from 'lucide-react';
import { SITE } from '@/data/site';
import { REVIEWS } from '@/data/reviews';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';

export const metadata: Metadata = {
  title: 'Outdoor Landscape Lighting in Walker, Denham Springs & Baton Rouge | Southern Buck Lawn',
  description:
    'Custom outdoor landscape lighting from Southern Buck Lawn. Path lights, tree uplighting, security flood lights, and patio glow across Walker, Denham Springs, and Baton Rouge. Free estimate, 24-hour callback.',
  alternates: { canonical: '/landscape-lighting' },
  openGraph: {
    title: 'Outdoor Landscape Lighting | Southern Buck Lawn',
    description:
      'Light up your yard the right way. Path lighting, tree uplighting, security, and patio lighting across Livingston Parish and Baton Rouge.',
    url: `${SITE.url}/landscape-lighting`,
    images: [{ url: '/images/commercial-grounds-night-entrance-livingston-la.webp' }],
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
  { icon: BadgeCheck, label: 'Licensed & Insured' },
  { icon: Wrench, label: 'Pro-Grade Fixtures' },
  { icon: PiggyBank, label: 'Free Estimates' },
];

export default function LandscapeLightingPage() {
  const reviews = REVIEWS.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f5f1e6] font-barlow text-midnight-moss">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f5f1e6]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/southern-buck-lawn-logo.png" alt="Southern Buck Lawn logo" width={48} height={42} className="h-11 w-auto" />
            <span className="font-anton text-xl uppercase leading-none tracking-wide text-primary">
              Southern Buck<br />Lawn
            </span>
          </Link>
          <Link href="/" aria-label="Back to main site" className="rounded-lg p-2 text-primary hover:bg-black/5">
            <Menu className="h-7 w-7" />
          </Link>
        </div>
      </header>

      <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/commercial-grounds-night-entrance-livingston-la.webp"
            alt="Outdoor landscape lighting glowing at dusk on a Louisiana property by Southern Buck Lawn"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={60}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-moss/90 via-midnight-moss/70 to-midnight-moss/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#143a24]/80 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-4 px-4 pb-28 pt-12 sm:pb-32 md:grid-cols-5">
          <div className="space-y-5 md:col-span-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-safety-orange px-4 py-1 font-barlow text-xs font-extrabold uppercase tracking-widest text-midnight-moss">
              <Lightbulb className="h-4 w-4" /> New from Southern Buck Lawn
            </p>
            <h1 className="font-anton text-4xl uppercase leading-[0.95] tracking-wide text-white sm:text-6xl">
              Outdoor <span className="text-safety-orange">Landscape</span> Lighting
            </h1>
            <p className="font-barlow text-xl italic text-white/85">Southern Care. Your Landscape Mayor.</p>
            <p className="max-w-md font-barlow text-lg text-white/80">
              We make your yard look just as good at night as it does in the daytime. Warm, low-voltage lighting designed and installed right, built for Louisiana weather.
            </p>
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2 rounded-full bg-safety-orange px-8 py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Get a Free Quote <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative hidden justify-center md:col-span-2 md:flex">
            <Image
              src="/images/southern-buck-lawn-mascot-waving.png"
              alt="Southern Buck Lawn deer mascot waving"
              width={320}
              height={600}
              priority
              className="h-auto max-h-[440px] w-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* grass edge */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#2f6b34]" style={{ clipPath: 'polygon(0 60%, 3% 30%, 6% 60%, 9% 25%, 12% 60%, 15% 35%, 18% 60%, 21% 20%, 24% 60%, 27% 35%, 30% 60%, 33% 25%, 36% 60%, 39% 30%, 42% 60%, 45% 20%, 48% 60%, 51% 35%, 54% 60%, 57% 25%, 60% 60%, 63% 35%, 66% 60%, 69% 20%, 72% 60%, 75% 30%, 78% 60%, 81% 25%, 84% 60%, 87% 35%, 90% 60%, 93% 25%, 96% 60%, 99% 30%, 100% 60%, 100% 100%, 0 100%)' }} />
      </section>

      {/* SERVICES */}
      <section className="bg-[#2f6b34] px-4 py-14 text-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-anton text-3xl uppercase tracking-wide sm:text-4xl">Our Lighting Services</h2>
          <p className="mx-auto mt-2 max-w-xl text-center font-barlow text-white/85">
            One crew, one standard. We design it, install it, and stand behind it.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f5f1e6] shadow-lg">
                  <s.icon className="h-9 w-9 text-primary" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-anton text-lg uppercase leading-tight text-white">{s.title}</h3>
                <p className="mt-2 font-barlow text-sm text-white/85">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET YOUR MAYOR */}
      <section className="bg-[#f5f1e6] px-4 py-14">
        <div className="mx-auto grid max-w-5xl items-center gap-6 rounded-3xl bg-[#efe9d8] p-6 shadow-sm sm:grid-cols-5 sm:p-10">
          <div className="flex justify-center sm:col-span-2">
            <Image
              src="/images/southern-buck-lawn-mascot-waving.png"
              alt="Southern Buck Lawn deer mascot, the Landscape Mayor"
              width={260}
              height={480}
              className="h-auto max-h-[300px] w-auto"
            />
          </div>
          <div className="sm:col-span-3">
            <h2 className="font-anton text-3xl uppercase text-primary">Meet Your Mayor</h2>
            <p className="mt-3 font-barlow text-lg text-midnight-moss/80">
              I am Michael, the Landscape Mayor, and I look at every yard like it has my name on it, because it does. We treat your lighting like we treat our own place, done once and done right.
            </p>

            <h3 className="mt-7 font-anton text-2xl uppercase text-primary">Why Choose Us</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {WHY.map((w) => (
                <div key={w.label} className="flex items-center gap-2">
                  <w.icon className="h-6 w-6 flex-shrink-0 text-safety-orange" />
                  <span className="font-barlow font-semibold text-midnight-moss">{w.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-[#f5f1e6] px-4 pb-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-anton text-3xl uppercase text-primary">Happy Customers</h2>
          <p className="mt-2 text-center font-barlow text-midnight-moss/70">Real reviews from folks right here in the area.</p>
          <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4">
            {reviews.map((r) => (
              <figure
                key={r.author}
                className="flex w-[280px] flex-shrink-0 snap-start flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="flex gap-0.5 text-safety-orange">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-safety-orange" />
                  ))}
                </div>
                <blockquote className="mt-3 grow font-barlow text-midnight-moss/80">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-4 flex items-center justify-between">
                  <span className="font-anton text-base uppercase tracking-wide text-primary">{r.author}</span>
                  <span className="font-barlow text-xs uppercase tracking-wider text-gray-600">{r.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2f6b34] px-4 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-anton text-3xl uppercase text-white sm:text-4xl">Ready to Light Up Your Yard?</h2>
            <p className="mt-2 font-barlow text-lg text-white/80">Free estimate, 24-hour callback, no pressure.</p>
          </div>
          <Link
            href="/quote"
            className="whitespace-nowrap rounded-full bg-safety-orange px-10 py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-xl transition-transform hover:scale-105"
          >
            Request Estimate
          </Link>
        </div>
      </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-midnight-moss px-4 py-10 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <Image src="/images/southern-buck-lawn-logo.png" alt="Southern Buck Lawn" width={48} height={42} className="h-11 w-auto" />
            <span className="font-anton text-xl uppercase tracking-wide text-white">Southern Buck Lawn</span>
          </div>
          <div className="flex flex-col items-center gap-2 font-barlow">
            <a href={SITE.phoneHref} className="flex items-center gap-2 text-lg font-bold hover:text-safety-orange">
              <PhoneCall className="h-5 w-5 text-safety-orange" /> {SITE.phone}
            </a>
            <ObfuscatedEmail className="flex items-center gap-2 hover:text-safety-orange" iconClassName="h-5 w-5 text-safety-orange" />
            <p className="text-white/60">Serving Walker, Denham Springs, Baton Rouge &amp; Livingston Parish</p>
          </div>
          <div className="flex items-center gap-4">
            <a href={SITE.social.facebook} aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-safety-orange">
              <Facebook className="h-5 w-5" />
            </a>
            <Link href="/" className="flex h-10 items-center rounded-full bg-white/10 px-5 font-barlow text-sm font-bold uppercase tracking-wide transition-colors hover:bg-safety-orange">
              Main Site
            </Link>
          </div>
          <p className="font-barlow text-sm text-white/50">
            &copy; {new Date().getFullYear()} Southern Buck Lawn. All rights reserved. Licensed &amp; insured. Walker, Louisiana.
          </p>
        </div>
      </footer>

      {/* sticky mobile call bar */}
      <div className="sticky bottom-0 z-40 flex border-t border-black/10 bg-[#f5f1e6] md:hidden">
        <a href={SITE.phoneHref} className="flex flex-1 items-center justify-center gap-2 py-3 font-anton text-sm uppercase tracking-wide text-primary">
          <PhoneCall className="h-5 w-5" /> Call
        </a>
        <Link href="/quote" className="flex flex-1 items-center justify-center gap-2 bg-safety-orange py-3 font-anton text-sm uppercase tracking-wide text-midnight-moss">
          <Lightbulb className="h-5 w-5" /> Free Quote
        </Link>
      </div>
    </div>
  );
}
