import type { FodmapStatus } from './status'

export type PatientStance = 'recommended' | 'avoid'
export type PatientView = 'recommended' | 'avoid' | 'conflict'

/** One food's patient-specific recommendation, derived from the lab report. */
export interface PatientFoodRec {
  foodId: string
  /** What the derived report says: eat more of it, or avoid it. */
  stance: PatientStance
  /** Why the report recommends/avoids it (shown in the detail sheet). */
  reason: string
  /** Optional extra note about the FODMAP angle (used mostly on conflicts). */
  fodmapNote?: string
}

export interface Supplement {
  name: string
  dose: string
  role: string
}

export interface LifestyleItem {
  title: string
  detail: string
}

export interface PatientProfile {
  /** Display name / alias — the real `*.local.ts` file is kept out of the repo. */
  name: string
  conditions: string[]
  /** One-paragraph strategy summary. */
  summary: string
  foods: PatientFoodRec[]
  supplements: Supplement[]
  lifestyle: LifestyleItem[]
  /** Provenance line — where these recommendations come from. */
  provenance: string
}

/**
 * A recommendation is a CONFLICT when the derived report and the app's FODMAP
 * status point in opposite directions: the report pushes a food the diet
 * forbids (red), or avoids one the diet allows freely (green). Computed against
 * the live FODMAP status so it stays correct if the food data is retested.
 */
export function patientView(status: FodmapStatus, stance: PatientStance): PatientView {
  if (stance === 'recommended' && status === 'red') return 'conflict'
  if (stance === 'avoid' && status === 'green') return 'conflict'
  return stance
}
