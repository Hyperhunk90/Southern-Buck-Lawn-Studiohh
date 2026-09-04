'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'motion/react';
import { Phone } from 'lucide-react';
import { SITE } from '@/data/site';
import { AFTER, BEFORE, DEPTH, STEPS } from './lightingContent';
import { scrollToQuote } from './LightingHero';
import styles from './lighting.module.css';

export default function LightingStory() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(reduce ? 1 : 0.2);

  useEffect(() => {
    if (reduce) {
      setProgress(1);
      return;
    }
    const el = document.getElementById('dusk-reel');
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const start = view * 0.85;
      const end = view * 0.25;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  return (
    <>
      <section className={styles.sectionNarrow} aria-label="Why landscape lighting">
        <p className={styles.eyebrow}>Night story</p>
        <h2 className="mt-3 text-[clamp(1.85rem,3.5vw,2.75rem)] leading-tight">
          You May Not Be Shopping for Landscape Lighting Yet.
        </h2>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-[var(--warm-muted)]">
          That is exactly why professional lighting is worth seeing in a different way.
        </p>
        <blockquote className={styles.pullQuote}>
          Most homeowners do not wake up thinking, “My property needs landscape lights.” They notice
          the walkway disappears at night. The front of the house feels flat after sunset. Guests
          step carefully from the car to the door.
        </blockquote>
        <div className="space-y-4 text-[0.98rem] leading-relaxed text-[var(--warm-muted)]">
          <p>
            Professional low-voltage lighting solves those problems with one tailored design. Instead
            of scattering inexpensive fixtures around the yard, I look at your home as a complete
            property — guide people safely, reveal the best landscape features, add depth to the
            architecture, and create a warm finish that feels built in, not bolted on.
          </p>
          <p>
            I am Michael Dantone — solo operator of Southern Buck Lawn since June 2024. Lighting installs
            lean on about 13 years of industrial electrical background. That is electrical experience,
            not a landscape horticulture license. No crew of forty. If a lighting install is not a
            fit, I will tell you that up front.
          </p>
        </div>
      </section>

      <section id="dusk-reel" className={styles.section} aria-label="Dusk to night transformation">
        <p className={styles.eyebrow}>Better-placed light</p>
        <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3.2vw,2.6rem)] leading-tight">
          The Difference Is Not More Light. It Is Better-Placed Light.
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--warm-muted)] leading-relaxed">
          Professional lighting should feel intentional — guide the eye, create contrast, and reveal
          details without washing the property in brightness.
        </p>

        <div className={`${styles.transformWrap} mt-8`}>
          <div className={styles.transformLayer}>
            <Image
              src="/images/sbl-project-photo-02.webp"
              alt="Southern Buck Lawn dusk project plate — intentional warm path lighting"
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className={progress < 0.5 ? styles.beforeFilter : undefined}
              style={{
                filter:
                  progress >= 0.5
                    ? undefined
                    : `grayscale(${(1 - progress) * 0.55}) brightness(${0.35 + progress * 0.55})`,
              }}
            />
          </div>
          <div
            className={`${styles.transformLayer} ${styles.afterGlow}`}
            style={{
              background: `radial-gradient(ellipse at 60% 45%, rgba(232,165,75,${0.05 + progress * 0.22}) 0%, transparent 55%)`,
              pointerEvents: 'none',
            }}
            aria-hidden
          />
          <p className="absolute left-4 top-4 z-[2] rounded-full bg-[rgba(7,7,10,0.8)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--soft-gold)]">
            {progress < 0.5 ? 'Before — flat after dark' : 'After — intentional warm light'}
          </p>
          {!reduce && (
            <input
              className={styles.scrubRange}
              type="range"
              min={0}
              max={100}
              value={Math.round(progress * 100)}
              aria-label="Scrub dusk to night lighting"
              onChange={(e) => setProgress(Number(e.target.value) / 100)}
            />
          )}
        </div>
        <p className="mt-3 text-center text-sm text-[var(--warm-muted)]">
          Designed for your home — not pulled from a box.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={styles.benefitCard}>
            <h3 className="text-[var(--soft-gold)]">Before</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--warm-muted)]">
              {BEFORE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.benefitCard}>
            <h3 className="text-[var(--amber)]">After</h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--warm-muted)]">
              {AFTER.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="Lighting benefits in depth">
        <p className={styles.eyebrow}>More than lights</p>
        <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">
          A Better Experience of Your Home.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {DEPTH.map((item, index) => (
            <article key={item.title} className={styles.benefitCard}>
              <span className={styles.numberMark}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-base">{item.title}</h3>
              <p className="mt-2">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-label="How lighting design works">
        <p className={styles.eyebrow}>How it works</p>
        <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">
          A Simple Path to a Better-Lit Home
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <article key={step.title} className={styles.benefitCard}>
              <span className={styles.numberMark}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-base">{step.title}</h3>
              <p className="mt-2">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaBand} aria-label="Mid-page lighting quote CTA">
        <h2 className="mx-auto max-w-3xl text-[clamp(1.7rem,3vw,2.4rem)] leading-tight">
          Your Property Has a Nighttime Version. Let’s Bring It Into View.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--warm-muted)] leading-relaxed">
          You do not need to know which fixtures you need. Tell me what you want to improve, and we
          will explore the right options.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={scrollToQuote} className={styles.ctaPrimary}>
            Request My Free Lighting Quote
          </button>
          <a href={SITE.phoneHref} className={styles.ctaGhost}>
            <Phone className="h-4 w-4 text-[var(--amber)]" /> Call Now: {SITE.phone}
          </a>
        </div>
      </section>
    </>
  );
}
