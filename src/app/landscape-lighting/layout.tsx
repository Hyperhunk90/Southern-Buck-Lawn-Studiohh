import { Fraunces, Manrope } from 'next/font/google';
import type { ReactNode } from 'react';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-lighting-display',
  display: 'swap',
  adjustFontFallback: true,
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lighting-sans',
  display: 'swap',
  adjustFontFallback: true,
});

export default function LandscapeLightingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${fraunces.variable} ${manrope.variable} lighting-night-route`}>
      {children}
    </div>
  );
}
