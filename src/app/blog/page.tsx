import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { POSTS } from '@/data/blog';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Lawn Care Tips & Louisiana Yard Advice | Southern Buck Lawn Blog',
  description:
    'Straight talk on lawn care, weeds, mulch, and landscaping for South Louisiana yards. Real advice from Southern Buck Lawn in Walker, LA.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [featured, ...rest] = posts;

  return (
    <>
      <header className="bg-midnight-moss px-4 pb-14 pt-32 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto mb-5 flex max-w-3xl justify-center">
          <Breadcrumbs trail={[{ name: 'Blog', href: '/blog' }]} />
        </div>
        <p className="mb-3 font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">From the field</p>
        <h1 className="font-anton text-4xl uppercase tracking-wide sm:text-5xl">Lawn Care Tips for Louisiana Yards</h1>
        <p className="mx-auto mt-4 max-w-2xl font-barlow text-lg text-white/75">
          Straight talk on grass, weeds, mulch, and curb appeal from a crew that works these yards every week. No filler, just what works in our heat and our soil.
        </p>
      </header>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-12 grid overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all hover:shadow-xl lg:grid-cols-2"
          >
            <div className="relative h-64 lg:h-auto">
              <Image src={featured.heroImage} alt={featured.heroAlt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" quality={60} priority />
            </div>
            <div className="flex flex-col justify-center space-y-3 p-8">
              <span className="font-barlow text-sm font-bold uppercase tracking-wide text-safety-orange-deep">Latest post</span>
              <h2 className="font-anton text-3xl uppercase leading-tight text-primary">{featured.title}</h2>
              <p className="font-barlow text-lg text-gray-600">{featured.excerpt}</p>
              <div className="flex items-center gap-4 font-barlow text-sm text-gray-500">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {featured.dateLabel}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {featured.readMinutes} min read</span>
              </div>
              <span className="inline-flex items-center gap-2 font-barlow font-extrabold uppercase text-primary transition-all group-hover:gap-3 group-hover:text-safety-orange-deep">
                Read it <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-48">
                    <Image src={p.heroImage} alt={p.heroAlt} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" quality={60} />
                  </div>
                  <div className="flex grow flex-col space-y-2 p-6">
                    <h2 className="font-anton text-xl uppercase leading-tight text-primary">{p.title}</h2>
                    <p className="grow font-barlow text-base text-gray-600">{p.excerpt}</p>
                    <div className="flex items-center gap-3 font-barlow text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {p.dateLabel}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.readMinutes} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-safety-orange py-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 lg:flex-row lg:text-left lg:px-8">
          <h2 className="font-anton text-3xl uppercase text-midnight-moss">Rather Skip the Yard Work?</h2>
          <Link href="/quote" className="whitespace-nowrap rounded-lg bg-midnight-moss px-8 py-4 font-anton text-lg uppercase tracking-wider text-white shadow-xl transition-transform hover:scale-105">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
