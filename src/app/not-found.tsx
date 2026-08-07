import type { Metadata } from 'next';
import Link from 'next/link';
import { PhoneCall, ArrowRight } from 'lucide-react';
import { SITE, SERVICE_NAV, AREA_NAV } from '@/data/site';

export const metadata: Metadata = {
  title: 'Page Not Found | Southern Buck Lawn',
  description:
    'The page you were looking for could not be found. Browse our lawn care services or contact Southern Buck Lawn in Walker, LA.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <header className="bg-midnight-moss px-4 pb-16 pt-32 text-center text-white sm:px-6 lg:px-8">
        <p className="mb-3 font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">
          404 – Page Not Found
        </p>
        <h1 className="mx-auto max-w-3xl font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
          We Couldn&apos;t Find That Page
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-barlow text-lg text-white/75">
          The link you followed may have moved or been removed. Use the options below to get back on
          track, or give us a call.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-safety-orange px-7 py-3.5 font-anton uppercase tracking-wider text-midnight-moss shadow-lg transition-transform hover:scale-105"
          >
            Go to Home
          </Link>
          <Link
            href="/quote"
            className="flex items-center gap-2 rounded-lg border border-white/30 bg-deep-forest px-7 py-3.5 font-anton uppercase tracking-wider text-white hover:bg-primary"
          >
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 font-anton uppercase tracking-wider text-white hover:bg-white/10"
          >
            <PhoneCall className="h-4 w-4" /> {SITE.phone}
          </a>
        </div>
      </header>

      <section className="bg-surface py-16">
        <div className="mx-auto grid max-w-4xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div>
            <h2 className="font-anton text-xl uppercase text-primary">Our Services</h2>
            <ul className="mt-4 space-y-2">
              {SERVICE_NAV.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="font-barlow text-base text-gray-600 hover:text-safety-orange-deep"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-anton text-xl uppercase text-primary">Service Areas</h2>
            <ul className="mt-4 space-y-2">
              {AREA_NAV.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="font-barlow text-base text-gray-600 hover:text-safety-orange-deep"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
