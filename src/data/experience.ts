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
      'Architected a "one-click village" provisioning system that launches a complete community-platform instance across DigitalOcean, Vercel, MongoDB, Mailgun, Firebase, and Stripe Connect from one typed config, cutting setup from a full day to about 20 minutes.',
      'Designed the workflow engine as an idempotent, resumable step DAG over durable state, with full teardown and end-to-end tests against live cloud providers.',
      'Shipped the operator surface as an Ink terminal UI, compiled single-file binaries, and an Elysia control API with token auth and streamed mutation endpoints.',
      'Contributed production fixes to the core Closer platform: a Next.js 15 / Turborepo frontend and a Node + MongoDB API.',
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
      'Built the data-sync services that unified content from upstream fingerprinting systems into one customer-facing portal.',
      'Owned the GCP production platform in Terraform: Cloud Run, Cloud SQL, Pub/Sub, Eventarc, Secret Manager, VPC, and GitLab CI/CD.',
      'Partnered with Sales through 4 trade shows, turning customer feedback into same-day product updates and driving the portal to feature-complete for the first 5-7 enterprise customers.',
    ],
  },
  {
    company: 'Collect.AI',
    role: 'Senior Frontend Engineer',
    location: 'Remote',
    dates: 'August 2023 - August 2024',
    summary:
      'Frontend platform work for a German receivables-management SaaS portal, internal component library, and published client SDK.',
    bullets: [
      'Built a type-safe form generator on React Hook Form and the internal MUI component library, standardizing form development across the collections portal.',
      'Introduced Redux Toolkit and RTK Query to simplify state management and data fetching in a large React/TypeScript monorepo.',
      'Drove a platform-wide UI consistency pass through Storybook-documented components, polished loading and modal states, and shared SDK updates.',
      'Modernized package publishing from NPM to GitHub Packages with reusable GitHub Actions and a publish-and-test SDK pipeline.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Full-Stack Developer',
    dates: 'October 2022 - June 2023',
    bullets: [
      'Co-created and continue to operate whocards.cc, an owned conversation-card product with an Astro + Stripe storefront, automated checkout, and fulfillment integrations that have shipped ~600 orders.',
      'Integrated 2 fulfillment providers (Zenfulfillment, later Egon) and routed orders to regional carriers across direct storefront sales and brand-ambassador channels.',
      'Built J3D.AI, a real-time AI workshop-summary app (Next.js, tRPC, Prisma, Supabase, GCP) with live audio capture, ffmpeg-based transcription, and editable AI-generated next steps.',
      'Shipped Tezos NFT experiences for proofofperformance.xyz and circa.art, including live on-chain minting tooling and marketplace work on the Taquito stack.',
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
          'Built a WebRTC browser dialer (React, Redux, TypeScript, JsSIP) supporting multiple call-server configurations, a core piece of the modern web client.',
          'Introduced React micro frontends to modernize the legacy Angular system and accelerate cross-team feature delivery.',
        ],
      },
      {
        role: 'Lead Front-End Engineer & Scrum Master',
        tech: 'Angular',
        dates: '2019',
        bullets: [
          'Led a shared component library and reusable module extensions across the Unite Angular web client, improving UI consistency and feature rollout speed.',
          'Drove front-end modernization of the Unite client, including major-version Angular upgrades, to improve performance and maintainability.',
        ],
      },
      {
        role: 'Mobile Engineer',
        tech: 'React Native',
        dates: '2018',
        bullets: [
          'Developed live chat and calling features in the React Native mobile app, improving customer communication flows.',
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
      'Built a serverless streaming-media pipeline (AWS Lambda + Bitmovin transcoding) as the primary developer, carrying the product from MVP through a startup’s second Y Combinator round.',
      'Delivered the Aapryl fintech analytics dashboard MVP end-to-end with Angular and Node.js.',
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
