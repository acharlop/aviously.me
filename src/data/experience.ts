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
    summary:
      'Infrastructure-automation tooling and platform work for Closer, the operating system behind regenerative co-living communities ("villages").',
    bullets: [
      'Built a greenfield "one-click village" provisioning system (Bun monorepo, TypeScript) that stands up a complete community-platform instance across DigitalOcean, Vercel, MongoDB, Mailgun, Firebase, and Stripe Connect from a single typed config — cutting a new community launch from a full day of manual setup to about 20 minutes.',
      'Designed idempotent, resumable provisioning workflows — a step DAG over durable state — with full teardown, validated by end-to-end tests against live cloud providers.',
      'Shipped an Ink terminal UI distributed as compiled single-file binaries and an Elysia control API with token auth and streamed mutation endpoints.',
      'Contributed fixes to the core platform alongside the tooling: a Next.js 15 / Turborepo frontend and a Node + MongoDB API.',
    ],
  },
  {
    company: 'Vionlabs',
    role: 'Team Lead',
    location: 'Remote',
    dates: 'February 2025 - February 2026',
    summary:
      'Built and led the engineering team behind a greenfield customer portal and multi-source data platform for enterprise media-tech customers.',
    bullets: [
      'Hired and led a 4-engineer team, setting workflows and code standards across frontend, API, and documentation — running two tracks at once: keeping the existing customer portal live while architecting and building its greenfield replacement.',
      'Built the new portal as a Turborepo monorepo (Next.js, tRPC, Fastify, Drizzle/Postgres) with a Figma-driven Storybook design system, catalog browsing, smart-lists, filtering and tagging, and enterprise auth (WorkOS SSO, scoped API keys).',
      'Built the multi-source data-sync layer that unified content from upstream fingerprinting systems into a single customer-facing portal.',
      'Owned GCP infrastructure end-to-end in Terraform — Cloud Run, Cloud SQL, Pub/Sub, Eventarc, Secret Manager, and VPC — with GitLab CI/CD pipelines for automated deploys.',
      'Acted as the technical partner to Sales, demoing and supporting the product across four trade shows and turning customer feedback into same-day updates — driving to feature-complete and onboarding the first 5–7 enterprise customers.',
    ],
  },
  {
    company: 'Collect.AI',
    role: 'Senior Frontend Engineer',
    location: 'Remote',
    dates: 'August 2023 - August 2024',
    bullets: [
      'Built a fully type-safe form generator on React Hook Form and the internal MUI component library, standardizing form development and reducing implementation time.',
      'Introduced Redux Toolkit with RTK Query to simplify state management and data fetching.',
      'Drove a platform-wide UI-consistency overhaul, contributing Storybook-documented components to the shared library and published client SDK.',
      'Migrated package management from NPM to GitHub Packages and automated publish/deploy with reusable GitHub Actions workflows.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Full-Stack Developer',
    dates: 'October 2022 - June 2023',
    bullets: [
      'Co-created and continue to operate whocards.cc, an owned conversation-card product — an Astro + Stripe storefront on Netlify with an automated end-to-end checkout and fulfillment flow, integrating two third-party fulfillment providers (Zenfulfillment, later Egon) that route orders to regional carriers — ~600 orders fulfilled to date across direct storefront sales and a network of brand ambassadors who continue to sell the product.',
      'Built J3D.AI, a real-time AI workshop-summary app (T3 stack: Next.js, tRPC, Prisma, Supabase, GCP) with live audio capture, an ffmpeg-based transcription pipeline, and AI-generated summaries with editable next steps.',
      'Built proofofperformance.xyz, a live on-chain NFT minting experience on Tezos for a DJ event, using fxhash live-minting tooling.',
      'Contributed to circa.art and the underlying Tezos NFT marketplace stack (Taquito), letting users purchase video frames during a high-profile launch.',
    ],
  },
  {
    company: 'Net2phone',
    role: 'Engineering Lead / Full-Stack Engineer',
    location: 'Remote',
    dates: 'February 2017 - November 2022',
    bullets: [],
    subRoles: [
      {
        role: 'Cross-Team Intrapreneur',
        tech: 'React',
        dates: '2020 - 2022',
        bullets: [
          'Built a WebRTC browser dialer (React, Redux, TypeScript, JsSIP) supporting multiple call-server configurations — a core piece of the modern web client.',
          'Introduced React micro frontends to modernize the legacy Angular system and accelerate feature development across teams.',
        ],
      },
      {
        role: 'Lead Front-End Engineer & Scrum Master',
        tech: 'Angular',
        dates: '2019',
        bullets: [
          'Led a shared component library and reusable module extensions across the Unite Angular web client, improving UI consistency and speeding up feature rollouts.',
          'Drove front-end modernization of the Unite client, including major-version Angular upgrades, to improve performance and maintainability.',
        ],
      },
      {
        role: 'Mobile Engineer',
        tech: 'React Native',
        dates: '2018',
        bullets: [
          'Developed and enhanced live chat and calling features in the mobile app, improving user communication flows.',
          'Streamlined code generation processes to accelerate mobile app releases.',
        ],
      },
      {
        role: 'Backend Engineer',
        tech: 'Go',
        dates: '2017',
        bullets: [
          'Refactored core messaging microservices in Go (engine, user service, shared libraries) to improve scalability and maintainability.',
          'Implemented unit testing across key services to improve reliability.',
        ],
      },
    ],
  },
  {
    company: 'Takt Digital',
    role: 'Software Engineer',
    location: 'Miami',
    dates: 'May 2016 - January 2017',
    bullets: [
      'Built a serverless streaming-media pipeline (AWS Lambda + Bitmovin transcoding) as the primary developer, carrying it from MVP through a startup’s second round of Y Combinator.',
      'Delivered the Aapryl fintech analytics dashboard MVP end-to-end, frontend and backend, using Angular and Node.js.',
    ],
  },
]

export const education = [
  {
    school: 'Ironhack Bootcamp',
    location: 'Miami',
    dates: 'March 2016 - May 2016',
    description:
      'Completed 400+ hours of intensive web development training focused on Ruby on Rails, JavaScript, HTML, Git, and test-driven development through hands-on projects.',
  },
  {
    school: 'City College of New York, CCNY',
    location: 'New York',
    dates: '2011 - 2013',
    description:
      'Pursued coursework in computer science, focusing on algorithms, data structures, and programming principles.',
  },
]

export type SkillGroup = {name: string; keywords: string[]}

// Flat, scannable keyword block for ATS matching and 6-second skims.
// Keep entries to things actually evidenced in the experience above.
export const skills: SkillGroup[] = [
  {name: 'Languages', keywords: ['TypeScript', 'JavaScript', 'Go', 'SQL', 'Ruby']},
  {name: 'Frontend', keywords: ['React', 'Next.js', 'Astro', 'React Native', 'Redux', 'Angular', 'Storybook']},
  {name: 'Backend', keywords: ['Node.js', 'tRPC', 'Fastify', 'Elysia', 'WebRTC', 'REST APIs']},
  {name: 'Data', keywords: ['PostgreSQL', 'Drizzle', 'Prisma', 'MongoDB', 'Supabase']},
  {name: 'Infra & DevOps', keywords: ['GCP', 'AWS', 'Terraform', 'Docker', 'CI/CD', 'Cloud Run', 'Vercel']},
  {name: 'Tooling', keywords: ['Turborepo', 'Bun', 'pnpm', 'GitHub Actions', 'Playwright']},
]
