export const site = {
  name: 'Avi Charlop',
  title: 'Avi Charlop - Senior Full-Stack Engineer',
  description:
    'Senior full-stack engineer and team lead building modern web products with React, TypeScript, Next.js, Astro, Node.js, Go, Rails, cloud infrastructure, and practical product leadership.',
  url: 'https://aviously.me',
  email: 'avicharlop@gmail.com',
  linkedin: 'https://linkedin.com/in/acharlop',
  github: 'https://github.com/acharlop',
  githubHandle: '@acharlop',
  tagline:
    'Senior full-stack TypeScript engineer & team lead — ~10 years shipping greenfield products and the infrastructure to run them.',
  bio: 'Learning new ways not to do things every day',
  // First-person LinkedIn "About" (and long-form intro). Keep in sync with the resume.
  about: [
    "I'm a full-stack engineer and team lead with ~10 years of shipping, most of it remote since 2017. I gravitate to the zero-to-one end of the work: standing up greenfield products and the infrastructure to run them, then sticking around to make them solid.",
    'My stack is modern TypeScript — React and Next.js on the front, Node, tRPC, Fastify and Go on the back, Postgres and Drizzle for data, GCP and AWS with Terraform underneath. I hire and lead teams (most recently a 4-engineer team at Vionlabs, where I kept the existing product live while building its greenfield replacement and supported sales through our first enterprise customers) and I ship plenty solo.',
    'I care about the parts that make software last — types, tests, CI, clean provisioning — and about building things people actually use. Open to senior and lead full-stack roles.',
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
