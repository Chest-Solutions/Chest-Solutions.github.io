import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { useTitle } from '../hooks/useTitle.js'

const docs = [
  {
    name: 'ExpandFont',
    description: 'Getting started with custom fonts in your placeholders.',
    href: '/docs/expandfonts',
    icon: BookOpen,
  },
]

export default function Docs() {
  useTitle('Docs')

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-20">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Documentation</h1>
        <p className="mt-3 text-neutral-400">Guides for our software.</p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc, i) => {
          const Icon = doc.icon
          return (
            <Reveal key={doc.name} delay={i * 0.08}>
              <Link
                to={doc.href}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5 text-neutral-300" />
                </div>
                <h2 className="mt-5 text-lg font-semibold tracking-tight">{doc.name}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{doc.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-neutral-300 transition-colors duration-300 group-hover:text-white">
                  Read docs
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
