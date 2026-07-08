import type { Difficulty, MealType } from './types'

export const MEAL_META: Record<MealType, { label: string; emoji: string; cover: string }> = {
  breakfast: {
    label: 'Mic dejun',
    emoji: '🍳',
    cover: 'linear-gradient(135deg, #fdf0d5, #f7e2c4)',
  },
  lunch: {
    label: 'Prânz',
    emoji: '🥗',
    cover: 'linear-gradient(135deg, #e7f1e6, #d6e8d4)',
  },
  dinner: {
    label: 'Cină',
    emoji: '🍽️',
    cover: 'linear-gradient(135deg, #fce7df, #f6d6ca)',
  },
  'snack-dessert': {
    label: 'Gustări & deserturi',
    emoji: '🍪',
    cover: 'linear-gradient(135deg, #f7e4ee, #efd3e1)',
  },
  basic: {
    label: 'Baze & sosuri',
    emoji: '🫙',
    cover: 'linear-gradient(135deg, #eee7dd, #e4d9c9)',
  },
}

export const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack-dessert', 'basic']

export const DIFFICULTY_META: Record<Difficulty, { label: string }> = {
  easy: { label: 'Ușor' },
  medium: { label: 'Mediu' },
  advanced: { label: 'Avansat' },
}

export const TAG_LABELS: Record<string, string> = {
  'fara-gluten': 'Fără gluten',
  'fara-lactoza': 'Fără lactoză',
  vegan: 'Vegan',
  vegetarian: 'Vegetarian',
  'one-pot': 'O singură oală',
  'no-cook': 'Fără gătit',
  'meal-prep': 'Meal-prep',
  rapid: 'Rapid',
  proteic: 'Proteic',
  'sheet-pan': 'La tavă',
  'low-carb': 'Low-carb',
  comfort: 'Comfort food',
  freezer: 'Se congelează',
  'no-bake': 'Fără coacere',
  staple: 'De bază',
}

export function tagLabel(tag: string): string {
  return TAG_LABELS[tag] ?? tag
}

/** Coarse time bucket used by the recipe time filter. */
export const TIME_BUCKETS = [
  { value: 15, label: '≤ 15 min' },
  { value: 30, label: '≤ 30 min' },
  { value: 60, label: '≤ 60 min' },
] as const
