'use client';

import { Analytics } from '@vercel/analytics/next';

export default function SiteAnalytics() {
  return <Analytics beforeSend={event => {
    const url = new URL(event.url, window.location.origin);
    url.hash = '';
    url.search = '';
    return { ...event, url: url.toString() };
  }} />;
}
