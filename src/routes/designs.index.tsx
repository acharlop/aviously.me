import {createFileRoute, Link} from '@tanstack/react-router'
import {ArrowLeft, ArrowRight} from 'lucide-react'
import {designConcepts} from '~/content/design-concepts'

export const Route = createFileRoute('/designs/')({
  component: DesignsHub,
})

function DesignsHub() {
  return (
    <main className="stitch-lab">
      <header className="machine-topbar">
        <Link className="machine-logo" to="/">
          <span className="murphy-dot" />
          AVIOUSLY_WORLD
        </Link>
        <nav className="machine-nav" aria-label="Design concepts">
          {designConcepts.map((concept) => (
            <Link key={concept.slug} to="/designs/$slug" params={{slug: concept.slug}}>
              {concept.navLabel}
            </Link>
          ))}
        </nav>
        <Link className="machine-button compact" to="/">
          <ArrowLeft aria-hidden="true" size={16} />
          HOME
        </Link>
      </header>

      <section className="stitch-hero">
        <div className="circuit-board" aria-hidden="true" />
        <div className="scanline" aria-hidden="true" />
        <div className="hardware-frame hub-frame">
          <div className="terminal-panel center-panel">
            <p className="machine-status">
              <span className="status-light" />
              DESIGN SYSTEM: {designConcepts.length} SECTORS
            </p>
            <h1>
              Supaplex as the whole machine<span className="terminal-cursor" />
            </h1>
            <p>
              Separate directions, each on its own page. They start from the Stitch reference:
              dark hardware, terminal green, logic yellow, circuit boards, physical buttons, and
              increasingly more “you are inside the cave.”
            </p>
          </div>
        </div>
      </section>

      <section className="sector-grid" aria-label="Design sectors">
        {designConcepts.map((concept) => (
          <Link
            key={concept.slug}
            className={`sector-card ${concept.className}`}
            to="/designs/$slug"
            params={{slug: concept.slug}}
          >
            <div className="sector-preview" aria-hidden="true">
              <div className="sector-avatar" />
              <div className="sector-gem" />
              <div className="sector-zonk" />
            </div>
            <div className="sector-copy">
              <span>
                {concept.number} / {concept.intensity}
              </span>
              <h2>{concept.name}</h2>
              <p>{concept.subhead}</p>
            </div>
            <div className="sector-footer">
              <span>SECTOR_{concept.number}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
