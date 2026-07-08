import { NavLink, Outlet } from 'react-router-dom'
import { PlusCircle, Sparkles } from 'lucide-react'
import { navItems } from '../../lib/nav'
import { patientProfile } from '../../data/patient'
import { APP_NAME, APP_TAGLINE } from '../../lib/constants'
import ProfileButton from '../profile/ProfileButton'
import ProfileSheet from '../profile/ProfileSheet'

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-ink">
        <span className="flex gap-[3px]">
          <i className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-green)' }} />
          <i className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-amber)' }} />
          <i className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-red)' }} />
        </span>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-semibold text-ink">{APP_NAME}</span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {APP_TAGLINE}
        </span>
      </span>
    </div>
  )
}

export default function AppLayout() {
  // The patient page only appears when a profile is loaded (see src/data/patient).
  const items = patientProfile
    ? [...navItems, { to: '/recomandari', label: 'Recomandări', short: 'Sfaturi', icon: Sparkles }]
    : navItems
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-6xl">
      {/* Sidebar — desktop */}
      <aside className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col border-r border-line px-4 py-6 lg:flex">
        <div className="px-2">
          <Wordmark />
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent-soft text-accent'
                      : 'text-ink-soft hover:bg-sunk'
                  }`
                }
              >
                <Icon size={19} strokeWidth={2} aria-hidden="true" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <ProfileButton variant="sidebar" />
          <NavLink
            to="/reteta-mea"
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-xl border border-dashed px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-line text-ink hover:bg-sunk'
              }`
            }
          >
            <PlusCircle size={19} strokeWidth={2} aria-hidden="true" />
            Rețeta mea
          </NavLink>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper/90 px-4 py-3 backdrop-blur lg:hidden">
          <Wordmark />
          <ProfileButton variant="header" />
        </header>
        <main className="flex-1 px-4 py-6 pb-28 sm:px-6 lg:px-10 lg:py-10 lg:pb-10">
          <Outlet />
        </main>
      </div>

      {/* Bottom bar — mobile */}
      <nav
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-surface/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-muted'
                }`
              }
            >
              <Icon size={20} strokeWidth={2} aria-hidden="true" />
              {item.short ?? item.label}
            </NavLink>
          )
        })}
      </nav>

      <ProfileSheet />
    </div>
  )
}
