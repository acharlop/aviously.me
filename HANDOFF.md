# Handoff

Updated 2026-07-22 (added the festival-lineup-archive workstream, closed out).
Previous update 2026-07-02 after an autonomous ticket-clearing loop. The old
TanStack "Aviously Voice" era is dead — the shipped site is a straight Astro 5
portfolio (live since 2026-06-11).

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

## Festival lineup archive (side workstream, CLOSED 2026-07-21)

**Goal**: test the "archive festival lineups before they vanish" idea from a
claude.ai voice chat (link + evolution in
`private/biz-ideas/festival-lineup-archive.md`). Verdict reached with Avi:
**no business here — community-service / portfolio piece.** Work is done, not
ongoing; only pick this up for the items under "remaining" below.

**What shipped** (all under `private/tests/festival-lineup/` unless noted):

- `data/all.json` — 11 editions, 1,836 slots: Manas 2025–26, Ozora 2024–26,
  DAAD 2023–26, S.U.N. 2025–26. Timed set grids for 7 of 11 editions.
- `data/setlinks.json` — 459/~1,400 artist-editions resolved to recorded sets
  (YouTube primary, Mixcloud fallback) via `find-sets.mjs`.
- `viewer/index.html` — self-contained static browser (search, chips, stage
  tabs, set links in new tabs). Rebuild: `node build-viewer.mjs`.
- `README.md` there — findings 1–14 + full rebuild flow. Read it before
  touching anything; it explains which source rescued which edition.
- Blog post draft: `src/content/blog/festival-lineup-archaeology.mdx`
  (`draft: true`, blog is hidden anyway — publishing is Avi's call).

**What worked** (repeatable techniques): Wayback CDX to _discover_ URLs, then
live-origin-first fetch (deleted pages ≠ deleted files — Manas 2025 timetable
PDFs still live on their CDN); Clashfinder public HTML embeds `data-start/end`
ms offsets (their /data/ API needs auth, page doesn't); vision-transcription of
timetable posters/PDFs (Manas 2026, DAAD 2025–26); goabase JSON-LD API
(`/api/party/jsonld/<id>`); DAAD's posters found on Ozora's open
`ozora-spaces` DigitalOcean bucket (shared infra); YouTube search-page scrape
(`ytInitialData` + consent cookies) for set links.

**Gotchas**: Ozora + DAAD sites 403 curl (Cloudflare) — use a real browser
session; DAAD pages are JS-rendered, WP REST auth-locked (extract from rendered
DOM); goabase quick-search API covers upcoming events only (past = `/party/past/`
HTML, and S.U.N. 2025 isn't on goabase at all — psymedia Wayback capture was the
rescue); aggregator "rolling pages" overwrite yearly, only Wayback keeps old
states; `find-sets.mjs` has transient fetch failures by design — it's resumable,
just re-run it.

**Remaining (only live items)**:

1. **Time-boxed**: Ozora 2026 set times exist only on Clashfinder _during_ the
   festival — **Jul 24 – Aug 4, 2026**. Grab `clashfinder.com/s/ozora2026`
   (slug may vary) mid-festival, run `parse-clashfinder.mjs`, rebuild dataset +
   viewer. This is the last timed edition and the live test of the
   capture-window thesis.
2. Avi decisions, no agent action: publish the blog post? host the viewer
   somewhere public?
3. Optional: re-run `node find-sets.mjs` after Ozora (new uploads keep landing
   for weeks post-festival).

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
