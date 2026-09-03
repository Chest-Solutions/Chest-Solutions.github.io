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
            `text-sm transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
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
        className="text-neutral-400 transition-colors duration-300 hover:text-white"
      >
        <GitHubIcon className="h-[18px] w-[18px]" />
      </a>
      <a
        href="https://modrinth.com/organization/Chest-Solutions"
        target="_blank"
        rel="noreferrer"
        aria-label="Modrinth"
        className="social-modrinth"
      >
        <ModrinthIcon className="h-[18px] w-[18px]" />
      </a>
      <a
        href="https://discord.gg/MsWqevupwh"
        target="_blank"
        rel="noreferrer"
        aria-label="Discord"
        className="social-discord"
      >
        <DiscordIcon className="h-[18px] w-[18px]" />
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
    // One navbar for every page (home and docs alike): sticky, so it stays
    // pinned at the top while the page scrolls under the frosted pill. The
    // negative bottom margin cancels its own height (pt-4 + h-14 = 4.5rem)
    // so the pill floats over the page exactly like a fixed header and no
    // page's content shifts.
    <div className="sticky top-0 z-50 -mb-[4.5rem] w-full px-4 pt-4 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-xl bg-white/10 px-5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
      >
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo className="h-7 w-7" />
          <span className="text-[15px] font-semibold tracking-tighter">Chest Solutions</span>
        </Link>

        <NavItems className="hidden items-center gap-8 md:flex" />
        <Socials className="hidden items-center gap-5 md:flex" />

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.header>

      {/* Mobile menu - absolutely positioned below the pill so it overlays
          the page instead of pushing the sticky wrapper taller. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-full mx-auto mt-2 max-w-5xl overflow-hidden rounded-xl bg-white/10 backdrop-blur-2xl md:hidden sm:left-6 sm:right-6"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              <NavItems onNavigate={() => setOpen(false)} className="flex flex-col gap-1" />
              <Socials className="mt-4 flex items-center gap-5 pt-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
