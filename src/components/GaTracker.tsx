'use client';

import { useEffect, Suspense } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_ID, trackEvent } from '@/lib/ga';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

function captureFirstTouch() {
  try {
    const params = new URLSearchParams(window.location.search);
    const landingPage = `${window.location.pathname}${window.location.search}`;
    const campaign = UTM_KEYS
      .map((key) => params.get(key) ? `${key}=${params.get(key)}` : '')
      .filter(Boolean)
      .join('&');

    if (sessionStorage.getItem('sbl_landing_page') === null) {
      sessionStorage.setItem('sbl_landing_page', landingPage);
    }
    if (sessionStorage.getItem('sbl_referrer') === null) {
      sessionStorage.setItem('sbl_referrer', document.referrer || '');
    }
    if (sessionStorage.getItem('sbl_campaign') === null) {
      sessionStorage.setItem('sbl_campaign', campaign);
    }

    for (const key of UTM_KEYS) {
      const storageKey = `sbl_${key}`;
      if (sessionStorage.getItem(storageKey) === null) {
        sessionStorage.setItem(storageKey, params.get(key) || '');
      }
    }
  } catch {
    // Attribution must never prevent navigation or analytics in restricted storage modes.
  }
}

function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    captureFirstTouch();
    const query = searchParams?.toString();
    trackEvent('page_view', {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const context = link.dataset.track || link.textContent?.trim().slice(0, 80) || 'link';
      const common = { link_url: href, link_context: context, page_path: window.location.pathname };

      if (href.startsWith('tel:')) {
        trackEvent('click_to_call', common);
      } else if (href.startsWith('sms:')) {
        trackEvent('click_to_text', common);
      } else if (href === '/quote' || href.startsWith('/quote?')) {
        trackEvent('quote_cta_click', common);
      } else if (/g\.page\/(?:r\/)?[^?#]*\/review(?:[/?#]|$)/i.test(href)) {
        trackEvent('google_review_click', common);
      } else if (/share\.google|google\.com\/maps|g\.page\//i.test(href)) {
        trackEvent('google_business_click', common);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}

export default function GaTracker() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            send_page_view: false,
            anonymize_ip: true,
            allow_google_signals: false
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViews />
        <ConversionTracking />
      </Suspense>
    </>
  );
}
