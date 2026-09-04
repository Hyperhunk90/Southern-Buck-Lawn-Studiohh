import type { Metadata } from 'next';
import { ShieldCheck, Camera, Trash2 } from 'lucide-react';
import ReoForm from './ReoForm';
import ReoHeroContent from './ReoHeroContent';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Property Preservation & REO Trash-Outs in Walker, LA',
  description:
    'Property preservation, REO debris removal, and winter-secure work from Walker. Southern Buck Lawn. Insured, owner-operated since June 2024. Walker, Denham Springs, and Watson. Free estimate.',
  alternates: { canonical: '/property-preservation-reo-services' },
  openGraph: {
    title: 'Property Preservation & REO Trash-Outs in Walker, LA',
    description:
      'Trash-outs, yard recovery, board-ups, and photo documentation for banks, brokers, and asset managers on the Walker route.',
    url: `${SITE.url}/property-preservation-reo-services`,
  },
};

export default function PropertyPreservationPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}/property-preservation-reo-services#service`,
    name: 'Property Preservation & REO Services',
    serviceType: 'Property preservation, REO trash-out, winter-secure, and photo documentation',
    description:
      'Property preservation, REO debris removal, yard recovery, board-ups, winter-secure work, and photo documentation for Walker, Denham Springs, Watson, and Livingston Parish.',
    url: `${SITE.url}/property-preservation-reo-services`,
    provider: { '@id': `${SITE.url}/#business` },
    areaServed: [
      ...SITE.serviceAreas.map((a) => ({ '@type': 'City', name: a, addressRegion: 'LA' })),
      { '@type': 'AdministrativeArea', name: 'Livingston Parish' },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-light-tan">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <main className="flex-grow pt-20 sm:pt-24">
        <section className="relative overflow-hidden bg-midnight-moss px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-midnight-moss via-midnight-moss to-deep-forest" />
          <ReoHeroContent />
        </section>

        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-3xl">
              <h2 className="mb-6 font-anton text-4xl uppercase tracking-wide text-midnight-moss sm:text-5xl">
                What I Handle on Preserved Properties
              </h2>
              <p className="font-barlow text-lg text-gray-700 sm:text-xl">
                Let&apos;s shoot straight: I have seen it all, and it takes a lot to scare me off a property. Whether the last tenants left it broom-clean or it looks like a bomb went off in the living room, I get it show-ready — with photos that prove the work.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <Trash2 className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Trash-Outs &amp; Debris Removal
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  From a couple of old mattresses to a three-bedroom packed floor to ceiling — I haul it off and sweep it clean.
                </p>
              </div>

              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22 22 2"/><path d="m14 2 8 8"/><path d="M22 22 2 2"/><path d="m2 14 8 8"/><path d="m14 22-8-8"/><path d="M12 22v-8"/><path d="M12 10V2"/></svg>
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Lawn &amp; Yard Recovery
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  An overgrown weed jungle does not sell a house. I bring the same cut-and-edge standard to REO properties so they stand out for the right reasons.
                </p>
              </div>

              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Winter-Secure, Board-Ups &amp; Lockdown
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  I rekey doors, board busted windows, and winter-secure the property so weather stays out. Thirteen years of industrial electrical background is what I bring to that work — not a landscape horticulture license.
                </p>
              </div>

              <div className="group rounded-2xl bg-light-tan p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-midnight-moss text-safety-orange">
                  <Camera className="h-8 w-8" />
                </div>
                <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                  Photo Documentation
                </h3>
                <p className="font-barlow text-base text-gray-700">
                  If there is not a picture, it did not happen. Before, during, and after photos from every angle so you can close out work orders.
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
                  Why Assign Work to Southern Buck Lawn
                </h2>
                <div className="space-y-6 font-barlow text-lg text-gray-700 sm:text-xl">
                  <p>
                    I am a sole prop, owner-operated since June 2024, with general liability insurance, based at 28790 Brett Dr in Walker. Home turf is Walker, Denham Springs, and Watson. I do not treat Baton Rouge as a home market.
                  </p>
                  <p>
                    I answer the phone, I do what I say I am going to do, and I do not cut corners. When you assign a property to me, you can cross it off your worry list.
                  </p>
                </div>

                <div className="mt-12 rounded-xl bg-white p-8 shadow-sm">
                  <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide text-midnight-moss">
                    Let&apos;s Get to Work
                  </h3>
                  <p className="font-barlow text-base text-gray-700">
                    Drop your details in the form, or if you already have a scope ready, email it to{' '}
                    <a href={SITE.emailHref} className="font-bold text-safety-orange hover:underline">
                      {SITE.email}
                    </a>{' '}
                    and I will get you on the schedule.
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
