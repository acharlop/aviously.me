import {Link} from '@tanstack/react-router'
import {Wrench} from 'lucide-react'

export function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-panel">
        <p className="eyebrow">Loose tile detected</p>
        <h1>That page is not wired up yet.</h1>
        <p>
          Either the link is old, the route is still in the duct-tape pile, or the internet took
          a weird little turn.
        </p>
        <Link className="primary-action" to="/">
          <Wrench aria-hidden="true" size={18} />
          Back to the useful part
        </Link>
      </section>
    </main>
  )
}
