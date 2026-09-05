import {useMutation} from 'convex/react'
import {api} from '../../../convex/_generated/api'
import type {Doc} from '../../../convex/_generated/dataModel'
import {button, buttonInk, label} from './ui'

// Renders a lesson's self-contained HTML in a sandboxed iframe. `allow-scripts`
// lets the lesson's interactive quiz JS run, but the absence of
// `allow-same-origin` keeps it isolated from the app's origin, cookies, and
// Convex session — the same isolation model as Artifacts.
export function LessonViewer({lesson, onBack}: {lesson: Doc<'lessons'>; onBack: () => void}) {
  const setStatus = useMutation(api.workspaces.setLessonStatus)

  return (
    <div className='fixed inset-0 z-50 flex flex-col bg-[var(--bg)]'>
      <div className='flex items-center justify-between gap-3 border-b-[1.5px] border-b-[var(--text)] px-4 py-2'>
        <button type='button' onClick={onBack} className={`${label} text-[var(--faint)] hover:text-[var(--text)]`}>
          ← Lessons
        </button>
        <span className='min-w-0 flex-1 truncate text-center font-[family-name:var(--font-display)] font-medium'>
          {lesson.title}
        </span>
        <div className='flex shrink-0 gap-2' role='group' aria-label='Lesson status'>
          <button
            type='button'
            aria-pressed={lesson.status === 'in_progress'}
            onClick={() => void setStatus({lessonId: lesson._id, status: 'in_progress'})}
            className={lesson.status === 'in_progress' ? buttonInk : button}
          >
            In progress
          </button>
          <button
            type='button'
            aria-pressed={lesson.status === 'done'}
            onClick={() => void setStatus({lessonId: lesson._id, status: 'done'})}
            className={lesson.status === 'done' ? buttonInk : button}
          >
            Done
          </button>
        </div>
      </div>
      <iframe
        title={lesson.title}
        srcDoc={lesson.html}
        sandbox='allow-scripts'
        className='min-h-0 flex-1 border-0 bg-[var(--bg)]'
      />
    </div>
  )
}
