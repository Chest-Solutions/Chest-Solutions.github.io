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
    <div className="mx-auto w-full max-w-[90rem] px-6 pb-24 pt-32 md:px-10 md:pt-40">
      <Reveal>
        <h1 className="tracking-tighter text-5xl font-semibold md:text-7xl">
          <span className="display-accent text-neutral-400">All</span> downloads
        </h1>
        <p className="mt-5 max-w-md text-neutral-400">
          Every build is free and open source.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col">
        {products.map((product, i) => (
          <ProductCard key={product.name} product={product} delay={i * 0.08} />
        ))}
        <div className="border-t border-white/10" />
      </div>

      <Reveal delay={0.24}>
        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-neutral-500">
          <Info className="mt-px h-3.5 w-3.5 shrink-0" />
          Builds can change without notice - pin the version you run in production.
        </p>
      </Reveal>

      <section className="mt-24 md:mt-32">
        <Reveal>
          <h2 className="tracking-tighter text-3xl font-semibold md:text-4xl">
            Four steps, <span className="display-accent text-neutral-400">every project.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ol className="mt-10 flex flex-col">
            {steps.map((step) => (
              <li
                key={step}
                className="border-t border-white/10 py-6 text-sm leading-relaxed text-neutral-400"
              >
                {step}
              </li>
            ))}
            <div className="border-t border-white/10" />
          </ol>
        </Reveal>
        <Reveal delay={0.16}>
          <Link
            to="/docs"
            className="eyebrow mt-10 inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
          >
            Setup details per project
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
