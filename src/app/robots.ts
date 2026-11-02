import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Until a real domain is configured, keep crawlers out so localhost URLs never get indexed.
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
