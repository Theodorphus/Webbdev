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
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[130px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 pb-24">
        {/* Brödsmula */}
        <nav className="mb-8 text-xs text-white/40" aria-label="Brödsmula">
          <Link href="/" className="transition-colors hover:text-white/70">
            Hem
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-white/60">Blogg</span>
        </nav>

        <p className="eyebrow">Blogg</p>
        <h1 className="font-display mt-3 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
          Guider om hemsidor & webbutveckling
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65">
          Konkreta tips om hemsidor, SEO och pris — så att du kan fatta smarta
          beslut för ditt företags närvaro online.
        </p>

        {/* Inläggslista */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blogg/${post.slug}`}
              className="card-spotlight group flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/5"
            >
              <div className="flex items-center gap-3 text-[11px] text-white/40">
                <span className="rounded-full border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-indigo-400">
                  {post.tag}
                </span>
                <span>{post.readingMinutes} min läsning</span>
              </div>
              <h2 className="font-display mt-4 text-lg font-bold text-white/90 transition-colors group-hover:text-white">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                {post.description}
              </p>
              <time
                dateTime={post.published}
                className="mt-5 text-xs text-white/35"
              >
                {formatDate(post.published)}
              </time>
            </Link>
          ))}
        </div>

        {/* Tillbaka */}
        <div className="mt-12 text-sm text-white/50">
          <Link href="/" className="transition-colors hover:text-indigo-300">
            ← Till startsidan
          </Link>
        </div>
      </div>
    </main>
  );
}
