import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Check,
  ChevronDown,
  DoorOpen,
  LayoutGrid,
  Sparkles,
  Store,
} from 'lucide-react'
import { docRegistry } from '../data/docs.js'

const EASE = [0.16, 1, 0.3, 1]

const icons = {
  MoParticles: Sparkles,
  DoorCards: DoorOpen,
  FoliaShops: Store,
  FoliaGUI: LayoutGrid,
}

function firstSectionId(doc) {
  return doc.sections[0]?.id
}

/**
 * Custom plugin picker for the docs pages. The frosted panel scales and
 * fades in beneath the trigger, options stagger in, and the chevron flips
 * as it opens and closes. Keyboard support mirrors a native <select>:
 * arrows / Home / End move between options, Enter picks, Escape closes.
 */
export default function PluginSelect({ activeSlug, className = 'lg:w-64' }) {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const listId = useId()
  const [open, setOpen] = useState(false)

  const containerRef = useRef(null)
  const buttonRef = useRef(null)

  const current = docRegistry[activeSlug]
  const entries = Object.entries(docRegistry)
  const CurrentIcon = (current && icons[current.name]) || Sparkles

  // Close when clicking anywhere outside the dropdown.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Land focus on the active option when the list opens, like a native
  // <select> does.
  useEffect(() => {
    if (!open) return
    const list = document.getElementById(listId)
    if (!list) return
    const active = list.querySelector('[data-active="true"]')
    ;(active ?? list.querySelector('[role="option"]'))?.focus()
  }, [open, listId])

  function select(slug) {
    setOpen(false)
    buttonRef.current?.focus()
    if (slug === activeSlug) return
    const doc = docRegistry[slug]
    if (doc) navigate(`/docs/${slug}/${firstSectionId(doc)}`)
  }

  function focusOption(index) {
    const options = containerRef.current?.querySelectorAll('[role="option"]')
    const option = options?.[index]
    if (option) {
      option.focus()
      option.scrollIntoView({ block: 'nearest' })
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      if (open) {
        event.preventDefault()
        setOpen(false)
        buttonRef.current?.focus()
      }
      return
    }

    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        setOpen(true)
      }
      return
    }

    const options = Array.from(
      containerRef.current?.querySelectorAll('[role="option"]') ?? [],
    )
    const index = options.indexOf(document.activeElement)
    const last = options.length - 1

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusOption(index < 0 || index === last ? 0 : index + 1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusOption(index <= 0 ? last : index - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusOption(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusOption(last)
    }
  }

  // Close when focus moves out of the dropdown (e.g. tabbing past it).
  // relatedTarget is null for mouse clicks in Safari, so those are left
  // to the click / pointerdown handlers instead.
  function handleBlur(event) {
    const next = event.relatedTarget
    if (open && next && !containerRef.current?.contains(next)) {
      setOpen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className={`relative ${className}`}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label="Select plugin"
        onClick={() => setOpen((value) => !value)}
        className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-left text-sm text-white outline-none transition-colors duration-200 focus-visible:border-white/25 ${
          open ? 'border-white/25' : 'hover:border-white/25'
        }`}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5">
          <CurrentIcon className="h-3.5 w-3.5 text-neutral-300" />
        </span>
        <span className="flex-1 truncate">
          {current?.name ?? 'Select plugin'}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="flex shrink-0 items-center"
        >
          <ChevronDown
            className={`h-4 w-4 transition-colors duration-200 ${
              open ? 'text-neutral-300' : 'text-neutral-500'
            }`}
          />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduce
                ? { opacity: 0, transition: { duration: 0.1 } }
                : {
                    opacity: 0,
                    y: -4,
                    scale: 0.98,
                    transition: { duration: 0.15, ease: EASE },
                  }
            }
            transition={reduce ? { duration: 0.1 } : { duration: 0.2, ease: EASE }}
            style={{ transformOrigin: 'top center' }}
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 max-h-72 max-w-xs overflow-y-auto rounded-xl border border-white/10 bg-[#0d0f14]/95 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
          >
            <p className="px-2.5 pb-1 pt-1.5 text-xs uppercase tracking-[0.15em] text-neutral-500">
              Plugins
            </p>
            <div
              id={listId}
              role="listbox"
              aria-label="Select plugin"
              className="space-y-0.5"
            >
              {entries.map(([slug, doc], i) => {
                const Icon = icons[doc.name] ?? Sparkles
                const active = slug === activeSlug
                return (
                  <motion.button
                    key={slug}
                    type="button"
                    role="option"
                    aria-selected={active}
                    data-active={active ? 'true' : undefined}
                    title={doc.tagline}
                    onClick={() => select(slug)}
                    initial={reduce ? false : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduce
                        ? { duration: 0.1 }
                        : { duration: 0.22, delay: 0.03 * i, ease: EASE }
                    }
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left outline-none transition-colors duration-150 focus-visible:bg-white/10 ${
                      active ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5">
                      <Icon className="h-3.5 w-3.5 text-neutral-300" />
                    </span>
                    <span className="flex-1 truncate text-sm font-medium text-white">
                      {doc.name}
                    </span>
                    {active && (
                      <Check className="h-4 w-4 shrink-0 text-neutral-400" />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
