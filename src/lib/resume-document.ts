import {education as allEducation} from '@/data/experience'
import {openSourceRepos} from '@/data/open-source'

export type CreditLine = {label: string; value: string}

// The printed page wants two dense skill lines, not seven table rows.
// Keep the verbose groups in experience.ts for the website and JSON resume.
export const printSkillGroups: CreditLine[] = [
  {
    label: 'Languages and frontend',
    value: 'TypeScript, JavaScript, Go, SQL, React, Next.js, Astro, React Native, Expo, Angular, Redux, Storybook',
  },
  {
    label: 'Backend and data',
    value: 'Node.js, tRPC, Fastify, REST APIs, WebRTC, Stripe, PostgreSQL, MongoDB, Drizzle, Prisma',
  },
  {
    label: 'Infra, AI and leadership',
    value: 'GCP, AWS, Terraform, Docker, CI/CD, Turborepo, agentic AI workflows with Claude Code, team leadership and hiring',
  },
]

export function resumeSkillLines(): CreditLine[] {
  return printSkillGroups
}

/** One line for maintained projects, one for merged contributions. */
export function openSourceLines(): CreditLine[] {
  const maintained = openSourceRepos.filter((repo) => repo.status === 'maintainer')
  const contributed = openSourceRepos.filter((repo) => repo.status === 'merged')
  const lines: CreditLine[] = []

  if (maintained.length > 0) {
    lines.push({
      label: 'Maintainer',
      value: maintained.map((repo) => (repo.note ? `${repo.name}, ${repo.note.replace(/\.$/, '')}` : repo.name)).join('; '),
    })
  }
  if (contributed.length > 0) {
    lines.push({
      label: 'Contributor',
      value: `merged pull requests to ${listSentence(contributed.map((repo) => repo.name))}`,
    })
  }
  return lines
}

/** One line per school: "Ironhack, Miami — full-stack immersive, 2016". */
export function educationLines(schools: typeof allEducation = allEducation): CreditLine[] {
  return schools.map((item) => ({
    label: [item.school.replace(' Bootcamp', ''), item.location].filter(Boolean).join(', '),
    value: `${shortDescription(item.description)}, ${endYear(item.dates)}`,
  }))
}

export function resumeCredits(schools: typeof allEducation = allEducation): CreditLine[] {
  return [...openSourceLines(), ...educationLines(schools)]
}

const MONTHS: Record<string, string> = {
  january: 'Jan',
  february: 'Feb',
  march: 'Mar',
  april: 'Apr',
  may: 'May',
  june: 'Jun',
  july: 'Jul',
  august: 'Aug',
  september: 'Sep',
  october: 'Oct',
  november: 'Nov',
  december: 'Dec',
}

/** "February 2025 - February 2026" -> "Feb 2025 – Feb 2026" */
export function formatDates(dates: string): string {
  return dates
    .split(/\s*[-–]\s*/)
    .map((part) => {
      const match = part.trim().match(/^([A-Za-z]+)\s+(\d{4})$/)
      if (!match) return part.trim()
      const short = MONTHS[match[1].toLowerCase()]
      return short ? `${short} ${match[2]}` : part.trim()
    })
    .join(' – ')
}

function endYear(dates: string): string {
  const years = dates.match(/\d{4}/g)
  return years ? years[years.length - 1] : dates
}

// "400+ hour full-stack immersive: JavaScript, ..." -> "400+ hour full-stack immersive"
function shortDescription(description: string): string {
  return description.split(/[:.]/)[0].trim().toLowerCase()
}

function listSentence(items: string[]): string {
  if (items.length < 2) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}
