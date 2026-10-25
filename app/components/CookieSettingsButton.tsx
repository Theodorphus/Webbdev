'use client';

import type { ReactNode } from 'react';
import { openCookieSettings } from '../lib/googleAds';

/** Öppnar samtyckesrutan för annonsmätning (se GoogleAds). */
export default function CookieSettingsButton({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children}
    </button>
  );
}
