import type { FodmapStatus } from './status'

export type FodmapGroup =
  | 'fructans'
  | 'gos'
  | 'lactose'
  | 'fructose'
  | 'sorbitol'
  | 'mannitol'

export type FoodCategory =
  | 'fruits'
  | 'vegetables'
  | 'grains'
  | 'dairy'
  | 'protein'
  | 'legumes'
  | 'nuts-seeds'
  | 'sweeteners'
  | 'condiments'
  | 'beverages'
  | 'snacks'

/** How trustworthy the serving numbers are — drives the "estimat" badge. */
export type Confidence = 'monash' | 'analogy' | 'inferred'

/** One column of the ServingDial: an amount and the status it maps to. */
export interface DialStop {
  grams: string
  note?: string
  status: FodmapStatus
}

export interface Food {
  id: string
  nameRo: string
  nameEn?: string
  category: FoodCategory
  emoji: string
  /** Overall status at a typical serving (the large traffic light). */
  status: FodmapStatus
  /** Headline safe portion, e.g. "40 g" or "1 felie". Omitted when unlimited. */
  serving?: string
  groups: FodmapGroup[]
  note?: string
  confidence: Confidence
  /** Portion-dependent foods carry a dial (green → amber → red by amount). */
  dial?: DialStop[]
  /** Optional "retestat / verifică" caution surfaced in the UI. */
  flag?: string
}
