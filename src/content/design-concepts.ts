import {Bot, BriefcaseBusiness, CircuitBoard, Database, Hammer, Mail, Mic, Music2, Radio, SlidersHorizontal, Wrench} from 'lucide-react'
import type {LucideIcon} from 'lucide-react'

export type DesignConcept = {
  slug: string
  number: string
  name: string
  navLabel: string
  intensity: string
  className: string
  headline: string
  subhead: string
  status: string
  ctaPrimary: string
  ctaSecondary: string
  modules: Array<{
    label: string
    title: string
    copy: string
    icon: LucideIcon
  }>
}

export const designConcepts: DesignConcept[] = [
  {
    slug: 'pre-terminal-original',
    number: 'PRE',
    name: 'Pre-Terminal Original',
    navLabel: 'Original',
    intensity: 'Before the terminal cabinet',
    className: 'pre-terminal-original',
    headline: 'Old-School Service, Modern Tools',
    subhead:
      'Custom tools for busy businesses. I spend time learning how your business really works, then build practical software and AI-assisted systems that fit the way you work.',
    status: 'ORIGINAL_LANDING: REVIEW',
    ctaPrimary: 'Tell me what keeps getting duct-taped',
    ctaSecondary: 'Play tiny tune',
    modules: [
      {
        label: 'PROOF_01',
        title: 'Senior software developer',
        copy: 'Can sit with the messy parts before touching code.',
        icon: BriefcaseBusiness,
      },
      {
        label: 'PROOF_02',
        title: 'Duct-tape work',
        copy: 'Spreadsheets, handoffs, exports, inbox chaos, and “only one person knows how this works.”',
        icon: Wrench,
      },
      {
        label: 'PROOF_03',
        title: 'AI where it helps',
        copy: 'Leaves it out where it would just make a louder mess.',
        icon: Bot,
      },
    ],
  },
  {
    slug: 'landing-v1-review',
    number: '00',
    name: 'Landing V1 Review',
    navLabel: 'Landing V1',
    intensity: 'Current landing, right-side diagnostics',
    className: 'landing-v1-review',
    headline: 'Old-school service, modern tools',
    subhead:
      'Custom tools for busy businesses. I learn how the work actually happens, then build practical software and AI-assisted systems that fit the people already doing it.',
    status: 'LANDING_V1: REVIEW',
    ctaPrimary: 'Bring the duct-tape work',
    ctaSecondary: 'Play tiny tune',
    modules: [
      {
        label: 'SCAN_A',
        title: 'Duct-tape work',
        copy: 'Spreadsheets, handoffs, exports, inbox rules, and the stuff only one person knows how to fix.',
        icon: CircuitBoard,
      },
      {
        label: 'SCAN_B',
        title: 'Owner-run reality',
        copy: 'Plain language, useful systems, and respect for the way the place already works.',
        icon: BriefcaseBusiness,
      },
      {
        label: 'SCAN_C',
        title: 'AI, maybe',
        copy: 'Extraction, drafting, routing, search, and summaries when they save real time.',
        icon: Bot,
      },
    ],
  },
  {
    slug: 'hardware-shopfront',
    number: '01',
    name: 'Hardware Shopfront',
    navLabel: 'Hardware',
    intensity: 'Supaplex as service machine',
    className: 'machine-lite',
    headline: 'Old-school service, modern tools',
    subhead:
      'The most business-readable version: Avi’s offer lives inside a chunky terminal cabinet with circuit panels, physical buttons, and just enough cave logic to feel alive.',
    status: 'OWNER_SIGNAL: READY',
    ctaPrimary: 'Initialize the conversation',
    ctaSecondary: 'Read schematics',
    modules: [
      {
        label: 'MODULE_01',
        title: 'Listen first',
        copy: 'A practical discovery flow for the duct-tape work hiding inside spreadsheets, inboxes, and handoffs.',
        icon: Radio,
      },
      {
        label: 'MODULE_02',
        title: 'Build the tool',
        copy: 'Custom software and AI-assisted systems, shaped around the work instead of a vendor fantasy.',
        icon: Wrench,
      },
      {
        label: 'MODULE_03',
        title: 'Leave it usable',
        copy: 'Plain documentation, sane defaults, and a system the business can actually operate.',
        icon: Hammer,
      },
    ],
  },
  {
    slug: 'terminal-circuit-cave',
    number: '02',
    name: 'Terminal Circuit Cave',
    navLabel: 'Terminal',
    intensity: 'Supaplex as operating system',
    className: 'terminal-cave',
    headline: 'Bring me the duct-tape work',
    subhead:
      'More immersive: the site is a running terminal inside a circuit cave. Sections become status panels, modules, and diagnostic readouts.',
    status: 'DUCT_TAPE_SCAN: ONLINE',
    ctaPrimary: 'Run business scan',
    ctaSecondary: 'Open logbook',
    modules: [
      {
        label: 'SCAN_A',
        title: 'Repeated work',
        copy: 'Find the work that keeps coming back and quietly taxes everyone’s attention.',
        icon: CircuitBoard,
      },
      {
        label: 'SCAN_B',
        title: 'Human bottleneck',
        copy: 'Locate the step where one person knows the trick and everyone else waits.',
        icon: BriefcaseBusiness,
      },
      {
        label: 'SCAN_C',
        title: 'AI, maybe',
        copy: 'Use AI for extraction, drafting, routing, and search only when it earns the electricity.',
        icon: Bot,
      },
    ],
  },
  {
    slug: 'business-level-map',
    number: '03',
    name: 'Business Level Map',
    navLabel: 'Level Map',
    intensity: 'Supaplex as navigation model',
    className: 'level-cabinet',
    headline: 'Every business has a level map',
    subhead:
      'The homepage becomes rooms and passages: work, proof, hobbies, writing, contact, and projects as places you move through.',
    status: 'MAP_SECTOR: AVIOUSLY',
    ctaPrimary: 'Enter the work room',
    ctaSecondary: 'View project rooms',
    modules: [
      {
        label: 'ROOM_01',
        title: 'Work',
        copy: 'The commercial offer gets the first readable room. No scavenger hunt required.',
        icon: BriefcaseBusiness,
      },
      {
        label: 'ROOM_02',
        title: 'Projects',
        copy: 'Side projects and hobbies become optional doors, not distractions from the offer.',
        icon: Database,
      },
      {
        label: 'ROOM_03',
        title: 'Writing',
        copy: 'The about page grows into a logbook for learning, AI-era thinking, and useful experiments.',
        icon: CircuitBoard,
      },
    ],
  },
  {
    slug: 'duct-tape-intake-machine',
    number: '04',
    name: 'Duct-Tape Intake Machine',
    navLabel: 'Intake',
    intensity: 'Supaplex as input experience',
    className: 'intake-rig',
    headline: 'Feed the machine the messy version',
    subhead:
      'The first interaction is the product demo: voice note, business type, tone knobs, AI rewrite, and an output message that feels useful immediately.',
    status: 'INPUT_RIG: ARMED',
    ctaPrimary: 'Start with the rough version',
    ctaSecondary: 'Tune the voice',
    modules: [
      {
        label: 'INPUT_01',
        title: 'Voice note',
        copy: 'Speak the problem like you would explain it from the shop floor or back office.',
        icon: Mic,
      },
      {
        label: 'INPUT_02',
        title: 'Tone knobs',
        copy: 'Warmth, directness, and AI seasoning become physical controls instead of dropdown sludge.',
        icon: SlidersHorizontal,
      },
      {
        label: 'INPUT_03',
        title: 'Send signal',
        copy: 'The output is a clear note that starts the conversation without pretending the mess is simple.',
        icon: Mail,
      },
    ],
  },
  {
    slug: 'playable-work-cave',
    number: '05',
    name: 'Playable Work Cave',
    navLabel: 'Playable',
    intensity: 'Supaplex as the whole world',
    className: 'full-cave',
    headline: 'A personal site you can move through',
    subhead:
      'The boldest direction: Avi’s site is a living cave. Professional offer, projects, music, writing, and contact are all world objects.',
    status: 'WORLD_ENGINE: HUMANS_ONLINE',
    ctaPrimary: 'Enter the cave',
    ctaSecondary: 'Play tiny tune',
    modules: [
      {
        label: 'OBJECT_01',
        title: 'Murphy/Avi avatar',
        copy: 'A site guide with personality: helpful, lightly snarky, and never pretending the machines are the point.',
        icon: Bot,
      },
      {
        label: 'OBJECT_02',
        title: 'Music controls',
        copy: 'Sound becomes a first-class interface layer with knobs, filters, and playful restraint.',
        icon: Music2,
      },
      {
        label: 'OBJECT_03',
        title: 'World doors',
        copy: 'Work, blog, projects, hobbies, and offerings become doors in a coherent little machine world.',
        icon: CircuitBoard,
      },
    ],
  },
]

export function getDesignConcept(slug: string) {
  return designConcepts.find((concept) => concept.slug === slug)
}
