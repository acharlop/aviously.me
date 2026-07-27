# The new resume layout

Status: **live on the public `/resume` page** (and therefore in the generated
`public/resume.pdf`) as of 2026-07-27. `/resume/preview` stays as the dev-only
scratch surface for trying options presets. The two files below are in place:

| File                   | Lives at                              |
| ---------------------- | ------------------------------------- |
| `ResumeDocument.astro` | `src/components/ResumeDocument.astro` |
| `resume-document.ts`   | `src/lib/resume-document.ts`          |

`src/pages/resume/[view].astro` renders them at `/resume/preview` and
`/resume/preview-one-page` on `astro dev` only — `getStaticPaths` returns `[]`
outside dev, so `astro build` emits nothing for those routes.

TODO: promote this to a public page behind auth (the Convex auth already used
for the private `/app` area) so tailored, per-application resumes can be shared
by link, instead of living on a dev-only route.

The rest of this doc is the original wiring plan for replacing `/resume`.

## Wiring it up

`ResumeDocument.astro` renders the whole printable document from your existing
data — `shapeResume(options)` for experience/education, `open-source.ts` for the
maintainer/contributor lines, `site.ts` for the header. Nothing new to maintain
except the two condensed skill lines in `resume-document.ts` (the verbose
seven-group `skills` array stays as-is for the website, `/resume.json` and
`/resume.txt`).

In `src/pages/resume.astro`, replace the four content sections (skills,
experience, open source, education) with:

```astro
---
import ResumeDocument from '@/components/ResumeDocument.astro'
import {defaultResumeOptions, onePageResumeOptions} from '@/data/resume-options'
---

<section class="shell section">
  <ResumeDocument options={defaultResumeOptions} />
</section>
```

Keep the hero (name, buttons, alternate-format links) wrapped in
`.print-hidden` — the document draws its own header, so the page hero should not
print. The big `<style is:global>` print block in `resume.astro` can go: the
component owns its own print rules.

### One-page version

Add a page (e.g. `src/pages/resume/one-page.astro`) passing
`onePageResumeOptions`, or gate on a query param when you generate a
job-specific resume:

```astro
const compact = Astro.url.searchParams.get('length') === 'one-page'
<ResumeDocument options={compact ? onePageResumeOptions : defaultResumeOptions} />
```

`scripts/make-resume-pdf.ts` needs no change — it still prints `/resume/` to
Letter with 0.5in margins, which is what this layout is designed around. For a
second PDF, point the script at the one-page URL and write
`public/resume-one-page.pdf`.

### Per-application resumes

`ResumeOptions` already has the knobs: `roles` (pick and order companies),
`bulletsPerRole`, `includeSummary`, `includeEducation`. A tailored resume is a
new options object — the layout does not change:

```ts
export const founderResumeOptions: ResumeOptions = {
  ...onePageResumeOptions,
  roles: ['Closer', 'Vionlabs', 'Freelance', 'Net2Phone'],
  bulletsPerRole: 3,
}
```

## Knobs inside the layout

At the top of the component's `<style>`:

- `--resume-ink` — headings and rules (`#0f2b34`)
- `--resume-muted` — dates, roles, contact (`#4f5f68`)
- `--resume-accent` — section labels (`#007aa3`, your site accent)
- `--resume-date-col` — width of the right-hand date column (`132px`)

Print sizes live in the single `@media print` block at the bottom; everything
else inherits from the page, so the same component looks right on the website.
