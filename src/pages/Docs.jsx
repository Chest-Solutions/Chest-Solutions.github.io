import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  DoorOpen,
  ExternalLink,
  LayoutGrid,
  Sparkles,
  Store,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { products } from '../data/site.js'
import { docRegistry, slugMap } from '../data/docs.js'

const icons = {
  MoParticles: Sparkles,
  DoorCards: DoorOpen,
  FoliaShops: Store,
  FoliaGUI: LayoutGrid,
}

function AccordionSection({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.title} className="border-b border-white/10">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-sm font-medium">{item.title}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 pb-5 text-sm leading-relaxed text-neutral-400">
                    {item.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

function DocsIndex() {
  useTitle('Docs')

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-24">
      <Reveal>
        <h1 className="tracking-tighter text-4xl font-semibold md:text-5xl">Documentation</h1>
        <p className="mt-3 max-w-xl text-neutral-400">
          Setup, configuration, and usage for every Chest Solutions project.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => {
          const Icon = icons[product.name] ?? Sparkles
          const slug = product.name.toLowerCase()
          return (
            <Reveal key={product.name} delay={i * 0.08}>
              <Link
                to={`/docs/${slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5 text-neutral-400" />
                </div>
                <h2 className="mt-5 text-lg font-semibold tracking-tight">{product.name}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                  {product.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 group-hover:text-white">
                  Explore
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.16}>
        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
          <p className="text-sm leading-relaxed text-neutral-400">
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
        </div>
      </Reveal>
    </div>
  )
}

function DocPage() {
  const { slug } = useParams()
  const doc = docRegistry[slug]
  useTitle(doc ? `${doc.name} — Docs` : 'Docs')

  if (!doc) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 pb-24 pt-32 text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">No docs yet</h1>
          <p className="mt-3 text-sm text-neutral-400">
            We haven’t published documentation for {slugMap[slug] ?? slug}.
          </p>
        </Reveal>
      </section>
    )
  }

  const Icon = icons[doc.name] ?? Sparkles

  return (
    <article className="pb-24 pt-20">
      <header className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Icon className="h-5 w-5 text-neutral-300" />
            </div>
            <h1 className="tracking-tighter text-4xl font-semibold md:text-5xl">{doc.name}</h1>
          </div>
          <p className="mt-4 max-w-2xl text-base text-neutral-300">{doc.tagline}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {doc.versions.map((v) => (
              <span
                key={v}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-neutral-300"
              >
                {v}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={doc.github} target="_blank" rel="noreferrer" className="btn-primary">
              <ExternalLink className="h-4 w-4" />
              Open GitHub
            </a>
            <a href={`#${doc.sections[0].id}`} className="btn-secondary">
              Jump to install
            </a>
          </div>
        </Reveal>
      </header>

      <div className="mx-auto mt-12 grid max-w-5xl gap-10 px-6 lg:grid-cols-[200px,1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 text-sm">
            <p className="mb-3 text-xs uppercase tracking-[0.15em] text-neutral-500">
              On this page
            </p>
            <ul className="space-y-2">
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-neutral-400 transition-colors duration-200 hover:text-white"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="space-y-12">
          {doc.sections.map((section, i) => (
            <Reveal key={section.id} delay={i * 0.04}>
              <section id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-400">
                  {section.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-4xl border-t border-white/10 px-6 pt-10">
        <Reveal>
          <p className="text-sm leading-relaxed text-neutral-400">
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
        <Reveal delay={0.1}>
          <Link
            to="/docs"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All docs
          </Link>
        </Reveal>
      </div>
    </article>
  )
}

export default function Docs() {
  const { slug } = useParams()
  return slug ? <DocPage /> : <DocsIndex />
}
