'use client';

import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';

/**
 * Renders the business email as a clickable mailto link, but assembles the
 * address in the browser AFTER mount. The server-rendered HTML that spam
 * harvesters scrape never contains a real `name@domain` string or a
 * `mailto:` href — only the placeholder "SBL [at] southernbucklawn.com" —
 * so the address can't be auto-collected off the page. Real visitors (with
 * JS) still see and click the normal email.
 */
const EMAIL_USER = 'SBL';
const EMAIL_DOMAIN = 'southernbucklawn.com';

type Props = {
  variant?: 'inline' | 'card';
  className?: string;
  iconClassName?: string;
};

export default function ObfuscatedEmail({
  variant = 'inline',
  className,
  iconClassName = 'h-4 w-4 text-safety-orange',
}: Props) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setAddress(`${EMAIL_USER}@${EMAIL_DOMAIN}`);
  }, []);

  const display = address ?? `${EMAIL_USER} [at] ${EMAIL_DOMAIN}`;
  const href = address ? `mailto:${address}` : undefined;

  if (variant === 'card') {
    return (
      <a href={href} className={className}>
        <Mail className="h-7 w-7 text-safety-orange" />
        <span className="font-anton text-lg uppercase text-midnight-moss">Email</span>
        <span className="break-all font-barlow text-base text-gray-600">{display}</span>
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      <Mail className={iconClassName} /> {display}
    </a>
  );
}
