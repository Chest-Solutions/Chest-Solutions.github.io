import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Info } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import SectionSlate from '../components/SectionSlate.jsx'
import PluginTile from '../components/PluginTile.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { products } from '../data/site.js'

const steps = [
  'Open your server panel (Pterodactyl, Pelican, or plain SFTP).',
  'Download the latest .jar from the project’s artifacts or releases.',
  'Place the jar in your plugins folder.',
  'Start the server and check the log for the plugin line.',
]

export default function Downloads() {
  useTitle('Downloads')

  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-28">
      <Reveal>
        <SectionSlate label="Software" />
        <h1 className="mt-8 text-4xl font-semibold tracking-tight md:text-6xl">
          Downloads
        </h1>
        <p className="mt-4 text-neutral-400">
          All software is free and open source.
        </p>
      </Reveal>

      {/* Catalogue as a track list: one row per project, joined by
          hairlines inside a single glass tray. */}
      <Reveal delay={0.08}>
        <div className="mt-14 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          {products.map((product, i) => (
            <a
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-5 px-6 py-6 transition-colors duration-300 hover:bg-white/[0.04] md:px-8"
            >
              <PluginTile name={product.name} size="h-10 w-10" iconSize="h-4 w-4" />
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold tracking-tight">
                  {product.name}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500 md:text-sm">
                  {product.description}
                </p>
              </div>
              <span className="hidden text-xs text-neutral-600 sm:block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-neutral-500">
          <Info className="mt-px h-3.5 w-3.5 shrink-0" />
          Builds can change without notice - pin the version you run in production.
        </p>
      </Reveal>

      <section className="mt-24">
        <Reveal>
          <SectionSlate label="Install" />
          <h2 className="mt-8 text-xl font-semibold tracking-tight md:text-2xl">
            The same four steps for every project
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ol className="mt-12 grid md:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step}
                className="border-t border-white/10 py-6 md:px-7 md:first:pl-0 md:last:pr-0"
              >
                <p className="text-xs font-medium text-sky-400/80">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.16}>
          <Link
            to="/docs"
            className="mt-10 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
          >
            Setup details per project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
