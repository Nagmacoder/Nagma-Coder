import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CursorAura } from "@/components/CursorAura";
import { profile } from "@/content/profile";
import { isIndexable, siteUrl } from "@/lib/site";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../fonts/fraunces.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/fraunces-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const sans = localFont({
  src: "../fonts/hanken.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

const mono = localFont({
  src: "../fonts/jetbrains.woff2",
  weight: "100 800",
  variable: "--font-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

const defaultTitle = `${profile.name} | Full Stack Engineer (React, Node.js, Next.js) and AI Builder`;
const defaultDescription =
  "Nagma is a Full Stack Engineer with 5+ years in React, Next.js, Node.js and TypeScript, now building Generative AI, RAG and LLM-powered applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: `%s | ${profile.name}` },
  description: defaultDescription,
  applicationName: profile.brand,
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  creator: profile.name,
  keywords: [
    "Nagma",
    "Full Stack Engineer",
    "Full Stack Developer React Node.js",
    "Next.js TypeScript",
    "Generative AI",
    "RAG",
    "LLM applications",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: profile.brand,
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    locale: "en",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription },
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0e0f16",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      {/* Browser extensions (e.g. Grammarly) inject attributes on <body> before hydration. */}
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CursorAura />
        <JsonLd data={{ "@context": "https://schema.org", "@graph": [personJsonLd(), websiteJsonLd()] }} />
      </body>
    </html>
  );
}
