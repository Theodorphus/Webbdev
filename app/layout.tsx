import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Webbdev Studio — Modern webbutveckling",
  description:
    "Jag bygger snabba, moderna och konverteringsoptimerade hemsidor för företag. Next.js, React, Tailwind. Leverans på 3 dagar.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [{ url: "/Og.png" }],
  },
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
