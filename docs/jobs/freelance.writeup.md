# Freelance — Full-Stack Developer

**Dates:** October 2022 – June 2023 (resume). *Note: whocards is still being worked on (commits through June 2026), so "continue to build" is accurate.*

> Reconstructed from `~/code/whocards/*`, `~/code/j3d-ai*`, and `~/code/xtz/*`. This entry covers four threads: **whocards** (owned product, ongoing), **J3D.AI**, and the **Tezos/Web3 NFT** work (circa.art + proofofperformance.xyz).

---

## 1. whocards.cc 🟢 (owned product, still active)

A physical **conversation-card product** you co-created and own, sold online with automated fulfillment.

- **Main repo:** `whocards/website` — **Astro** + **Stripe** + **Netlify** (SSR via `@astrojs/netlify`/`node`, React islands, MDX, sitemap). **252 commits, ~209 yours**, 2023-01 → **2026-06-12** (active).
- Built a full **e2e purchase + shipping-address checkout flow** with Stripe, invoice emails, webhook handling, country→country-code transforms, and validation-gated forms.
- Multiple card decks / localized question sets (e.g. "Hajnalig" variant, 160+ questions), image/landing pages, preorder + Open Collective flows.
- Earlier explorations in the same workspace: `website-next` / `website-next-15` (Next.js rewrites), `payload` (Payload CMS), `cms`, and `meet` (87 commits — a Google Meet add-on integration, 2024).
- The **two fulfillment providers** (from git history): **Zenfulfillment** first, then migrated to **Egon** (`#29` Egon shipping integration, Jan 2025; `#30` remove zen shipping, Jun 2024). Egon (`src/server/egon/`) routes orders to regional carriers (DHL/DPD/GLS/Speedy/Postnord) via a country→carrier map.

**Resume bullet:** Co-created and continue to operate whocards.cc, an owned conversation-card product — Astro + Stripe storefront on Netlify with an automated e2e checkout/shipping/fulfillment flow and multiple localized card decks.

---

## 2. J3D.AI

A real-time, AI-powered tool that records live workshops/sessions, transcribes them, and generates summaries with actionable next steps. Production at **app.j3d.ai** (staging dev.j3d.ai).

- **Stack:** **T3 Stack** — Next.js 13, **tRPC**, **Prisma**, TanStack Query, Zod, Tailwind, pnpm. **Supabase** + **GCP** (Cloud Storage buckets, separate prod/dev), **Terraform** infra (`j3d-ai-infra`).
- **198 commits, ~197 yours**, 2023-06 → 2023-10.
- **What you built (commit history):** live audio recording + playback, **ffmpeg audio splitting** and an "av-stream" capture strategy, transcription pipeline, a transcripts tab, summary creation with selectable output types, editable notes synced from localStorage, file uploads, toggling recordings by stage/session, analytics, and observability (Sentry + Axiom logging).
- Separate `j3d-ai_audio` (audio-processing service) and `j3d-ai_research` (DB dumps / prod data work) repos.

**Resume bullet:** Built J3D.AI, a real-time AI workshop-summary MVP (T3 stack: Next.js/tRPC/Prisma, Supabase, GCP+Terraform) — live audio capture, ffmpeg-based transcription pipeline, and AI-generated summaries with editable notes and next steps.

---

## 3. Tezos / Web3 NFT work (circa.art + proofofperformance.xyz)

Contract work on **Tezos** NFT infrastructure, largely through **tzConnect Berlin** and **fxhash** stacks (`~/code/xtz/`). This is more substantial than the resume implies — real, sustained contributions to production NFT platforms, not just demos.

- **`marina`** (tzConnect Berlin) — **211 of your commits** (2022-06 → 2023-01). A Tezos NFT monorepo.
- **`live-minting`** (fxhash) — **43 of your commits**. Tooling + admin panel (Next.js) to define, control, and monitor **live on-chain minting events** — this is the engine behind **proofofperformance.xyz**, the live-DJ-event Tezos minting experience.
- **`framebot`** (tzConnect Berlin) — 9 commits, video-frame tooling.
- **`kanvas`** (tzConnect Berlin) — **Kanvas Whitelabel NFT Store** + admin, the platform pattern behind **circa.art**, the NFT marketplace for purchasing video frames.
- Tech: Tezos, **Taquito**, Beacon wallet, Next.js front-ends + Node back-ends.

**Resume bullets:**
- Built proofofperformance.xyz, a live on-chain NFT minting experience on Tezos for a DJ event, using fxhash live-minting tooling (admin panel + real-time mint monitoring).
- Contributed to circa.art, a Tezos NFT marketplace (Kanvas whitelabel store) letting users purchase video frames during a high-profile launch — 200+ commits across the underlying tzConnect Berlin NFT platform (`marina`, `framebot`).
