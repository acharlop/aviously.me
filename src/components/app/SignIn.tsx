import {useAuthActions} from '@convex-dev/auth/react'
import {useState} from 'react'
import {AppHeader} from './AppHeader'
import {buttonAccent, input, label} from './ui'

// Single-user auth. "Create account" is only used once, for the very first
// sign-in; the Convex `ALLOWED_EMAIL` guard rejects any other email, so there is
// no public signup even though the flow is reachable.
export function SignIn() {
  const {signIn} = useAuthActions()
  const [flow, setFlow] = useState<'signIn' | 'signUp'>('signIn')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  return (
    <>
      <AppHeader signedIn={false} />
      <div className='mx-auto max-w-sm px-5 py-16'>
        <h1 className='app-title'>{flow === 'signIn' ? 'Sign in' : 'Create account'}</h1>
        <p className={`${label} mt-3 mb-8 text-[var(--faint)]`}>Private learning area.</p>

        <form
          className='flex flex-col gap-5'
          onSubmit={async (e) => {
            e.preventDefault()
            setSubmitting(true)
            setError(null)
            const form = new FormData(e.currentTarget)
            form.set('flow', flow)
            try {
              await signIn('password', form)
            } catch {
              setError(flow === 'signIn' ? 'Wrong email or password.' : 'Could not create the account.')
            } finally {
              setSubmitting(false)
            }
          }}
        >
          <input name='email' type='email' required autoComplete='email' placeholder='Email' className={input} />
          <input
            name='password'
            type='password'
            required
            autoComplete={flow === 'signIn' ? 'current-password' : 'new-password'}
            placeholder='Password'
            className={input}
          />
          {error && (
            <p role='alert' className={`${label} text-[var(--text)]`}>
              Error — {error}
            </p>
          )}
          <button type='submit' disabled={submitting} className={`${buttonAccent} mt-2`}>
            {submitting ? '…' : flow === 'signIn' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <button
          type='button'
          onClick={() => {
            setFlow(flow === 'signIn' ? 'signUp' : 'signIn')
            setError(null)
          }}
          className={`${label} mt-6 text-[var(--faint)] underline decoration-[var(--accent)] underline-offset-4 hover:text-[var(--text)]`}
        >
          {flow === 'signIn' ? 'First time? Create the account' : 'Have an account? Sign in'}
        </button>
      </div>
    </>
  )
}
