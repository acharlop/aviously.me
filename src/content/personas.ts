export type PersonaKey = 'guy' | 'seniorDev' | 'projectPartner' | 'businessHelper' | 'human'

export type Persona = {
  key: PersonaKey
  label: string
  eyebrow: string
  headline: string
  subhead: string
  proof: string[]
  cta: string
}

export const personas: Record<PersonaKey, Persona> = {
  guy: {
    key: 'guy',
    label: 'The Guy',
    eyebrow: 'AI-assisted human. Still answers email like a person.',
    headline: 'Old-School Service, Modern Tools',
    subhead:
      'Custom tools for busy businesses. I spend time learning how your business really works, then build practical software and AI-assisted systems that fit the way you work.',
    proof: [
      'Senior software developer who can sit with the messy parts before touching code.',
      'Good for the duct-tape work: spreadsheets, handoffs, exports, inbox chaos, and “only one person knows how this works.”',
      'Uses AI where it helps. Leaves it out where it would just make a louder mess.',
    ],
    cta: 'Tell me what keeps getting duct-taped',
  },
  seniorDev: {
    key: 'seniorDev',
    label: 'Senior Dev',
    eyebrow: 'Architecture, delivery, judgment, fewer mystery dashboards.',
    headline: 'Software Systems for Work That Got Too Manual',
    subhead:
      'I help teams turn fragile internal processes into maintainable software, with AI used carefully where it earns its keep.',
    proof: [
      'Scopes before building.',
      'Favors small, useful systems over platform theater.',
      'Can move from prototype to production without pretending those are the same job.',
    ],
    cta: 'Describe the system you wish existed',
  },
  projectPartner: {
    key: 'projectPartner',
    label: 'Project Partner',
    eyebrow: 'Calm structure for work that has been living in everyone’s head.',
    headline: 'A Practical Partner for Better Business Systems',
    subhead:
      'I help clarify the problem, organize the moving parts, and build tools your people can actually use.',
    proof: [
      'Useful when the problem is real but the scope is blurry.',
      'Translates between owners, staff, vendors, and software.',
      'Keeps the work human-sized.',
    ],
    cta: 'Start with the messy version',
  },
  businessHelper: {
    key: 'businessHelper',
    label: 'Business Helper',
    eyebrow: 'For owner-operated businesses that are tired of software that almost fits.',
    headline: 'Tools That Fit the Way You Work',
    subhead:
      'Bring me the repeated work, the awkward handoffs, and the systems held together by habit. I will help turn them into something sturdier.',
    proof: [
      'Plain-language discovery.',
      'Custom software without Silicon Valley nonsense.',
      'AI only when it makes the work easier to understand or finish.',
    ],
    cta: 'Show me the busywork',
  },
  human: {
    key: 'human',
    label: 'Human',
    eyebrow: 'A personal site for work, projects, writing, and useful experiments.',
    headline: 'Obviously, We Can Help Each Other Out',
    subhead:
      'I am Avi: a developer, builder, learner, and AI-assisted human trying to make technology feel more cooperative.',
    proof: [
      'Part professional front door.',
      'Part project garden.',
      'Part blog about building, learning, and staying human while the machines get louder.',
    ],
    cta: 'Send a signal',
  },
}

export const defaultPersona = personas.guy
