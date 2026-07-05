import {Password} from '@convex-dev/auth/providers/Password'
import {convexAuth} from '@convex-dev/auth/server'
import {ConvexError} from 'convex/values'

// Single-user gate: only the email in ALLOWED_EMAIL (a Convex deployment env
// var) can ever create or use an account. `profile` runs on both the signIn and
// signUp flows, so throwing here blocks every other email at the door — there is
// no public signup and no second account.
const allowedEmail = () => {
  const email = process.env.ALLOWED_EMAIL
  if (!email) {
    throw new ConvexError(
      'ALLOWED_EMAIL is not set on the Convex deployment. Run: ' +
        'bunx convex env set ALLOWED_EMAIL you@example.com',
    )
  }
  return email.toLowerCase()
}

export const {auth, signIn, signOut, store, isAuthenticated} = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = String(params.email ?? '').toLowerCase()
        if (email !== allowedEmail()) {
          throw new ConvexError('This is a private app.')
        }
        return {email}
      },
    }),
  ],
})
