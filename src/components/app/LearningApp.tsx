import {ConvexAuthProvider} from '@convex-dev/auth/react'
import {Authenticated, AuthLoading, Unauthenticated} from 'convex/react'
import {useEffect, useState} from 'react'
import {convex} from '@/lib/convex'
import {SignIn} from './SignIn'
import {WorkspaceList} from './WorkspaceList'
import {WorkspaceView} from './WorkspaceView'

// Which workspace (if any) is selected, read from the `?w=<slug>` query param so
// views are refreshable and shareable while only /app needs to exist on the
// static host.
function useWorkspaceSlug() {
  const [slug, setSlug] = useState<string | null>(null)
  useEffect(() => {
    const read = () =>
      setSlug(new URLSearchParams(window.location.search).get('w'))
    read()
    window.addEventListener('popstate', read)
    return () => window.removeEventListener('popstate', read)
  }, [])
  return slug
}

function Routed() {
  const slug = useWorkspaceSlug()
  return slug ? <WorkspaceView slug={slug} /> : <WorkspaceList />
}

export function LearningApp() {
  return (
    <ConvexAuthProvider client={convex}>
      <AuthLoading>
        <div className="mx-auto max-w-3xl px-5 py-16 text-[var(--faint)]">
          Loading…
        </div>
      </AuthLoading>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
      <Authenticated>
        <Routed />
      </Authenticated>
    </ConvexAuthProvider>
  )
}
