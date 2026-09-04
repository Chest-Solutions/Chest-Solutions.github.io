import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

/**
 * A project as an index row, not a card: big name set in display type,
 * the description as a single quiet line, and the artwork as a small
 * film-still that fades in on the right. Rows divide with hairlines.
 */
export default function ProductCard({ product, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <a
        href={product.href}
        target="_blank"
        rel="noreferrer"
        className="group grid items-center gap-x-6 gap-y-4 border-t border-white/10 py-8 md:grid-cols-12 md:py-10"
      >
        {/* Name + status */}
        <div className="md:col-span-4">
          <h2 className="tracking-tighter inline-flex items-baseline gap-3 text-3xl font-semibold transition-colors duration-300 group-hover:text-accent md:text-4xl">
            {product.name}
          </h2>
          {product.status && (
            <span className="ml-3 align-middle text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              {product.status}
            </span>
          )}
        </div>

        {/* One-line description */}
        <p className="max-w-md text-sm leading-relaxed text-neutral-400 md:col-span-5">
          {product.description}
        </p>

        {/* Film still - small, desaturated until hover */}
        <div className="hidden overflow-hidden md:col-span-2 md:block">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </div>

        {/* Link affordance */}
        <span className="hidden justify-self-end text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white md:col-span-1 md:block">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </a>
    </Reveal>
  )
}
