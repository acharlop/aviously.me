import {usePostHog} from '@posthog/react'
import {createFileRoute} from '@tanstack/react-router'
import {Bot, BriefcaseBusiness, CircuitBoard, Mail, Mic, Music2, SlidersHorizontal, Sparkles, Terminal} from 'lucide-react'
import {useMemo, useRef, useState} from 'react'
import {defaultPersona} from '~/content/personas'

export const Route = createFileRoute('/')({
  component: Home,
})

const businessTypes = [
  'Contractor or trades shop',
  'Clinic or care office',
  'Retail store',
  'Warehouse or distributor',
  'School or learning program',
  'Agency or service business',
  'Nonprofit',
  'Family business',
  'Something weirder',
]

function shapeMessage(input: string, warmth: number, directness: number, aiAssist: number) {
  const trimmed = input.trim()
  if (!trimmed) {
    return 'Pick the kind of place you run, then describe the work-around that keeps stealing time. I will help turn the rough version into a useful first note.'
  }

  const opener = warmth > 66 ? 'Here is the human version:' : warmth > 33 ? 'Here is a cleaner version:' : 'Plain version:'
  const directLine =
    directness > 66 ? 'The core issue seems to be: ' : directness > 33 ? 'What I am hearing is: ' : 'Somewhere in the pile is this: '
  const aiLine =
    aiAssist > 66
      ? 'There may be room for practical software and AI-assisted sorting, drafting, extracting, or routing here.'
      : aiAssist > 33
        ? 'This might be a good fit for a small custom tool, with AI where it earns its keep.'
        : 'This may just need a sturdy little system before anyone says the letters A and I too loudly.'

  return `${opener}\n\n${directLine}${trimmed}\n\n${aiLine}`
}

function useChipTune() {
  const contextRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<number | null>(null)
  const [playing, setPlaying] = useState(false)

  function stop() {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = null
    setPlaying(false)
  }

  function blip(frequency: number, when: number) {
    const context = contextRef.current
    if (!context) return

    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'square'
    oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0.0001, when)
    gain.gain.exponentialRampToValueAtTime(0.05, when + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.12)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(when)
    oscillator.stop(when + 0.14)
  }

  async function toggle() {
    if (playing) {
      stop()
      return
    }

    contextRef.current = contextRef.current ?? new AudioContext()
    await contextRef.current.resume()
    const notes = [330, 392, 494, 392, 523, 494, 392, 330]
    let step = 0
    setPlaying(true)
    timerRef.current = window.setInterval(() => {
      const context = contextRef.current
      if (!context) return
      blip(notes[step % notes.length]!, context.currentTime)
      step += 1
    }, 150)
  }

  return {playing, toggle}
}

function Home() {
  const posthog = usePostHog()
  const [businessType, setBusinessType] = useState(businessTypes[0])
  const [message, setMessage] = useState('')
  const [warmth, setWarmth] = useState(58)
  const [directness, setDirectness] = useState(72)
  const [aiAssist, setAiAssist] = useState(44)
  const {playing, toggle} = useChipTune()

  const shapedMessage = useMemo(
    () => shapeMessage(message, warmth, directness, aiAssist),
    [message, warmth, directness, aiAssist],
  )

  const mailto = `mailto:me@aviously.me?subject=${encodeURIComponent(
    `Duct-tape work: ${businessType}`,
  )}&body=${encodeURIComponent(`${businessType}\n\n${shapedMessage}`)}`

  function capture(action: string) {
    posthog?.capture(action, {
      persona: defaultPersona.key,
      businessType,
    })
  }

  return (
    <main className="stitch-lab landing-terminal-v1">
      <header className="machine-topbar">
        <a className="machine-logo" href="#top" aria-label="Aviously home">
          <span className="murphy-dot" />
          AVIOUSLY_ME
        </a>
        <nav className="machine-nav" aria-label="Homepage navigation">
          <a href="#signal">INTAKE</a>
          <a href="#systems">SYSTEMS</a>
          <a href="mailto:me@aviously.me">CONTACT</a>
        </nav>
        <button className="machine-button compact" type="button" onClick={toggle}>
          <Music2 aria-hidden="true" size={16} />
          {playing ? 'STOP' : 'TUNE'}
        </button>
      </header>

      <section className="landing-terminal-hero" id="top" aria-label="Aviously home">
        <div className="circuit-board" aria-hidden="true" />
        <div className="scanline" aria-hidden="true" />

        <div className="hardware-frame landing-terminal-frame">
          <div className="terminal-panel landing-terminal-panel">
            <div className="landing-terminal-grid">
              <section className="mission-brief" aria-label="Old-school service, modern tools">
                <p className="machine-status">{defaultPersona.eyebrow}</p>
                <h1>Old-school service, modern tools</h1>
                <p>
                  Custom tools for busy businesses. I learn how the work actually happens, then build practical software and
                  AI-assisted systems that fit the people already doing it.
                </p>
                <div className="machine-actions">
                  <a className="machine-button" href="#signal" onClick={() => capture('clicked_primary_cta')}>
                    <Terminal aria-hidden="true" size={18} />
                    Bring the duct-tape work
                  </a>
                  <button className="machine-button secondary" type="button" onClick={toggle}>
                    <Music2 aria-hidden="true" size={18} />
                    {playing ? 'Stop tiny tune' : 'Play tiny tune'}
                  </button>
                </div>
                <pre>{`> scan busy_business
> listen before building
> use_ai_where_it_helps
> ship something humans can operate`}</pre>
              </section>

              <aside className="terminal-diagnostics" id="systems" aria-label="What Avi helps with">
                <article className="diagnostic-card">
                  <CircuitBoard aria-hidden="true" size={26} />
                  <span>SCAN_A</span>
                  <strong>Duct-tape work</strong>
                  <p>Spreadsheets, handoffs, exports, inbox rules, and the stuff only one person knows how to fix.</p>
                </article>
                <article className="diagnostic-card">
                  <BriefcaseBusiness aria-hidden="true" size={26} />
                  <span>SCAN_B</span>
                  <strong>Owner-run reality</strong>
                  <p>Plain language, useful systems, and respect for the way the place already works.</p>
                </article>
                <article className="diagnostic-card">
                  <Bot aria-hidden="true" size={26} />
                  <span>SCAN_C</span>
                  <strong>AI, maybe</strong>
                  <p>Extraction, drafting, routing, search, and summaries when they save real time.</p>
                </article>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-signal-section" id="signal" aria-label="Tell Avi about the duct-tape work">
        <div className="landing-signal-heading">
          <p className="machine-status">
            <span className="status-light" />
            Experiential input v0.1
          </p>
          <h2>Start with the messy version.</h2>
          <p>
            No perfect vendor-form performance required. Describe the annoying repeat problem, the human workaround, and what
            better would feel like.
          </p>
        </div>

        <div className="landing-intake-grid">
          <div className="physical-console">
            <label htmlFor="business-type">What kind of place are we talking about?</label>
            <select id="business-type" value={businessType} onChange={(event) => setBusinessType(event.target.value)}>
              {businessTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <label htmlFor="duct-tape-work">What keeps coming back, breaking, or needing the person who knows the trick?</label>
            <textarea
              id="duct-tape-work"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Example: every Friday we export orders, fix three columns by hand, text the warehouse, then hope the invoice spreadsheet matches reality."
            />

            <div className="future-inputs" aria-label="Future input options">
              <button type="button" disabled>
                <Mic aria-hidden="true" size={16} />
                Voice note soon
              </button>
              <button type="button" disabled>
                <Sparkles aria-hidden="true" size={16} />
                AI rewrite soon
              </button>
            </div>
          </div>

          <div className="landing-output-panel">
            <div className="machine-status">
              <SlidersHorizontal aria-hidden="true" size={16} />
              wording knobs
            </div>

            <label>
              Warmth
              <input type="range" min="0" max="100" value={warmth} onChange={(event) => setWarmth(Number(event.target.value))} />
            </label>
            <label>
              Directness
              <input type="range" min="0" max="100" value={directness} onChange={(event) => setDirectness(Number(event.target.value))} />
            </label>
            <label>
              AI seasoning
              <input type="range" min="0" max="100" value={aiAssist} onChange={(event) => setAiAssist(Number(event.target.value))} />
            </label>

            <div className="message-preview landing-message-preview" aria-live="polite">
              {shapedMessage.split('\n').map((line, index) => (
                <p key={`${line}-${index}`}>{line || '\u00a0'}</p>
              ))}
            </div>

            <a className="machine-button" href={mailto} onClick={() => capture('clicked_email_signal')}>
              <Mail aria-hidden="true" size={18} />
              Send this signal
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
