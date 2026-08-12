// GA4 event helper. Events queue in dataLayer until Google's script is ready.
const configuredGaId = process.env.NEXT_PUBLIC_GA_ID || 'G-HYJ6QH6Y1D';
export const GA_ID = /^G-[A-Z0-9]+$/.test(configuredGaId) ? configuredGaId : 'G-HYJ6QH6Y1D';

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function ensureGtag(): ((...args: unknown[]) => void) | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    w.gtag = function gtag() {
      w.dataLayer!.push(arguments);
    };
  }
  return w.gtag;
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const gtag = ensureGtag();
  if (gtag) gtag('event', name, params);
}
