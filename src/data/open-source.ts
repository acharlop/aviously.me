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
    note: '250K+ downloads on RubyGems.',
  },
  {
    name: 'tailwind-config-viewer',
    role: 'Contributor',
    type: 'Tailwind CSS tooling',
    stack: ['Tailwind CSS', 'Developer tooling'],
    href: 'https://github.com/rogden/tailwind-config-viewer/pull/57',
    summary: 'Added a font-family viewer component (plus serve/build scripts) to the local Tailwind config visualizer.',
    note: 'PR #57, merged 2022.',
  },
  {
    name: 'create-t3-app',
    role: 'Contributor',
    type: 'T3 stack scaffolding CLI',
    stack: ['TypeScript', 'Shell'],
    href: 'https://github.com/t3-oss/create-t3-app/pull/2038',
    summary: 'Improved the generated start-database.sh script in the T3 app scaffolder.',
    note: 'PR #2038, merged 2025.',
  },
]
