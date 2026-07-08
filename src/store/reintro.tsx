import { useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useProfile } from './profile-context'
import { ReintroContext } from './reintro-context'
import type { StartChallengeInput } from './reintro-context'
import type { Challenge, DayLog, Severity, Symptom, Verdict } from '../lib/reintro'
import { makeChallengeId, verdictToTolerance } from '../lib/reintro'

export function ReintroProvider({ children }: { children: ReactNode }) {
  const [challenges, setChallenges] = useLocalStorage<Challenge[]>('lf:reintro', [])
  const { setTolerance } = useProfile()

  const startChallenge = useCallback(
    ({ group, foodId, foodName }: StartChallengeInput) => {
      const id = makeChallengeId()
      const challenge: Challenge = {
        id,
        group,
        foodId,
        foodName,
        status: 'active',
        startedAt: new Date().toISOString(),
        days: [],
      }
      setChallenges((prev) => [challenge, ...prev])
      return id
    },
    [setChallenges],
  )

  const logDay = useCallback(
    (
      challengeId: string,
      day: number,
      symptoms: Partial<Record<Symptom, Severity>>,
      note?: string,
    ) => {
      setChallenges((prev) =>
        prev.map((c) => {
          if (c.id !== challengeId) return c
          const entry: DayLog = { day, symptoms, note, loggedAt: new Date().toISOString() }
          const days = [...c.days.filter((d) => d.day !== day), entry].sort(
            (a, b) => a.day - b.day,
          )
          return { ...c, days }
        }),
      )
    },
    [setChallenges],
  )

  const setVerdict = useCallback(
    (challengeId: string, verdict: Verdict, note?: string) => {
      // Read the group from the current list before the async state update so we
      // can push the learned tolerance to the profile (auto-update, per the user's choice).
      const challenge = challenges.find((c) => c.id === challengeId)
      setChallenges((prev) =>
        prev.map((c) =>
          c.id === challengeId ? { ...c, status: 'completed', verdict, verdictNote: note } : c,
        ),
      )
      if (challenge) setTolerance(challenge.group, verdictToTolerance(verdict))
    },
    [challenges, setChallenges, setTolerance],
  )

  const deleteChallenge = useCallback(
    (challengeId: string) => setChallenges((prev) => prev.filter((c) => c.id !== challengeId)),
    [setChallenges],
  )

  const value = useMemo(
    () => ({ challenges, startChallenge, logDay, setVerdict, deleteChallenge }),
    [challenges, startChallenge, logDay, setVerdict, deleteChallenge],
  )

  return <ReintroContext.Provider value={value}>{children}</ReintroContext.Provider>
}
