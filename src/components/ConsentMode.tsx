import Script from 'next/script';

/**
 * Site Audit F8 — banner-free Google Consent Mode v2 (Ad Buck defaults).
 *
 * Sets denied defaults BEFORE any Google tags load. No CMP/banner unless
 * Michael asks later; tags remain on the page (advanced CM). Do not gate
 * generate_lead / Ads conversion firing behind post-consent-only load.
 *
 * Must live in a Server Component so strategy="beforeInteractive" is valid
 * (App Router requires that in the root layout tree).
 */
export default function ConsentMode() {
  return (
    <Script id="consent-mode-v2-default" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = window.gtag || gtag;
        gtag('consent', 'default', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      `}
    </Script>
  );
}
