'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="mx-auto my-16 max-w-xl px-4 py-12 text-center">
      <h1 className="font-anton text-3xl uppercase text-midnight-moss">Something went wrong</h1>
      <p className="mt-3 font-archivo text-base text-gray-600">
        An unexpected error occurred. Please try again or return home.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-safety-orange px-6 py-3 font-archivo font-bold text-midnight-moss shadow hover:bg-safety-orange/90"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-cream-line bg-white px-6 py-3 font-archivo font-bold text-midnight-moss hover:bg-cream"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
