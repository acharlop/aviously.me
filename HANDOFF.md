# Handoff

Updated 2026-09-04: site redesign epic opened (#37) in the resume "ledger"
style; the resume sheet (#39) is built on branch `feat/resume-sheet` with a
static PDF, PR open. Previous
update 2026-07-22 (festival archive closed out). The shipped site is a straight
Astro 5 portfolio, live since 2026-06-11.

## Goal

Redesign the whole site to match the new one-page resume design: paper
`#f4f2ec` / ink `#111`, mint accent `#4dffb4` (user-selectable), Space Grotesk +
Space Mono, black section chips on 1.5px rules, two-axis label/text rows,
triangle bullets, number tiles, 1px grey row dividers, no radius / shadows /
gradients. Dark mode is an ink inversion. Every exact value is in the epic body
(#37); do not re-derive them from screenshots.

## Current progress

- **Resume design: finished.** Settled over ~15 rounds on a Claude Design
  canvas. The generator (Python `gen.py` + `data.py`, Playwright measure
  scripts) lives in the session scratchpad and will not survive; the seeded
  canvas is checked into the repo root as `resume-preview.html` (untracked, open
  in a browser: boards Main=mint, Primer=`#ff7c4f`, plus yellow/orange/pink/
  cyan/lilac). Treat it as the pixel reference.
- **PDFs sent.** `~/code/jobhunt/applications/primer-payment-ops/resume-primer.pdf`
  (Primer orange) and `resume-mint.pdf`; the message to the Primer hiring
  manager went out 2026-09-04 with the orange one attached.
- **Tickets published** (all hang off epic #37, labels set):
  #38 tokens/fonts (foundation), #39 resume sheet on /resume + PDF + accent
  variants, #40 research on the ink dark version (Avi), #41 masthead
  header/footer, #42 home page + primitives, #43 private app, #44 accent picker,
  #45 experience, #46 work/case studies, #47 about/now/contact/open-source,
  #48 blog, #49 cleanup/OG/QA (Avi signs off). Order: 38 → 41/42/43/44 → 45-48
  → 49; #39 and #40 can start now.
- **#39 built (branch `feat/resume-sheet`):** `ResumeSheet.astro` +
  `resume-sheet.ts` render the fixed sheet on `/resume` (scales on phones,
  prints edge to edge); `public/resume.pdf` is a STATIC copy of the canvas
  render (Avi's call: simple download now, site-printed PDF is #50 at the end
  of the epic; `scripts/make-resume-pdf.ts` is parked with a warning). Fonts
  self-hosted in `public/fonts/`. Old `ResumeDocument.astro`,
  `resume-document.ts`, and the options-based variant attempt are gone. Build
  - 100 e2e green.

## What worked

- Designing on the canvas with a generator + Playwright pixel checks (rects of
  tile dividers, chip edges, marker, bullet text) caught every alignment issue
  Avi's eye did. Re-measure after each change rather than trusting CSS math.
- Avi edits copy directly on the canvas; pull it back with the design skill's
  `--extract` and diff visible text against the generator. Confirm a Save
  landed before republishing, or the edit is lost.
- Getting a company colour: fetch its site's stylesheet and read the token
  (`primer.io` exposes `--colors--orange--500`), not the screenshot.
- Printing: Playwright `page.pdf` with `preferCSSPageSize`, zero margins,
  `@page { size: 8.5in 11in }`, wait for `document.fonts.ready`. One page, fonts
  embedded.

## What didn't work / gotchas

- Google Fonts CSS returns `woff2` URLs only with a modern browser user agent.
- The canvas republish reloads every open view and drops unsaved edits; Avi
  lost one text change that way and it was never recovered (ask him if a bullet
  looks off).
- The old resume component followed the site theme; the new sheet must NOT (it
  is a paper artefact). Scale it with a transform on narrow screens.
- Auto-mode classifier blocks `git checkout -- file` and `rm`/`git rm` of
  tracked files; leave deletions to Avi in the run-list.
- `astro build` runs `astro check`; a dead import in a deleted component fails
  the build, so remove `ResumeDocument.astro` and `resume-document.ts` together.

## Next steps

1. Avi: read #40, iterate on the ink version, write decisions on the ticket.
2. Merge the #39 PR (Avi), then agent: #38 (tokens). Hand Avi a run-list; he
   runs the dev server and merges.
3. Then #41–#44 in parallel, then #45–#48, then #49 with Avi.
4. #50 (site-printed PDF) last, after the sheet and shell are final.

## Stack and resume plumbing

- Astro 5 + Tailwind 4, Bun, Playwright e2e. `bun run dev / build / e2e /
format`; `bun run resume:pdf` regenerates `public/resume.pdf`.
- `src/data/experience.ts` is the source of truth for `/resume.md`, `.txt`,
  `.json` via `src/lib/resume-export.ts` + `resume-options.ts` (issue #27).
  The printed sheet (#39) carries its own hand-tuned copy and must only restate
  facts from `experience.ts` or `docs/jobs/`. Never claim Python experience.

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
