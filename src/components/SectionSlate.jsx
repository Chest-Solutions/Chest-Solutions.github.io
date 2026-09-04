import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Section slate: a small uppercase label (with an optional index number)
 * followed by a hairline that draws itself across the remaining width as
 * the section scrolls into view - the "slate" that opens each chapter.
 * Purely informative; no icons, no objects.
 */
export default function SectionSlate({ index, label, className = '' }) {
  const reduce = useReducedMotion()

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <p className="eyebrow shrink-0">
        {index !== undefined && (
          <span className="mr-3 text-neutral-600">
            {String(index).padStart(2, '0')}
          </span>
        )}
        {label}
      </p>
      <motion.span
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.4, ease: EASE }}
        className="h-px flex-1 origin-left bg-white/10"
      />
    </div>
  )
}
