import {useQuery} from 'convex/react'
import {useState} from 'react'
import {api} from '../../../convex/_generated/api'
import type {Doc} from '../../../convex/_generated/dataModel'
import {AppHeader} from './AppHeader'
import {LessonViewer} from './LessonViewer'
import {Markdown} from './Markdown'
import {label} from './ui'

// Status is a small square plus a mono label; the ledger palette has no status
// colours, so "in progress" takes the accent and "done" is filled ink.
const statusSquare: Record<Doc<'lessons'>['status'], string> = {
  todo: 'border border-[var(--line)]',
  in_progress: 'bg-[var(--accent)]',
  done: 'bg-[var(--text)]',
}
const statusText: Record<Doc<'lessons'>['status'], string | null> = {
  todo: null,
  in_progress: 'In progress',
  done: 'Done',
}

export function WorkspaceView({slug}: {slug: string}) {
  const data = useQuery(api.workspaces.getWorkspace, {slug})
  const [openLesson, setOpenLesson] = useState<Doc<'lessons'> | null>(null)

  if (data === undefined) {
    return (
      <>
        <AppHeader backTo={{href: '/app', label: 'Topics'}} />
        <div className={`${label} mx-auto max-w-3xl px-5 py-10 text-[var(--faint)]`}>Loading…</div>
      </>
    )
  }
  if (data === null) {
    return (
      <>
        <AppHeader backTo={{href: '/app', label: 'Topics'}} />
        <div className='mx-auto max-w-3xl px-5 py-10'>
          <p className={`${label} text-[var(--faint)]`}>Topic not found.</p>
        </div>
      </>
    )
  }

  const {workspace, lessons, referenceDocs, learningRecords} = data

  // Keep the open lesson in sync with fresh query data (e.g. status changes).
  const liveOpenLesson = openLesson ? (lessons.find((l) => l._id === openLesson._id) ?? null) : null

  return (
    <>
      <AppHeader backTo={{href: '/app', label: 'Topics'}} />
      <div className='mx-auto max-w-3xl px-5 py-10'>
        <h1 className='font-[family-name:var(--font-display)] text-[length:var(--text-xl)] leading-[var(--leading-display)] font-bold tracking-[var(--tracking-display)] uppercase'>
          {workspace.title}
        </h1>
        {workspace.mission && <Markdown source={workspace.mission} className='mt-3 text-[var(--muted)]' />}

        <Section title='Lessons'>
          {lessons.length === 0 ? (
            <Empty>No lessons synced yet.</Empty>
          ) : (
            <ul>
              {lessons.map((lesson) => (
                <li key={lesson._id} className='border-b border-b-[var(--line)]'>
                  <button
                    type='button'
                    onClick={() => setOpenLesson(lesson)}
                    className='flex w-full items-center gap-3 py-3 text-left hover:bg-[var(--bg-2)]'
                  >
                    <span aria-hidden className={`h-2 w-2 shrink-0 ${statusSquare[lesson.status]}`} />
                    <span className='flex-1 truncate'>{lesson.title}</span>
                    {statusText[lesson.status] && (
                      <span className={`${label} shrink-0 text-[var(--faint)]`}>{statusText[lesson.status]}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {referenceDocs.length > 0 && (
          <Section title='Reference'>
            <ul>
              {referenceDocs.map((doc) => (
                <li key={doc._id} className='border-b border-b-[var(--line)]'>
                  <button
                    type='button'
                    onClick={() => openInNewTab(doc.html)}
                    className='flex w-full items-center gap-3 py-3 text-left hover:bg-[var(--bg-2)]'
                  >
                    <span className='flex-1 truncate underline decoration-[var(--accent)] underline-offset-4'>
                      {doc.title}
                    </span>
                    <span aria-hidden className={`${label} shrink-0 text-[var(--faint)]`}>
                      Opens in new tab ↗
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {learningRecords.length > 0 && (
          <Section title='Learning records'>
            <ul>
              {learningRecords.map((rec) => (
                <li key={rec._id} className='border-b border-b-[var(--line)]'>
                  <details>
                    <summary className='cursor-pointer py-3 font-[family-name:var(--font-display)] font-medium'>
                      {rec.title}
                    </summary>
                    <Markdown source={rec.markdown} className='pb-4 text-[length:var(--text-sm)] text-[var(--muted)]' />
                  </details>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {liveOpenLesson && <LessonViewer lesson={liveOpenLesson} onBack={() => setOpenLesson(null)} />}
      </div>
    </>
  )
}

// Section bar: an ink chip sitting on a 1.5px rule, like the resume sections.
function Section({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section className='mt-10'>
      <h2 className='mb-0 border-b-[1.5px] border-b-[var(--text)]'>
        <span
          className={`${label} inline-block bg-[var(--text)] px-2 pt-[3px] pb-[2px] font-bold tracking-[var(--tracking-chip)] text-[var(--bg)]`}
        >
          {title}
        </span>
      </h2>
      {children}
    </section>
  )
}

function Empty({children}: {children: React.ReactNode}) {
  return <p className={`${label} py-3 text-[var(--faint)]`}>{children}</p>
}

// Reference docs are designed by the teach skill to print well, so open them as
// a standalone page in a new tab rather than inside the app chrome.
function openInNewTab(html: string) {
  const blob = new Blob([html], {type: 'text/html'})
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank', 'noopener')
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
