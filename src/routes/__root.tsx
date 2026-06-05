import {HeadContent, Outlet, Scripts, createRootRoute} from '@tanstack/react-router'
import {type ReactNode} from 'react'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {charSet: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        name: 'description',
        content:
          'Old-school service, modern tools. Practical software and AI-assisted systems for busy businesses.',
      },
      {title: 'aviously.me | Old-School Service, Modern Tools'},
    ],
    links: [
      {rel: 'stylesheet', href: appCss},
      {rel: 'icon', href: '/favicon.png'},
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({children}: Readonly<{children: ReactNode}>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
