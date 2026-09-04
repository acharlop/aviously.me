import {marked} from 'marked'

// Renders markdown fields (mission, learning records) that the teach skill
// authors. Content is self-authored by the single user, so the parsed HTML is
// trusted. Styling is the site's `.prose` rules in src/styles/global.css.
marked.setOptions({gfm: true, breaks: false})

export function Markdown({source, className = ''}: {source: string; className?: string}) {
  const html = marked.parse(source) as string
  return <div className={`prose ${className}`} dangerouslySetInnerHTML={{__html: html}} />
}
