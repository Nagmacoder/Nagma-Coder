# NAGMA.EXE

Portfolio of Nagma, Full Stack Engineer and AI Builder.
Next.js 16 (App Router) · React 19 · TypeScript (strict) · Three.js via React Three Fiber.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
npm run typecheck
```

No environment variables are needed locally. Without `NEXT_PUBLIC_SITE_URL` the site uses
`http://localhost:3000` and marks itself `noindex`.

## Set the production domain (one place)

All absolute URLs (canonical, Open Graph, sitemap.xml, robots.txt, JSON-LD) come from
`NEXT_PUBLIC_SITE_URL`, read only in `src/lib/site.ts`.

- **Netlify:** Site configuration → Environment variables → add `NEXT_PUBLIC_SITE_URL`
  (e.g. `https://your-final-domain.com`, no trailing slash) → trigger a new deploy.
  `NEXT_PUBLIC_*` values are baked in at build time, so changing the domain always needs a redeploy.
- **Optional:** `GOOGLE_SITE_VERIFICATION` = the `content` value of Search Console's HTML-tag method.

After deploying, open these and confirm they show your domain:
`/robots.txt`, `/sitemap.xml`, and the `<link rel="canonical">` in any page's source.

## Where to edit content

| What | File |
| --- | --- |
| Name, links (LinkedIn, GitHub, email), summary | `src/content/profile.ts` |
| Project case studies | `src/content/projects.ts` |
| Skills and their evidence level | `src/content/skills.ts` |
| Employment timeline | `src/content/experience.ts` |
| Resume | put the PDF at `public/resume.pdf` |
| Project screenshots | `public/projects/<slug>/…`, then list them in `projects.ts` |

Search the code for `TODO(Nagma)` and `VERIFY(Nagma)` to find everything that needs your input.
Only add verified facts: the site is written so that empty fields hide UI rather than show placeholders.

## How the 3D scene stays fast

- Headline, text and navigation are Server Components: readable with no JavaScript.
- An SVG illustration fills the hero frame immediately (fixed aspect ratio, so no layout shift).
- The Three.js chunk is loaded only after the browser is idle, and only if WebGL works,
  Save-Data is off and the device reports at least 2 GB of memory.
- Rendering pauses when the scene is off-screen or the tab is hidden; reduced motion renders a single still frame.
- All geometry and textures are procedural (no model or image downloads).

## Google Search Console (after the domain is live)

1. Add a URL-prefix property for the final domain; verify with the HTML tag (`GOOGLE_SITE_VERIFICATION`) or DNS.
2. Sitemaps → submit `sitemap.xml`.
3. URL Inspection → test the homepage → Request indexing.
4. Watch Page indexing and Core Web Vitals over the following weeks.
5. Link the site from LinkedIn (Contact info and Featured), GitHub profile and any articles you publish.
