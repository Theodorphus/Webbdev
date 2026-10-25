import type { Metadata } from "next";
import TjansterContent from "./TjansterContent";
import { sharedOpenGraph } from "../lib/metadata";

export const metadata: Metadata = {
  title: "Tjänster & teknik",
  description:
    "Vad jag levererar: moderna hemsidor i Next.js, SEO, e-handel via Stripe, admin-panel och mer — till fast pris. Och varför en gammal hemsida kostar dig affärer.",
  alternates: { canonical: "/tjanster", languages: { "sv-SE": "/tjanster", "en-US": "/en/services" } },
  openGraph: {
    ...sharedOpenGraph(),
    title: "Tjänster & teknik — Webbdev Studio",
    description:
      "Vad jag levererar: moderna hemsidor i Next.js, SEO, e-handel, admin-panel och mer — till fast pris.",
    url: "/tjanster",
  },
};

export default function TjansterPage() {
  return <TjansterContent />;
}
