import type { Metadata } from "next";
import TjansterContent from "./TjansterContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se";

export const metadata: Metadata = {
  title: "Tjänster & teknik",
  description:
    "Vad jag levererar: moderna hemsidor i Next.js, SEO, e-handel via Stripe, admin-panel och mer — till fast pris. Och varför en gammal hemsida kostar dig affärer.",
  alternates: { canonical: "/tjanster" },
  openGraph: {
    title: "Tjänster & teknik — Webbdev Studio",
    description:
      "Vad jag levererar: moderna hemsidor i Next.js, SEO, e-handel, admin-panel och mer — till fast pris.",
    url: `${SITE_URL}/tjanster`,
  },
};

export default function TjansterPage() {
  return <TjansterContent />;
}
