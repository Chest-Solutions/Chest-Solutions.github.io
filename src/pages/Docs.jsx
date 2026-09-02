import { ArrowUpRight, DoorOpen, LayoutGrid, Sparkles, Store } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { products } from '../data/site.js'

const icons = {
  MoParticles: Sparkles,
  DoorCards: DoorOpen,
  FoliaShops: Store,
  FoliaGUI: LayoutGrid,
}

export default function Docs() {
  useTitle('Docs')

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-20">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Documentation</h1>
        <p className="mt-3 text-neutral-400">Setup and usage live in each project’s README.</p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => {
          const Icon = icons[product.name] ?? Sparkles
          return (
            <Reveal key={product.name} delay={i * 0.08}>
              <a
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5 text-neutral-300" />
                </div>
                <h2 className="mt-5 text-lg font-semibold tracking-tight">{product.name}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                  {product.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-neutral-300 transition-colors duration-300 group-hover:text-white">
                  Read README
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.32}>
        <p className="mt-12 text-sm leading-relaxed text-neutral-400">
          Something missing? Ask in{' '}
          <a
            href="https://discord.gg/MsWqevupwh"
            target="_blank"
            rel="noreferrer"
            className="text-white underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:decoration-white"
          >
            Discord
          </a>{' '}
          or open an issue on the repository.
        </p>
      </Reveal>
    </div>
  )
}
