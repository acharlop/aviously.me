import type {APIRoute} from 'astro'
import {site} from '@/data/site'

export const GET: APIRoute = () => {
  const body = `# ${site.name}

> ${site.description}

${site.tagline}

## Pages

- [About](${site.url}/about/): professional story, working style, and strengths
- [Services](${site.url}/services/): client engagements - zero-to-shipped TypeScript platforms and infra automation
- [Work](${site.url}/work/): case studies of selected projects
- [Experience](${site.url}/experience/): full role history
- [Resume](${site.url}/resume/): resume with PDF download
- [Open Source](${site.url}/open-source/): open-source projects and contributions
- [Now](${site.url}/now/): current projects and availability
- [Contact](${site.url}/contact/): how to get in touch

## Contact

- Email: ${site.email}
- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
`
  return new Response(body, {headers: {'Content-Type': 'text/plain; charset=utf-8'}})
}
