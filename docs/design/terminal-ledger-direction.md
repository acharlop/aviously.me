# Terminal Ledger — the aviously.me design system

A personal brand system for **Avi Charlop**, senior full-stack engineer and team lead
(Hungary, CET). One system covers two audiences that usually get split: the site that
persuades a hiring manager, and the résumé that survives an ATS. Both are built from the
same parts, so they cannot drift.

The direction is called **Terminal Ledger**: a warm paper-and-ink palette, a serif
reserved for proper nouns, a monospace doing all the work, and full-width rules with a
fixed right-hand date column instead of cards and shadows. It reads like a well-set
ledger page rendered in a terminal — engineered, dry, unfussy.

## Sources

Everything here was built by reading the live codebase, not screenshots.

| Source | What was taken from it |
| --- | --- |
| Local folder `aviously.me/` (Astro site) | Content, routes, data shapes, the `/app` component tree |
| `src/data/site.ts` | Name, tagline, contact, location, navigation, long-form About |
| `src/data/experience.ts` | Five roles, education, the eight skill groups |
| `src/data/open-source.ts` | Six repositories, `merged`/`pending`/`maintainer` statuses |
| `src/content/projects/*.mdx` | Case-study frontmatter: problem, contribution, outcome |
| `src/content/blog/*.mdx` | Post titles, descriptions, tags, draft flags |
| `src/components/app/*.tsx` | The private learning area: sign-in, workspaces, lessons, records |
| `private/about-me.md` | Capacity (~20h/week), citizenship, tax posture — **not published** |
| `src/styles/global.css` | The system this replaces (Cal Sans, cyan accent, grid background) |
| <https://canvasui.dev/> | Reviewed for the homepage hero moment; see "Canvas UI" below |

Nothing was invented that the sources did not support. Where a number appears, it came
from `experience.ts`.

## Rebrand decisions (and what they replaced)

| | Before | Terminal Ledger |
| --- | --- | --- |
| Display face | Cal Sans (self-hosted TTF) | Newsreader |
| UI / body face | Sans body stack | JetBrains Mono |
| Accent | Cyan | Rust `#C96F4A` / `#A8563A` |
| Neutrals | Cool greys | Warm paper and ink — no cool grey anywhere |
| Section separation | Cards on a grid-line background | Labelled full-width rules |
| Corners | Rounded (`rounded-lg`, pills) | Square; `2px` only on form fields |
| Depth | Borders plus subtle shadow | Rules only; shadow on overlays alone |
| Kept | Dark default, light/dark toggle, availability badge | Same, restyled |

Dropped from the old system at the user's direction: Cal Sans, the cyan accent, the
grid-line background. Kept: **dark as the default** and the **light/dark toggle**.

## The mark

Built from Avi's own signature idea: **the A's right leg is also the v's left leg**, so
"Avi" collapses into one continuous three-stroke zigzag, and the dot over the v's rising
stem doubles as the tittle of the i. The mark is drawn as a filled outline rather than a
stroked path, which is what lets all three feet sit on one baseline; stems are offset
horizontally, the way a type designer cuts a near-vertical stroke.

The chosen lockup (option `3g` in the exploration) rotates the glyph **−17.5°** so the
shared stem stands plumb, sets it in a **flat-sided octagon**, and runs the **rust rule
edge to edge** across the field — the mark is made of the system's own motif.

- `assets/logo-mark.svg` — ink octagon, paper glyph (for light surfaces)
- `assets/logo-mark-inverse.svg` — paper octagon, ink glyph (for dark surfaces)
- `assets/logo-glyph.svg` — glyph plus full-width rule, no container
- `assets/logo-glyph-plain.svg` — unrotated glyph with the A crossbar
- `assets/favicon.svg` — 32px favicon
- `components/core/Logo.jsx` — the live version; inherits `--text`, `--bg` and
  `--accent`, so it inverts with the theme and needs no second asset

Clear space equals **30% of the mark's width** on every side. Never recolour the octagon,
never rotate it, never place the mark on rust, never add a third colour.

> **Open issue, flagged deliberately.** Without the A's crossbar the upright zigzag reads
> as a capital **N** below roughly 40px. `assets/logo-glyph-plain.svg` keeps the crossbar
> and does not have this problem. This needs one more pass — see "Caveats".

## Canvas UI

[Canvas UI](https://canvasui.dev/) was explored as a whole visual direction (the "Live
Surface" option) and rejected in favour of Terminal Ledger. What survived is **one
signature moment**: `ui_kits/site/HeroCanvas.jsx`, a live connected-point field behind
the homepage hero and nowhere else. It is recoloured into the ledger palette — rust
connections and paper points over ink, with faint horizontal ledger rules drawn into the
canvas — and it freezes under `prefers-reduced-motion`. It is decorative, `aria-hidden`,
and never carries content. Do not reuse it on another page; a second instance would make
it a pattern instead of a moment.

---

# CONTENT FUNDAMENTALS

The voice is **terse and dry**, first person, and allergic to salesmanship. It states
what happened and what it cost, then stops.

**Casing.** UI chrome is lowercase: nav items (`work`, `open source`), buttons
(`hire me`, `send`, `resume.pdf`), toasts (`sent`, `copied`). Column heads and eyebrows
are UPPERCASE with wide tracking. Prose is sentence case. Technologies keep their own
casing — TypeScript, Next.js, GCP, tRPC — never lowercased to match the chrome.

**Person.** First person on the site and in the résumé lede ("I stand up greenfield
products…"). Third person never appears; there is no "Avi is a…" anywhere.

**Numbers are load-bearing.** Every figure is verifiable: `1.5M titles`, `4 engineers`,
`~600 orders`, `250K+ downloads`, `2,500+ net lines across 116 files`. No round-number
decoration, no invented percentages, no "10x". If a number cannot be defended in an
interview, it does not go on a slide.

**Dates are written out in full.** `February 2025 — February 2026`. Never `Feb 2025`,
never `02/2025`, never `2025–26`. Em dash between endpoints, `Present` for open ranges.

**Hedging is allowed, hype is not.** "roughly twenty minutes", "about ten years",
"the Android build is in closed testing". The system prefers an honest approximation to
a confident wrong number.

**Self-deprecation, once.** The bio line is *"Learning new ways not to do things every
day."* That is the full allowance for humour. Everything else is flat.

**Copy examples, verbatim from the system:**

- Hero lede — "Ten years of shipping, most of it remote since 2017. I stand up greenfield
  products, platform tooling, and the infrastructure to run them — then stay to make them
  solid."
- Availability — "available · 20h / week" (the real capacity, not "open to work")
- Contact — "Fastest route is email. The form does the same thing with more steps. I
  answer within a day or two, including the ones that turn out to be a no."
- Empty state — "Nothing tagged Terraform yet."
- Case-study outcome — "The team could onboard enterprise customers, iterate from sales
  feedback quickly, and ship same-day updates against a stable platform foundation."
- Learning app — "Private learning area. One account, no signup."

**Never used:** emoji, exclamation marks, "excited to", "passionate about", "rockstar",
"cutting-edge", "leverage" as a verb, "we" when it means one person.

---

# VISUAL FOUNDATIONS

## Colour

Two neutral families and one accent. **Every hue is warm-shifted; there is no cool grey
in the system.** Paper runs `#FFFFFF → #B5B1A6`, ink runs `#8A8980 → #121210`, and the
accent is rust — `#C96F4A` on dark, `#A8563A` on light, so contrast holds both ways.

Status colours are earth-shifted rather than saturated: moss `#6F8A5C` for merged, amber
`#B8862F` for open, brick for danger. They map directly onto the repo statuses in
`open-source.ts` and the lesson statuses in the learning app.

**Dark is the default.** `:root` is the dark theme; `[data-theme='light']` overrides the
semantic layer only. `@media print` forces the light ledger regardless of the toggle, so
a PDF is never a black rectangle. Rust is the *only* chromatic colour — no second accent
exists, and adding one breaks the system.

Accent budget per page: one rust rule, one rust eyebrow, one accent button, at most one
rust figure. Past that it stops signalling.

## Type

**Newsreader** (serif) is reserved for proper nouns and headlines — names, company names,
project titles, dialog titles. It never appears in chrome, labels, or data. **JetBrains
Mono** carries everything else: navigation, body copy, buttons, form labels, dates,
figures, tags. The pairing is the whole idea: the human parts are set in a book face, the
machine parts in a machine face.

Display sizes are 72 / 54 / 36 / 26px with `-0.02em` tracking. The mono scale is
17 / 15 / 13 / 12 / 11 / 10px. Body prose sits at 13px with **1.75** leading — loose,
because mono at tight leading is unreadable in a paragraph. Labels are 10–11px uppercase
with `0.16–0.18em` tracking.

Measures are capped: `68ch` for prose, `54ch` for a lede, `14ch` for a display headline.
`text-wrap: pretty` is on by default so no headline orphans a word.

## Layout

The page is a **stack of ruled bands**, not a grid of cards. A band opens with a labelled
rule (`Rule`), fills with rows (`LedgerRow`), and ends. Sections are divided by a 1px
hairline; major divisions by a 2px ink rule.

The signature is the **aligned date column**. A `LedgerRows` list owns the grid and its
rows are `display: contents`, so the meta track resolves to `max-content` across the
whole list: every date in a list lands on one right edge, and a list whose meta is a short
badge stays narrow instead of reserving a full date's width. `--date-col` (216px, measured
against the longest string the copy rules permit — `February 2025 — February 2026`) is the
floor for a **standalone** row outside a list. Every dated row in the system — experience, posts, repos, case studies, résumé
entries — puts its date there, so dates align down the whole page and the eye can scan
one column instead of hunting. This is never fluid and never collapses on desktop.

Shell width is `76rem`; prose and the résumé run at `48rem`. Vertical rhythm comes from a
4px scale where 8 / 16 / 32 do most of the work.

## Backgrounds

Flat colour. No gradients, no photography, no illustration, no repeating texture, no
noise. The one exception is the homepage hero canvas described above. The old site's
grid-line background is gone; horizontal rules do that job now, and they do it with
meaning attached.

The system ships **no illustrations and no photography**, because the sources contained
none. If imagery is ever added it should be documentary — screenshots of real product
surfaces, at full bleed, unfiltered.

## Cards, borders, corners, depth

Cards are `1px solid var(--rule)` on `var(--surface)`, **square**, with no shadow. They
are the exception in this system: a list of things is a stack of rows under a rule, and a
card is reserved for a genuinely discrete object (a repo, a project tile, a form panel).

Corners are square everywhere. `--radius-1: 2px` exists only on form fields; the pill
radius exists only on radio inputs. Switch knobs are squares that slide. Progress bars
are 3px rules, not capsules. Status dots are **squares**.

Depth is drawn, not lit. `--shadow-overlay` and `--shadow-popover` exist and are used by
`Dialog` and `Toast` and nowhere else. There are no protection gradients and no
frosted-glass capsules; the sticky header is opaque `var(--bg)` above a 2px rule.
Transparency appears in exactly three places: `--rule-hair`, `--field-bg`, and the
overlay scrim.

## Motion

Mechanical and short. Durations are 110 / 170 / 260ms on `cubic-bezier(.2, .8, .25, 1)`.
Nothing scales, nothing lifts, nothing bounces, nothing fades in on scroll. The only
looping animation in the system is the availability dot, which blinks on a
`1.6s steps(1, end)` cadence — a terminal cursor, not a pulse. All durations collapse to
1ms under `prefers-reduced-motion`.

## Interaction states

**Hover** changes colour only: `primary` buttons swap ink for rust, `secondary` and
`ghost` shift text and border toward the accent, cards move their border from `--rule` to
`--rule-strong`, nav links grow an underline. **Focus** is a 2px rust outline at 2px
offset, everywhere, never removed. **Fields on focus** take a rust border plus a 2px
inset underline — an underline rather than a glow, because a glow implies lighting and
this system has none. **Disabled** is `opacity: 0.4` with `not-allowed`. There is no
distinct press state; the hover colour holds through the click.

---

# ICONOGRAPHY

**The sources contain no icon set.** The Astro site used no icon font, no SVG sprite, and
no icon package — glyphs were Unicode characters (`↗` on reference links, `×` on
dismiss) and the rest was text. `public/` held only `favicon.png`, `og.png` and one
content image.

**Substitution, flagged:** the system uses **[Lucide](https://lucide.dev)** from CDN at
`1.5` stroke weight, wrapped in `components/core/Icon.jsx`. Lucide was chosen because its
geometric, even-weight, square-cap drawing matches the ruled construction of the rest of
the system. Load it on any page that renders an `Icon`:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
```

Rules for icons here:

- Sizes: `14` inline with mono text, `16` in controls, `20` in navigation. Nothing larger
  — this system has no illustrative iconography.
- Stroke weight is always `1.5`. Never `2`, never filled variants.
- Icons are `currentColor`. They do not carry the accent unless the whole control does.
- Icons never replace a word where a word fits. `ThemeToggle` deliberately renders the
  text `lt` / `dk` instead of a sun and a moon.
- The set actually used is small on purpose: `arrow-right`, `arrow-left`,
  `external-link`, `github`, `linkedin`, `x`.
- **No emoji, ever** — not in UI, not in copy, not in commit-adjacent content.
- Unicode is preferred over an icon for typographic marks: `·` as a separator, `—` in
  date ranges, `/` in breadcrumbs, `×` on removable tags, `+` / `−` on disclosures.

If a project needs an icon Lucide does not have, add it to Lucide's set or use a word.

---

# Intentional additions

The sources define no component library, so the primitive set was authored from scratch
against what the site and app actually need. Two entries are worth calling out as
additions rather than recreations:

- **`Icon`** — a wrapper for the substituted Lucide set (see ICONOGRAPHY). The sources had
  no icon component.
- **`LedgerRows` / `LedgerRow`** — no equivalent existed in the codebase; the old site
  used cards and timeline items. They exist because the aligned date column is the
  system's signature and needed a component pair to enforce it: the list owns the grid,
  the row fills two of its cells.

Everything else maps to something real: `AvailabilityBadge` and `ThemeToggle` come from
`AvailabilityBadge.astro` and `ThemeToggle.astro`, `NavBar`/`Footer` from `Header.astro`
and `Footer.astro`, the form set from `contact.astro` and `SignIn.tsx`, `Card` from
`ProjectCard`/`RepoCard`/`BlogCard`, `Badge` from the repo status pills.

---

# Index

**Root**

- `styles.css` — the single entry point consumers link. `@import` lines only.
- `readme.md` — this file.
- `SKILL.md` — Agent Skills manifest, for use in Claude Code.
- `_dev_shim.js` — **dev only.** Transpiles the components in-browser when the compiled
  bundle is absent, so every card and UI kit renders on a plain file open. No-ops the
  moment a real bundle is present. Not part of the shipped system.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`,
`elevation.css`, `motion.css`, `base.css` (reset + defaults), `components.css`
(the `tl-*` classes the primitives use).

**`assets/`** — the six logo files listed under "The mark".

**`components/`** — 28 primitives in four groups, each with a `.d.ts` props contract and
a `.prompt.md` usage note.

| Group | Components |
| --- | --- |
| `core/` | Button, IconButton, Icon, Logo, Rule, LedgerRows, LedgerRow, Card, Badge, Tag, Stat, Eyebrow, ThemeToggle |
| `forms/` | Field, Input, Textarea, Select, Checkbox, Radio, Switch |
| `navigation/` | NavBar, Tabs, Breadcrumbs, Footer |
| `feedback/` | AvailabilityBadge, Dialog, Toast, Tooltip |

**`guidelines/`** — 18 foundation specimen cards across Colors, Type, Spacing and Brand.

**`ui_kits/`**

- `site/` — the marketing site, eight click-through screens. See its README.
- `resume/` — the printable résumé. Flowing `<doc-page>` document; print paginates it and
  the light ledger is forced regardless of the theme toggle.
- `app/` — the private `/app` learning area, four screens. See its README.

**`slides/`** — seven slide types (`title`, `section`, `statement`, `stats`,
`comparison`, `timeline`, `closing`) plus `index.html`, a click-through 1920×1080 deck
with speaker notes.

**`og/`** — `og-default.html` and `og-article.html`, both 1200×630, snapshot to PNG.

---

# Caveats

1. **The mark reads as an N at small sizes.** The chosen lockup drops the A's crossbar,
   and below ~40px the upright zigzag loses its leftmost stroke to the eye. This is the
   one thing in the system that needs another pass.
2. **Fonts are CDN-linked, not self-hosted.** `tokens/fonts.css` imports Newsreader and
   JetBrains Mono from Google Fonts. Self-host the binaries into `assets/fonts/` before
   production and replace that import. The old Cal Sans TTF was deliberately not carried
   over.
3. **Lucide is a substitution**, not the brand's icon set — there was no brand icon set.
4. **The résumé is a flowing document, not pinned to one page.** At the current content
   volume it prints as two sheets. Cutting it to one means dropping bullets, which is a
   content decision, not a layout one.
5. **`/app` content is representative.** Real workspace data lives in Convex behind
   single-user auth; the kit uses plausible stand-in topics.
6. **Nothing from `private/about-me.md` is published.** Capacity (~20h/week) appears
   because it is a public selling point; citizenship, phone numbers, permit status and
   tax posture are used nowhere in this system and must stay out of it.
