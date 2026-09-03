import type { Metadata } from 'next';
import { Anton, Archivo, Caveat } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import GaTracker from '@/components/GaTracker';
import ChatWidget from '@/components/ChatWidget';
import { SITE } from '@/data/site';

// Bound HTML freshness at the CDN so a deployment cannot leave pages pointing
// at retired JavaScript bundles for a year. Hashed assets remain immutable.
export const revalidate = 300;

// Default social-share preview. photo-08 is a daytime white-ranch hedge job.
const OG_IMAGE = {
  url: '/images/sbl-project-photo-08.webp',
  width: 2000,
  height: 1126,
  alt: 'White ranch with daytime hedge trimming by Southern Buck Lawn',
};

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton-src',
  display: 'optional',
  preload: true,
  adjustFontFallback: true,
  fallback: ['Arial Narrow', 'Arial', 'sans-serif'],
});

const archivo = Archivo({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-archivo-src',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['Arial', 'sans-serif'],
});

const caveat = Caveat({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-caveat-src',
  display: 'swap',
  preload: false,
  fallback: ['Comic Sans MS', 'cursive'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Southern Buck Lawn | Lawn Care in Walker, Denham Springs & Watson',
    template: '%s | Southern Buck Lawn',
  },
  description:
    'Southern Buck Lawn is Michael Dantone in Walker, LA. Weekly mowing, weed control, and landscape work in Walker, Denham Springs, and Watson. Insured. Free quotes.',
  keywords: [
    'lawn care Walker LA',
    'lawn service Denham Springs',
    'lawn mowing Watson LA',
    'landscaping Livingston Parish',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE.name,
    title: 'Southern Buck Lawn | Lawn Care in Walker, Denham Springs & Watson',
    description:
      'Weekly mowing, weed control, and landscape work from a Walker shop. Serving Walker, Denham Springs, and Watson.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southern Buck Lawn | Lawn Care in Walker, Denham Springs & Watson',
    description:
      'Weekly mowing, weed control, and landscape work from a Walker shop. Serving Walker, Denham Springs, and Watson.',
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable} ${caveat.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <ChatWidget />
        <GaTracker />
      </body>
    </html>
  );
}
