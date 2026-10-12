# Yarcone (yarcone.com): CTO (founding engineer) · 🟢 ACTIVE

**Status:** Active as of October 2026, in `experience.ts` and on the resume sheet.
**Dates:** September 2026 to present.
**Company:** Yarcone, dispatch and delivery management for businesses that run their own drivers: office dashboard, native driver app, customer tracking page, WhatsApp updates, five languages including Hebrew and Arabic RTL. Two-person team; the founder built the web MVP alone before Avi joined.

Resume framing: "CTO (founding engineer)" with the team size, not "Co-founder" (founder-type labels cost callbacks). Lead with what was delivered. No numbers, clients, funding, unreleased features, or links or quotes from the private repo in public copy. Tenure is weeks, not months; don't inflate it. Counts, interview stories, and the sensitive list live in the private research note, outside this repo.

<details><summary>For AI</summary>

Evidence behind each public bullet, from the private repo as of 2026-10-12. Features listed here are shipped; anything unreleased stays in the private note.

- **Driver app (native).** `apps/mobile` from a skeleton to v1, on the same tRPC API as the web app. Route, proof-of-delivery and cash logic shared with web through one package. ADR: the driver API changes additively only, the server sets a minimum app version, and a shape guard records every call the app makes. Sentry and PostHog with link tokens scrubbed. Jest unit suite and an on-device e2e suite (Maestro first, replaced by tester.army) with a changed-only mode that runs the flows a change reaches.
- **Connectors.** Written design plan and ADRs, then the beta: Google Sheets and uploaded Excel/CSV orders through one pipeline. Imports run as leased database jobs drained by cron, a pure planning step, idempotent checkpointed batches, a message outbox, per-connection field ownership, undoable Runs, and a Run report.
- **Internationalization.** Organizations outside Israel in any language: currency, time zone, distance unit, week start and formats derived from the organization's country; customers messaged in their own language; five locales. Feature work writes English only, a translator agent fills the rest.
- **Messaging.** Twilio WhatsApp with SMS fallback: templates stored in the database and synced from Twilio, per-organization and per-language template choice with preview, templates written and submitted to Meta from the platform console, per-message cost recorded. Emailed sign-in codes on web and mobile.
- **Engineering system.** AGENTS.md, glossary, coding standards, the multi-role agent pipeline (coder, copywriter, translator, two-axis review, UI review in English and Hebrew before a PR), a signoff gate where every required check is a signoff and only affected lanes run, a local pnpm merge queue, one-command worktrees, hooks that refuse dead code, over-complex functions and scratch files, CI coverage thresholds, migration-drift checks, production deploys only from CI, Oxc and TypeScript 7 migration, Node 24.
- **Observability and privacy.** Traces and per-call timing, people identified by id only, PII masked, tracking links expire, deletes confirmed by email, inquiries purged after a retention period.

Founder's areas: the whole web MVP, the Playwright suite and CI merge gate, most office and web features, the map pages.

Stack: Next.js 16, React 19, TypeScript 7, tRPC 11, TanStack Query/Form/Table, Zod 4, nuqs, Zustand, PostgreSQL on Neon, Drizzle, Better Auth, Tailwind 4, shadcn/ui, next-intl, Expo, React Native, Expo Router, NativeWind, Jest, Google Maps Platform, Google Sheets API, Twilio, Resend, React Email, UploadThing, Sentry, PostHog, Vercel, Node 24, pnpm 12, Turborepo, Oxlint, Oxfmt, GitHub Actions, Playwright, Claude Code.

</details>
