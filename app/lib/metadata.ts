import type { Lang } from '../i18n/dictionary';

// Next slår ihop metadata grunt: en sida som sätter openGraph ersätter
// layoutens openGraph helt — även delningsbilden. Varje sida sprider därför
// in de här fälten och lägger sin egen titel, beskrivning och url ovanpå.
export function sharedOpenGraph(lang: Lang = 'sv') {
  return {
    type: 'website' as const,
    siteName: 'Webbdev Studio',
    locale: lang === 'en' ? 'en_US' : 'sv_SE',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Webbdev Studio – Genomtänkta hemsidor. För företag som vill växa.',
      },
    ],
  };
}
