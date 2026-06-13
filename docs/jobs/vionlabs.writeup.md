# Vionlabs — Team Lead

**Dates:** February 2025 – February 2026 (resume). *Your own commits in the main monorepo run March 5 2025 → December 29 2025; the repo itself has team commits through April 2026.*
**Location:** Remote
**Resume summary:** Greenfield customer portal and multi-source data platform for enterprise media-tech customers.

> Reconstructed from `~/code/vionlabs/*` (GitLab `Vionlabs1/*`). The product is a media-catalog management portal for enterprise media-tech / streaming customers, built on top of Vionlabs' content-fingerprinting platform.

## What it actually was

A greenfield **Turborepo monorepo** (`Vionlabs1/user-interface/vionlabs`) — a customer-facing portal that lets media companies browse, filter, tag, and organize a large video **catalog**, with multi-tenant orgs/customers and a data-sync layer feeding the portal from Vionlabs' upstream fingerprinting systems.

You were the most active human author after the founding engineer: **~460–492 commits** (2nd of ~12 contributors), spanning March–December 2025. Team of ~4 engineers (Nati, Mushtaq, Bohdan, Diego + you).

## Monorepo shape (real package list)

- **apps/**: `app` (the Next.js portal), `docs` (Fumadocs site), `public-api` (Fastify), `sync` + `sync-live` (Fastify data-sync services), `email`, `storybook`
- **packages/**: `api` (tRPC), `database` (Drizzle ORM), `auth`, `m2m-auth` (machine-to-machine), `design-system`, `analytics`, `feature-flags`, `notifications`, `observability`, `storage`, `tmdb` (TMDB integration), `seo`, `validators`, `testing`, `assets`, `utils`

Dependency versions pinned centrally via pnpm/bun `catalog:`.

## Tech stack (confirmed)

- **Frontend:** Next.js (15 / React 19), TypeScript, a Figma-driven Tailwind design system + Storybook
- **API:** tRPC (type-safe app API) + Fastify (`public-api`, sync services) + Drizzle ORM on Cloud SQL Postgres
- **Docs:** Fumadocs (`fumadocs-ui`/`-core`/`-mdx` 15.x)
- **Auth:** custom auth package, **WorkOS SSO** (admin settings), API-key scopes, machine-to-machine auth
- **Infra:** **GCP via Terraform** — Cloud Run (v2), Cloud SQL Postgres, Pub/Sub, Eventarc triggers, VPC access connectors, Artifact Registry, Secret Manager, Storage buckets, ~73 service accounts + IAM. **GitLab CI/CD** (`gitlab-ci.tf`, registry).
- Deployed to Vercel (the `push-env-to-vercel.sh` helper).

## Features you built (from commit history)

- **Catalog browsing & management:** asset list/table views, asset-by-id with tags, catalog switcher with asset counts, catalog stored in cookie, default catalog on org creation
- **Smart lists & recipes:** "smart-list" results, recipes DB table + validators, unique title generation for recipes/smart-lists
- **Filtering & sorting:** filter-group component, filter-group viewer, sorting by title/release-year/runtime, basic + advanced filtering
- **Tagging:** tag/tag-group components, tag-group overflow counts, tags sourced from FPP (fingerprint platform)
- **Multi-tenant:** customer + catalog DB modeling, catalog-entitlement check helpers, org creation, user upsert webhook
- **Data sync:** `sync` / `sync-live` Fastify services that pull data into the DB for the app (the "multi-source data sync pipeline")
- **Auth/admin:** WorkOS SSO widget, API-key scopes, Google auth, Terraform-managed per-teammate roles
- **Design system:** typography + colors imported from Figma into the Tailwind config with Storybook stories, badge/tag/tabs/switch components
- CodeRabbit configured for automated PR review.

## Other Vionlabs repos in `~/code/vionlabs/`

These are pre-existing system repos you worked in/around (date ranges are full repo history, not all yours):

- `united-portal` — the **legacy** portal (2022–2025, 1155 commits, also has Terraform). Likely the predecessor the greenfield `vionlabs` replaced.
- `vionlabs-results` (2021–2025) — fingerprint results service
- `catalog-event-model`, `report` — catalog/reporting system services (Dockerized, Terraform)
- `analytics-proxy` — small Next.js 15 analytics proxy (April 2025)
- `timeline-oneoff` — Vite/React video-components one-off (Feb 2025)
- `gitlab-ci-registry` — shared CI templates

## Suggested resume bullets (sharper than current)

- Led a 4-engineer team building a greenfield, multi-tenant media-catalog portal as a Turborepo monorepo (Next.js 15 / React 19, tRPC, Fastify, Drizzle/Postgres), authoring ~480 commits as the second-most-active contributor.
- Built the data-sync layer (`sync`/`sync-live` Fastify services) unifying content from Vionlabs' fingerprinting platform into the customer-facing portal.
- Owned GCP infrastructure end-to-end in Terraform — Cloud Run, Cloud SQL, Pub/Sub, Eventarc, Secret Manager, VPC, Artifact Registry — with GitLab CI/CD and Vercel deploys.
- Built a Figma-driven Tailwind design system with Storybook, plus catalog browsing, smart-lists/recipes, filtering/sorting, tagging, and WorkOS SSO + scoped API keys for enterprise customers.
- Stood up a Fumadocs developer-docs site and a public Fastify API for customer integrations.
