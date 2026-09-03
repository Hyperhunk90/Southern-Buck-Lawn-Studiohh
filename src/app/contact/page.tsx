import type { Metadata } from 'next';
import { PhoneCall, MapPin, Clock } from 'lucide-react';
import { SITE } from '@/data/site';
import ContactForm from '@/components/ContactForm';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';
import ServiceAreaMap from '@/components/ServiceAreaMap';

export const metadata: Metadata = {
  title: 'Contact in Walker, LA',
  description:
    'Call, email, or message Southern Buck Lawn in Walker. Walker, Denham Springs, and Watson. (225) 369-4434 · sbl@southernbucklawn.com',
  alternates: { canonical: '/contact' },
  openGraph: { url: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <header className="bg-midnight-moss px-4 pb-14 pt-32 text-center text-white sm:px-6 lg:px-8">
        <p className="mb-3 font-barlow text-sm font-bold uppercase tracking-[0.3em] text-safety-orange">Get in touch</p>
        <h1 className="font-anton text-4xl uppercase tracking-wide sm:text-5xl">Contact Southern Buck Lawn</h1>
        <p className="mx-auto mt-4 max-w-2xl font-barlow text-lg text-white/75">
          Question, or ready to get on the schedule? Call, text, or send the form. I call back.
        </p>
      </header>

      <section className="bg-surface py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <a href={SITE.phoneHref} className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:border-safety-orange">
                <PhoneCall className="h-7 w-7 text-safety-orange" />
                <span className="font-anton text-lg uppercase text-midnight-moss">Call</span>
                <span className="font-barlow text-lg text-gray-600">{SITE.phone}</span>
              </a>
              <ObfuscatedEmail variant="card" className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:border-safety-orange" />
              <div className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                <MapPin className="h-7 w-7 text-safety-orange" />
                <span className="font-anton text-lg uppercase text-midnight-moss">Based In</span>
                <span className="font-barlow text-lg text-gray-600">{SITE.street}, {SITE.city}, {SITE.region} {SITE.postalCode}</span>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                <Clock className="h-7 w-7 text-safety-orange" />
                <span className="font-anton text-lg uppercase text-midnight-moss">Hours</span>
                <span className="font-barlow text-base text-gray-600">{SITE.hours.map(({ days, time }) => `${days} ${time}`).join(', ')}</span>
              </div>
            </div>
            <p className="font-barlow text-lg text-gray-600">
              Weekly route: Walker, Denham Springs, and Watson. Off that corridor? Ask first.
            </p>
            <ServiceAreaMap />
          </div>

          <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-lg sm:p-8">
            <h2 className="mb-5 font-anton text-2xl uppercase text-primary">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
