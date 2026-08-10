'use client';

import { Mail } from 'lucide-react';

const EMAIL_USER = 'SBL';
const EMAIL_DOMAIN = 'southernbucklawn.com';
const FULL_EMAIL = `${EMAIL_USER}@${EMAIL_DOMAIN}`;

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
  const href = `mailto:${FULL_EMAIL}`;

  if (variant === 'card') {
    return (
      <a href={href} className={className}>
        <Mail className="h-7 w-7 text-safety-orange" />
        <span className="font-anton text-lg uppercase text-midnight-moss">Email</span>
        <span className="break-all font-barlow text-base text-gray-600">{FULL_EMAIL}</span>
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      <Mail className={iconClassName} /> {FULL_EMAIL}
    </a>
  );
}
