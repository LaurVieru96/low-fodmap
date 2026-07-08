import type { FodmapStatus } from './status'
import type { Ingredient } from './types'

export interface Verdict {
  /** Worst status among linked ingredients; 'unknown' if only unlinked remain. */
  status: FodmapStatus | 'unknown'
  /** Count of amber/red (portion-limited or high) ingredients. */
  nonGreen: number
  /** Count of free-text ingredients we can't classify. */
  unknown: number
  /** True when ≥2 amber/red foods could stack within one meal. */
  stacking: boolean
}

/**
 * Recipe-level FODMAP verdict from its ingredients. Validation is at the
 * food-status level (not per-gram): the recipe is as safe as its worst
 * ingredient, and stacking is flagged when several limited foods combine.
 */
export function computeVerdict(ingredients: Ingredient[]): Verdict {
  let hasRed = false
  let hasAmber = false
  let unknown = 0
  let nonGreen = 0

  for (const ing of ingredients) {
    if (!ing.foodId || !ing.status) {
      unknown++
      continue
    }
    if (ing.status === 'red') {
      hasRed = true
      nonGreen++
    } else if (ing.status === 'amber') {
      hasAmber = true
      nonGreen++
    }
  }

  const status: FodmapStatus | 'unknown' = hasRed
    ? 'red'
    : hasAmber
      ? 'amber'
      : unknown > 0
        ? 'unknown'
        : 'green'

  return { status, nonGreen, unknown, stacking: nonGreen >= 2 }
}
