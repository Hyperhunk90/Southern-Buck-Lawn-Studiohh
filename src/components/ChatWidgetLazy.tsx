'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/**
 * Defer BUCKIE (react-markdown + motion) off the critical path.
 * Client-only wrapper so `ssr: false` is valid in the App Router.
 * The bundle is not requested until the first interaction or a few seconds after
 * `load`, so it never competes with the hero for bandwidth on mobile.
 */
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
  loading: () => null,
});

const WAKE_EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;

export default function ChatWidgetLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const wake = () => setReady(true);
    const afterLoad = () => { timer = setTimeout(wake, 3500); };

    WAKE_EVENTS.forEach((e) => window.addEventListener(e, wake, { once: true, passive: true }));
    if (document.readyState === 'complete') afterLoad();
    else window.addEventListener('load', afterLoad, { once: true });

    return () => {
      if (timer) clearTimeout(timer);
      WAKE_EVENTS.forEach((e) => window.removeEventListener(e, wake));
      window.removeEventListener('load', afterLoad);
    };
  }, []);

  return ready ? <ChatWidget /> : null;
}
