'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { serviceIcons, extraServices } from '@/data/homepage';

export default function HomeServices() {
  return (
    <>
    <section id="services" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-caveat text-3xl font-bold text-safety-orange-deep">What I do</p>
          <h2 className="font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">Care for the Properties You Manage or Call Home</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-cream-line bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-44 overflow-hidden">
                <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 30vw" quality={60} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-moss/55 to-transparent" />
                <div className="absolute bottom-3 left-4 inline-flex rounded-xl bg-cream/95 p-3 text-primary shadow">{serviceIcons[s.slug]}</div>
              </div>
              <div className="flex grow flex-col p-6">
                <h3 className="font-anton text-xl uppercase leading-tight text-midnight-moss">{s.title}</h3>
                <p className="mt-2 grow font-archivo text-base text-bark">{s.quickSummary}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-archivo text-sm font-extrabold uppercase tracking-wide text-safety-orange-deep transition-all group-hover:gap-3">
                  Explore this service <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
          {extraServices.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-cream-line bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-44 overflow-hidden">
                <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 30vw" quality={60} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-moss/55 to-transparent" />
                <div className="absolute bottom-3 left-4 inline-flex rounded-xl bg-cream/95 p-3 text-primary shadow">{s.icon}</div>
              </div>
              <div className="flex grow flex-col p-6">
                <h3 className="font-anton text-xl uppercase leading-tight text-midnight-moss">{s.title}</h3>
                <p className="mt-2 grow font-archivo text-base text-bark">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-archivo text-sm font-extrabold uppercase tracking-wide text-safety-orange-deep transition-all group-hover:gap-3">
                  {s.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
