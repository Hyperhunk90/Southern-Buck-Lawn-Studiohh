'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Phone, ChevronDown } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { SITE } from '@/data/site';
import { AUDIENCES, FAQS } from './lightingContent';
import { scrollToQuote } from './LightingHero';
import styles from './lighting.module.css';

export default function LightingClose() {
  const reduceMotion = useReducedMotion();
  const [stickyOn, setStickyOn] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [audience, setAudience] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStickyOn(true);
      return;
    }
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setStickyOn(progress > 0.4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduceMotion]);

  return (
    <>
      <section className={styles.section} aria-label="Who lighting is for">
        <p className={styles.eyebrow}>Who this is for</p>
        <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.4rem)] leading-tight">Built Around Real Homeowner Moments</h2>
        <div className={`${styles.chipRow} mt-6`}>
          {AUDIENCES.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={`${styles.chip} ${audience === index ? styles.chipActive : ''}`}
              onClick={() => setAudience(index)}
              aria-pressed={audience === index}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-[1.02rem] leading-relaxed text-[var(--warm-muted)]">
          {AUDIENCES[audience].body}
        </p>
      </section>

      <section className={styles.section} aria-label="Lighting FAQ">
        <p className={styles.eyebrow}>Questions homeowners usually ask</p>
        <h2 className="mt-3 mb-6 text-[clamp(1.75rem,3vw,2.4rem)] leading-tight">Straight Answers</h2>
        <div>
          {FAQS.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q} className={styles.faqItem}>
                <button
                  type="button"
                  className={`${styles.faqButton} ${open ? styles.faqOpen : ''}`}
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? null : index)}
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && <div className={styles.faqPanel}>{item.a}</div>}
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.finalCta} aria-label="Final lighting quote call to action">
        <h2 className="mx-auto max-w-3xl text-[clamp(1.85rem,3.5vw,2.75rem)] leading-tight">
          Stop Replacing Temporary Lights. Start Enjoying a Property Designed for Nighttime.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--warm-muted)] leading-relaxed">
          Improve the walk to your front door. Add a refined layer of security. Highlight the home
          and landscaping you have invested in. Get professional guidance instead of guessing with
          another box-store kit.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={scrollToQuote} className={styles.ctaPrimary}>
            Get My Personalized Quote
          </button>
          <a href={SITE.phoneHref} className={styles.ctaGhost}>
            <Phone className="h-4 w-4 text-[var(--amber)]" /> {SITE.phone}
          </a>
        </div>
        <p className={`${styles.muted} mt-4`}>
          Fast request form. Professional guidance. No obligation to move forward.
        </p>
      </section>

      <footer className={styles.napBlock}>
        <strong>Southern Buck Lawn</strong>
        Professional Landscape Low-Voltage Lighting
        <br />
        Serving Walker / Denham Springs / Watson
        <br />
        {SITE.street}, {SITE.city}, {SITE.region} {SITE.postalCode}
        <br />
        <a href={SITE.phoneHref} className="text-[var(--amber)] hover:underline">
          {SITE.phone}
        </a>
        {' · '}
        <a href={SITE.emailHref} className="text-[var(--amber)] hover:underline">
          {SITE.email}
        </a>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <button type="button" onClick={scrollToQuote} className="text-[var(--warm-white)] underline-offset-2 hover:underline">
            Request a Quote
          </button>
          <Link href="/service-areas" className="hover:text-[var(--warm-white)] hover:underline">
            Service Areas
          </Link>
          <Link href="/privacy" className="hover:text-[var(--warm-white)] hover:underline">
            Privacy Policy
          </Link>
        </div>
      </footer>

      <div
        className={`${styles.stickyBar} ${stickyOn ? styles.stickyVisible : ''}`}
        aria-hidden={!stickyOn}
      >
        <a href={SITE.phoneHref} className={styles.stickyCall}>
          <Phone className="h-4 w-4 text-[var(--amber)]" /> Call
        </a>
        <button type="button" onClick={scrollToQuote} className={styles.stickyQuote}>
          Request My Free Lighting Quote
        </button>
      </div>
    </>
  );
}
