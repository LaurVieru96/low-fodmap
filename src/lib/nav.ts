import type { LucideIcon } from 'lucide-react'
import { BookOpen, Carrot, CookingPot, Heart, ShoppingBasket } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  /** Shorter label for the narrow mobile bottom bar; falls back to `label`. */
  short?: string
  icon: LucideIcon
  end?: boolean
}

/** Primary destinations shown in both the sidebar and the mobile bottom bar.
   "Rețeta mea" (the builder) is surfaced separately so the bottom bar stays at 5. */
export const navItems: NavItem[] = [
  { to: '/', label: 'Ghid', icon: BookOpen, end: true },
  { to: '/alimente', label: 'Alimente', icon: Carrot },
  { to: '/retete', label: 'Rețete', icon: CookingPot },
  { to: '/favorite', label: 'Favorite', icon: Heart },
  { to: '/cumparaturi', label: 'Cumpărături', short: 'Coș', icon: ShoppingBasket },
]
