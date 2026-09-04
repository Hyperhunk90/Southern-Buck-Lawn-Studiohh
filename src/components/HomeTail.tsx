'use client';
import Link from 'next/link';
import {
  PhoneCall, ArrowRight,
} from 'lucide-react';
import { SITE } from '@/data/site';

export default function HomeTail() {
  return (
    <>
    <section className="bg-midnight-moss py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-caveat text-3xl font-bold text-sage">Ready when you are</p>
        <h2 className="mt-1 font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">Let&rsquo;s Get Your Property Looking Its Best</h2>
        <p className="mx-auto mt-4 max-w-2xl font-archivo text-lg text-white/80">
          Whether you need dependable weekly lawn care, a landscape refresh, outdoor lighting, commercial maintenance, or property preservation support, the first step is simple. Tell me what the property needs and I will help you pick the right next move.
        </p>
        <p className="mx-auto mt-3 font-archivo text-sm font-semibold uppercase tracking-wider text-sage">
          Serving homeowners, businesses, and property professionals in Walker, Denham Springs, and Watson.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/quote" className="group flex items-center justify-center gap-2 rounded-xl bg-safety-orange px-8 py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-xl transition-all hover:scale-105 active:scale-95">
            Request Your Free Estimate <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={SITE.phoneHref} className="flex items-center justify-center gap-3 rounded-xl border-2 border-white/40 px-8 py-4 font-anton text-lg uppercase tracking-wider text-white transition-transform hover:scale-105">
            <PhoneCall className="h-5 w-5 text-safety-orange" /> {SITE.phone}
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
