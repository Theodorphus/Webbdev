import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se";

export const metadata: Metadata = {
  title: "Blogg — Guider om hemsidor, webbutveckling och SEO",
  description:
    "Guider och tips om hemsidor, webbutveckling, SEO och pris. Lär dig vad som gör en hemsida snabb, synlig på Google och lönsam för ditt företag.",
  alternates: { canonical: "/blogg" },
  openGraph: {
    title: "Blogg — Webbdev Studio",
    description:
      "Guider och tips om hemsidor, webbutveckling, SEO och pris för företag.",
    url: `${SITE_URL}/blogg`,
  },
};

// Sorterar nyast först.
const sorted = [...posts].sort((a, b) => b.published.localeCompare(a.published));

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BloggIndex() {
  // Blog-schema som listar inläggen för Google.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Webbdev Studio — Blogg",
    url: `${SITE_URL}/blogg`,
    blogPost: sorted.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.published,
      url: `${SITE_URL}/blogg/${p.slug}`,
    })),
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Bakgrundsglöd — matchar startsidans känsla */}
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
          <span className="text-muted">Blogg</span>
        </nav>

        <p className="eyebrow">Blogg</p>
        <h1 className="font-display mt-3 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          Guider om hemsidor & webbutveckling
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          Konkreta tips om hemsidor, SEO och pris — så att du kan fatta smarta
          beslut för ditt företags närvaro online.
        </p>

        {/* Inläggslista */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blogg/${post.slug}`}
              className="card-spotlight group flex h-full flex-col rounded-2xl border border-foreground/8 bg-surface p-7 transition-all duration-300 hover:border-accent/40 hover:bg-accent/5"
            >
              <div className="flex items-center gap-3 text-[11px] text-muted">
                <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-sans text-accent-light">
                  {post.tag}
                </span>
                <span>{post.readingMinutes} min läsning</span>
              </div>
              <h2 className="font-display mt-4 text-lg font-bold text-foreground/90 transition-colors group-hover:text-foreground">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {post.description}
              </p>
              <time
                dateTime={post.published}
                className="mt-5 text-xs text-muted"
              >
                {formatDate(post.published)}
              </time>
            </Link>
          ))}
        </div>

        {/* Tillbaka */}
        <div className="mt-12 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-accent-light">
            ← Till startsidan
          </Link>
        </div>
      </div>
    </main>
  );
}
