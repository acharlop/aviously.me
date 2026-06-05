import {ConvexProvider, ConvexReactClient} from 'convex/react'
import posthog from 'posthog-js'
import {PostHogProvider} from '@posthog/react'
import {type ReactNode, useMemo} from 'react'

function OptionalConvexProvider({children}: {children: ReactNode}) {
  const convexUrl = import.meta.env.VITE_CONVEX_URL

  const client = useMemo(() => {
    if (!convexUrl) return null
    return new ConvexReactClient(convexUrl, {
      unsavedChangesWarning: false,
    })
  }, [convexUrl])

  if (!client) return children

  return <ConvexProvider client={client}>{children}</ConvexProvider>
}

function OptionalPostHogProvider({children}: {children: ReactNode}) {
  const token = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN
  const host = import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com'

  if (typeof window === 'undefined' || !token) return children

  if (!(posthog as {__loaded?: boolean}).__loaded) {
    posthog.init(token, {
      api_host: host,
      defaults: '2026-01-30',
    })
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

export function AppProviders({children}: {children: ReactNode}) {
  return (
    <OptionalPostHogProvider>
      <OptionalConvexProvider>{children}</OptionalConvexProvider>
    </OptionalPostHogProvider>
  )
}
