import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import LightingNightPage from './LightingNightPage';

export const metadata: Metadata = {
  title: 'Landscape Lighting After Dark in Walker, Denham Springs & Watson',
  description:
    'Professionally designed low-voltage landscape lighting for homes that should look this good at night. Safer paths, warmer curb appeal, lasting quality — not disposable solar. Michael Dantone, Southern Buck Lawn. Walker, Denham Springs, and Watson.',
  alternates: { canonical: '/landscape-lighting' },
  openGraph: {
    title: 'Your Home Should Look This Good at Night | Southern Buck Lawn',
    description:
      'Night-forward landscape lighting from a Walker shop. Real dusk path-light work, solo-operator craft, and a free lighting quote for Walker, Denham Springs, and Watson.',
    url: `${SITE.url}/landscape-lighting`,
    images: [
      {
        url: '/images/sbl-project-photo-02.webp',
        alt: 'Brick house at dusk with warm path lights along the walk — Southern Buck Lawn',
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
        alt: 'Brick house at dusk with warm path lights along the walk — Southern Buck Lawn',
      },
    ],
  },
};

export default function LandscapeLightingPage() {
  return <LightingNightPage />;
}
