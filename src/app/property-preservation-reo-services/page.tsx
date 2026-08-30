import type { Metadata } from 'next';
import { ShieldCheck, Camera, Trash2 } from 'lucide-react';
import ReoForm from './ReoForm';
import ReoHeroContent from './ReoHeroContent';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Property Preservation & REO Trash-Outs in Walker, LA',
  description:
    'Property preservation, REO debris removal, and winter-secure work from Walker. Southern Buck Lawn. Insured, owner-operated since 2013. Walker, Denham Springs, and Watson.',
  alternates: { canonical: '/property-preservation-reo-services' },
  openGraph: { url: `${SITE.url}/property-preservation-reo-services` },
};

export default function PropertyPreservationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-light-tan">
      <main className="flex-grow pt-20 sm:pt-24">
        <section className="relative overflow-hidden bg-midnight-moss px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-midnight-moss via-midnight-moss to-deep-forest" />

          <ReoHeroContent />
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-3xl">
              <h2 className="mb-6 font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">
                What We Do
              </h2>
              <p className="font-barlow text-lg text-gray-700 sm:text-xl">
                Let’s shoot straight: I’ve seen it all, and frankly, it takes a whole lot to scare me off a property. Whether the previous tenants left it broom-clean or it looks like a bomb went off in the living room, I get it show-ready.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <Trash2 className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Total Trash-Outs & Debris Removal
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  From a couple of old mattresses to "how did they even fit this much junk in a three-bedroom house?" I haul it off and sweep it clean.
                </p>
              </div>

              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22 22 2"/><path d="m14 2 8 8"/><path d="M22 22 2 2"/><path d="m2 14 8 8"/><path d="m14 22-8-8"/><path d="M12 22v-8"/><path d="M12 10V2"/></svg>
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Lawn & Yard Maintenance
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  An overgrown weed jungle doesn't sell a house. I bring the same weekly-cut standard to REO properties so they stand out for the right reasons.
                </p>
              </div>

              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Winter-Secure, Board-Ups & Lockdown
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  I lock it down. I rekey the doors, board up busted windows, and winter-secure the property so weather stays out. 13 years of industrial electrical background is what I bring to that work — not a landscape horticulture license.
                </p>
              </div>

              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <Camera className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Bulletproof Photo Documentation
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  I know the drill. If there ain't a picture, it didn't happen. I provide before, during, and after photos from every angle so you can close out work orders.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="lead-form" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-20">
              <div>
                <h2 className="mb-6 font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">
                  Why Partner with Southern Buck Lawn?
                </h2>
                <div className="space-y-6 font-barlow text-lg text-gray-700 sm:text-xl">
                  <p>
                    I am a sole prop, owner-operated since 2013, with general liability insurance, based at 28790 Brett Dr in Walker. Home turf is Walker, Denham Springs, and Watson. I do not treat Baton Rouge as a home market.
                  </p>
                  <p>
                    I run the business the old-fashioned way: I answer the phone, I do exactly what I say I'm gonna do, and I don't cut corners. Period. When you assign a property to me, you can cross it off your worry list.
                  </p>
                </div>

                <div className="mt-12 rounded-xl bg-white p-8 shadow-sm">
                  <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                    Let’s Get to Work
                  </h3>
                  <p className="font-barlow text-base text-gray-700">
                    Stop wasting time chasing down unreliable contractors. Drop your details in the form, or if you already have a scope of work ready to rock, email it directly to{' '}
                    <a href={SITE.emailHref} className="font-bold text-safety-orange hover:underline">
                      {SITE.email}
                    </a>{' '}
                    and I’ll get you on the schedule.
                  </p>
                </div>
              </div>

              <div className="lg:mt-0">
                <ReoForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
