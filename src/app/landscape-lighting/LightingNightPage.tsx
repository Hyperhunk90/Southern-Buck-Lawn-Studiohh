'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { Phone } from 'lucide-react';
import { SITE } from '@/data/site';
import LightingQuoteForm from './LightingQuoteForm';
import LightingNightSections from './LightingNightSections';
import { AMBER, ASH, CHARCOAL, GOLD, INK, WARM } from './lighting-content';

export default function LightingNightPage() {
  const reduce = useReducedMotion();
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [duskProgress, setDuskProgress] = useState(reduce ? 1 : 0.15);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      setShowSticky(ratio > 0.4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (reduce) {
      setDuskProgress(1);
      return;
    }
    const el = document.getElementById('dusk-reel');
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const start = view * 0.85;
      const end = view * 0.2;
      const raw = (start - rect.top) / (start - end);
      setDuskProgress(Math.min(1, Math.max(0, raw)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  const fadeUp = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  const scrollToForm = () => {
    document
      .getElementById('lighting-quote')
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: INK,
        color: WARM,
        fontFamily: 'var(--font-lighting-sans), Manrope, sans-serif',
      }}
    >
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/sbl-project-photo-02.webp"
            alt="Brick house at dusk with path lights along the walk — Southern Buck Lawn lighting work"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={70}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 70% 40%, rgba(255,184,107,0.18) 0%, transparent 45%), linear-gradient(90deg, rgba(7,7,10,0.94) 0%, rgba(7,7,10,0.78) 42%, rgba(7,7,10,0.55) 100%), linear-gradient(180deg, rgba(7,7,10,0.35) 0%, rgba(7,7,10,0.75) 100%)',
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-14">
          <motion.div {...fadeUp} className="space-y-5 pt-2 lg:pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
              Professional Landscape Lighting for Homes That Stand Out After Dark
            </p>
            <h1
              className="text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-tight"
              style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
            >
              Your Home Should Look This Good at Night.
            </h1>
            <p className="max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: `${WARM}d9` }}>
              Create a safer, more welcoming, and higher-end exterior with professionally designed low-voltage landscape
              lighting — tailored to your home, your property, and the way you want to live outside after sunset.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
                style={{ borderColor: ASH, color: WARM, background: `${CHARCOAL}cc` }}
              >
                <Phone className="h-4 w-4" style={{ color: AMBER }} />
                Call Now: {SITE.phone}
              </a>
              <p className="text-xs" style={{ color: `${WARM}99` }}>
                Quick form. No pressure. A recommendation designed around your property.
              </p>
            </div>
            <p className="max-w-lg text-xs leading-relaxed" style={{ color: `${WARM}8a` }}>
              Solo operator · Michael Dantone · Southern Buck Lawn since 2013 · 13 years industrial electrical background
              (not a horticulture license) · Walker / Denham Springs / Watson
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.12 }}
          >
            <LightingQuoteForm id="lighting-quote" />
          </motion.div>
        </div>
      </section>

      <LightingNightSections
        duskProgress={duskProgress}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
        scrollToForm={scrollToForm}
        reduce={reduce}
      />

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t px-3 py-3 transition-transform duration-300 sm:px-4"
        style={{
          background: `${CHARCOAL}f2`,
          borderColor: ASH,
          backdropFilter: 'blur(10px)',
          transform: showSticky || reduce ? 'translateY(0)' : 'translateY(110%)',
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className="hidden text-xs sm:block" style={{ color: `${WARM}b3` }}>
            Ready to see your home after dark?
          </p>
          <div className="flex w-full gap-2 sm:w-auto">
            <a
              href={SITE.phoneHref}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold sm:flex-none"
              style={{ borderColor: ASH, color: WARM }}
            >
              <Phone className="h-3.5 w-3.5" style={{ color: AMBER }} />
              Call
            </a>
            <button
              type="button"
              onClick={scrollToForm}
              className="flex-1 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] sm:flex-none"
              style={{ background: AMBER, color: INK }}
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
