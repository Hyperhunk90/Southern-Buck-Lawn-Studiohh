import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneCall, ArrowRight } from 'lucide-react';
import { SITE, SERVICE_NAV, AREA_NAV } from '@/data/site';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'That page is gone. Browse lawn care services or call Southern Buck Lawn in Walker, LA.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <header className="bg-midnight-moss px-4 pb-16 pt-32 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-md overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/images/sbl-project-photo-03.webp"
            alt="Southern Buck Lawn 404 — that page is not here"
            width={800}
            height={600}
            sizes="(max-width: 768px) 90vw, 448px"
            quality={60}
            className="h-48 w-full object-cover"
          />
        </div>
        <p className="mb-3 font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">
          404 – Page Not Found
        </p>
        <h1 className="mx-auto max-w-3xl font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
          We Couldn&apos;t Find That Page
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-barlow text-lg text-white/75">
          The link you followed may have moved or been removed. Use the options below to get back on
          track, or give me a call.
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
