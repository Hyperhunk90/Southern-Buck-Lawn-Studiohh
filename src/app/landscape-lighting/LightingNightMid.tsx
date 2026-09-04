'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import {
  AMBER,
  ASH,
  BENEFITS,
  CHARCOAL,
  DEPTH,
  GOLD,
  INK,
  STEPS,
  WARM,
} from './lighting-content';

export default function LightingNightMid({
  duskProgress,
  reduce,
}: {
  duskProgress: number;
  reduce: boolean | null;
}) {
  return (
    <>

<section className="px-4 py-14" style={{ background: CHARCOAL }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : index * 0.08 }}
              className="rounded-2xl border p-5"
              style={{ borderColor: ASH, background: INK }}
            >
              <div className="mb-3 h-0.5 w-10" style={{ background: AMBER }} />
              <h3
                className="text-lg"
                style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
              >
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: `${WARM}bf` }}>
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16" style={{ background: INK }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
            Night story
          </p>
          <h2
            className="mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-tight"
            style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
          >
            You May Not Be Shopping for Landscape Lighting Yet.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: `${WARM}d0` }}>
            That is exactly why professional lighting is worth seeing in a different way.
          </p>
          <blockquote
            className="my-8 border-l-2 pl-5 text-lg italic leading-relaxed"
            style={{ borderColor: GOLD, color: WARM }}
          >
            Most homeowners do not wake up thinking, “My property needs landscape lights.” They notice the walkway
            disappears at night. The front of the house feels flat after sunset. Guests step carefully from the car to
            the door.
          </blockquote>
          <div className="space-y-4 text-sm leading-relaxed sm:text-base" style={{ color: `${WARM}c4` }}>
            <p>
              Professional low-voltage lighting solves those problems with one tailored design. Instead of scattering
              inexpensive fixtures around the yard, I look at your home as a complete property — guide people safely,
              reveal the best landscape features, add depth to the architecture, and create a warm finish that feels
              built in, not bolted on.
            </p>
            <p>
              I am Michael Dantone — solo operator of Southern Buck Lawn since 2013. Lighting installs lean on about 13
              years of industrial electrical background. That is electrical experience, not a landscape horticulture
              license. No crew of forty. If a lighting install is not a fit, I will tell you that up front.
            </p>
          </div>
        </div>
      </section>

      <section id="dusk-reel" className="px-4 py-16" style={{ background: CHARCOAL }}>
        <div className="mx-auto max-w-5xl">
          <h2
            className="max-w-3xl text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold leading-tight"
            style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
          >
            The Difference Is Not More Light. It Is Better-Placed Light.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: `${WARM}bf` }}>
            Professional lighting should feel intentional — guide the eye, create contrast, and reveal details without
            washing the property in brightness.
          </p>

          <div className="relative mt-8 overflow-hidden rounded-3xl border" style={{ borderColor: ASH }}>
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/sbl-project-photo-02.webp"
                alt="Southern Buck Lawn dusk project plate showing intentional warm path lighting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 960px"
                style={{
                  filter: `grayscale(${(1 - duskProgress) * 0.55}) brightness(${0.35 + duskProgress * 0.55}) contrast(${1.05 + (1 - duskProgress) * 0.15})`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 60% 45%, rgba(232,165,75,${0.05 + duskProgress * 0.22}) 0%, transparent 55%), linear-gradient(180deg, rgba(7,7,10,${0.55 - duskProgress * 0.35}) 0%, rgba(7,7,10,${0.25 - duskProgress * 0.1}) 100%)`,
                }}
              />
              <div
                className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                style={{ background: `${INK}cc`, color: GOLD }}
              >
                {duskProgress < 0.5 ? 'Before — flat after dark' : 'After — intentional warm light'}
              </div>
            </div>
            <p className="border-t px-4 py-3 text-center text-sm" style={{ borderColor: ASH, color: `${WARM}cc` }}>
              Designed for your home — not pulled from a box.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border p-5" style={{ borderColor: ASH, background: INK }}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: GOLD }}>
                Before
              </h3>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: `${WARM}c4` }}>
                <li>Dark walkways</li>
                <li>Flat-looking front elevation</li>
                <li>Landscaping that disappears at night</li>
                <li>Harsh or inconsistent lighting</li>
                <li>Repeated purchases of low-quality solar fixtures</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-5" style={{ borderColor: ASH, background: INK }}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: AMBER }}>
                After
              </h3>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: `${WARM}c4` }}>
                <li>A clearly defined route to the entrance</li>
                <li>Warm, welcoming architectural accents</li>
                <li>Trees, gardens, and textures visible after sunset</li>
                <li>Balanced light with fewer dark zones</li>
                <li>A cohesive system tailored to the property</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16" style={{ background: INK }}>
        <div className="mx-auto max-w-6xl">
          <h2
            className="text-[clamp(1.7rem,3vw,2.5rem)] font-semibold"
            style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
          >
            More Than Lights. A Better Experience of Your Home.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {DEPTH.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border p-5"
                style={{ borderColor: ASH, background: CHARCOAL }}
              >
                <p className="text-xs font-semibold" style={{ color: AMBER }}>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1 text-base font-semibold" style={{ color: WARM }}>
                  {item.title}
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
        <div className="mx-auto max-w-6xl">
          <h2
            className="text-[clamp(1.7rem,3vw,2.5rem)] font-semibold"
            style={{ color: WARM, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
          >
            A Simple Path to a Better-Lit Home
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <article key={step.n} className="rounded-2xl border p-5" style={{ borderColor: ASH, background: INK }}>
                <p
                  className="text-2xl font-semibold"
                  style={{ color: GOLD, fontFamily: 'var(--font-lighting-display), Fraunces, serif' }}
                >
                  {step.n}
                </p>
                <h3 className="mt-2 text-base font-semibold" style={{ color: WARM }}>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: `${WARM}bf` }}>
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      
    </>
  );
}
