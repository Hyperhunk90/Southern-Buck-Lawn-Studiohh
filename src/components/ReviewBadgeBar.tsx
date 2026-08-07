import { SITE } from '@/data/site';
import { GOOGLE_RATING } from '@/data/reviews';
import { Star } from 'lucide-react';

// Inline SVG brand marks so every badge is crisp and truly transparent.
// Each badge links to the matching profile URL set in src/data/site.ts.

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12Z" />
    </svg>
  );
}

function YelpMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path fill="#FF1A1A" d="M11.1 4.3c.04-1-.04-1.7-.4-2.05-.5-.5-1.5-.4-2.7.05-1.1.4-1.8.85-2 1.45-.1.35-.05.65.6 1.85l3.2 5.7c.45.8 1.05.7 1.25-.1.05-.25.05-.65.05-1.55l-.3-5.3Zm-.55 9.5-5.9 1.6c-1.15.3-1.65.6-1.8 1.15-.15.65.25 1.55 1.05 2.5.75.9 1.4 1.4 2 1.35.4-.05.65-.3 1.5-1.35l3.6-4.55c.55-.7.25-1.25-.45-1.1Zm1.95 1.4c-.7-.45-1.3-.05-1.2.75l.5 6.05c.1 1.2.3 1.85.85 2.05.6.25 1.55-.1 2.65-.95.9-.7 1.45-1.3 1.45-1.9 0-.4-.2-.65-1.05-1.4l-3.65-4.6Zm5.6-3.3-6.05.7c-.8.1-1 .75-.45 1.3l4.3 4.3c.85.85 1.45 1.2 2 1.05.6-.2 1.05-1.1 1.25-2.5.15-1.15.1-1.95-.3-2.4-.25-.3-.55-.4-1.75-.45Zm-1.1-6.45c-.55-.35-1.1-.4-2.55.55l-4.4 2.9c-.65.45-.5 1.1.3 1.25l5.95 1.1c1.2.2 1.85.1 2.2-.4.4-.55.4-1.55.05-2.85-.35-1.25-.75-1.9-1.35-2.2l-.2-.35Z" />
    </svg>
  );
}

function NextdoorMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#00B246" />
      <path fill="#fff" d="M12 5.2c-3.2 0-4.7 2-4.7 4.5v5.1h2.9v-4.9c0-1 .7-1.8 1.8-1.8s1.8.8 1.8 1.8v4.9h2.9V9.7c0-2.5-1.5-4.5-4.7-4.5Z" />
    </svg>
  );
}

function BBBMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#0C5A9E" />
      <path
        fill="#fff"
        d="M9.4 6.6c1.4 0 2.4.8 2.4 2.1 0 .8-.4 1.4-1 1.7.8.3 1.3 1 1.3 1.9 0 1.4-1.1 2.3-2.7 2.3H6.6V6.6h2.8Zm-.2 3.3c.6 0 1-.3 1-.9s-.4-.9-1-.9h-1v1.8h1Zm.2 3.3c.7 0 1.1-.3 1.1-.95 0-.6-.4-.95-1.1-.95H8.2v1.9h1.2Zm6.6-6.6c1.4 0 2.4.8 2.4 2.1 0 .8-.4 1.4-1 1.7.8.3 1.3 1 1.3 1.9 0 1.4-1.1 2.3-2.7 2.3h-2.8V6.6H16Zm-.2 3.3c.6 0 1-.3 1-.9s-.4-.9-1-.9h-1v1.8h1Zm.2 3.3c.7 0 1.1-.3 1.1-.95 0-.6-.4-.95-1.1-.95H14.8v1.9H16Z"
      />
    </svg>
  );
}

const BADGES = [
  { key: 'google', label: 'Google Reviews', mark: <GoogleMark />, href: SITE.social.google },
  { key: 'facebook', label: 'Facebook', mark: <FacebookMark />, href: SITE.social.facebook },
  { key: 'yelp', label: 'Yelp', mark: <YelpMark />, href: SITE.social.yelp },
  { key: 'bbb', label: 'BBB Accredited', mark: <BBBMark />, href: SITE.social.bbb },
];

export default function ReviewBadgeBar() {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="font-anton text-2xl text-midnight-moss">{GOOGLE_RATING.score.toFixed(1)}</span>
        <span className="flex gap-0.5 text-safety-orange">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-safety-orange" />
          ))}
        </span>
        <span className="font-barlow text-base text-gray-500">{GOOGLE_RATING.count} Google reviews</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
        {BADGES.map((b) => (
          <a
            key={b.key}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Southern Buck Lawn on ${b.label}`}
            className="flex flex-shrink-0 items-center gap-2 rounded-full border border-primary/15 bg-white px-5 py-2.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-safety-orange hover:shadow-md"
          >
            {b.mark}
            <span className="whitespace-nowrap font-barlow text-base font-bold uppercase tracking-wide text-midnight-moss">
              {b.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
