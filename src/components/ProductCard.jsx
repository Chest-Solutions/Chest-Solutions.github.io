import { ArrowUpRight, DoorOpen, LayoutGrid, Sparkles, Store } from 'lucide-react'
import Reveal from './Reveal.jsx'

const icons = {
  MoParticles: Sparkles,
  DoorCards: DoorOpen,
  FoliaShops: Store,
  FoliaGUI: LayoutGrid,
}

export default function ProductCard({ product, delay = 0 }) {
  const Icon = icons[product.name] ?? Sparkles

  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={product.href}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
      >
        <div className="aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-white/10">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Icon className="h-5 w-5 text-neutral-400" />
            </div>
            {product.status && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-neutral-400">
                {product.status}
              </span>
            )}
          </div>

          <h2 className="mt-5 text-lg font-semibold tracking-tight">{product.name}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{product.description}</p>

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 group-hover:text-white">
            GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </a>
    </Reveal>
  )
}
