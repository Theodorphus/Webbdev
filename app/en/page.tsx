import type { Metadata } from 'next';
import { Home } from '../page';
import ForceLang from '../i18n/ForceLang';

// Engelsk version av startsidan. Samma sida, men språket tvingas till 'en'
// och routen får egna engelska metadata + canonical/hreflang.
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
  return (
    <>
      <ForceLang lang="en" />
      <Home />
    </>
  );
}
