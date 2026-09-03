import { Link } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
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
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-20">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Downloads</h1>
        <p className="mt-3 text-neutral-400">All software is free and open source.</p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.name} product={product} delay={i * 0.08} />
        ))}
      </div>

      <Reveal delay={0.24}>
        <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-neutral-500">
          <Info className="mt-px h-3.5 w-3.5 shrink-0" />
          Builds can change without notice - pin the version you run in production.
        </p>
      </Reveal>

      <section className="mt-20 border-t border-white/10 pt-12">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Install</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
            The same four steps for every project here.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ol className="mt-8 grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-neutral-400">
                <span className="text-neutral-500">{String(i + 1).padStart(2, '0')}</span>
                {step}
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
