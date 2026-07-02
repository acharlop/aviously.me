// Knobs shaping every resume output (/resume page, /resume.md, /resume.txt,
// /resume.json, and the PDF printed from the page). Defaults reproduce the
// full, unfiltered resume. See issue #27.
export type ResumeOptions = {
  /** Companies to include, in this order. undefined = all, current order. */
  roles?: string[]
  /** 'one-page' caps bullets and collapses sub-roles; 'full' changes nothing. */
  length: 'full' | 'one-page'
  /** Max bullets per role (and per sub-role). undefined = unlimited. */
  bulletsPerRole?: number
  includeSummary: boolean
  includeSubRoles: boolean
  includeEducation: boolean
}

export const defaultResumeOptions: ResumeOptions = {
  length: 'full',
  includeSummary: true,
  includeSubRoles: true,
  includeEducation: true,
}

/** Knob preset for a compact one-pager ('one-page' implies bulletsPerRole 2, no sub-roles). */
export const onePageResumeOptions: ResumeOptions = {
  ...defaultResumeOptions,
  length: 'one-page',
}
