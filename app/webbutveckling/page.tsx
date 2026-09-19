import type { Metadata } from "next";
import Link from "next/link";
import { orter } from "./orter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se";

// Indexsida för de lokala landningssidorna. Utan den ger /webbutveckling 404
// trots att undersidorna finns — dålig intern länkning och trasig brödsmula.
export const metadata: Metadata = {
  title: "Webbutveckling i Västsverige — alla orter",
  description:
    "Webbutveckling för företag i Göteborg, Borås, Skövde och fler orter i Västsverige. Snabba, moderna hemsidor i Next.js till fast pris — leverans på 3–7 dagar.",
  alternates: { canonical: "/webbutveckling" },
  openGraph: {
    title: "Webbutveckling i Västsverige — Webbdev Studio",
    description:
      "Webbutveckling för företag i Göteborg, Borås, Skövde och fler orter i Västsverige. Fast pris, leverans på 3–7 dagar.",
    url: `${SITE_URL}/webbutveckling`,
  },
};

export default function WebbutvecklingIndexPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-28">
      {/* Bakgrundsglöd — matchar ortssidornas känsla */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 pb-24">
        {/* Brödsmula */}
        <nav className="mb-8 text-xs text-muted" aria-label="Brödsmula">
          <Link href="/" className="transition-colors hover:text-foreground/70">
            Hem
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-muted">Webbutveckling</span>
        </nav>

        <h1 className="font-display max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          Webbutveckling i Västsverige
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70">
          Jag bygger snabba, moderna hemsidor för företag i hela Västsverige —
          med bas i Göteborg och kunder från Skaraborg till Halland. Välj din
          ort nedan för lokal information, eller hör av dig direkt så tar vi
          det därifrån.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {orter.map((o) => (
            <Link
              key={o.slug}
              href={`/webbutveckling/${o.slug}`}
              className="card-spotlight rounded-2xl border border-foreground/8 bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:bg-accent/5"
            >
              <h2 className="font-display text-base font-bold text-foreground/90">
                Webbutveckling {o.iNamn}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {o.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-accent/20 bg-surface-raised p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Ser du inte din ort?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Hela processen kan skötas digitalt — videomöten, delade
            designförslag och löpande avstämningar. Jag hjälper företag i hela
            Sverige, oavsett var du sitter.
          </p>
          <Link
            href="/#kontakt"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-on-accent shadow-card transition-all hover:bg-accent-hover"
          >
            Berätta om ditt projekt
          </Link>
        </div>

        <div className="mt-12 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-accent-light">
            ← Till startsidan
          </Link>
        </div>
      </div>
    </main>
  );
}
