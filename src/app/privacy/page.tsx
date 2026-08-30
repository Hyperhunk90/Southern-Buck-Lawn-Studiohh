import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/data/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How Southern Buck Lawn uses the name, phone, email, and address you send on the quote and contact forms.',
  alternates: { canonical: '/privacy' },
  openGraph: { url: `${SITE.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="bg-midnight-moss px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs trail={[{ name: 'Privacy', href: '/privacy' }]} />
          <h1 className="mt-5 font-anton text-4xl uppercase tracking-wide sm:text-5xl">Privacy</h1>
          <p className="mt-4 font-barlow text-lg text-white/75">
            Short version: I use what you send to quote the job and call you back. That is it.
          </p>
        </div>
      </header>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 font-barlow text-lg leading-relaxed text-gray-700 sm:px-6">
          <p>
            Southern Buck Lawn is a sole proprietorship run by Michael Dantone at {SITE.street}, {SITE.city}, {SITE.region} {SITE.postalCode}. Quote and contact forms post to my lead inbox so I can call or email you about the work you asked for.
          </p>
          <p>
            I collect the name, phone, email, and address you type. I do not sell that information. I do not run a marketing list off these forms. I keep the message long enough to do the job and keep a record of what we agreed.
          </p>
          <p>
            The site uses Google Analytics to see which pages get visited. Forms also send through Resend so the message lands in my email. If you want a record removed, call or email me and I will handle it.
          </p>
          <p>
            Phone: <a className="font-bold text-primary underline decoration-safety-orange" href={SITE.phoneHref}>{SITE.phone}</a>
            {' · '}
            Email: {SITE.email}
          </p>
          <p>
            <Link href="/contact" className="font-bold text-primary underline decoration-safety-orange">Contact</Link>
            {' · '}
            <Link href="/quote" className="font-bold text-primary underline decoration-safety-orange">Get a quote</Link>
          </p>
        </div>
      </section>
    </>
  );
}
