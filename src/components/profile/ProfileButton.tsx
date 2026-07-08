import { User } from 'lucide-react'
import { useProfile } from '../../store/profile-context'
import { PHASE_META } from '../../lib/profileMeta'

interface ProfileButtonProps {
  variant?: 'sidebar' | 'header'
}

/** Opens the profile sheet; carries a small phase chip so the current diet
   phase is always visible at a glance. Rendered in both the desktop sidebar
   and the mobile header. */
export default function ProfileButton({ variant = 'sidebar' }: ProfileButtonProps) {
  const { profile, openSheet } = useProfile()
  const phase = PHASE_META[profile.phase].label

  if (variant === 'header') {
    return (
      <button
        type="button"
        onClick={openSheet}
        className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-ink-soft transition-colors hover:bg-sunk"
      >
        <User size={17} strokeWidth={2} aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{phase}</span>
        <span className="sr-only">Profilul meu</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={openSheet}
      className="flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-sunk"
    >
      <User size={19} strokeWidth={2} aria-hidden="true" />
      <span className="min-w-0 text-left leading-tight">
        <span className="block font-semibold text-ink">Profilul meu</span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {phase}
        </span>
      </span>
    </button>
  )
}
