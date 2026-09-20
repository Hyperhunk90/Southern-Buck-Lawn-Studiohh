import type { Metadata } from 'next';
import { Fraunces, Inter, Caveat } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import ConsentMode from '@/components/ConsentMode';
import GaTracker from '@/components/GaTracker';
import ChatWidgetLazy from '@/components/ChatWidgetLazy';
import { SITE, DEFAULT_OG_IMAGE } from '@/data/site';

// Bound HTML freshness at the CDN so a deployment cannot leave pages pointing
// at retired JavaScript bundles for a year. Hashed assets remain immutable.
export const revalidate = 300;

// Display face: Fraunces — a warm, characterful "old-style" serif that carries
// the earthy, editorial "creative outdoor portal" direction and reads well in
// both large caps and normal case. Keeps the --font-anton-src variable name so
// existing `font-anton` heading utilities pick it up with no per-component edits.
const displayFont = Fraunces({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-anton-src',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

// Body face: Inter — clean, legible, variable. Reuses --font-archivo-src so all
// `font-archivo`/`font-barlow` utilities across the site switch over cleanly.
const bodyFont = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-archivo-src',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
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
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southern Buck Lawn | Lawn Care in Walker, Denham Springs & Watson',
    description:
      'Weekly mowing, weed control, and landscape work from a Walker shop. Serving Walker, Denham Springs, and Watson.',
    images: [{ url: DEFAULT_OG_IMAGE.url, alt: DEFAULT_OG_IMAGE.alt }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${caveat.variable}`}>
      <head>
        {/* First head script when possible: CM v2 denied defaults before any gtag preload. */}
        <ConsentMode />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
        <ChatWidgetLazy />
        <GaTracker />
      </body>
    </html>
  );
}
