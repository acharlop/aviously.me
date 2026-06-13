# ECSFood.com — Freelance Web Developer · 🟢 ACTIVE (in progress)

**Status:** Active / in progress as of June 2026 — not in `experience.ts`. Small freelance gig.
**Dates:** ~May 2026 – present (work logged 2026-05-29; dir last touched 2026-06-03). At least 9 build sessions; the migration is **not yet complete** (visual tests still failing as of the last run).
**Client:** ECSFood.com — a **disaster-relief catering company** (currently on WordPress).

> Reconstructed from `~/code/ecsfood.com/` (`HANDOFF.md`, `PLAN.md`, `MIGRATION_STATUS.md`, `fixes.md`). Git is lightly committed (2 commits) — this was driven through documented agent sessions rather than per-commit history.

## What it is

Rebuild the WordPress site as a **pixel-accurate static Astro site** deployed to Netlify, verified by **Playwright visual-regression tests** against the live WordPress site at 4 breakpoints (375 / 768 / 1280 / 1536).

## Tech & approach

- **Astro 6** (Content Layer collections), **Tailwind** (brand tokens: `#ef8a1d` orange / `#222222` dark, Arial stack, `@tailwindcss/typography`), `astro:assets` for build-time WebP optimization
- **Playwright** visual regression: 72 live-site baselines captured *before* building, a migration reporter that writes `MIGRATION_STATUS.md`, cookie/overlay handling so screenshots aren't corrupted
- 26 pages, 10 shared components (Nav, Footer, Hero, StatsBar, ServiceCard, CaseStudyCard, Testimonials, PartnerLogos, CTABanner, ContactForm), content collections for services / case-studies / blog
- Methodical migration: extracts the real enqueued theme stylesheet (not scraped inline styles), matches Astro route slugs to live URLs, dropdown hover bridges, `::after` underline animations

## Notes for the resume

Honest framing: this is a focused **WordPress-to-Astro migration with automated visual-parity testing** — a good concrete example of static-site/JAMstack work and a rigorous testing approach, even though it's a small engagement still in progress. Could fold into a "Freelance" entry rather than stand alone.
