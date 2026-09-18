import type { MetadataRoute } from "next";
import { orter } from "./webbutveckling/orter";
import { customerCases } from "./portfolio/cases";
import { posts } from "./blogg/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...["pricing", "services", "portfolio"].map(path => ({ url: `${SITE_URL}/en/${path}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...customerCases.map(item => ({ url: `${SITE_URL}/portfolio/${item.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    {
      url: `${SITE_URL}/gratis-demo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Tjänster & teknik.
    {
      url: `${SITE_URL}/tjanster`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Portfolio.
    {
      url: `${SITE_URL}/portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Priser.
    {
      url: `${SITE_URL}/priser`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Lokala landningssidor — viktiga för lokal SEO.
    {
      url: `${SITE_URL}/webbutveckling`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...orter.map((o) => ({
      url: `${SITE_URL}/webbutveckling/${o.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Blogg — index + inlägg.
    {
      url: `${SITE_URL}/blogg`,
      lastModified,
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
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
