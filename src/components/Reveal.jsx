import { motion, useReducedMotion } from 'framer-motion'

// Quint in-out: slow start, fast middle, soft landing - a heavier,
// more cinematic settle than the old expo-out.
const EASE = [0.83, 0, 0.17, 1]

/**
 * Cinematic reveal: content fades in while travelling from the bottom
 * up, easing with a quint in-out so it settles softly into place.
 */
export default function Reveal({ children, delay = 0, y = 36, className }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
