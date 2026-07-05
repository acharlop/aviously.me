import {ConvexReactClient} from 'convex/react'

// The deployment URL is public (the browser talks to it directly); all learning
// data is protected by server-side auth checks in the Convex functions.
// Astro only exposes env vars prefixed with PUBLIC_ to client-side code.
const url = import.meta.env.PUBLIC_CONVEX_URL as string | undefined

if (!url) {
  throw new Error(
    'PUBLIC_CONVEX_URL is not set. Run `bun run dev:convex` to provision a ' +
      'deployment, then copy the URL into .env.',
  )
}

export const convex = new ConvexReactClient(url)
