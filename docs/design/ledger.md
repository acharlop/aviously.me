# Ledger design

The live visual system follows [epic #37](https://github.com/acharlop/aviously.me/issues/37):
paper, ink, mint accents, ruled rows, and monospace labels. The earlier terminal
exploration in `terminal-ledger-direction.md` is historical, not the current spec.

## Tokens and type

`src/styles/global.css` is the site token source: paper `#f4f2ec`, ink `#111`,
secondary text `#444`, tertiary text `#6b6b6b`, row divider `#d3d0c6`, and default
mint `#4dffb4`. Space Grotesk supplies body/display type; Space Mono supplies
labels and metadata. Both are self-hosted WOFF2 files under `public/fonts/`.

Dark mode inverts paper and ink, changes secondary text and dividers, and preserves
the accent. `ThemeInit` applies saved choices before paint; `ThemeToggle` and
`AccentPicker` update them. Site accents all flow through `--accent`. The resume
sheet keeps its document palette and selected company accent independently.

## Shared primitives

| Primitive | Role |
| --- | --- |
| `SectionBar` | Mono section chip on a 1.5px rule; chip edge meets the text axis. |
| `LedgerRow` | Label, metadata, and content columns with 1px sibling dividers. |
| `TriangleList` | Hanging triangle markers with wrapped text aligned to the content axis. |
| `NumberTiles` | Accent metrics with ink dividers aligned to the ledger grid. |

The grid scales the resume's 152px label column and 14px gutter from a 10.5px base
to the site's body size. Below 620px, labels stack above content and bullet markers
move inside the available width. Long prose uses 17px/1.55 text and a 68ch measure,
with internally scrolling code and tables.

Surfaces use square edges and rules. Tags and stacks are plain mono text separated
by middle dots. The header and footer are ink bands in either theme. Focus remains
visible, and reduced-motion preferences disable smooth scrolling and transitions.

## Social preview and visual acceptance

`scripts/make-og.ts` renders `public/og.png` at 1200×630 using the site's actual
fonts, tokens, name, role, and tagline. Run `bun scripts/make-og.ts` after changing
those inputs; the generated image is committed for static social crawlers.

Final acceptance is Avi's checklist on #49: walk every public page and the private
app in both themes at 390px and 1440px. Automated build/e2e and agent inspection
support that review but do not complete the human sign-off. Dark-theme design
iteration remains #40.
