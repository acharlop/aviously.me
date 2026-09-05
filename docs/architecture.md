# Aviously architecture

Aviously is Avi Charlop's portfolio: public work, experience, contact, and a
one-page resume, plus a private learning/workspace area at `/app`.

## Runtime and routes

Astro 5 generates the public pages from `src/pages/`. Bun manages dependencies
and scripts; Tailwind 4 and `src/styles/global.css` supply styles. MDX content
collections in `src/content/` hold case studies and blog posts. Draft blog posts
are excluded from production pages and feeds; the blog is hidden from navigation.

The private app uses React components under `src/components/app/`, mounted through
`src/layouts/AppLayout.astro`, with Convex data and authentication. The contact
form posts to the existing Vercel endpoint in `api/contact.ts` with Turnstile.
PostHog uses a first-party `/ingest` proxy configured in `vercel.json`.

## Content sources

- `src/data/site.ts`: identity, navigation, and shared profile copy.
- `src/data/experience.ts`: full history and the source for text resume exports.
- `src/data/resume-sheet.ts`: fact-checked, shortened sheet copy and accent variants.
- `src/content/projects/`: case-study metadata, links, and MDX bodies.
- `src/content/blog/`: draft and published articles.

The fixed resume sheet intentionally has its own palette and geometry. Its copy
may be shorter than the full history, but must restate existing facts. See
[the resume sheet](design/resume-document.md) for print and export details.

## Visual system

The current system is the paper/ink ledger defined by epic #37. The token source
is `src/styles/global.css`; shared Astro primitives are `SectionBar`, `LedgerRow`,
`TriangleList`, and `NumberTiles`. Pages compose those primitives, while `.prose`
provides long-form reading styles for case studies, blog content, and app markdown.
See [ledger design](design/ledger.md) for geometry and theme behavior.

## Delivery and verification

Vercel builds previews and production from GitHub. The E2E workflow runs
Playwright against successful deployments in desktop Chromium and mobile WebKit.
Its `BASE_URL` uses the deployed URL; a Vercel automation bypass secret permits
preview access. A passing deployment alone is insufficient: wait for the e2e
check that attaches after deployment.

Local `bun run build` performs Astro diagnostics and a production build.
`bun scripts/make-og.ts` regenerates the 1200×630 social preview from the site
identity, fonts, and ledger tokens without a development server.
