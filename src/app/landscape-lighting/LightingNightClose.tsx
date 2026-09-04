'use client';

import Link from 'next/link';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Phone, ChevronDown } from 'lucide-react';
import { SITE } from '@/data/site';
import {
  AMBER,
  ASH,
  AUDIENCES,
  CHARCOAL,
  FAQS,
  GOLD,
  INK,
  WARM,
} from './lighting-content';

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-xl border" style={{ borderColor: ASH, background: CHARCOAL }}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium sm:text-base" style={{ color: WARM }}>
          {q}
        </span>
        <ChevronDown
          className="h-5 w-5 shrink-0 transition-transform"
          style={{ color: open ? AMBER : GOLD, transform: open ? 'rotate(180deg)' : undefined }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="overflow-hidden"
          >
            <p
              className="border-t px-4 pb-4 pt-3 text-sm leading-relaxed"
              style={{ borderColor: ASH, color: `${WARM}cc` }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LightingNightClose({
  openFaq,
  setOpenFaq,
  scrollToForm,
}: {
  openFaq: number | null;
  setOpenFaq: (v: number | null) => void;
  scrollToForm: () => void;
}) {
  return (
    <>
<section className="px-4 py-16" style={{ background: INK }}>
        <div className="mx-auto max-w-6xl">
          <h2
            className="text-[clamp(1.7rem,3vw,2.4rem)] font-semibold"
            style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
          >
            Built for the way you live after dark
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {AUDIENCES.map((item) => (
              <span
                key={item.label}
                className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]"
                style={{ borderColor: ASH, background: CHARCOAL, color: GOLD }}
              >
                {item.label}
              </span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {AUDIENCES.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border p-5"
                style={{ borderColor: ASH, background: CHARCOAL }}
              >
                <h3 className="text-base font-semibold" style={{ color: WARM }}>
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: `${WARM}bf` }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16" style={{ background: CHARCOAL }}>
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-[clamp(1.7rem,3vw,2.4rem)] font-semibold"
            style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
          >
            Questions Homeowners Usually Ask
          </h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((item, index) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                open={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14" style={{ background: INK }}>
        <div
          className="mx-auto max-w-5xl rounded-3xl border px-6 py-10 text-center sm:px-10"
          style={{
            borderColor: ASH,
            background: `linear-gradient(180deg, ${CHARCOAL} 0%, ${INK} 100%)`,
          }}
        >
          <div className="mx-auto mb-4 h-px w-24" style={{ background: GOLD }} />
          <h2
            className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight"
            style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
          >
            Your Property Has a Nighttime Version. Let’s Bring It Into View.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: `${WARM}c4` }}>
            You do not need to know which fixtures you need. Tell me what you want to improve, and we will explore the
            right options.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToForm}
              className="rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(232,165,75,0.35)]"
              style={{ background: AMBER, color: INK }}
            >
              Request My Free Lighting Quote
            </button>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold"
              style={{ borderColor: ASH, color: WARM }}
            >
              <Phone className="h-4 w-4" style={{ color: AMBER }} />
              Call Now: {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 pb-28 pt-6 sm:pb-24" style={{ background: INK }}>
        <div
          className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 text-center"
          style={{ borderColor: ASH, background: CHARCOAL }}
        >
          <h2
            className="text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-tight"
            style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
          >
            Stop Replacing Temporary Lights. Start Enjoying a Property Designed for Nighttime.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: `${WARM}c4` }}>
            Improve the walk to your front door. Add a refined layer of security. Highlight the home and landscaping you
            have invested in. Get professional guidance instead of guessing with another box-store lighting kit.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToForm}
              className="rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(232,165,75,0.35)]"
              style={{ background: AMBER, color: INK }}
            >
              Get My Personalized Quote
            </button>
            <a
              href={SITE.phoneHref}
              className="text-sm font-semibold underline-offset-4 hover:underline"
              style={{ color: GOLD }}
            >
              {SITE.phone}
            </a>
          </div>
          <p className="mt-4 text-xs" style={{ color: `${WARM}99` }}>
            Fast request form. Professional guidance. No obligation to move forward.
          </p>
        </div>

        <footer
          className="mx-auto mt-10 max-w-5xl border-t pt-8 text-center text-sm"
          style={{ borderColor: ASH, color: `${WARM}b3` }}
        >
          <p className="font-semibold" style={{ color: WARM }}>
            {SITE.name}
          </p>
          <p className="mt-1">Professional Landscape Low-Voltage Lighting</p>
          <p className="mt-1">Serving Walker / Denham Springs / Watson</p>
          <p className="mt-3">
            <a href={SITE.phoneHref} className="hover:underline" style={{ color: AMBER }}>
              {SITE.phone}
            </a>
            {' · '}
            <a href={SITE.emailHref} className="hover:underline" style={{ color: GOLD }}>
              {SITE.email}
            </a>
          </p>
          <p className="mt-4 text-xs" style={{ color: `${WARM}80` }}>
            Solo operator · Since 2013 · Real project photos only · No fabricated reviews on this page
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
            <button type="button" onClick={scrollToForm} className="hover:underline" style={{ color: GOLD }}>
              Request a Quote
            </button>
            <Link href="/privacy" className="hover:underline" style={{ color: GOLD }}>
              Privacy Policy
            </Link>
            <Link href="/service-areas/walker" className="hover:underline" style={{ color: GOLD }}>
              Service Areas
            </Link>
          </div>
        </footer>
      </section>

    </>
  );
}
