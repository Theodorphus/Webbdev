import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "./i18n/LanguageProvider";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
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
  metadataBase: new URL(SITE_URL),
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
  // Statisk OG-bild finns i app/opengraph-image.jpg (1200×630).
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050509",
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
      <body className="min-h-full flex flex-col bg-[#050509] text-[#ededf2]">
        <div className="scroll-progress" aria-hidden="true" />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <div className="noise-overlay" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  );
}
