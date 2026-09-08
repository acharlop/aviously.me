export const site = {
  name: 'Avi Charlop',
  title: 'Avi Charlop - Senior Full-Stack Engineer',
  // Role line under the name in the site masthead.
  role: 'Senior Full-Stack Engineer & Team Lead',
  // Meta description; search results cut it around 160 characters.
  description:
    'Senior full-stack engineer and team lead who builds and mentors teams that own what they ship: greenfield TypeScript, React, Node.js, and Go products.',
  url: 'https://aviously.me',
  email: 'avicharlop@gmail.com',
  // Shown on the resume header and pasted into LinkedIn's location field.
  location: 'Hungary · Remote (CET)',
  linkedin: 'https://linkedin.com/in/acharlop',
  github: 'https://github.com/acharlop',
  githubHandle: '@acharlop',
  // Mirrors the resume sheet headline (src/data/resume-sheet.ts); LinkedIn caps this at 220 characters.
  tagline:
    'Senior full-stack TypeScript engineer and team lead. I build and mentor teams that own what they ship: greenfield products, platform tooling, and the infrastructure to run them.',
  // First-person LinkedIn "About" (and long-form intro). Keep in sync with the resume.
  about: [
    "I'm a full-stack engineer and team lead with 10 years of shipping, most of it remote since 2017. I build and mentor teams that own what they ship: together we carry greenfield products into customers' hands, with the tooling, infrastructure, and working habits to keep them there.",
    'My stack is modern TypeScript: React and Next.js on the front, Node, tRPC, Fastify, and Go on the back, Postgres and Drizzle for data, GCP and AWS with Terraform underneath. I hire and lead teams, most recently a 4-engineer team at Vionlabs, where I kept the existing product live while building its greenfield replacement and supporting sales through the first enterprise customers.',
    'I care about the parts that make software last: types, tests, CI, clean provisioning, and product feedback loops. That now includes AI-assisted engineering: reusable Agent Skills and custom workflows that carry a repository’s architecture, conventions, and guardrails from research through review. Open to senior and lead full-stack roles where the work needs both architecture and shipping momentum.',
  ].join('\n\n'),
} as const

export const navigation = [
  {label: 'Home', href: '/'},
  {label: 'About', href: '/about/'},
  {label: 'Work', href: '/work/'},
  {label: 'Experience', href: '/experience/'},
  {label: 'Open Source', href: '/open-source/'},
  {label: 'Contact', href: '/contact/'},
] as const
