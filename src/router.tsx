import {createRouter} from '@tanstack/react-router'
import {routeTree} from './routeTree.gen'
import {NotFound} from './components/not-found'
import {AppProviders} from './lib/providers'

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
    Wrap: ({children}) => <AppProviders>{children}</AppProviders>,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
