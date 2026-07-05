import {useAuthActions} from '@convex-dev/auth/react'

export function AppHeader({backTo}: {backTo?: {href: string; label: string}}) {
  const {signOut} = useAuthActions()
  return (
    <header className="mb-8 flex items-center justify-between border-b border-[var(--line)] pb-4">
      {backTo ? (
        <a
          href={backTo.href}
          className="text-sm text-[var(--faint)] hover:text-[var(--accent)]"
        >
          ← {backTo.label}
        </a>
      ) : (
        <span
          className="text-sm font-semibold"
          style={{fontFamily: 'var(--font-display)'}}
        >
          Learning
        </span>
      )}
      <button
        type="button"
        onClick={() => void signOut()}
        className="text-sm text-[var(--faint)] hover:text-[var(--text)]"
      >
        Sign out
      </button>
    </header>
  )
}
