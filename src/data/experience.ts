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
    company: 'Vionlabs',
    role: 'Team Lead',
    location: 'Remote',
    dates: 'February 2025 - February 2026',
    summary: 'Greenfield customer portal and multi-source data platform for enterprise media-tech customers.',
    bullets: [
      'Built and led a 4-engineer team, establishing workflows and code standards for a greenfield full-stack monorepo using Next.js, tRPC, Fastify, and Fumadocs.',
      'Designed and delivered a robust multi-source data sync pipeline, unifying content from multiple upstream systems into a single customer-facing portal.',
      'Provisioned and scaled GCP infrastructure with Terraform and implemented GitLab CI/CD pipelines for reliable automated deployments.',
      'Partnered directly with Sales to onboard enterprise customers and drive rapid iteration, turning customer feedback into same-day product updates.',
    ],
  },
  {
    company: 'Collect.AI',
    role: 'Senior Frontend Engineer',
    location: 'Remote',
    dates: 'August 2023 - August 2024',
    bullets: [
      'Collaborated with design and product teams to implement a major UI overhaul, improving design consistency across the platform.',
      'Introduced Redux Toolkit with RTK Query to simplify state management and data fetching.',
      'Developed a fully type-safe form generator using React Hook Form and an internal component library, standardizing form development and reducing implementation time.',
      'Migrated internal package management from NPM to GitHub Packages and automated deployments with reusable GitHub Actions workflows.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Full-Stack Developer',
    dates: 'October 2022 - June 2023',
    bullets: [
      'Co-created and continue to build whocards.cc, an owned conversation card product using Astro, Stripe, product design, and integrations with two shipping providers for automated fulfillment.',
      'Built J3D.AI, a real-time AI-powered summary MVP for live workshop summaries and actionable next steps.',
      'Designed and implemented proofofperformance.xyz, a Web3 NFT minting experience for a live DJ event using Tezos blockchain transactions.',
      'Created circa.art, a Next.js NFT marketplace that allowed users to purchase video frames during a high-profile launch and continue engaging post-launch.',
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
          'Introduced React micro frontends to modernize a legacy Angular system and accelerate feature development across teams.',
          'Built a WebRTC-powered dialer widget supporting multiple call server configurations, improving real-time communication capabilities.',
        ],
      },
      {
        role: 'Lead Front-End Engineer & Scrum Master',
        tech: 'Angular',
        dates: '2019',
        bullets: [
          'Led the creation of a shared component library across products, improving UI consistency and speeding up feature rollouts.',
          'Upgraded the Angular codebase from v2 to v9, improving performance and reducing initial application load time by 50%.',
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
        tech: 'Go, Dart',
        dates: '2017',
        bullets: [
          'Refactored microservices architecture using Go to improve scalability and maintainability.',
          'Implemented robust unit testing across key services to improve reliability.',
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
      'Led development of a streaming media workflow engine as the sole developer from MVP stage through the second round of Y Combinator.',
      'Managed frontend and backend development for Aapryl, a fintech analytics dashboard, delivering a comprehensive MVP using Angular and Node.js.',
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
