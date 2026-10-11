import { ArrowUpRight } from 'lucide-react'
import PluginTile from './PluginTile.jsx'
import Reveal from './Reveal.jsx'

const CARD =
  'group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] ' +
  'transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] ' +
  'hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]'

export default function ProductCard({ product, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={product.href}
        target="_blank"
        rel="noreferrer"
        className={CARD}
      >
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-white/10">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between">
            <PluginTile name={product.name} />
            {product.status && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-neutral-400">
                {product.status}
              </span>
            )}
          </div>

          <h2 className="mt-5 text-lg font-semibold tracking-tight">
            {product.name}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
            {product.description}
          </p>

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 group-hover:text-white">
            GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </a>
    </Reveal>
  )
}

/**
 * The lead project: a wide glass card - banner on one side, the write-up
 * on the other. Same information as a regular card, given the
 * "first release" slot in the catalogue.
 */
export function FeaturedProduct({ product }) {
  return (
    <Reveal className="h-full">
      <a
        href={product.href}
        target="_blank"
        rel="noreferrer"
        className="group grid h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:grid-cols-2"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 lg:aspect-auto lg:min-h-[320px] lg:border-b-0 lg:border-r">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col p-8 md:p-10">
          <div className="flex items-center justify-between">
            <PluginTile name={product.name} />
            <span className="eyebrow">Featured</span>
          </div>

          <h2 className="mt-8 text-2xl font-semibold tracking-tight md:text-3xl">
            {product.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            {product.description}
          </p>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-10 text-sm text-neutral-400 transition-colors duration-300 group-hover:text-white">
            GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </a>
    </Reveal>
  )
}
