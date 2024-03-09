import Particles from './components/particles';
import Link from 'next/link';


const navigation: {name: string; href: string}[] = [
  // {name: 'Projects', href: '/projects'},
  // {name: 'Contact', href: '/contact'},
]

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black'>
      <nav className='my-16 animate-fade-in'>
        <ul className='flex items-center justify-center gap-4'>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className='text-sm duration-500 text-zinc-500 hover:text-zinc-300'>
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className='hidden w-screen h-px animate-glow animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block' />
      <Particles className='absolute inset-0 -z-10 animate-fade-in' quantity={100} />
      <h1 className='z-10 pb-5 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title whitespace-nowrap bg-clip-text font-display sm:text-6xl md:text-9xl'>
        aviously.me
      </h1>

      <div className='hidden w-screen h-px animate-glow animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block' />
      <div className='my-16 text-center animate-fade-in'>
        <h2 className='text-sm text-zinc-500 '>
          I&apos;m building{' '}
          <Link target='_blank' href='https://whocards.cc' className='underline duration-500 hover:text-zinc-300'>
            whocards.cc
          </Link>{' '}
          to promote human connection in a digital world.
        </h2>
      </div>
    </div>
  )
}
