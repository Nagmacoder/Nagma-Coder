/**
 * Central site URL configuration.
 *
 * The production domain is read from ONE environment variable: NEXT_PUBLIC_SITE_URL.
 * Every absolute URL on the site (canonical, Open Graph, sitemap, robots, JSON-LD)
 * is built from `siteUrl` / `absoluteUrl()` below. Never hardcode a domain elsewhere.
 */

const LOCAL_FALLBACK = "http://localhost:3000";

function normalizeUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    // Origin only: no trailing slash, no path.
    return url.origin;
  } catch {
    return null;
  }
}

const configured = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL);

/** Absolute origin of the site, e.g. https://example.com (no trailing slash). */
export const siteUrl: string = configured ?? LOCAL_FALLBACK;

/**
 * True only when a real public domain is configured.
 * When false, the site renders normally but tells search engines not to index it,
 * so a preview build can never be indexed with localhost URLs.
 */
export const isIndexable: boolean =
  configured !== null && !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(configured);

/** Build an absolute URL for a site path: absoluteUrl("/projects") */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}

if (process.env.NODE_ENV === "production" && !configured) {
  console.warn(
    "\n[nagma.exe] NEXT_PUBLIC_SITE_URL is not set. Falling back to " +
      LOCAL_FALLBACK +
      " and marking the site noindex. Set it in your hosting provider's environment variables before going live.\n",
  );
}
