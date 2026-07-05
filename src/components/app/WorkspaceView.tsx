import {useQuery} from 'convex/react'
import {useState} from 'react'
import {api} from '../../../convex/_generated/api'
import type {Doc} from '../../../convex/_generated/dataModel'
import {AppHeader} from './AppHeader'
import {LessonViewer} from './LessonViewer'

const statusDot: Record<Doc<'lessons'>['status'], string> = {
  todo: 'var(--faint)',
  in_progress: 'var(--amber)',
  done: 'var(--green)',
}

export function WorkspaceView({slug}: {slug: string}) {
  const data = useQuery(api.workspaces.getWorkspace, {slug})
  const [openLesson, setOpenLesson] = useState<Doc<'lessons'> | null>(null)

  if (data === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-10 text-[var(--faint)]">
        Loading…
      </div>
    )
  }
  if (data === null) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-10">
        <AppHeader backTo={{href: '/app', label: 'Topics'}} />
        <p className="text-[var(--faint)]">Topic not found.</p>
      </div>
    )
  }

  const {workspace, lessons, referenceDocs, learningRecords} = data

  // Keep the open lesson in sync with fresh query data (e.g. status changes).
  const liveOpenLesson = openLesson
    ? (lessons.find((l) => l._id === openLesson._id) ?? null)
    : null

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <AppHeader backTo={{href: '/app', label: 'Topics'}} />

      <h1
        style={{fontFamily: 'var(--font-display)', fontSize: '1.9rem', lineHeight: 1.1, margin: 0}}
      >
        {workspace.title}
      </h1>
      {workspace.mission && (
        <p className="mt-2 whitespace-pre-wrap text-[var(--muted)]">
          {workspace.mission}
        </p>
      )}

      <Section title="Lessons">
        {lessons.length === 0 ? (
          <Empty>No lessons synced yet.</Empty>
        ) : (
          <ul className="flex flex-col gap-1">
            {lessons.map((lesson) => (
              <li key={lesson._id}>
                <button
                  type="button"
                  onClick={() => setOpenLesson(lesson)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-[var(--surface)]"
                >
                  <span
                    aria-hidden
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{background: statusDot[lesson.status]}}
                  />
                  <span className="flex-1 truncate">{lesson.title}</span>
                  {lesson.status === 'done' && (
                    <span className="text-xs text-[var(--green)]">done</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {referenceDocs.length > 0 && (
        <Section title="Reference">
          <ul className="flex flex-col gap-1">
            {referenceDocs.map((doc) => (
              <li key={doc._id}>
                <button
                  type="button"
                  onClick={() => openInNewTab(doc.html)}
                  className="w-full truncate rounded-md px-3 py-2 text-left text-[var(--accent)] hover:bg-[var(--surface)]"
                >
                  {doc.title} ↗
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {learningRecords.length > 0 && (
        <Section title="Learning records">
          <ul className="flex flex-col gap-2">
            {learningRecords.map((rec) => (
              <li key={rec._id}>
                <details className="rounded-md border border-[var(--line)] bg-[var(--surface)]">
                  <summary className="cursor-pointer px-3 py-2 font-medium">
                    {rec.title}
                  </summary>
                  <pre className="overflow-x-auto whitespace-pre-wrap px-3 pb-3 text-sm text-[var(--muted)]">
                    {rec.markdown}
                  </pre>
                </details>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {liveOpenLesson && (
        <LessonViewer lesson={liveOpenLesson} onBack={() => setOpenLesson(null)} />
      )}
    </div>
  )
}

function Section({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section className="mt-8">
      <h2
        className="mb-2 text-[var(--faint)]"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          margin: '0 0 0.5rem',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function Empty({children}: {children: React.ReactNode}) {
  return <p className="px-3 text-sm text-[var(--faint)]">{children}</p>
}

// Reference docs are designed by the teach skill to print well, so open them as
// a standalone page in a new tab rather than inside the app chrome.
function openInNewTab(html: string) {
  const blob = new Blob([html], {type: 'text/html'})
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank', 'noopener')
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
