import type { MetadataRoute } from "next";
import { orter } from "./webbutveckling/orter";
import { customerCases } from "./portfolio/cases";
import { posts } from "./blogg/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified where no actual content revision date is maintained.
  return [
    ...["pricing", "services", "portfolio"].map(path => ({ url: `${SITE_URL}/en/${path}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...customerCases.map(item => ({ url: `${SITE_URL}/portfolio/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    {
      url: `${SITE_URL}/gratis-demo`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/en`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Tjänster & teknik.
    {
      url: `${SITE_URL}/tjanster`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Portfolio.
    {
      url: `${SITE_URL}/portfolio`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Priser.
    {
      url: `${SITE_URL}/priser`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Lokala landningssidor — viktiga för lokal SEO.
    {
      url: `${SITE_URL}/webbutveckling`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...orter.map((o) => ({
      url: `${SITE_URL}/webbutveckling/${o.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Blogg — index + inlägg.
    {
      url: `${SITE_URL}/blogg`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blogg/${p.slug}`,
      lastModified: new Date(p.published),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/integritetspolicy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
