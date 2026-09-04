import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import LightingNightPage from './LightingNightPage';

export const metadata: Metadata = {
  title: 'Professional Landscape Lighting in Walker, Denham Springs & Watson',
  description:
    'Professionally designed low-voltage landscape lighting from Southern Buck Lawn. Safer walkways, warmer curb appeal, and lasting quality — not disposable solar. Walker, Denham Springs, and Watson. Free lighting quote.',
  alternates: { canonical: '/landscape-lighting' },
  openGraph: {
    title: 'Your Home Should Look This Good at Night',
    description:
      'Custom low-voltage landscape lighting by Michael Dantone — owner-operator since June 2024, with 13 years of industrial electrical background. Walker, Denham Springs, and Watson.',
    url: `${SITE.url}/landscape-lighting`,
    images: [
      {
        url: '/images/sbl-project-photo-02.webp',
        alt: 'Brick house at dusk with path lights along the walk — Southern Buck Lawn lighting work',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Home Should Look This Good at Night | Southern Buck Lawn',
    description:
      'Professionally designed low-voltage landscape lighting in Walker, Denham Springs, and Watson. Request a free lighting quote.',
    images: [
      {
        url: '/images/sbl-project-photo-02.webp',
        alt: 'Brick house at dusk with path lights along the walk — Southern Buck Lawn',
      },
    ],
  },
};

export default function LandscapeLightingPage() {
  return <LightingNightPage />;
}
