import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import { SITE } from '@/data/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-lighting-display',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lighting-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Professional Landscape Lighting in Walker, Denham Springs & Watson',
  description:
    'Professionally designed low-voltage landscape lighting from Southern Buck Lawn. Safer walkways, warmer curb appeal, and lasting quality — not disposable solar. Walker, Denham Springs, and Watson. Free lighting quote.',
  alternates: { canonical: '/landscape-lighting' },
  openGraph: {
    title: 'Your Home Should Look This Good at Night',
    description:
      'Custom low-voltage landscape lighting by Michael Dantone — solo operator since 2013, 13 years industrial electrical background. Walker, Denham Springs, and Watson.',
    url: `${SITE.url}/landscape-lighting`,
    images: [
      {
        url: '/images/sbl-project-photo-02.webp',
        alt: 'Brick house at dusk with path lights along the walk — Southern Buck Lawn lighting work',
      },
    ],
  },
};

export default function LandscapeLightingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fraunces.variable} ${manrope.variable}`} data-lighting-cinema>
      {children}
    </div>
  );
}
