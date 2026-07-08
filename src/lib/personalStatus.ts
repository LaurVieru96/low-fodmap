import type { Food, FodmapGroup, Tolerance } from './types'
import type { FodmapStatus } from './status'

export type Tolerances = Record<FodmapGroup, Tolerance>

export interface PersonalStatus {
  status: FodmapStatus
  /** True when the profile lifted this food above its Monash status. */
  unlocked: boolean
}

/**
 * Projects a food's Monash status through the user's learned tolerances. An
 * amber/red food becomes green "for you" only when EVERY responsible subgroup
 * is tolerated. Green is never downgraded (it is already safe at its serving),
 * and a food with no recorded subgroups can't be unlocked — an unknown reason
 * stays conservative. Callers still surface the original status for honesty.
 */
export function personalStatus(food: Food, tol: Tolerances): PersonalStatus {
  if (food.status === 'green' || food.groups.length === 0) {
    return { status: food.status, unlocked: false }
  }
  const allTolerated = food.groups.every((g) => tol[g] === 'tolerated')
  return allTolerated
    ? { status: 'green', unlocked: true }
    : { status: food.status, unlocked: false }
}

export function countUnlocked(foods: Food[], tol: Tolerances): number {
  return foods.reduce((n, f) => (personalStatus(f, tol).unlocked ? n + 1 : n), 0)
}
