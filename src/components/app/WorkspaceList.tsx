import {useQuery} from 'convex/react'
import {api} from '../../../convex/_generated/api'
import {AppHeader} from './AppHeader'
import {label, mono} from './ui'

export function WorkspaceList() {
  const workspaces = useQuery(api.workspaces.listWorkspaces)

  return (
    <>
      <AppHeader />
      <div className='mx-auto max-w-3xl px-5 py-10'>
        <h1 className='mb-6 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] leading-[var(--leading-display)] font-bold tracking-[var(--tracking-display)] uppercase'>
          Your topics
        </h1>

        {workspaces === undefined ? (
          <p className={`${label} text-[var(--faint)]`}>Loading…</p>
        ) : workspaces.length === 0 ? (
          <p className='text-[var(--muted)]'>
            Nothing here yet. Generate a topic with the <code className={mono}>teach</code> skill, then run{' '}
            <code className={mono}>bun run teach:sync &lt;workspace-dir&gt;</code>.
          </p>
        ) : (
          <ul className='border-t-[1.5px] border-t-[var(--text)]'>
            {workspaces.map((ws) => {
              const pct = ws.lessonCount ? Math.round((ws.doneCount / ws.lessonCount) * 100) : 0
              return (
                <li key={ws._id} className='border-b border-b-[var(--line)]'>
                  <a
                    href={`/app?w=${encodeURIComponent(ws.slug)}`}
                    className='block py-4 hover:bg-[var(--bg-2)] hover:text-[var(--text)]'
                  >
                    <div className='flex items-baseline justify-between gap-3'>
                      <span className='font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-medium'>
                        {ws.title}
                      </span>
                      <span className={`${label} shrink-0 text-[var(--faint)]`}>
                        {ws.doneCount}/{ws.lessonCount} done
                      </span>
                    </div>
                    {ws.mission && (
                      <p className='mt-1 line-clamp-2 text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[var(--muted)]'>
                        {ws.mission}
                      </p>
                    )}
                    <div className='mt-3 h-[3px] bg-[var(--line)]' role='presentation'>
                      <div className='h-full bg-[var(--accent)]' style={{width: `${pct}%`}} />
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
