# Handoff

## Goal

Build `aviously.me` as Avi's **personal portfolio website**: who he is, what he's
built, and how to reach him. A soft "I take on work" angle is present but
**secondary** to the portfolio. The whole site speaks in one snarky voice — the
**Aviously Voice** — whose signature tic is the word "obviously" spelled
**aviously** (a pun on Avi's name and the `aviously.me` domain).

This is a deliberate pivot away from the earlier "business front door / embedded
automation partner / duct-tape work" framing. We are cleaning house and starting
again on **neonbladeui** components (https://neonbladeui.neuronrush.com/).

## Current Progress (this session)

Scope this session was **voice + copy basics only**. Designs are a separate session.

- Reframed `CONTEXT.md` from business-services to **portfolio-first, services secondary**.
- Added glossary terms: **Aviously Voice**, **The Hook**, **Fully-Formed AI-Assisted Human**;
  sharpened **AI-Assisted Human** into the lead professional positioning.
- Locked the core copy (canonical "obviously"; renders "aviously" via the swap):
  - **Hero title** (pinned): `Hi, aviously I'm Avi.`
  - **Hero subhead**: `A fully-formed AI-assisted human who builds solutions that work and cares how they turn out. Aviously.`
  - **About**: `I build real things and use the robots without letting them write the personality. Aviously.`
  - **Work badge**: `Open to interesting challenges.`
- Implemented the mechanism:
  - `src/lib/aviously.ts` — `aviouslySwap(text, enabled)`: case-preserving obviously↔aviously swap.
  - `src/content/voice.ts` — canonical copy + `renderCopy(copy, hookEnabled)`; supports
    **pinned** copy (always swapped, e.g. the hero title) and keeps a `Voice`/`Record`
    seam so more voices/personas can return later without rewriting content.
- `bun run check` passes.

## Key Decisions

- **Portfolio-first, services secondary** (not a client-intake funnel).
- **One voice now, hooks left in** — the multi-persona switcher is gone for now but the
  content shape leaves a seam to bring it back.
- **AI-assisted human** is the lead identity (road-less-travelled vs. "AI engineer"),
  anchored by concrete senior-dev-who-builds proof.
- The **aviously swap defaults ON**, with a toggle ("The Hook") to revert to "obviously".
  Proper-name puns (hero title) are **pinned** on regardless of the toggle.

## What's Stale / To Be Replaced

These hold the OLD business/duct-tape direction and get rebuilt next session:

- `src/routes/index.tsx` — old intake/duct-tape landing page. Rebuild on neonbladeui,
  rewire to `src/content/voice.ts`.
- `src/content/personas.ts` — old multi-persona business copy. Left in place only so the
  build stays green; **delete during the rebuild** (superseded by `voice.ts`).
- `src/routes/designs.*` and `src/content/design-concepts.ts` — internal design-exploration
  routes. Hide/remove before any public deploy.
- `CONTEXT.md` still contains earlier business-services terms (Embedded Automation Partner,
  Duct-Tape Work, Experiential Input, Business Type, The Guy, Human Persona,
  Owner-Operated Business, Supaplex-Inspired World). Prune/repurpose these as the portfolio
  direction firms up.

## Next Steps (design session)

1. Inventory the **neonbladeui** component catalog (not yet done) — components only, for now.
2. Rebuild the homepage on those components, wired to `voice.ts` via `renderCopy`.
3. Add a visible **Hook** toggle if we want users to switch aviously↔obviously.
4. Decide portfolio content: which of Avi's projects become entries.
5. Delete `personas.ts` and the old `index.tsx` design once the rebuild stands on its own.
6. Decide whether Convex/PostHog scaffolding stays for a portfolio (currently optional, env-gated).

## Notes

- Stack: Bun + TanStack Start + Vite + React (see `docs/adr/0001-...`).
- Convex (`convex/`) and PostHog are scaffolded but env-gated and inactive without env vars.
- Run `bun run dev`, `bun run check`, `bun run build` as usual.
