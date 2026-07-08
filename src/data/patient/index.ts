import type { PatientProfile, PatientFoodRec } from '../../lib/patient'

/**
 * Loads a gitignored patient profile (`src/data/patient/*.local.ts`) if one is
 * present. When absent — a fresh clone, or the public build — the app runs as
 * the generic FODMAP guide: no patient UI, no errors. Patient health data is
 * sensitive and never committed; see `example.patient.ts` for the shape.
 */
const modules = import.meta.glob<{ default: PatientProfile }>('./*.local.ts', {
  eager: true,
})

export const patientProfile: PatientProfile | null =
  Object.values(modules)[0]?.default ?? null

const recById = new Map<string, PatientFoodRec>(
  (patientProfile?.foods ?? []).map((r) => [r.foodId, r]),
)

export function getPatientRec(foodId: string): PatientFoodRec | undefined {
  return recById.get(foodId)
}
