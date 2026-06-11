export type Repo = {
  name: string
  role: string
  type: string
  stack: string[]
  summary: string
  href?: string
  note?: string
}

export const openSourceRepos: Repo[] = [
  {
    name: 'prism-rails',
    role: 'Maintainer',
    type: 'Ruby on Rails syntax highlighting',
    stack: ['Ruby on Rails', 'Prism.js'],
    href: 'https://github.com/acharlop/prism-rails',
    summary: 'A Rails syntax highlighter gem wrapping Prism.js for simple asset pipeline usage.',
    note: 'Resume data lists 200K+ downloads.',
  },
  {
    name: 'astro-static-cms',
    role: 'Creator / contributor',
    type: 'Astro developer tooling',
    stack: ['Astro', 'TypeScript', 'StaticJSCMS'],
    href: 'https://github.com/acharlop/astro-static-cms',
    summary: 'Integration for adding a StaticJSCMS admin dashboard to Astro projects.',
  },
  {
    name: 'tailwind-config-viewer',
    role: 'Contributor',
    type: 'Tailwind CSS tooling',
    stack: ['Tailwind CSS', 'Developer tooling'],
    summary: 'Contribution to a local UI tool for visualizing Tailwind CSS configuration.',
  },
]
