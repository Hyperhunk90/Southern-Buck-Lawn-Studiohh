import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PhoneCall, MapPin, Check } from 'lucide-react';
import { SITE, AREA_NAV, SERVICE_NAV } from '@/data/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Michael Dantone in Walker, LA',
  description:
    'Southern Buck Lawn is owner-operated by Michael Dantone since 2013 from 28790 Brett Dr in Walker, Louisiana. Walker, Denham Springs, and Watson. Call (225) 369-4434.',
  alternates: { canonical: '/about' },
  openGraph: { url: `${SITE.url}/about` },
};

const facts = [
  'Owner-operated since 2013',
  'Based at 28790 Brett Dr, Walker, LA 70785',
  'Home turf: Walker, Denham Springs, and Watson',
  'One operator — you get Michael',
  'Insured (general liability)',
  'Free estimates, 24-hour callback',
];

export default function AboutPage() {
  return (
    <>
      <header className="bg-midnight-moss px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs trail={[{ name: 'About', href: '/about' }]} />
          <p className="mt-5 font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">Walker, Louisiana</p>
          <h1 className="mt-3 font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
            A Walker Lawn Shop, Not a Franchise
          </h1>
          <p className="mt-5 max-w-2xl font-barlow text-lg text-white/80">
            I&rsquo;m Michael Dantone. I have run Southern Buck Lawn from Brett Drive since 2013. When you call, you get me.
          </p>
        </div>
      </header>

      <section className="bg-surface py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
            <Image
              src="/images/michael-dantone-owner.webp"
              alt="Headshot of Michael Dantone, owner of Southern Buck Lawn, in a company polo."
              width={1400}
              height={1400}
              sizes="(max-width: 1024px) 90vw, 540px"
              quality={75}
              className="h-auto w-full object-cover object-top"
              priority
            />
          </div>
          <div className="space-y-5">
            <p className="font-caveat text-3xl font-bold text-safety-orange-deep">The Landscape Mayor</p>
            <h2 className="font-anton text-3xl uppercase text-primary">How this shop works</h2>
            <p className="font-barlow text-lg leading-relaxed text-gray-700">
              Folks around Walker started calling me the Landscape Mayor. It stuck because I am on these streets every week, not because a marketing firm wrote it. This is a sole proprietorship, owner-operated since 2013. I quote the jobs, I do the work, and I stand behind the cut.
            </p>
            <p className="font-barlow text-lg leading-relaxed text-gray-700">
              I mow, edge, treat weeds, rebuild beds, and keep commercial grounds on a set schedule. Lighting and winter-secure / property-preservation work when the job is a real fit &mdash; that is where 13 years of industrial electrical belongs, not as a horticulture license. I do not hold a landscape horticulture license. I do not run a pricing menu on the site because every lot is different. You get a number after I look at it. General liability insurance is in place.
            </p>
            <ul className="space-y-3">
              {facts.map((item) => (
                <li key={item} className="flex items-start gap-3 font-barlow text-lg text-gray-700">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-safety-orange" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-anton text-3xl uppercase text-primary">Where I actually run</h2>
          <p className="mt-4 max-w-3xl font-barlow text-lg text-gray-700">
            Home turf is Walker 70785, Denham Springs 70726, and Watson 70786. Livingston Parish lots on that corridor are fair game. Baton Rouge and Gonzales are not home turf. If your property is off the weekly route, say so on the quote form and I will tell you whether I can keep it.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {AREA_NAV.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center justify-between rounded-xl border border-primary/10 bg-white px-5 py-4 font-anton text-lg uppercase text-midnight-moss shadow-sm hover:border-safety-orange"
              >
                {a.label} <ArrowRight className="h-5 w-5 text-safety-orange" />
              </Link>
            ))}
          </div>
          <h2 className="mt-12 font-anton text-3xl uppercase text-primary">What I do</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SERVICE_NAV.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center justify-between rounded-xl border border-primary/10 bg-white px-5 py-4 font-anton text-base uppercase text-midnight-moss shadow-sm hover:border-safety-orange"
              >
                {s.label} <ArrowRight className="h-5 w-5 text-safety-orange" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-safety-orange py-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 lg:flex-row lg:text-left lg:px-8">
          <div>
            <h2 className="font-anton text-3xl uppercase text-midnight-moss">Based in Walker. Call or get a quote.</h2>
            <p className="mt-2 flex items-center justify-center gap-2 font-barlow text-lg text-midnight-moss lg:justify-start">
              <MapPin className="h-5 w-5" /> {SITE.street}, {SITE.city}, {SITE.region} {SITE.postalCode}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="rounded-lg bg-midnight-moss px-7 py-4 font-anton uppercase tracking-wider text-white shadow-lg">
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
