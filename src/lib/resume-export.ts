import {education, experience, skills, type ExperienceItem} from '@/data/experience'
import {defaultResumeOptions, type ResumeOptions} from '@/data/resume-options'
import {site} from '@/data/site'

export type ShapedResume = {
  experience: ExperienceItem[]
  education: typeof education
}

/** Applies the knobs to the raw data. Default options return everything unchanged. */
export function shapeResume(rawOptions: ResumeOptions = defaultResumeOptions): ShapedResume {
  const options =
    rawOptions.length === 'one-page'
      ? {...rawOptions, bulletsPerRole: rawOptions.bulletsPerRole ?? 2, includeSubRoles: false}
      : rawOptions
  const capBullets = (bullets: string[]) =>
    options.bulletsPerRole === undefined ? bullets : bullets.slice(0, options.bulletsPerRole)

  const selected =
    options.roles === undefined
      ? experience
      : options.roles
          .map((company) => experience.find((item) => item.company.toLowerCase().startsWith(company.toLowerCase())))
          .filter((item) => item !== undefined)

  const shaped = selected.map((item) => {
    const subRoles = options.includeSubRoles
      ? item.subRoles?.map((sub) => ({...sub, bullets: capBullets(sub.bullets)}))
      : undefined
    // When sub-roles are dropped and the parent has no bullets of its own
    // (Net2phone), hoist each sub-role's lead bullet so the entry isn't empty.
    // The hoisted list is exempt from bulletsPerRole: one line per sub-role,
    // so the whole tenure stays visible.
    const bullets =
      !options.includeSubRoles && item.bullets.length === 0 && item.subRoles
        ? item.subRoles.map((sub) => sub.bullets[0]).filter(Boolean)
        : capBullets(item.bullets)
    return {
      ...item,
      summary: options.includeSummary ? item.summary : undefined,
      bullets,
      subRoles,
    }
  })

  return {experience: shaped, education: options.includeEducation ? education : []}
}

const MONTHS: Record<string, string> = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
}

// "May 2026" -> "2026-05", "2026" -> "2026", anything else -> undefined
function toIsoDate(part: string): string | undefined {
  const trimmed = part.trim()
  if (/^\d{4}$/.test(trimmed)) return trimmed
  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (!match) return undefined
  const month = MONTHS[match[1].toLowerCase()]
  return month ? `${match[2]}-${month}` : match[2]
}

// "May 2026 - Present" -> {startDate: "2026-05"}, "2019" -> {startDate: "2019", endDate: "2019"}
function splitDates(dates: string): {startDate?: string; endDate?: string} {
  const [start, end] = dates.split(/\s*[-–]\s*/)
  if (!end) {
    const single = toIsoDate(start)
    return {startDate: single, endDate: single}
  }
  return {
    startDate: toIsoDate(start),
    endDate: /present/i.test(end) ? undefined : toIsoDate(end),
  }
}

export function resumeMarkdown(options: ResumeOptions = defaultResumeOptions): string {
  const {experience: roles, education: schools} = shapeResume(options)
  const lines: string[] = [
    `# ${site.name}`,
    '',
    site.tagline,
    '',
    `${site.email} · ${site.url} · ${site.linkedin} · ${site.github}`,
    '',
    '## Skills',
    '',
    ...skills.map((group) => `- **${group.name}:** ${group.keywords.join(', ')}`),
    '',
    '## Professional experience',
  ]

  for (const item of roles) {
    lines.push('', `### ${item.role} · ${item.company}`, '')
    lines.push(`*${item.dates}${item.location ? ` · ${item.location}` : ''}*`)
    if (item.summary) lines.push('', item.summary)
    if (item.bullets.length > 0) {
      lines.push('')
      for (const bullet of item.bullets) lines.push(`- ${bullet}`)
    }
    for (const sub of item.subRoles ?? []) {
      lines.push('', `#### ${sub.role} (${sub.dates}${sub.tech ? ` · ${sub.tech}` : ''})`, '')
      for (const bullet of sub.bullets) lines.push(`- ${bullet}`)
    }
  }

  if (schools.length > 0) {
    lines.push('', '## Education')
    for (const item of schools) {
      lines.push('', `### ${item.school}`, '', `*${item.dates} · ${item.location}*`, '', item.description)
    }
  }

  return `${lines.join('\n')}\n`
}

export function resumePlainText(options: ResumeOptions = defaultResumeOptions): string {
  const {experience: roles, education: schools} = shapeResume(options)
  const rule = '='.repeat(64)
  const lines: string[] = [
    site.name.toUpperCase(),
    site.tagline,
    `${site.email} | ${site.url} | ${site.linkedin} | ${site.github}`,
    '',
    rule,
    'SKILLS',
    rule,
    ...skills.map((group) => `${group.name}: ${group.keywords.join(', ')}`),
    '',
    rule,
    'PROFESSIONAL EXPERIENCE',
    rule,
  ]

  for (const item of roles) {
    lines.push('', `${item.role} - ${item.company}`)
    lines.push(`${item.dates}${item.location ? ` | ${item.location}` : ''}`)
    if (item.summary) lines.push(item.summary)
    for (const bullet of item.bullets) lines.push(`* ${bullet}`)
    for (const sub of item.subRoles ?? []) {
      lines.push('', `  ${sub.role} (${sub.dates}${sub.tech ? ` | ${sub.tech}` : ''})`)
      for (const bullet of sub.bullets) lines.push(`  * ${bullet}`)
    }
  }

  if (schools.length > 0) {
    lines.push('', rule, 'EDUCATION', rule)
    for (const item of schools) {
      lines.push('', item.school, `${item.dates} | ${item.location}`, item.description)
    }
  }

  return `${lines.join('\n')}\n`
}

// https://jsonresume.org/schema/
export function resumeJson(options: ResumeOptions = defaultResumeOptions): object {
  const {experience: roles, education: schools} = shapeResume(options)
  const work = roles.flatMap((item) => {
    const base = {
      name: item.company,
      location: item.location,
      summary: item.summary,
      url: undefined as string | undefined,
    }
    const main = {
      ...base,
      position: item.role,
      ...splitDates(item.dates),
      highlights: item.bullets,
    }
    const subs = (item.subRoles ?? []).map((sub) => ({
      ...base,
      position: sub.role,
      ...splitDates(sub.dates),
      summary: sub.tech ? `Primary stack: ${sub.tech}` : undefined,
      highlights: sub.bullets,
    }))
    // The parent entry stays even when its bullets live in sub-roles (e.g. Net2phone),
    // so the umbrella title and full tenure survive in the JSON.
    return [main, ...subs]
  })

  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: site.name,
      label: site.tagline,
      email: site.email,
      url: site.url,
      summary: site.description,
      profiles: [
        {network: 'GitHub', username: site.githubHandle.replace('@', ''), url: site.github},
        {network: 'LinkedIn', username: 'acharlop', url: site.linkedin},
      ],
    },
    work,
    skills: skills.map((group) => ({name: group.name, keywords: group.keywords})),
    education: schools.map((item) => ({
      institution: item.school,
      ...splitDates(item.dates),
      courses: [item.description],
    })),
  }
}
