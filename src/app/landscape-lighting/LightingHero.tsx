'use client';

import Image from 'next/image';
import { Phone, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SITE } from '@/data/site';
import LightingQuoteForm from './LightingQuoteForm';
import { BENEFITS } from './lightingContent';
import styles from './lighting.module.css';

export function scrollToQuote() {
  const el = document.getElementById('lighting-quote');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function LightingHero() {
  const reduceMotion = useReducedMotion();
  const fadeUp = reduceMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

  return (
    <>
      <section className={styles.hero} aria-label="Landscape lighting hero">
        <div className={styles.heroMedia}>
          <Image
            src="/images/sbl-project-photo-02.webp"
            alt="Brick house at dusk with warm path lights along the walk — Southern Buck Lawn lighting work"
            fill
            priority
            sizes="100vw"
            quality={70}
          />
        </div>
        <div className={styles.vignette} aria-hidden />
        <div className={styles.emberGlow} aria-hidden />

        <div className={styles.heroGrid}>
          <motion.div
            className="space-y-5"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: reduceMotion ? 0 : 0.85, ease: 'easeOut' }}
          >
            <p className={styles.eyebrow}>
              Professional Landscape Lighting for Homes That Stand Out After Dark
            </p>
            <h1 className={styles.display}>Your Home Should Look This Good at Night.</h1>
            <p className={styles.subhead}>
              Create a safer, more welcoming, and higher-end exterior with professionally designed
              low-voltage landscape lighting — tailored to your home, your property, and the way you
              want to live outside after sunset.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button type="button" onClick={scrollToQuote} className={styles.ctaPrimary}>
                Request My Free Lighting Quote <ArrowRight className="h-4 w-4" />
              </button>
              <a href={SITE.phoneHref} className={styles.ctaGhost}>
                <Phone className="h-4 w-4 text-[var(--amber)]" /> Call Now: {SITE.phone}
              </a>
            </div>
            <p className={styles.muted}>
              Quick form. No pressure. A professional recommendation designed around your property.
            </p>
          </motion.div>

          <motion.div
            id="lighting-quote"
            className={styles.formCard}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.15, ease: 'easeOut' }}
          >
            <p className={styles.eyebrow} style={{ marginBottom: '0.5rem' }}>
              Free lighting quote
            </p>
            <h2>See What Professional Lighting Could Do for Your Home</h2>
            <p className={`${styles.muted} mb-4`}>
              Serving Walker, Denham Springs, and Watson. Michael reviews every request personally.
            </p>
            <LightingQuoteForm />
          </motion.div>
        </div>
      </section>

      <section className={styles.benefitStrip} aria-label="Lighting benefits">
        <div className={styles.benefitGrid}>
          {BENEFITS.map((item, index) => (
            <motion.article
              key={item.title}
              className={styles.benefitCard}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.1 }}
            >
              <item.icon className="h-6 w-6 text-[var(--soft-gold)]" strokeWidth={1.75} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
