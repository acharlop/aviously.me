import {marked} from 'marked'

// Renders markdown fields (mission, learning records) that the teach skill
// authors. Content is self-authored by the single user, so the parsed HTML is
// trusted. Styling lives in AppLayout's `.md-body` global rules (scoped by class
// so it overrides the site's large unlayered heading styles).
marked.setOptions({gfm: true, breaks: false})

export function Markdown({source, className = ''}: {source: string; className?: string}) {
  const html = marked.parse(source) as string
  return (
    <div
      className={`md-body ${className}`}
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
}
