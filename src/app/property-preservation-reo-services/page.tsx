import type { Metadata } from 'next';
import { ShieldCheck, Camera, Trash2 } from 'lucide-react';
import ReoForm from './ReoForm';
import ReoHeroContent from './ReoHeroContent';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Property Preservation & REO Trash-Outs in Walker, LA | Southern Buck Lawn',
  description:
    'Need reliable property preservation and REO debris removal in Walker or Denham Springs? Southern Buck Lawn handles the dirty work. Fully insured and ready to haul.',
  alternates: {
    canonical: 'https://southernbucklawn.com/property-preservation-reo-services',
  },
  openGraph: {
    url: 'https://southernbucklawn.com/property-preservation-reo-services',
  },
};

export default function PropertyPreservationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-light-tan">
      <main className="flex-grow pt-20 sm:pt-24">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-midnight-moss px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-midnight-moss via-deep-forest to-midnight-moss" />

          <ReoHeroContent />
        </section>

        {/* SERVICES SECTION */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-3xl">
              <h2 className="mb-6 font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">
                What We Do
              </h2>
              <p className="font-barlow text-lg text-gray-700 sm:text-xl">
                Let's shoot straight: we've seen it all, and frankly, it takes a whole lot to scare us off a property. Whether the previous tenants left it broom-clean or it looks like a bomb went off in the living room, we get it show-ready.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Service 1 */}
              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <Trash2 className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Total Trash-Outs & Debris Removal
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  From a couple of old mattresses to "how did they even fit this much junk in a three-bedroom house?" we haul it off and sweep it clean.
                </p>
              </div>

              {/* Service 2 */}
              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22 22 2"/><path d="m14 2 8 8"/><path d="M22 22 2 2"/><path d="m2 14 8 8"/><path d="m14 22-8-8"/><path d="M12 22v-8"/><path d="M12 10V2"/></svg>
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Lawn & Yard Maintenance
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  An overgrown weed jungle doesn't sell a house. We bring our meticulous, premium lawn care standards to your REO properties so they stand out for the right reasons.
                </p>
              </div>

              {/* Service 3 */}
              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Initial Securing & Board-Ups
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  We lock it down. We'll rekey the doors, board up the busted windows, and keep the weather (and the local wildlife) on the outside where they belong.
                </p>
              </div>

              {/* Service 4 */}
              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <Camera className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Bulletproof Photo Documentation
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  We know the drill. If there ain't a picture, it didn't happen. We provide crisp, detailed before, during, and after photos from every angle so you can close out your work orders and keep the process moving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US & LEAD FORM */}
        <section id="lead-form" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-20">
              
              {/* Text Side */}
              <div>
                <h2 className="mb-6 font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">
                  Why Partner with Southern Buck Lawn?
                </h2>
                <div className="space-y-6 font-barlow text-lg text-gray-700 sm:text-xl">
                  <p>
                    We aren't some fly-by-night guys working out of the back of a rusty sedan. We are a legitimate, fully insured operation based right here in Walker, Louisiana, on the Walker, Denham Springs, and Watson route.
                  </p>
                  <p>
                    We run our business the old-fashioned way: we answer the phone, we do exactly what we say we're gonna do, and we don't cut corners. Period. When you assign a property to us, you can cross it off your worry list.
                  </p>
                </div>

                <div className="mt-12 rounded-xl bg-white p-8 shadow-sm">
                  <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                    Let's Get to Work
                  </h3>
                  <p className="font-barlow text-base text-gray-700">
                    Stop wasting time chasing down unreliable contractors. Drop your details in the form, or if you already have a scope of work ready to rock, email it directly to{' '}
                    <a href={SITE.emailHref} className="font-bold text-safety-orange hover:underline">
                      {SITE.email}
                    </a>{' '}
                    and we'll get you on the schedule.
                  </p>
                </div>
              </div>

              {/* Form Side */}
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
