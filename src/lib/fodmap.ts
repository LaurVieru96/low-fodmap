import type { FodmapGroup, FoodCategory } from './types'

export const CATEGORY_META: Record<FoodCategory, { label: string; emoji: string }> = {
  fruits: { label: 'Fructe', emoji: '🍎' },
  vegetables: { label: 'Legume', emoji: '🥦' },
  grains: { label: 'Cereale & pâine', emoji: '🍞' },
  dairy: { label: 'Lactate', emoji: '🧀' },
  protein: { label: 'Proteine', emoji: '🍗' },
  legumes: { label: 'Leguminoase', emoji: '🫘' },
  'nuts-seeds': { label: 'Nuci & semințe', emoji: '🥜' },
  sweeteners: { label: 'Îndulcitori', emoji: '🍯' },
  condiments: { label: 'Condimente', emoji: '🧂' },
  beverages: { label: 'Băuturi', emoji: '🥤' },
  snacks: { label: 'Gustări', emoji: '🍿' },
}

export const CATEGORY_ORDER: FoodCategory[] = [
  'fruits',
  'vegetables',
  'grains',
  'dairy',
  'protein',
  'legumes',
  'nuts-seeds',
  'sweeteners',
  'condiments',
  'beverages',
  'snacks',
]

export const GROUP_META: Record<FodmapGroup, { label: string; short: string }> = {
  fructans: { label: 'Fructani', short: 'Fructani' },
  gos: { label: 'GOS · galacto-oligozaharide', short: 'GOS' },
  lactose: { label: 'Lactoză', short: 'Lactoză' },
  fructose: { label: 'Fructoză în exces', short: 'Fructoză' },
  sorbitol: { label: 'Sorbitol', short: 'Sorbitol' },
  mannitol: { label: 'Manitol', short: 'Manitol' },
}

export const CONFIDENCE_LABEL: Record<string, string> = {
  monash: 'testat Monash',
  analogy: 'estimat prin analogie',
  inferred: 'estimat',
}

/** Strip combining diacritics (U+0300–U+036F) + lowercase so search ignores ă/â/î/ș/ț. */
export function normalize(s: string): string {
  return Array.from(s.normalize('NFD'))
    .filter((ch) => {
      const c = ch.codePointAt(0) ?? 0
      return c < 0x0300 || c > 0x036f
    })
    .join('')
    .toLowerCase()
    .trim()
}
