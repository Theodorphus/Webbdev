import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { faqItems } from "./faq";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://webbdev.se";

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
      addressCountry: "SE",
    },
    areaServed: { "@type": "Country", name: "Sverige" },
    sameAs: [
      "https://www.linkedin.com/in/theo-h%C3%A5kansson-30b112114/",
      "https://www.facebook.com/theo.hakansson.5/",
    ],
    founder: { "@type": "Person", name: "Theodor" },
    knowsAbout: ["Webbutveckling", "Next.js", "React", "SEO", "E-handel"],
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://webbdev.se",
  ),
  title: "Webbdev Studio — Modern webbutveckling",
  description:
    "Jag bygger snabba, moderna och konverteringsoptimerade hemsidor för företag. Next.js, React, Tailwind. Leverans på 3–7 dagar.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#06060f] text-[#e8eaf6]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="scroll-progress" aria-hidden="true" />
        {children}
        <div className="noise-overlay" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  );
}
