import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { GitHubIcon, DiscordIcon, ModrinthIcon } from './icons.jsx'
import Logo from './Logo.jsx'

const links = [
  { to: '/downloads', label: 'Downloads' },
  { to: '/docs', label: 'Docs' },
  { to: '/team', label: 'Team' },
]

function NavItems({ className, onNavigate }) {
  return (
    <div className={className}>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-neutral-500 hover:text-white'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  )
}

function Socials({ className }) {
  return (
    <div className={className}>
      <a
        href="https://github.com/Chest-Solutions"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="text-neutral-500 transition-colors duration-300 hover:text-white"
      >
        <GitHubIcon className="h-4 w-4" />
      </a>
      <a
        href="https://modrinth.com/organization/Chest-Solutions"
        target="_blank"
        rel="noreferrer"
        aria-label="Modrinth"
        className="social-modrinth"
      >
        <ModrinthIcon className="h-4 w-4" />
      </a>
      <a
        href="https://discord.gg/MsWqevupwh"
        target="_blank"
        rel="noreferrer"
        aria-label="Discord"
        className="social-discord"
      >
        <DiscordIcon className="h-4 w-4" />
      </a>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    // Floating masthead: inset 10px from the screen edges, white
    // translucent frosted glass. The negative bottom margin cancels its
    // height so pages start at the very top and scroll under the bar.
    <div className="sticky top-[10px] z-50 -mb-16 w-full px-[10px]">
      <motion.header
        initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-lg border border-white/10 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
      >
        <div className="mx-auto flex h-14 w-full max-w-[90rem] items-center justify-between px-6 md:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Logo className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-[0.35em]">
              Nocturne
            </span>
          </Link>

          <NavItems className="hidden items-center gap-10 md:flex" />

          <div className="hidden items-center gap-6 md:flex">
            <Socials className="flex items-center gap-5" />
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center text-neutral-400 transition-colors hover:text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu - drops from under the masthead as a full-width sheet. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[10px] right-[10px] top-[calc(100%+8px)] overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-5 px-6 py-6">
              <NavItems onNavigate={() => setOpen(false)} className="flex flex-col gap-5" />
              <Socials className="flex items-center gap-6 border-t border-white/10 pt-5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
