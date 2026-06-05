import {createFileRoute, Link, notFound} from '@tanstack/react-router'
import {ArrowLeft, ArrowRight, BriefcaseBusiness, Mail, Mic, Music2, SlidersHorizontal, Terminal} from 'lucide-react'
import {designConcepts, getDesignConcept} from '~/content/design-concepts'
import type {DesignConcept} from '~/content/design-concepts'

export const Route = createFileRoute('/designs/$slug')({
  loader: ({params}) => {
    if (!getDesignConcept(params.slug)) throw notFound()
    return params.slug
  },
  component: DesignSector,
})

function DesignSector() {
  const slug = Route.useLoaderData()
  const concept = getDesignConcept(slug)!
  const index = designConcepts.findIndex((item) => item.slug === concept.slug)
  const previous = designConcepts[(index - 1 + designConcepts.length) % designConcepts.length]!
  const next = designConcepts[(index + 1) % designConcepts.length]!

  return (
    <main className={`stitch-lab sector-page ${concept.className}`}>
      <header className="machine-topbar">
        <Link className="machine-logo" to="/designs">
          <span className="murphy-dot" />
          SECTOR_{concept.number}
        </Link>
        <nav className="machine-nav" aria-label="Other design sectors">
          {designConcepts.map((item) => (
            <Link
              key={item.slug}
              to="/designs/$slug"
              params={{slug: item.slug}}
              activeProps={{className: 'active'}}
            >
              {item.navLabel}
            </Link>
          ))}
        </nav>
        <Link className="machine-button compact" to="/designs">
          <ArrowLeft aria-hidden="true" size={16} />
          LAB
        </Link>
      </header>

      <section className="sector-world">
        <div className="circuit-board" aria-hidden="true" />
        <div className="scanline" aria-hidden="true" />
        <div className="cave-grid" aria-hidden="true">
          {Array.from({length: 132}).map((_, tile) => (
            <span key={tile} className={`cave-tile tile-${tile % 17}`} />
          ))}
        </div>

        <SectorRenderer concept={concept} />
      </section>

      <nav className="sector-pagination" aria-label="Design pagination">
        <Link className="machine-button secondary" to="/designs/$slug" params={{slug: previous.slug}}>
          <ArrowLeft aria-hidden="true" size={18} />
          {previous.number} / {previous.navLabel}
        </Link>
        <Link className="machine-button" to="/designs/$slug" params={{slug: next.slug}}>
          {next.number} / {next.navLabel}
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </nav>
    </main>
  )
}

function MachineReadout({concept}: {concept: DesignConcept}) {
  return (
    <div className="machine-readout">
      <span>
        <span className="status-light" />
        {concept.status}
      </span>
      <span>CORE_TEMP: 32C</span>
      <span>SECTOR: 0x{concept.number}</span>
    </div>
  )
}

function HeroCopy({concept}: {concept: DesignConcept}) {
  return (
    <div className="mission-brief">
      <p className="machine-status">{concept.intensity}</p>
      <h1>
        {concept.headline}
        <span className="terminal-cursor" />
      </h1>
      <p>{concept.subhead}</p>
      <div className="machine-actions">
        <button className="machine-button" type="button">
          <Terminal aria-hidden="true" size={18} />
          {concept.ctaPrimary}
        </button>
        <button className="machine-button secondary" type="button">
          <Music2 aria-hidden="true" size={18} />
          {concept.ctaSecondary}
        </button>
      </div>
    </div>
  )
}

function SectorRenderer({concept}: {concept: DesignConcept}) {
  if (concept.slug === 'pre-terminal-original') return <PreTerminalOriginal concept={concept} />
  if (concept.slug === 'landing-v1-review') return <LandingV1Review concept={concept} />
  if (concept.slug === 'hardware-shopfront') return <HardwareShopfront concept={concept} />
  if (concept.slug === 'terminal-circuit-cave') return <TerminalCircuitCave concept={concept} />
  if (concept.slug === 'business-level-map') return <BusinessLevelMap concept={concept} />
  if (concept.slug === 'duct-tape-intake-machine') return <DuctTapeIntakeMachine concept={concept} />
  return <PlayableWorkCave concept={concept} />
}

function PreTerminalOriginal({concept}: {concept: DesignConcept}) {
  return (
    <div className="pre-terminal-shell">
      <div className="hero-grid pre-terminal-grid">
        <div className="topbar">
          <div className="brand-mark">
            <span className="brand-gem" />
            AVIOUSLY_ME
          </div>
          <div className="persona-tabs" aria-label="Persona language options">
            <button className="persona-tab active" type="button">The Guy</button>
            <button className="persona-tab" type="button">Senior Dev</button>
            <button className="persona-tab" type="button">Business Helper</button>
            <button className="persona-tab" type="button">Human</button>
          </div>
        </div>

        <section className="hero-copy" aria-label={concept.headline}>
          <p className="eyebrow">AI-assisted human. Still answers email like a person.</p>
          <h1>{concept.headline}</h1>
          <p className="subhead">{concept.subhead}</p>
          <div className="hero-actions">
            <button className="primary-action" type="button">
              <Terminal aria-hidden="true" size={18} />
              {concept.ctaPrimary}
            </button>
            <button className="sound-button" type="button">
              <Music2 aria-hidden="true" size={18} />
              {concept.ctaSecondary}
            </button>
          </div>
        </section>

        <aside className="proof-panel" aria-label="Original proof points">
          <p className="panel-label">
            <BriefcaseBusiness aria-hidden="true" size={18} />
            Practical reasons
          </p>
          <ul>
            {concept.modules.map((module) => (
              <li key={module.label}>
                <strong>{module.title}</strong>
                <span>{module.copy}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="pixel-field" aria-hidden="true">
          {Array.from({length: 72}).map((_, index) => (
            <span className="pixel" key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

function LandingV1Review({concept}: {concept: DesignConcept}) {
  return (
    <div className="hardware-frame world-frame original-landing-frame">
      <div className="terminal-panel original-landing-panel">
        <div className="original-landing-grid">
          <section className="mission-brief" aria-label={concept.headline}>
            <p className="machine-status">AI-assisted human. Still answers email like a person.</p>
            <h1>{concept.headline}</h1>
            <p>{concept.subhead}</p>
            <div className="machine-actions">
              <button className="machine-button" type="button">
                <Terminal aria-hidden="true" size={18} />
                {concept.ctaPrimary}
              </button>
              <button className="machine-button secondary" type="button">
                <Music2 aria-hidden="true" size={18} />
                {concept.ctaSecondary}
              </button>
            </div>
            <pre>{`> scan busy_business
> listen before building
> use_ai_where_it_helps
> ship something humans can operate`}</pre>
          </section>

          <aside className="terminal-diagnostics" aria-label="What Avi helps with">
            {concept.modules.map((module) => {
              const Icon = module.icon
              return (
                <article className="diagnostic-card" key={module.label}>
                  <Icon aria-hidden="true" size={26} />
                  <span>{module.label}</span>
                  <strong>{module.title}</strong>
                  <p>{module.copy}</p>
                </article>
              )
            })}
          </aside>
        </div>
      </div>
    </div>
  )
}

function HardwareShopfront({concept}: {concept: DesignConcept}) {
  return (
    <div className="hardware-frame world-frame variant-shopfront">
      <div className="terminal-panel world-terminal">
        <MachineReadout concept={concept} />
        <div className="shopfront-layout">
          <HeroCopy concept={concept} />
          <div className="shop-window" aria-hidden="true">
            <div className="window-marquee">OPEN / PRACTICAL SYSTEMS HELP</div>
            <div className="shop-counter">
              <span className="counter-screen">NO PLATFORM NONSENSE</span>
              <span className="counter-button" />
              <span className="counter-button yellow" />
              <span className="counter-button green" />
            </div>
            <div className="murphy-large" />
          </div>
        </div>
      </div>
    </div>
  )
}

function TerminalCircuitCave({concept}: {concept: DesignConcept}) {
  return (
    <div className="terminal-cave-layout">
      <div className="hardware-frame terminal-command-frame">
        <div className="terminal-panel command-terminal">
          <MachineReadout concept={concept} />
          <HeroCopy concept={concept} />
          <pre>{`> scan duct_tape_work
> locate bottleneck
> ask human before pretending
> build small useful system`}</pre>
        </div>
      </div>
      <div className="diagnostic-stack">
        {concept.modules.map((module) => {
          const Icon = module.icon
          return (
            <article className="diagnostic-card" key={module.label}>
              <Icon aria-hidden="true" size={26} />
              <span>{module.label}</span>
              <strong>{module.title}</strong>
              <p>{module.copy}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function BusinessLevelMap({concept}: {concept: DesignConcept}) {
  return (
    <div className="hardware-frame world-frame level-map-frame">
      <div className="terminal-panel level-map-panel">
        <MachineReadout concept={concept} />
        <HeroCopy concept={concept} />
        <div className="room-map" aria-label="Site rooms">
          {concept.modules.map((module, index) => {
            const Icon = module.icon
            return (
              <article className={`map-room room-${index + 1}`} key={module.label}>
                <Icon aria-hidden="true" size={30} />
                <span>{module.label}</span>
                <strong>{module.title}</strong>
              </article>
            )
          })}
          <div className="map-room contact-room">
            <Mail aria-hidden="true" size={30} />
            <span>ROOM_04</span>
            <strong>Contact</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

function DuctTapeIntakeMachine({concept}: {concept: DesignConcept}) {
  return (
    <div className="hardware-frame world-frame intake-machine-frame">
      <div className="terminal-panel intake-machine-panel">
        <MachineReadout concept={concept} />
        <div className="intake-machine-layout">
          <HeroCopy concept={concept} />
          <form className="physical-console">
            <label>
              <BriefcaseBusiness aria-hidden="true" size={16} />
              business type
              <select>
                <option>Family business</option>
                <option>Contractor or trades shop</option>
                <option>Something weirder</option>
              </select>
            </label>
            <label>
              <Mic aria-hidden="true" size={16} />
              rough voice/text input
              <textarea defaultValue="Every Friday we export, copy, paste, call Janet, and pray the numbers are real." />
            </label>
            <div className="console-sliders">
              <span><SlidersHorizontal aria-hidden="true" size={15} /> warm</span>
              <span>direct</span>
              <span>AI but useful</span>
            </div>
            <button className="machine-button" type="button">transform note</button>
          </form>
        </div>
      </div>
    </div>
  )
}

function PlayableWorkCave({concept}: {concept: DesignConcept}) {
  return (
    <div className="playable-board" aria-label="Playable cave concept">
      <div className="play-hud">
        <span>AVI</span>
        <span>{concept.status}</span>
        <span>HUMANS: ONLINE</span>
      </div>
      <div className="play-room hero-room">
        <HeroCopy concept={concept} />
      </div>
      <div className="play-avatar" aria-hidden="true" />
      <div className="play-gem gem-a" aria-hidden="true" />
      <div className="play-gem gem-b" aria-hidden="true" />
      <div className="play-zonk" aria-hidden="true" />
      {concept.modules.map((module, index) => {
        const Icon = module.icon
        return (
          <article className={`play-room object-room object-${index + 1}`} key={module.label}>
            <Icon aria-hidden="true" size={24} />
            <span>{module.label}</span>
            <strong>{module.title}</strong>
            <p>{module.copy}</p>
          </article>
        )
      })}
    </div>
  )
}
