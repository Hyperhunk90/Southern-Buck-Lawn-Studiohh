'use client';

import { motion } from 'motion/react';
import { HardHat, ArrowRight } from 'lucide-react';
import { SITE } from '@/data/site';

export default function ReoHeroContent() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto max-w-5xl text-center"
    >
      <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full bg-safety-orange/20 px-4 py-2 font-barlow text-sm font-bold uppercase tracking-widest text-safety-orange backdrop-blur-sm">
        <HardHat className="h-4 w-4" /> REO & Property Preservation
      </motion.div>
      <motion.h1 variants={itemVariants} className="mb-8 font-anton text-5xl uppercase tracking-wide text-white sm:text-6xl lg:text-7xl">
        You Manage the Assets. <br className="hidden sm:block" />
        <span className="text-safety-orange">I Handle the Heavy Lifting.</span>
      </motion.h1>
      <motion.p variants={itemVariants} className="mx-auto max-w-3xl font-barlow text-lg leading-relaxed text-gray-300 sm:text-xl">
        Managing foreclosed, bank-owned, or REO properties from a desk three states away is a massive headache. You need trustworthy boots on the ground in Walker, Denham Springs, and Watson—someone who actually shows up, does the dirty work, and gets the property secured without you having to babysit the whole process.
      </motion.p>
      <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-3xl font-barlow text-lg font-semibold text-white sm:text-xl">
        Southern Buck Lawn is insured and locally owned. I do not back down from a mess. You send the work order; I send the truck.
      </motion.p>
      <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="#lead-form"
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-safety-orange px-8 py-4 font-anton text-lg uppercase tracking-wider text-midnight-moss shadow-lg transition-all hover:bg-orange-hot sm:w-auto"
        >
          Submit Work Order <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href={SITE.phoneHref}
          className="flex w-full items-center justify-center rounded-lg border-2 border-white/20 bg-white/5 px-8 py-4 font-anton text-lg uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
        >
          Call {SITE.phone}
        </a>
      </motion.div>
    </motion.div>
  );
}
