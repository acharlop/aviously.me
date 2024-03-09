'use client'

import {Card} from '../components/card'
import {Navigation} from '../components/nav'
import {Github, Mail, Twitter} from 'lucide-react'
import Link from 'next/link'

const socials = [
  {
    icon: <Twitter size={20} />,
    href: 'https://twitter.com/avi_aviously',
    label: 'Twitter',
    handle: '@avi_aviously',
  },
  {
    icon: <Mail size={20} />,
    href: 'mailto:avicharlop@gmail.com',
    label: 'Email',
    handle: 'me@aviously.me',
  },
  {
    icon: <Github size={20} />,
    href: 'https://github.com/acharlop',
    label: 'Github',
    handle: 'acharlop',
  },
]

export default function Example() {
  return (
    <div className=' bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0'>
      <Navigation />
      <div className='container flex items-center justify-center min-h-screen px-4 mx-auto'>
        <div className='grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16'>
          {socials.map((s) => (
            <Card>
              <Link
                href={s.href}
                target='_blank'
                className='relative flex flex-col items-center gap-4 p-4 duration-700 group md:gap-8 md:p-16 md:py-24 lg:pb-48'
              >
                <span
                  className='absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent'
                  aria-hidden='true'
                />
                <span className='relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full drop-shadow-orange border-zinc-500 bg-zinc-900 text-zinc-200 group-hover:border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white'>
                  {s.icon}
                </span>{' '}
                <div className='z-10 flex flex-col items-center'>
                  <span className='font-medium duration-150 font-display text-zinc-200 group-hover:text-white lg:text-xl xl:text-3xl'>
                    {s.handle}
                  </span>
                  <span className='mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200'>
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
