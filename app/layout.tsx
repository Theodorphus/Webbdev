import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { faqItems } from "./faq";
import { LanguageProvider } from "./i18n/LanguageProvider";
import Chatbot from "./components/Chatbot";
import ExitIntent from "./components/ExitIntent";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se";

// Google Ads-konverteringsspårning. Hämta ditt ID under Verktyg → Konverteringar
// i Google Ads (formatet är "AW-XXXXXXXXXX"). Läggs i .env.local som
// NEXT_PUBLIC_GOOGLE_ADS_ID så det inte behöver hårdkodas.
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/** Strukturerad data för Google: företaget + FAQ. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Webbdev Studio",
    description:
      "Modern webbutveckling för företag — snabba, konverteringsoptimerade hemsidor byggda med Next.js. Leverans på 3–7 dagar till fast pris.",
    url: SITE_URL,
    email: "webbdevstudio@gmail.com",
    telephone: "+46709525822",
    image: `${SITE_URL}/opengraph-image`,
    priceRange: "2000–6000 SEK",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Västra Gunnesgärde 41",
      postalCode: "417 47",
      addressLocality: "Göteborg",
      addressRegion: "Västra Götaland",
      addressCountry: "SE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 57.7089,
      longitude: 11.9746,
    },
    areaServed: [
      { "@type": "City", name: "Göteborg" },
      { "@type": "City", name: "Skövde" },
      { "@type": "Country", name: "Sverige" },
    ],
    sameAs: [
      "https://www.linkedin.com/in/theo-h%C3%A5kansson-30b112114/",
      "https://www.facebook.com/theo.hakansson.5/",
    ],
    founder: { "@type": "Person", name: "Theodor" },
    knowsAbout: ["Webbutveckling", "Next.js", "React", "SEO", "E-handel"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "4",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Martin Bucko" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Otroligt bra service och resultatet blev en ny hemsida över förväntan! Kan varmt rekommendera denna tjänst.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Michael Håkansson" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Jag fick hjälp med att designa en sida relaterad till mitt spelföretag. Mycket trevlig och noggrann utförd tjänst. Tack Webbdev!",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display-font för rubriker — ger dem egen karaktär mot den neutrala brödtexten.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se",
  ),
  // Title-template: undersidor sätter sin egen titel, startsidan använder default.
  title: {
    default: "Webbutveckling i Göteborg — Webbdev Studio",
    template: "%s | Webbdev Studio",
  },
  description:
    "Webbutveckling i Göteborg. Jag bygger snabba, moderna och konverteringsoptimerade hemsidor för företag — Next.js, React, Tailwind. Leverans på 3–7 dagar till fast pris.",
  keywords: [
    "webbutveckling Göteborg",
    "webbdesign Göteborg",
    "webbproduktion Göteborg",
    "hemsida företag Göteborg",
    "webbutveckling Skövde",
    "webbyrå",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "sv-SE": "/",
      "en-US": "/en",
    },
  },
  // OG-bilden genereras automatiskt av app/opengraph-image.tsx (1200×630).
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06060f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#06060f] text-[#e8eaf6]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GOOGLE_ADS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-gtag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
              `}
            </Script>
          </>
        )}
        <div className="scroll-progress" aria-hidden="true" />
        <LanguageProvider>
          {children}
          <Chatbot />
          <ExitIntent />
        </LanguageProvider>
        <div className="noise-overlay" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  );
}
