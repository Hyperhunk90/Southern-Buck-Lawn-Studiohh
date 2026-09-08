/**
 * Site Audit F8 follow-up — banner-free Google Consent Mode v2 (Ad Buck).
 *
 * Renders a literal early <head> inline script (dangerouslySetInnerHTML) so
 * gtag('consent','default',…) appears in HTML source BEFORE any
 * googletagmanager preload / gtag.js. Do NOT use next/script beforeInteractive
 * here: App Router emits that via __next_s late in <body>, which races the
 * gtag preload Next injects for afterInteractive Script src.
 *
 * No CMP/banner unless Michael asks later. Tags stay on the page (advanced CM).
 * Do not gate generate_lead / Ads conversion firing behind post-consent-only load.
 */
export default function ConsentMode() {
  return (
    <script
      id="consent-mode-v2-default"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});`,
      }}
    />
  );
}
