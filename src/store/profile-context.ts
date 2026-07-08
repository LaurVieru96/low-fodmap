import { createContext, useContext } from 'react'
import type { DietPhase, FodmapGroup, Tolerance } from '../lib/types'

export interface Profile {
  phase: DietPhase
  tolerances: Record<FodmapGroup, Tolerance>
  /** Is the global "Pentru mine" recolor toggle on? */
  personalized: boolean
}

export interface ProfileContextValue {
  profile: Profile
  setPhase: (phase: DietPhase) => void
  setTolerance: (group: FodmapGroup, tolerance: Tolerance) => void
  togglePersonalized: (on?: boolean) => void
  resetProfile: () => void
  /** Ephemeral UI state for the settings sheet (not persisted). */
  sheetOpen: boolean
  openSheet: () => void
  closeSheet: () => void
}

export const ProfileContext = createContext<ProfileContextValue | null>(null)

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
