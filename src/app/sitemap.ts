import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/ai-lab", priority: 0.8 },
    { path: "/skills", priority: 0.7 },
    { path: "/experience", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: "monthly" as const, priority: p.priority })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
