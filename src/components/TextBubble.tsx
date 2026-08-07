'use client';

import Link from 'next/link';
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react';
import { SITE } from '@/data/site';

// Opens the device SMS app pre-addressed to the business number.
// Works on iPhone and Android.
const SMS_HREF = `sms:${SITE.phoneHref.replace('tel:', '')}`;

export default function TextBubble() {
  return (
    <>
      {/* Mobile: always-visible sticky action bar (Call / Text / Quote).
          The biggest lead-driver for a home-services business is a one-tap
          call, so it leads. A spacer in SiteChrome keeps it off the footer. */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-white/10 bg-midnight-moss/95 backdrop-blur-md sm:hidden">
        <a
          href={SITE.phoneHref}
          aria-label={`Call Southern Buck Lawn at ${SITE.phone}`}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-white active:bg-primary/40"
        >
          <Phone className="h-5 w-5 text-safety-orange" />
          <span className="font-anton text-xs uppercase tracking-wide">Call</span>
        </a>
        <a
          href={SMS_HREF}
          aria-label="Text Southern Buck Lawn"
          className="flex flex-col items-center justify-center gap-0.5 border-x border-white/10 py-2.5 text-white active:bg-primary/40"
        >
          <MessageCircle className="h-5 w-5 text-safety-orange" />
          <span className="font-anton text-xs uppercase tracking-wide">Text</span>
        </a>
        <Link
          href="/quote"
          aria-label="Get a free quote"
          className="flex flex-col items-center justify-center gap-0.5 bg-safety-orange py-2.5 text-midnight-moss active:bg-safety-orange-deep"
        >
          <CalendarCheck className="h-5 w-5" />
          <span className="font-anton text-xs uppercase tracking-wide">Free Quote</span>
        </Link>
      </div>

      {/* Desktop: floating text bubble */}
      <a
        href={SMS_HREF}
        className="group fixed bottom-6 right-6 z-50 hidden items-center gap-0 rounded-full bg-safety-orange py-3 pl-3 pr-3 shadow-2xl ring-4 ring-white/30 transition-all hover:gap-2 hover:pr-5 active:scale-95 sm:flex"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-midnight-moss text-safety-orange">
          <MessageCircle className="h-6 w-6" />
        </span>
        <span className="flex max-w-0 flex-col overflow-hidden whitespace-nowrap leading-tight text-midnight-moss transition-all duration-300 group-hover:max-w-[160px]">
          <span className="font-anton text-sm uppercase tracking-wide">Text Us</span>
          <span className="font-barlow text-xs font-bold uppercase">Fast Response</span>
        </span>
      </a>
    </>
  );
}
