import type { Lang } from '../i18n/dictionary';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.webbdev.se';

type FaqItem = { q: string; a: string };

export function getHomeSchema(lang: Lang, faqItems: FaqItem[]) {
  const english = lang === 'en';

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Webbdev Studio',
      description: english
        ? 'Modern web development for businesses — fast, conversion-focused websites built with Next.js.'
        : 'Modern webbutveckling för företag — snabba, konverteringsoptimerade hemsidor byggda med Next.js.',
      url: english ? `${SITE_URL}/en` : SITE_URL,
      email: 'webbdevstudio@gmail.com',
      telephone: '+46709525822',
      image: `${SITE_URL}/opengraph-image.jpg`,
      priceRange: '2000+ SEK',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Västra Gunnesgärde 41',
        postalCode: '417 47',
        addressLocality: 'Göteborg',
        addressRegion: 'Västra Götaland',
        addressCountry: 'SE',
      },
      areaServed: [
        { '@type': 'City', name: 'Göteborg' },
        { '@type': 'City', name: 'Skövde' },
        { '@type': 'Country', name: 'Sverige' },
      ],
      sameAs: [
        'https://www.linkedin.com/in/theo-h%C3%A5kansson-30b112114/',
        'https://www.facebook.com/theo.hakansson.5/',
      ],
      founder: { '@type': 'Person', name: 'Theo Håkansson' },
      knowsAbout: ['Webbutveckling', 'Next.js', 'React', 'SEO', 'E-handel'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];
}
