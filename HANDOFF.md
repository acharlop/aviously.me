# Handoff

Updated 2026-07-02 after an autonomous ticket-clearing loop. The previous handoff
described the abandoned TanStack "Aviously Voice" era; that direction is dead —
the shipped site is a straight Astro 5 portfolio (live since 2026-06-11).

## Current state

- **Stack**: Astro 5 + Tailwind 4, Bun, Playwright e2e (94 tests, all green).
  `bun run dev / build / e2e / format`, `bun run resume:pdf` regenerates the PDF.
- **Resume system (issue #27, mostly done)**: `src/data/experience.ts` is the
  single source of truth. `src/lib/resume-export.ts` shapes it via knobs in
  `src/data/resume-options.ts` (defaults are a verified no-op; `one-page` preset
  exists) and feeds `/resume` (+ printed PDF), `/resume.md`, `/resume.txt`,
  `/resume.json` (JSON Resume v1.0.0). Only the `?variant=` stretch remains.
- **Print/PDF**: print styles force the light palette globally (site defaults
  dark); `public/resume.pdf` is 4 pages with a contact line, regenerated via
  `scripts/make-resume-pdf.ts`.
- **Case studies**: all 11 have live sidebar links (#18 closed). closer.mdx is
  the strongest entry (#22 closed).

## Task queues

- **`TODO.md` (gitignored, repo root)** — Avi's human-in-the-loop queue, easiest
  first: LinkedIn link, OG approval, ECSFood decision, featured-project curation,
  then the voice/writing work (issues #2–#7, #21) and bigger decisions (#15).
  Workflow: pull the top item, do it, delete it.
- **Open GitHub issues**: #2–#7, #11, #12, #15, #17, #21 (all need Avi),
  #27 (stretch only), #28 (vendoring agents/skills — needs scoping).

## Gotchas

- ECSFood bullets are deliberately phrased in-progress ("Rebuilding…") — the
  migration at `~/code/ecsfood.com` stalled with 0/5 visual tests passing.
  Don't claim it shipped until it ships (TODO.md item 3).
- The mobile-safari nav e2e test had a hydration-race flake; fixed with a
  `toPass()` retry in `e2e/navigation.spec.ts`. If it flakes again, the cleaner
  fix is a readiness attribute set by the header script.
- md/txt/json endpoints are `output: 'static'` — Content-Type headers in the
  route files are effectively dead code; the host picks MIME types.
- Job history sources: `docs/jobs/*.writeup.md` (reconstructed per-role detail,
  useful for strengthening case studies / issue #5).
