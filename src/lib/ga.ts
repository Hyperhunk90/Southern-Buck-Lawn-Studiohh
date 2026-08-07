// GA4 helper. Initializes gtag once and queues events so none are
// lost while the Google script is still loading.
const GA_ID = 'G-HYJ6QH6Y1D';

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
    w.gtag('js', new Date());
    w.gtag('config', GA_ID, { send_page_view: false });
  }
  return w.gtag;
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const gtag = ensureGtag();
  if (gtag) gtag('event', name, params);
}
