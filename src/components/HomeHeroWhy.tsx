'use client';
import Link from 'next/link';
import {
  ArrowRight, Check,
} from 'lucide-react';

export default function HomeHeroWhy() {
  return (
    <>
    <section className="bg-midnight-moss py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-caveat text-3xl font-bold text-sage">Why folks call me back</p>
          <h2 className="mt-1 font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">Detailed Work for People Who Notice the Difference</h2>
          <p className="mt-4 font-archivo text-lg leading-relaxed text-white/80">
            Rushed service leaves missed edges, inconsistent results, and more work later. I focus on presentation, clear communication, and service that respects the value of your property — whether that is a front lawn you are proud of or a commercial entrance that has to look open for business.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Detailed service instead of a rushed route cut',
            'Reliable recurring maintenance on a set day',
            'Residential and commercial property experience',
            'Landscape lighting with an electrical background',
            'Property preservation support for real estate pros',
            'Local route density in Walker, Denham Springs, and Watson',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 font-archivo text-base font-semibold text-white">
              <Check className="mt-1 h-5 w-5 flex-none text-safety-orange" /> {item}
            </li>
          ))}
        </ul>
        <Link href="/quote" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-safety-orange px-7 py-4 font-anton text-lg uppercase tracking-wide text-midnight-moss shadow-lg transition-transform hover:scale-105">
          Request a Free Estimate <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
    </>
  );
}
