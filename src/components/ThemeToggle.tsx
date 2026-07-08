import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../store/theme-context'

interface ThemeToggleProps {
  variant?: 'sidebar' | 'header'
}

/** Flips light↔dark. Shows the icon of the theme you'd switch TO (moon in
   light mode, sun in dark), the common convention. Sidebar variant sits
   borderless next to the wordmark; header variant is a pill matching the
   mobile ProfileButton. */
export default function ThemeToggle({ variant = 'sidebar' }: ThemeToggleProps) {
  const { resolved, toggle } = useTheme()
  const toDark = resolved === 'light'
  const label = toDark ? 'Comută pe modul întunecat' : 'Comută pe modul luminos'
  const Icon = toDark ? Moon : Sun

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={
        variant === 'header'
          ? 'flex items-center justify-center rounded-full border border-line bg-surface p-2 text-ink-soft transition-colors hover:bg-sunk'
          : 'flex items-center justify-center rounded-lg p-2 text-ink-soft transition-colors hover:bg-sunk'
      }
    >
      <Icon size={variant === 'header' ? 17 : 18} strokeWidth={2} aria-hidden="true" />
    </button>
  )
}
