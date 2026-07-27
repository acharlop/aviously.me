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
  /**
   * Per-company overrides for `bulletsPerRole`, keyed by a case-insensitive
   * company prefix ("Collect.AI" matches "Collect.AI"). Lets the printed
   * one-pager keep more bullets on recent roles and fewer on older ones.
   */
  bulletsByRole?: Record<string, number>
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

/**
 * Knob preset for a compact one-pager ('one-page' implies no sub-roles).
 * Bullet budget is weighted: recent, most relevant roles keep three lines,
 * older ones keep two. Tuned so the printed document fills exactly one
 * Letter page. The text exports (/resume.md, .txt, .json) and the LinkedIn
 * copy script use `defaultResumeOptions` and stay complete.
 */
export const onePageResumeOptions: ResumeOptions = {
  ...defaultResumeOptions,
  length: 'one-page',
  bulletsPerRole: 2,
  bulletsByRole: {
    // Two: bullets 1-2 carry the provisioning story; the Ink/Elysia operator
    // surface is the most niche line on the page and pays for the two below.
    Closer: 2,
    WhoCards: 3,
    // Four: the GCP/Terraform line is the only Terraform evidence on the page.
    Vionlabs: 4,
    // Three: the third is the Go bullet, the only Go evidence on the page.
    Net2Phone: 3,
  },
}
