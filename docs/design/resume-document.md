# The resume sheet

Status: **live on `/resume`** since 2026-09-04 (epic #37, ticket #39). The
sheet is a fixed 816×1056 paper document (US Letter at 96dpi) with its own
palette; it ignores the site theme on purpose so it looks the same on screen,
in the PDF, and on a recruiter's dark-mode laptop.

| File                               | Role                                                              |
| ---------------------------------- | ----------------------------------------------------------------- |
| `src/components/ResumeSheet.astro` | Layout and styles. Geometry is documented at the top of the file. |
| `src/data/resume-sheet.ts`         | Hand-tuned copy plus accent variants (`mint` default, `primer`).  |
| `public/resume.pdf`                | The file the Download button serves. **Static for now.**          |

`src/pages/resume/[view].astro` renders each accent variant at
`/resume/preview-<slug>` on `astro dev` only; `getStaticPaths` returns `[]`
outside dev, so `astro build` emits nothing for those routes.

## Copy rules

The sheet's copy is shorter and differently worded than `experience.ts`, and
that is deliberate. Every bullet must restate a fact already in
`experience.ts` or `docs/jobs/*.writeup.md`; never add a claim that exists only
on the sheet. The text exports (`/resume.md`, `.txt`, `.json`) keep using
`experience.ts` via `resume-export.ts` and stay complete.

## The PDF

`public/resume.pdf` was rendered from the design canvas, not from the site.
`scripts/make-resume-pdf.ts` still prints the old way (0.5in margins from the
built `/resume` page) and will produce the wrong file until the "print the PDF
from the site" ticket under epic #37 lands; do not run `bun run resume:pdf`
until then. To ship a new PDF meanwhile, replace the file by hand.

## Reference

The design canvas export (`resume-preview.html`, repo root, gitignored) is the
pixel reference for the sheet and the source of the exact values in epic #37.
