export type ExperienceItem = {
  company: string
  role: string
  location?: string
  dates: string
  summary?: string
  bullets: string[]
  subRoles?: {
    role: string
    tech?: string
    dates: string
    bullets: string[]
  }[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'Closer (closer.earth)',
    role: 'Contract Full-Stack Engineer',
    location: 'Remote',
    dates: 'May 2026 - Present',
    summary: 'Platform automation for Closer, the operating system behind regenerative co-living communities ("villages").',
    bullets: [
      'Architected a "one-click village" provisioning system that launches a complete co-living-community platform instance across DigitalOcean, Vercel, MongoDB, Mailgun, Firebase, and Stripe Connect from one typed config, cutting setup from a full day to about 20 minutes.',
      'Designed the workflow engine as an idempotent, resumable step DAG over durable state, with full teardown and end-to-end tests against live cloud providers.',
      'Shipped the operator surface as an Ink terminal UI, compiled single-file binaries, and an Elysia control API with token auth and streamed mutation endpoints.',
      'Hardened the core Closer API (Node + MongoDB) to boot cleanly on fresh databases — automatic config seeding, admin bootstrap, and startup race-condition fixes — unblocking one-click provisioning.',
    ],
  },
  {
    company: 'WhoCards (whocards.cc)',
    role: 'Co-founder',
    location: 'Remote',
    dates: 'January 2021 - Present',
    summary: 'Owned conversation-card product, built and run as the sole technical founder alongside client work.',
    bullets: [
      'Co-created whocards.cc and built its entire stack as sole engineer: an Astro + Stripe storefront with automated end-to-end fulfillment across 2 third-party providers, shipping ~600 orders through direct and brand-ambassador channels.',
      'Shipped the WhoCards iOS app to the App Store (Expo, React Native, NativeWind) with 14 languages including RTL, offline play, and universal links; the Android build is in closed testing.',
      'Restructured the product as a pnpm + Turborepo monorepo where web and mobile share a headless play engine, tRPC API, and design tokens, released through an automated EAS build-and-submit pipeline with over-the-air updates.',
    ],
  },
  {
    company: 'Vionlabs',
    role: 'Team Lead',
    location: 'Remote',
    dates: 'February 2025 - February 2026',
    summary:
      'Led the team behind a greenfield customer portal and multi-source data platform for enterprise media-tech customers.',
    bullets: [
      'Hired and led a 4-engineer team building a greenfield, multi-tenant media-catalog portal while keeping the legacy customer portal live for enterprise customers.',
      'Architected the new portal as a Turborepo monorepo (Next.js 15, tRPC, Fastify, Drizzle/Postgres) with catalog browsing, smart lists, filtering, tagging, and enterprise auth through WorkOS SSO and scoped API keys.',
      'Shipped new prospect-targeted features ahead of each of 4 trade shows and turned booth feedback into same-day product updates, driving the portal to feature-complete for its first 10 enterprise customers.',
      'Owned the GCP production platform in Terraform: Cloud Run, Cloud SQL, Pub/Sub, Eventarc, Secret Manager, VPC, and GitLab CI/CD.',
      'Built the data-sync services that unified a 1.5M-title catalog from upstream fingerprinting systems into one customer-facing portal.',
    ],
  },
  {
    company: 'Collect.AI',
    role: 'Senior Frontend Engineer',
    location: 'Remote',
    dates: 'August 2023 - September 2024',
    summary:
      'Frontend platform work for a German receivables-management SaaS portal, internal component library, and published client SDK.',
    bullets: [
      'Built a type-safe form generator on React Hook Form and the internal MUI component library, powering 25 unique forms on the core collections screen of a German receivables-management SaaS portal from a single config-driven API.',
      'Migrated the portal’s state management to Redux Toolkit and RTK Query, cutting 2,500+ net lines across 116 files of the React/TypeScript monorepo.',
      'Drove a platform-wide UI consistency pass across the 63-component internal UI library, authoring 25 Storybook stories and polishing shared loading and modal states.',
      'Modernized package publishing from NPM to GitHub Packages with reusable GitHub Actions and a publish-and-test SDK pipeline.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Full-Stack Developer',
    location: 'Remote',
    dates: 'October 2022 - June 2023',
    bullets: [
      'Built J3D.AI, a real-time AI workshop-summary app (Next.js, tRPC, Prisma, Supabase, GCP) with live audio capture, ffmpeg-based transcription, and editable AI-generated next steps.',
      'Led frontend development at TzConnect on the Tezos NFT marketplace behind CIRCA’s Marina Abramović “The Hero 25FPS” release — a 6,500-frame edition that drew 1,700+ mints — building the frame-purchase flow on the Taquito stack.',
    ],
  },
  {
    company: 'Net2Phone',
    role: 'Engineering Lead / Full-Stack Engineer',
    location: 'Remote',
    dates: 'January 2017 - December 2022',
    summary:
      'Six years across backend (Go), mobile (React Native), and web (Angular → React) on the Unite UCaaS platform, serving 200K+ business customers.',
    bullets: [
      'Led the shared component library and the Angular 2 → 7 upgrade as lead front-end engineer and scrum master, cutting initial application load time by 50%.',
      'Built a WebRTC browser dialer (React, Redux, TypeScript, JsSIP) for the Unite UCaaS platform serving 200K+ business customers, supporting multiple call-server configurations and upstreaming in-band DTMF support to JsSIP.',
      'Refactored core Go messaging microservices and implemented unit testing across key services.',
      'Introduced React micro frontends into the core Angular client, shipping 5 client-heavy features across 3 teams (e.g. a device-provisioning UI programming 90 buttons per business phone).',
      'Shipped the first public release of the React Native mobile app, building live chat and calling features and standardizing its code generators.',
    ],
  },
  {
    company: 'Takt Digital',
    role: 'Software Engineer',
    location: 'Miami',
    dates: 'July 2016 - January 2017',
    bullets: [
      'Built a serverless streaming-media pipeline (AWS Lambda + Bitmovin transcoding) as the sole developer, carrying the product from MVP through a startup’s second Y Combinator round.',
      'Tech-led a parallel fintech analytics dashboard (Angular): hired the team and owned API and front-end delivery.',
    ],
  },
]

export const education = [
  {
    school: 'Ironhack Bootcamp',
    location: 'Miami',
    dates: 'March 2016 - May 2016',
    description: '400+ hour full-stack immersive: JavaScript, Ruby on Rails, and test-driven development.',
  },
  {
    school: 'City College of New York, CCNY',
    location: 'New York',
    dates: '2011 - 2013',
    description: 'Computer science coursework: algorithms, data structures, and programming principles.',
  },
]

export type SkillGroup = {name: string; keywords: string[]}

// Flat, scannable keyword block for ATS matching and 6-second skims.
// Keep entries to things actually evidenced in the experience above.
export const skills: SkillGroup[] = [
  {name: 'Languages', keywords: ['TypeScript', 'JavaScript', 'Go', 'SQL']},
  {
    name: 'Frontend',
    keywords: [
      'React',
      'Next.js',
      'Astro',
      'React Native',
      'Expo',
      'Angular',
      'Redux / RTK Query',
      'MUI',
      'Storybook',
      'i18n / RTL',
    ],
  },
  {
    name: 'Backend',
    keywords: ['Node.js', 'tRPC', 'Fastify', 'Elysia', 'REST APIs', 'WebRTC', 'Stripe Connect', 'WorkOS SSO'],
  },
  {name: 'Data', keywords: ['PostgreSQL', 'Drizzle', 'Prisma', 'MongoDB', 'Supabase']},
  {
    name: 'AI',
    keywords: ['Agentic AI workflows (Claude Code)', 'LLM-backed product features', 'Audio transcription pipelines (ffmpeg)'],
  },
  {
    name: 'Infra & DevOps',
    keywords: ['GCP', 'AWS', 'Terraform', 'Docker', 'Cloud Run', 'Pub/Sub', 'DigitalOcean', 'Vercel', 'CI/CD'],
  },
  {
    name: 'Tooling',
    keywords: ['Turborepo', 'Bun', 'pnpm', 'GitHub Actions', 'GitLab CI', 'Playwright', 'EAS / mobile release'],
  },
  {
    name: 'Leadership',
    keywords: ['Team leadership', 'Hiring', 'Mentoring', 'Architecture', 'Agile / Scrum', 'Pre-sales support'],
  },
]
