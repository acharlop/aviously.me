# The resume sheet

Status: **live on `/resume`** since 2026-09-04 (epic #37, ticket #39). The
sheet is a fixed 816×1056 paper document (US Letter at 96dpi) with its own
palette; it ignores the site theme on purpose so it looks the same on screen,
in the PDF, and on a recruiter's dark-mode laptop.

| File                               | Role                                                              |
| ---------------------------------- | ----------------------------------------------------------------- |
| `src/components/ResumeSheet.astro` | Layout and styles. Geometry is documented at the top of the file. |
| `src/data/resume-sheet.ts`         | Hand-tuned copy plus accent variants (`mint` default, `primer`).  |
| `scripts/make-resume-pdf.ts`       | Prints the built sheet or a local accent variant to PDF.          |
| `public/resume.pdf`                | Generated file served by the Download button.                     |

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

Run `bun run resume:pdf` to build the site and regenerate `public/resume.pdf`
from `/resume/`. The script waits for the self-hosted fonts and prints the CSS
Letter page with zero margins and background colours enabled.

To print a local-only accent variant, run Astro in development mode through the
same script and choose the output path:

```sh
bun scripts/make-resume-pdf.ts --view primer --out /tmp/resume-primer.pdf
```

## Reference

The design canvas export (`resume-preview.html`, repo root, gitignored) is the
pixel reference for the sheet and the source of the exact values in epic #37.
