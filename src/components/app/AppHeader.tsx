import {useAuthActions} from '@convex-dev/auth/react'
import {toggleTheme} from '@/lib/theme'
import {bandLink, mono} from './ui'

// Plain ink band: uppercase display name on the left, mono nav on the right.
// Theme-invariant on purpose (ink stays ink in both themes), like the resume
// masthead. #41 builds the shared masthead; #49 can swap this for it.
export function AppHeader({backTo, signedIn = true}: {backTo?: {href: string; label: string}; signedIn?: boolean}) {
  const {signOut} = useAuthActions()
  return (
    <header className='app-band bg-[var(--ink)] text-[var(--paper)]'>
      <div className='mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4'>
        <a
          href='/app'
          className='font-[family-name:var(--font-display)] text-[length:var(--text-lg)] leading-[var(--leading-display)] font-bold tracking-[var(--tracking-display)] text-[var(--paper)] uppercase'
        >
          Learning
        </a>
        <nav className='flex items-center gap-5' aria-label='App navigation'>
          {backTo && (
            <a href={backTo.href} className={bandLink}>
              ← {backTo.label}
            </a>
          )}
          <button
            type='button'
            onClick={toggleTheme}
            aria-label='Toggle color theme'
            className={`${mono} text-[var(--paper-muted)] hover:text-[var(--paper)]`}
          >
            <span aria-hidden>◐</span>
          </button>
          {signedIn && (
            <button type='button' onClick={() => void signOut()} className={bandLink}>
              Sign out
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
