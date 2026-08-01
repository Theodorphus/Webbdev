import type { Metadata } from 'next';
import { Home } from '../page';
import ForceLang from '../i18n/ForceLang';
import { LanguageProvider } from '../i18n/LanguageProvider';

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
      {/* ForceLang ligger UTANFÖR den inre providern: den synkar layoutens
          yttre provider (Chatbot/ExitIntent) och localStorage efter hydrering. */}
      <ForceLang lang="en" />
      {/* Egen provider med initialLang gör att sidinnehållet server-renderas
          på engelska — utan den ser Google samma svenska HTML som på "/". */}
      <LanguageProvider initialLang="en">
        <Home />
      </LanguageProvider>
    </>
  );
}
