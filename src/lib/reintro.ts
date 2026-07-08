import type { FodmapGroup, Food, Tolerance } from './types'
import type { FodmapStatus } from './status'
import { foods } from '../data/foods'

/** Symptoms tracked per challenge day (standard IBS set). */
export type Symptom =
  | 'bloating'
  | 'gas'
  | 'pain'
  | 'diarrhea'
  | 'constipation'
  | 'nausea'
  | 'reflux'
  | 'fatigue'

/** 0 none · 1 mild · 2 moderate · 3 severe. */
export type Severity = 0 | 1 | 2 | 3

export type Verdict = 'tolerated' | 'partial' | 'not-tolerated'

export type ChallengeStatus = 'active' | 'completed'

export interface DayLog {
  /** 1 | 2 | 3 — the three escalating-dose test days. */
  day: number
  symptoms: Partial<Record<Symptom, Severity>>
  note?: string
  loggedAt?: string
}

export interface Challenge {
  id: string
  /** The single FODMAP subgroup this challenge isolates. */
  group: FodmapGroup
  foodId?: string
  foodName: string
  status: ChallengeStatus
  startedAt?: string
  days: DayLog[]
  verdict?: Verdict
  verdictNote?: string
}

export const SYMPTOM_ORDER: Symptom[] = [
  'bloating',
  'gas',
  'pain',
  'diarrhea',
  'constipation',
  'nausea',
  'reflux',
  'fatigue',
]

export const SYMPTOM_META: Record<Symptom, { label: string }> = {
  bloating: { label: 'Balonare' },
  gas: { label: 'Gaze' },
  pain: { label: 'Durere abd.' },
  diarrhea: { label: 'Diaree' },
  constipation: { label: 'Constipație' },
  nausea: { label: 'Greață' },
  reflux: { label: 'Reflux' },
  fatigue: { label: 'Oboseală' },
}

export const SEVERITY_ORDER: Severity[] = [0, 1, 2, 3]

export const SEVERITY_META: Record<Severity, { label: string; short: string }> = {
  0: { label: 'Fără', short: '–' },
  1: { label: 'Ușor', short: '1' },
  2: { label: 'Moderat', short: '2' },
  3: { label: 'Sever', short: '3' },
}

/** The escalating 3-day protocol: same food, growing dose, one subgroup at a time. */
export const DOSE_STEPS: { day: number; label: string; hint: string }[] = [
  { day: 1, label: 'Doză mică', hint: 'O porție mică din alimentul-test.' },
  { day: 2, label: 'Doză medie', hint: 'Crești porția dacă ziua 1 a fost ok.' },
  { day: 3, label: 'Doză mare', hint: 'Porție mare — atingi pragul de sus.' },
]

export const VERDICT_ORDER: Verdict[] = ['tolerated', 'partial', 'not-tolerated']

export const VERDICT_META: Record<Verdict, { label: string; desc: string }> = {
  tolerated: {
    label: 'Tolerez',
    desc: 'Fără simptome semnificative — poți reintroduce subgrupa.',
  },
  partial: {
    label: 'Parțial',
    desc: 'Ok la porții mici, simptome la porții mari — ai un prag.',
  },
  'not-tolerated': {
    label: 'Nu tolerez',
    desc: 'Simptome clare — evită subgrupa deocamdată.',
  },
}

export const makeChallengeId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`

/** Foods that isolate a single subgroup make the cleanest challenge; among those,
   reds are the clearest test. High-only (never green) so it actually provokes. */
export function testFoodsForGroup(group: FodmapGroup): Food[] {
  const rank = (s: FodmapStatus) => (s === 'red' ? 0 : 1)
  return foods
    .filter((f) => f.groups.includes(group) && f.status !== 'green')
    .sort((a, b) => a.groups.length - b.groups.length || rank(a.status) - rank(b.status))
    .slice(0, 8)
}

/** A "partial" verdict still means the subgroup is reintroducible (within a
   threshold), so it maps to tolerated for the "Pentru mine" recolor; portions
   are always caveated elsewhere. */
export function verdictToTolerance(v: Verdict): Tolerance {
  return v === 'not-tolerated' ? 'not-tolerated' : 'tolerated'
}

/** True once any symptom on the day is at least mild. */
export function dayHasSymptoms(day: DayLog): boolean {
  return Object.values(day.symptoms).some((s) => (s ?? 0) > 0)
}
