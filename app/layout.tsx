import '../global.css'
import {Analytics} from './components/analytics'
import {type Metadata} from 'next'
import {Inter} from 'next/font/google'
import LocalFont from 'next/font/local'


export const metadata: Metadata = {
  metadataBase: new URL('https://aviously.me'),
  title: {
    default: 'aviously.me',
    template: '%s | aviously.me',
  },
  description: 'Co-founder of whocards.cc',
  openGraph: {
    title: 'aviously.me',
    description: 'Co-founder of whocards.cc',
    url: 'https://aviously.me',
    siteName: 'aviously.me',
    images: [
      {
        url: 'https://aviously.me/og.png',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'avi_aviously',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.png',
  },
}
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const calSans = LocalFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en' className={[inter.variable, calSans.variable].join(' ')}>
      <head>
        <Analytics />
      </head>
      <body className={`bg-black ${process.env.NODE_ENV === 'development' ? 'debug-screens' : undefined}`}>{children}</body>
    </html>
  )
}
