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
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // On docs pages the navbar is rendered in normal document flow (not
  // fixed/floating). It sits at the top of the page like any other page
  // header instead of overlapping content as you scroll.
  const isStatic = pathname.startsWith('/docs')

  useEffect(() => {
    if (isStatic) return
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isStatic])

  // On static (docs) pages: no fixed/absolute positioning, no top/px wrapper.
  // On floating (everything else): same as before — fixed at top-4, pill.
  const wrapperClass = isStatic
    ? 'w-full'
    : 'pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6'

  // Docs pages always show the frosted pill; other pages only after scroll.
  const headerClass = isStatic
    ? 'mx-auto flex h-14 max-w-5xl items-center justify-between rounded-xl bg-white/10 px-5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)]'
    : `pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between rounded-xl px-5 transition-colors duration-500 ${
        scrolled
          ? 'bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)]'
          : 'bg-transparent'
      }`

  return (
    <div className={wrapperClass}>
      <motion.header
        initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={headerClass}
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`mx-auto mt-2 max-w-5xl overflow-hidden rounded-xl bg-white/10 backdrop-blur-2xl md:hidden ${
              isStatic ? '' : 'pointer-events-auto'
            }`}
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              <NavItems onNavigate={() => setOpen(false)} className="flex flex-col gap-1" />
              <Socials className="mt-4 flex items-center gap-5 pt-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so content under the static (docs) navbar starts below it.
          Only renders when the navbar is not floating. */}
      {isStatic && <div aria-hidden="true" className="h-6" />}
    </div>
  )
}
