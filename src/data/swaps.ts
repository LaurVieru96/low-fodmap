export interface Swap {
  avoid: { emoji: string; name: string }
  choose: { emoji: string; name: string }
  why: string
}

/** "Așa nu → Așa da": high-FODMAP staples and their low-FODMAP replacements. */
export const swaps: Swap[] = [
  {
    avoid: { emoji: '🧄', name: 'Usturoi' },
    choose: { emoji: '🫗', name: 'Ulei infuzat cu usturoi' },
    why: 'Fructanii nu sunt liposolubili — rămâne doar aroma.',
  },
  {
    avoid: { emoji: '🧅', name: 'Ceapă' },
    choose: { emoji: '🌱', name: 'Partea verde a cepei verzi' },
    why: 'Verdele nu conține fructanii din bulb.',
  },
  {
    avoid: { emoji: '🥛', name: 'Lapte de vacă' },
    choose: { emoji: '🥛', name: 'Lapte fără lactoză' },
    why: 'Lactaza descompune lactoza; restul e neschimbat.',
  },
  {
    avoid: { emoji: '🍯', name: 'Miere' },
    choose: { emoji: '🍁', name: 'Sirop de arțar' },
    why: 'Fără fructoză în exces.',
  },
  {
    avoid: { emoji: '🍎', name: 'Măr, pere' },
    choose: { emoji: '🍊', name: 'Portocală, kiwi' },
    why: 'Fără fructoză și sorbitol.',
  },
  {
    avoid: { emoji: '🍝', name: 'Paste de grâu' },
    choose: { emoji: '🍜', name: 'Paste fără gluten / de orez' },
    why: 'Fără fructani.',
  },
  {
    avoid: { emoji: '🍞', name: 'Pâine albă' },
    choose: { emoji: '🥖', name: 'Sourdough' },
    why: 'Fermentarea lungă consumă fructanii.',
  },
  {
    avoid: { emoji: '🥜', name: 'Caju, fistic' },
    choose: { emoji: '🥜', name: 'Migdale (10), nuci' },
    why: 'Fără GOS în exces.',
  },
]
