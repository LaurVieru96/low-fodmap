import type { DietPhase, Tolerance } from './types'

export const PHASE_ORDER: DietPhase[] = ['elimination', 'reintroduction', 'personalization']

export const PHASE_META: Record<DietPhase, { label: string; desc: string }> = {
  elimination: {
    label: 'Eliminare',
    desc: 'Ține-te de verde; toleranțele se completează în faza de reintroducere.',
  },
  reintroduction: {
    label: 'Reintroducere',
    desc: 'Testezi câte o subgrupă pe rând și bifezi ce toleri.',
  },
  personalization: {
    label: 'Personalizare',
    desc: 'Recolorăm alimentele după subgrupele pe care le toleri.',
  },
}

export const TOLERANCE_ORDER: Tolerance[] = ['tolerated', 'untested', 'not-tolerated']

export const TOLERANCE_META: Record<Tolerance, { label: string }> = {
  tolerated: { label: 'Tolerez' },
  untested: { label: 'Încă testez' },
  'not-tolerated': { label: 'Nu tolerez' },
}
