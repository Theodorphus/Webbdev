import type { Metadata } from 'next';
import { Home } from '../page';

// Engelsk version av startsidan. Samma sida, men routen sätter språket till
// 'en' och får egna engelska metadata + canonical/hreflang.
export const metadata: Metadata = {
  title: 'Web Design & Development in Gothenburg',
  description:
    'Web development in Gothenburg. I build fast, modern, conversion-optimized websites for businesses — Next.js, React, Tailwind. Personal contact from the first sketch to launch, with a fixed price for the agreed scope.',
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
