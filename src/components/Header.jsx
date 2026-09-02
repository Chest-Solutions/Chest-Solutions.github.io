import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { GitHubIcon, DiscordIcon } from './icons.jsx'

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
        href="https://discord.gg/MsWqevupwh"
        target="_blank"
        rel="noreferrer"
        aria-label="Discord"
        className="text-neutral-400 transition-colors duration-300 hover:text-white"
      >
        <DiscordIcon className="h-[18px] w-[18px]" />
      </a>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        scrolled ? 'border-white/10 bg-neutral-800/70 backdrop-blur-xl' : 'border-transparent bg-neutral-800'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/img/chest.png" alt="" className="h-6 w-6" />
          <span className="text-[15px] font-semibold tracking-tight">Chest Solutions</span>
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
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-neutral-800/90 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <NavItems
                onNavigate={() => setOpen(false)}
                className="flex flex-col gap-1"
              />
              <Socials className="mt-4 flex items-center gap-5 border-t border-white/10 pt-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
