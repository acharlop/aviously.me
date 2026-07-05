import {useMutation} from 'convex/react'
import {api} from '../../../convex/_generated/api'
import type {Doc} from '../../../convex/_generated/dataModel'

// Renders a lesson's self-contained HTML in a sandboxed iframe. `allow-scripts`
// lets the lesson's interactive quiz JS run, but the absence of
// `allow-same-origin` keeps it isolated from the app's origin, cookies, and
// Convex session — the same isolation model as Artifacts.
export function LessonViewer({
  lesson,
  onBack,
}: {
  lesson: Doc<'lessons'>
  onBack: () => void
}) {
  const setStatus = useMutation(api.workspaces.setLessonStatus)

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-[var(--faint)] hover:text-[var(--accent)]"
        >
          ← Lessons
        </button>
        <span className="min-w-0 flex-1 truncate text-center text-sm font-medium">
          {lesson.title}
        </span>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => void setStatus({lessonId: lesson._id, status: 'in_progress'})}
            className={`rounded-md border px-2 py-1 text-xs ${
              lesson.status === 'in_progress'
                ? 'border-[var(--amber)] text-[var(--amber)]'
                : 'border-[var(--line)] text-[var(--faint)] hover:text-[var(--text)]'
            }`}
          >
            In progress
          </button>
          <button
            type="button"
            onClick={() => void setStatus({lessonId: lesson._id, status: 'done'})}
            className={`rounded-md border px-2 py-1 text-xs ${
              lesson.status === 'done'
                ? 'border-[var(--green)] text-[var(--green)]'
                : 'border-[var(--line)] text-[var(--faint)] hover:text-[var(--text)]'
            }`}
          >
            ✓ Done
          </button>
        </div>
      </div>
      <iframe
        title={lesson.title}
        srcDoc={lesson.html}
        sandbox="allow-scripts"
        className="min-h-0 flex-1 border-0 bg-white"
      />
    </div>
  )
}
