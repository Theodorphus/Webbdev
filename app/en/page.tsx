import type { Metadata } from 'next';
import { Home } from '../page';

// Engelsk version av startsidan. Samma sida, men routen sätter språket till
// 'en' och får egna engelska metadata + canonical/hreflang.
export const metadata: Metadata = {
  title: 'Web Development in Gothenburg — Webbdev Studio',
  description:
    'Web development in Gothenburg. I build fast, modern, conversion-optimized websites for businesses — Next.js, React, Tailwind. Delivered in 3–7 days at a fixed price.',
  alternates: {
    canonical: '/en',
    languages: {
      'sv-SE': '/',
      'en-US': '/en',
    },
  },
};

export default function EnglishHomePage() {
  // Home sätter en egen provider med lang="en", så sidinnehållet
  // server-renderas på engelska. Chatt/exit-intent i layouten härleder
  // språket ur routen på egen hand (se DeferredWidgets).
  return <Home lang="en" />;
}
