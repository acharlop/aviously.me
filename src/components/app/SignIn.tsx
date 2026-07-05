import {useAuthActions} from '@convex-dev/auth/react'
import {useState} from 'react'

// Single-user auth. "Create account" is only used once, for the very first
// sign-in; the Convex `ALLOWED_EMAIL` guard rejects any other email, so there is
// no public signup even though the flow is reachable.
export function SignIn() {
  const {signIn} = useAuthActions()
  const [flow, setFlow] = useState<'signIn' | 'signUp'>('signIn')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <h1
        className="mb-1"
        style={{fontFamily: 'var(--font-display)', fontSize: '1.6rem', lineHeight: 1.2, margin: '0 0 0.25rem'}}
      >
        {flow === 'signIn' ? 'Sign in' : 'Create account'}
      </h1>
      <p className="mb-6 text-sm text-[var(--faint)]">Private learning area.</p>

      <form
        className="flex flex-col gap-3"
        onSubmit={async (e) => {
          e.preventDefault()
          setSubmitting(true)
          setError(null)
          const form = new FormData(e.currentTarget)
          form.set('flow', flow)
          try {
            await signIn('password', form)
          } catch {
            setError(
              flow === 'signIn'
                ? 'Wrong email or password.'
                : 'Could not create the account.',
            )
          } finally {
            setSubmitting(false)
          }
        }}
      >
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)]"
        />
        <input
          name="password"
          type="password"
          required
          autoComplete={flow === 'signIn' ? 'current-password' : 'new-password'}
          placeholder="Password"
          className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-[var(--text)] outline-none focus:border-[var(--accent)]"
        />
        {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-[var(--accent)] px-3 py-2 font-medium text-[var(--bg)] disabled:opacity-60"
        >
          {submitting ? '…' : flow === 'signIn' ? 'Sign in' : 'Create account'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setFlow(flow === 'signIn' ? 'signUp' : 'signIn')
          setError(null)
        }}
        className="mt-4 text-sm text-[var(--faint)] underline underline-offset-4 hover:text-[var(--muted)]"
      >
        {flow === 'signIn'
          ? 'First time? Create the account'
          : 'Have an account? Sign in'}
      </button>
    </div>
  )
}
