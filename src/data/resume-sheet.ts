// Copy for the printed one-page resume sheet (src/components/ResumeSheet.astro).
//
// This is hand-tuned copy, settled on the design canvas, and it is deliberately
// shorter and differently worded than `experience.ts`. Every bullet here must
// restate a fact already in `experience.ts` or `docs/jobs/*.writeup.md`; never
// add a claim that exists only on this sheet. The text exports (/resume.md,
// .txt, .json) keep using `experience.ts` and stay complete.

export type SheetRole = {
  company: string
  role: string
  dates: string
  bullets: string[]
  /** Technology line under the bullets, comma separated, no version numbers. */
  stack: string
}

export type SheetNumber = {
  value: string
  /** When set, the tile reads "value ▸ to" (e.g. "1 day ▸ 12 min"). */
  to?: string
  caption: string
  source: string
}

export type SheetLabelledRow = {label: string; text: string}

export type ResumeSheetContent = {
  title: string
  headline: string
  summary: string
  numbers: SheetNumber[]
  experience: SheetRole[]
  projects: SheetRole[]
  ai: {tools: string; rows: SheetLabelledRow[]}
  credits: SheetLabelledRow[]
}

export const resumeSheet: ResumeSheetContent = {
  title: 'Senior Full-Stack Engineer & Team Lead',
  headline: 'I build and mentor teams that own what they ship.',
  summary:
    'Together, we carry greenfield products into customers’ hands, with the tooling, infrastructure, and working habits to keep them there.',
  numbers: [
    {value: '10', caption: 'years shipping', source: 'full-stack, 2016 to now'},
    {value: '4', caption: 'engineers hired and led', source: 'Vionlabs portal rebuild'},
    {value: '10M+', caption: 'catalog tags searchable', source: '1.5M titles · millisecond results'},
    {value: '1 day', to: '12 min', caption: 'platform provisioning', source: 'Closer automation'},
  ],
  experience: [
    {
      company: 'Vionlabs',
      role: 'Team Lead',
      dates: 'Feb 2025 – Feb 2026',
      bullets: [
        'Hired and led a 4-engineer team that rebuilt an enterprise customer portal while the legacy product stayed live; mentored newer developers into owning features end to end.',
        'Shipped new portal functionality for each of 4 trade shows, prioritizing each release around the enterprise customers the team planned to meet.',
        'Unified several upstream catalogs into 1.5M customer-facing titles with 10M+ tags, searchable in milliseconds.',
      ],
      stack:
        'TypeScript, Next.js, React, Tailwind, Storybook, tRPC, Fastify, Drizzle, PostgreSQL, WorkOS SSO, Terraform, GitLab CI/CD, Turborepo, GCP - Cloud Run, Cloud SQL, Pub/Sub, IAM',
    },
    {
      company: 'Collect.AI',
      role: 'Senior Frontend Engineer',
      dates: 'Aug 2023 – Sep 2024',
      bullets: [
        'Built a config-driven form system that powered 25 forms on the core screens.',
        'Migrated internal packages and publishing CI from NPM to GitHub Packages.',
        'Introduced RTK Query and reworked the portal’s state and data layer, removing 2,500+ LOC.',
      ],
      stack:
        'TypeScript, React, React Hook Form, MUI, Storybook, Redux Toolkit, RTK Query, Docker, CircleCI, GitHub Packages',
    },
    {
      company: 'Net2Phone',
      role: 'Engineering Lead / Full-Stack Engineer',
      dates: 'Feb 2017 – Dec 2022',
      bullets: [
        'Refactored the core messaging services and introduced unit testing across the engine and microservices.',
        'Built a browser dialer for the Unite communications platform serving 200K+ business customers; contributed in-band DTMF support upstream to JsSIP.',
        'Led the shared component library and Angular 2-to-7 upgrade as lead front-end engineer and scrum master, cutting initial load time in half.',
      ],
      stack: 'Go, TypeScript, Angular, React, Redux, React Native, WebRTC, JsSIP, Docker, Jenkins CI',
    },
    {
      company: 'Takt Digital',
      role: 'Software Engineer',
      dates: 'Jul 2016 – Feb 2017',
      bullets: [
        'Led engineering on a fintech analytics dashboard, hired the team, and owned API and front-end delivery.',
        'Built a serverless video-streaming pipeline independently.',
      ],
      stack: 'JavaScript, Angular, Node.js, Ruby on Rails, AWS Lambda, Bitmovin',
    },
  ],
  projects: [
    {
      company: 'Closer',
      role: 'Freelance Full-Stack Engineer',
      dates: 'May 2026 – Present',
      bullets: [
        'Built a one-click provisioning system deploying a complete community platform from one typed configuration, cutting setup from a day to 12 minutes.',
        'Designed an idempotent, resumable workflow engine over durable state, with teardown and end-to-end tests against live providers.',
      ],
      stack:
        'TypeScript, Bun, Next.js, Ink, Elysia, Node.js, Drizzle, PostgreSQL, MongoDB, Stripe Connect, Mailgun, Firebase, DigitalOcean, Vercel, GitHub Actions',
    },
    {
      company: 'WhoCards',
      role: 'Co-founder, sole engineer',
      dates: 'Jan 2021 – Present',
      bullets: [
        'Built and run whocards.cc end to end, including webhook driven checkout and automated fulfillment across 2 providers; ~600 orders shipped.',
        'Built a shared headless play engine, API, and design system for the web store and iOS app, with automated mobile releases.',
      ],
      stack: 'TypeScript, Astro, React, React Native, Expo, NativeWind, tRPC, Stripe, Netlify, EAS, pnpm, Turborepo',
    },
  ],
  ai: {
    tools: 'Claude Code · OpenAI Codex · T3 Code · Agent Skills',
    rows: [
      {
        label: 'Skills',
        text: 'Build and adapt reusable Agent Skills that carry a repository’s architecture, conventions, and guardrails through research, planning, implementation, review, and handoff.',
      },
      {
        label: 'Workflows',
        text: 'Create custom workflows for PRDs, tracer-bullet issue breakdowns, and refactor plans, with clear scope, approval boundaries, project-specific checks, and verification built in.',
      },
    ],
  },
  credits: [
    {
      label: 'Open source',
      text: 'Maintainer of prism-rails, 250K+ downloads. Contributor to tailwind-config-viewer, bidi-js, JsSIP, create-t3-app.',
    },
    {
      label: 'Education',
      text: 'Ironhack, Miami: full-stack immersive, 2016. City College of New York: computer science coursework, 2013',
    },
  ],
}

// Per-application accents. The layout and copy never change; only the accent
// does. Rendered on `astro dev` at /resume/preview-<slug>. Printing a variant
// from the site is issue #50; until then export it by hand.
export type ResumeSheetVariant = {label: string; accent: string}

export const defaultAccent = '#4dffb4'

export const resumeSheetVariants: Record<string, ResumeSheetVariant> = {
  mint: {label: 'Mint (default)', accent: defaultAccent},
  // Primer's own orange-500 token, read from primer.io's stylesheet.
  primer: {label: 'Primer orange', accent: '#ff7c4f'},
}
