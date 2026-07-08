import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { DietPhase, FodmapGroup, Tolerance } from '../lib/types'
import { ProfileContext, type Profile } from './profile-context'

const DEFAULT_PROFILE: Profile = {
  phase: 'elimination',
  tolerances: {
    fructans: 'untested',
    gos: 'untested',
    lactose: 'untested',
    fructose: 'untested',
    sorbitol: 'untested',
    mannitol: 'untested',
  },
  personalized: false,
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useLocalStorage<Profile>('lf:profile', DEFAULT_PROFILE)
  const [sheetOpen, setSheetOpen] = useState(false)

  const setPhase = useCallback(
    (phase: DietPhase) => setProfile((p) => ({ ...p, phase })),
    [setProfile],
  )

  const setTolerance = useCallback(
    (group: FodmapGroup, tolerance: Tolerance) =>
      setProfile((p) => ({ ...p, tolerances: { ...p.tolerances, [group]: tolerance } })),
    [setProfile],
  )

  const togglePersonalized = useCallback(
    (on?: boolean) => setProfile((p) => ({ ...p, personalized: on ?? !p.personalized })),
    [setProfile],
  )

  const resetProfile = useCallback(() => setProfile(DEFAULT_PROFILE), [setProfile])

  const openSheet = useCallback(() => setSheetOpen(true), [])
  const closeSheet = useCallback(() => setSheetOpen(false), [])

  const value = useMemo(
    () => ({
      profile,
      setPhase,
      setTolerance,
      togglePersonalized,
      resetProfile,
      sheetOpen,
      openSheet,
      closeSheet,
    }),
    [
      profile,
      setPhase,
      setTolerance,
      togglePersonalized,
      resetProfile,
      sheetOpen,
      openSheet,
      closeSheet,
    ],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}
