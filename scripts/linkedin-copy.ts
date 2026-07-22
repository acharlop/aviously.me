// Emit paste-ready LinkedIn profile content from the site's single source of
// truth (experience.ts + site.ts), so LinkedIn never drifts from the resume.
// Usage: bun scripts/linkedin-copy.ts
// See docs/runbooks/linkedin.md for where each block goes.
import {shapeResume} from '@/lib/resume-export'
import {site} from '@/data/site'

const {experience, education} = shapeResume()
const hr = (label: string) => console.log(`\n${'─'.repeat(8)} ${label} ${'─'.repeat(Math.max(0, 56 - label.length))}\n`)

hr('HEADLINE (220 chars max)')
console.log(site.tagline)

hr('WEBSITE (Contact info → Website)')
console.log(`${site.url}  (type: Portfolio)`)

hr('ABOUT (2,600 chars max)')
console.log(site.about)

for (const item of experience) {
  hr(`EXPERIENCE — ${item.company}`)
  console.log(`Title:     ${item.role}`)
  console.log(`Company:   ${item.company}`)
  console.log(`Dates:     ${item.dates}`)
  if (item.location)
    console.log(`Location:  ${item.location}${item.location === 'Remote' ? ' (set Location type: Remote)' : ''}`)
  console.log('Description:')
  if (item.summary) console.log(item.summary)
  for (const bullet of item.bullets) console.log(`• ${bullet}`)
  for (const sub of item.subRoles ?? []) {
    console.log(`\n  ↳ Add as separate position under ${item.company}:`)
    console.log(`  Title: ${sub.role}${sub.tech ? ` (${sub.tech})` : ''} | Dates: ${sub.dates}`)
    for (const bullet of sub.bullets) console.log(`  • ${bullet}`)
  }
}

for (const item of education) {
  hr(`EDUCATION — ${item.school}`)
  console.log(`School:    ${item.school}`)
  console.log(`Dates:     ${item.dates}`)
  console.log(`Location:  ${item.location}`)
  console.log(`Description:\n${item.description}`)
}
