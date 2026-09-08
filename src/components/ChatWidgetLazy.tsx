'use client';

import dynamic from 'next/dynamic';

/**
 * Defer BUCKIE (react-markdown + motion) off the critical path.
 * Client-only wrapper so `ssr: false` is valid in the App Router.
 */
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
  loading: () => null,
});

export default function ChatWidgetLazy() {
  return <ChatWidget />;
}
