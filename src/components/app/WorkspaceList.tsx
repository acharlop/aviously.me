import {useQuery} from 'convex/react'
import {api} from '../../../convex/_generated/api'
import {AppHeader} from './AppHeader'

export function WorkspaceList() {
  const workspaces = useQuery(api.workspaces.listWorkspaces)

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <AppHeader />
      <h1
        className="mb-6"
        style={{fontFamily: 'var(--font-display)', fontSize: '1.7rem', lineHeight: 1.15, margin: '0 0 1.5rem'}}
      >
        Your topics
      </h1>

      {workspaces === undefined ? (
        <p className="text-[var(--faint)]">Loading…</p>
      ) : workspaces.length === 0 ? (
        <p className="text-[var(--faint)]">
          Nothing here yet. Generate a topic with the <code>teach</code> skill,
          then run <code>bun run teach:sync &lt;workspace-dir&gt;</code>.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {workspaces.map((ws) => {
            const pct = ws.lessonCount
              ? Math.round((ws.doneCount / ws.lessonCount) * 100)
              : 0
            return (
              <li key={ws._id}>
                <a
                  href={`/app?w=${encodeURIComponent(ws.slug)}`}
                  className="block rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium">{ws.title}</span>
                    <span className="shrink-0 text-sm text-[var(--faint)]">
                      {ws.doneCount}/{ws.lessonCount} done
                    </span>
                  </div>
                  {ws.mission && (
                    <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">
                      {ws.mission}
                    </p>
                  )}
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--bg-2)]">
                    <div
                      className="h-full rounded-full bg-[var(--green)]"
                      style={{width: `${pct}%`}}
                    />
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
