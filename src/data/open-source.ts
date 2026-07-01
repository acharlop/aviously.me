export type RepoStatus = 'merged' | 'pending' | 'maintainer'

export type Repo = {
  name: string
  role: string
  type: string
  stack: string[]
  summary: string
  href?: string
  note?: string
  status?: RepoStatus
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
    status: 'maintainer',
  },
  {
    name: 'tailwind-config-viewer',
    role: 'Contributor',
    type: 'Tailwind CSS tooling',
    stack: ['Tailwind CSS', 'Developer tooling'],
    href: 'https://github.com/rogden/tailwind-config-viewer/pull/57',
    summary: 'Added a font-family viewer component (plus serve/build scripts) to the local Tailwind config visualizer.',
    note: 'PR #57 · 2022',
    status: 'merged',
  },
  {
    name: 'create-t3-app',
    role: 'Contributor',
    type: 'T3 stack scaffolding CLI',
    stack: ['TypeScript', 'Shell'],
    href: 'https://github.com/t3-oss/create-t3-app/pull/2038',
    summary: 'Improved the generated start-database.sh script in the T3 app scaffolder.',
    note: 'PR #2038 · 2025',
    status: 'merged',
  },
  {
    name: 'bidi-js',
    role: 'Contributor',
    type: 'Unicode Bidirectional Algorithm library',
    stack: ['TypeScript', 'JavaScript'],
    href: 'https://github.com/lojjic/bidi-js/pull/15',
    summary:
      'Added hand-maintained TypeScript type definitions that correctly type the factory function and its returned API.',
    note: 'PR #15 · 2026',
    status: 'merged',
  },
  {
    name: 'nuqs',
    role: 'Contributor',
    type: 'Type-safe URL search params state manager',
    stack: ['TypeScript', 'React', 'Next.js'],
    href: 'https://github.com/47ng/nuqs/pull/748',
    summary: 'Refactored the TanStack Table docs pagination example and added a sorting example.',
    note: 'PR #748 · open since 2024',
    status: 'pending',
  },
]
