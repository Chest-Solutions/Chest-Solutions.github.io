import { motion } from 'framer-motion'
import { useState } from 'react'

// Two preloaded Audio objects so the sounds can play instantly on hover.
// Volume is intentionally extremely low so the sound is a subtle feedback cue
// and never a jumpscare - adjust VOLUME here if you want it different.
const VOLUME = 0.08

let _openAudio = null
let _closeAudio = null

function getAudio() {
  if (typeof window === 'undefined') return { open: null, close: null }
  if (!_openAudio) {
    _openAudio = new Audio('/sounds/Chest_open.ogg')
    _openAudio.volume = VOLUME
    _openAudio.preload = 'auto'
  }
  if (!_closeAudio) {
    _closeAudio = new Audio('/sounds/Chest_close2.ogg')
    _closeAudio.volume = VOLUME
    _closeAudio.preload = 'auto'
  }
  return { open: _openAudio, close: _closeAudio }
}

// The open-chest art is rendered at a higher pixel resolution than the
// closed-chest art, so we lock both to the same box with `object-contain`
// to keep the swap visually identical in size.
const FRAME = 'relative inline-block h-7 w-7 shrink-0'

// A snappy spring with a small overshoot so the chest "bounces" when it
// opens and closes. stiffness is high → fast; damping ~22 → little ring.
const SNAPPY_SPRING = { type: 'spring', stiffness: 600, damping: 22, mass: 0.6 }

/**
 * Nocturne logo: snaps between the closed and open chest variants
 * with a small bounce, and plays the matching Minecraft chest sound on
 * every state change. Both images stay mounted so the transition is just
 * opacity + scale - never a flicker.
 */
export default function Logo({ className = 'h-7 w-7', alt = 'Nocturne' }) {
  const [hovered, setHovered] = useState(false)
  const { open, close } = getAudio()

  const playOpen = () => {
    if (!open) return
    try {
      open.currentTime = 0
      open.play().catch(() => {})
    } catch (_) {}
  }

  const playClose = () => {
    if (!close) return
    try {
      close.currentTime = 0
      close.play().catch(() => {})
    } catch (_) {}
  }

  return (
    <span
      className={`${FRAME} ${className}`}
      onMouseEnter={() => {
        setHovered(true)
        playOpen()
      }}
      onMouseLeave={() => {
        setHovered(false)
        playClose()
      }}
    >
      <motion.img
        src="/img/chest_closed.webp"
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain"
        initial={false}
        animate={{
          opacity: hovered ? 0 : 1,
          scale: hovered ? 0.6 : 1,
          rotate: hovered ? -8 : 0,
        }}
        transition={SNAPPY_SPRING}
      />
      <motion.img
        src="/img/chest_open.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain"
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1.08 : 0.6,
          rotate: hovered ? 0 : 8,
        }}
        transition={SNAPPY_SPRING}
      />
    </span>
  )
}
