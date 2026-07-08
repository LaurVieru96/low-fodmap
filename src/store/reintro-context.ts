import { createContext, useContext } from 'react'
import type { FodmapGroup } from '../lib/types'
import type { Challenge, Severity, Symptom, Verdict } from '../lib/reintro'

export interface StartChallengeInput {
  group: FodmapGroup
  foodId?: string
  foodName: string
}

export interface ReintroContextValue {
  challenges: Challenge[]
  /** Begins a new active challenge; returns its id. */
  startChallenge: (input: StartChallengeInput) => string
  /** Records (or overwrites) one test day's symptoms + note. */
  logDay: (
    challengeId: string,
    day: number,
    symptoms: Partial<Record<Symptom, Severity>>,
    note?: string,
  ) => void
  /** Closes a challenge with a verdict; also updates the profile tolerance. */
  setVerdict: (challengeId: string, verdict: Verdict, note?: string) => void
  deleteChallenge: (challengeId: string) => void
}

export const ReintroContext = createContext<ReintroContextValue | null>(null)

export function useReintro() {
  const ctx = useContext(ReintroContext)
  if (!ctx) throw new Error('useReintro must be used within ReintroProvider')
  return ctx
}
