# Closer (closer.earth) — Contract Full-Stack Engineer · 🟢 ACTIVE DEVELOPMENT

**Status:** Active as of June 2026 — not yet in `experience.ts`. Add it.
**Dates:** May 2026 – present (first commit 2026-05-29; `TODO.md` logs 32h across 2026-05-29 → 2026-06-05; latest commit 2026-06-13).
**Client:** Closer — the platform behind [closer.earth](https://closer.earth) / Traditional Dream Factory (TDF), a system for running regenerative co-living / co-housing communities ("villages"): bookings, tickets, events, payments, member subscriptions.

> Reconstructed from `~/code/closer/*` → GitHub `closerdao/*`. You contribute to the existing platform (`closer-api`, `closer-ui`) and you built a new greenfield provisioning system (`closer-procurement`) that is the bulk of the work.

## The flagship: `closer-procurement` (greenfield, ~217 of your commits)

**One-click Closer "village" deployment.** A single typed config provisions a complete community instance across live cloud providers, with durable, resumable state and full teardown. Three phases run green against real providers: **api-build**, **site-build**, **destroy**.

**Architecture — Bun workspace:**
- `packages/validators` — shared **Zod** schemas, env validation (**t3-env**), centralized resource naming / domain derivation (`VILLAGE_SLUG`, `BASE_DOMAIN`, `CUSTOM_DOMAIN`)
- `packages/sdk` — provider adapters: **DigitalOcean** App Platform, **Vercel**, **Mailgun**, **Firebase** Auth, **Stripe** Connect
- `packages/db` — durable provisioning state via **Drizzle ORM**, **PGlite** locally
- `packages/workflows` — provisioning/teardown as a **step DAG → stages**, CLI, e2e harness
- `apps/tui` — **Ink** terminal UI to provision / status / continue / delete villages
- `apps/api` — **Elysia** HTTP API with GitHub bearer-token auth + NDJSON-streamed mutation endpoints

**Engineering highlights (from commit log):**
- Idempotent, resumable provisioning — workflows can `continue`/`redo`/`reset`/`inspect`; polls Vercel cert status before probing the site
- Live-provider **e2e workflow harness** with a documented runbook (`docs/workflows-e2e-runbook.md`)
- **TUI distributed as bun-compiled single-file binaries** (macOS arm64/x64, Linux x64) published to GitHub Releases on every `tui-v*` tag; PTY-based e2e tests via `@microsoft/tui-test` / node-pty
- HTTP `WorkflowClient` so the TUI drives the remote procurement API
- "Mock Village" mode with mock providers for testing without spending real cloud resources
- Migrated package manager pnpm → **Bun**; CI per-package (typecheck/test/build)
- Disciplined repo: `CONTEXT.md` domain glossary (village, provisioning, settings, entitlements), `docs/adr/` ADRs, CodeRabbit/CI, extensible "add a provider" guide (incl. a future smart-contract deploy step that feeds frontend env vars)

## Existing-platform contributions

- **`closer-api`** (3 commits, 2026-06-05→10) — the core platform API: Node + **MongoDB**, **Stripe**, **Twilio**. Bookings/tickets/events domain (since 2019). Work included CI fixes and an ENV-var/linting PR.
- **`closer-ui`** (7 commits, 2026-06-08→10) — **Turborepo** monorepo, **Next.js 15**; `apps/tdf` (Traditional Dream Factory) + reusable `closer` package deployed across multiple property/community domains.

## Suggested resume bullet

- **Closer (closer.earth) — Contract Full-Stack Engineer (2026):** Built a greenfield "one-click village" provisioning system (Bun monorepo, TypeScript) that stands up a complete community platform instance across DigitalOcean, Vercel, MongoDB, Mailgun, Firebase, and Stripe Connect from a single typed config — with idempotent/resumable workflows, an Ink TUI distributed as compiled binaries, an Elysia control API, and live-provider e2e tests. Also shipped fixes to the core Next.js 15 / Node + MongoDB platform.
