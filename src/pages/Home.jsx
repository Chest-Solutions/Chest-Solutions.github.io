import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { DiscordIcon, GitHubIcon } from '../components/icons.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { products } from '../data/site.js'

const notes = [
  {
    title: 'Free and open source',
    body: 'Every project is public - read it, patch it, run it on your network.',
  },
  {
    title: 'Performance comes first',
    body: 'Built for tick budget, not for symmetry - plugins you can actually ship to a busy production server.',
  },
  {
    title: 'Across most platforms',
    body: 'Available on Modrinth and GitHub - the same jar, wherever your players are.',
  },
]

/**
 * The brand word appears letter by letter, very fast, each glyph fading
 * in from a blur - like it's being typed in one quick burst. Runs once
 * on mount; no caret, no loop. Falls back to a static word when the
 * user prefers reduced motion.
 */
function BrandType({ text }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <span className="display-accent text-accent">{text}</span>
  }

  return (
    <span aria-label={text} className="display-accent text-accent">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: '0.35em', filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: 0.35 + i * 0.055,
            ease: [0.83, 0, 0.17, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Home() {
  useTitle()

  return (
    <>
      {/* ------------------------------------------------------------
          Hero - a film title card. Full-frame night scene, heavily
          graded, with the statement set bottom-left.
          ------------------------------------------------------------ */}
      <section className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden">
        <img
          src="/img/hero-night.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute left-1/2 top-1/2 -z-20 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        {/* Grade: darken the frame, then pull the bottom into page black
            so the title sits on near-black. */}
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-gradient-to-b from-transparent to-[#07080b]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#07080b]/90 to-transparent" />

        <div className="mx-auto w-full max-w-[90rem] px-6 pb-24 pt-40 md:px-10 md:pb-28">
          <Reveal>
            <h1 className="tracking-tighter text-[13vw] font-semibold leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl">
              This is <BrandType text="Nocturne" />.
            </h1>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-base leading-relaxed text-neutral-300 md:text-lg">
                Free, open-source mods &amp; plugins for Minecraft servers -
                built at night, for performance and stability.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/downloads" className="btn-primary">
                  Downloads
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link to="/docs" className="btn-secondary">
                  <BookOpen className="h-3.5 w-3.5" />
                  Docs
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------
          Manifesto - three statements as editorial rows.
          ------------------------------------------------------------ */}
      <section className="mx-auto w-full max-w-[90rem] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col">
          {notes.map((note, i) => (
            <Reveal key={note.title} delay={i * 0.08}>
              <div className="grid gap-3 border-t border-white/10 py-8 md:grid-cols-12 md:gap-6 md:py-10">
                <h2 className="text-xl font-semibold tracking-tight md:col-span-5 md:text-2xl">
                  {note.title}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-neutral-400 md:col-span-7 md:justify-self-end md:text-base">
                  {note.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------
          Projects - every project as a large type row.
          ------------------------------------------------------------ */}
      <section className="mx-auto w-full max-w-[90rem] px-6 pb-24 md:px-10 md:pb-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 pb-4">
            <h2 className="tracking-tighter text-4xl font-semibold md:text-6xl">
              Everything we ship
            </h2>
            <Link
              to="/downloads"
              className="eyebrow inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
            >
              All downloads
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} delay={i * 0.08} />
          ))}
          <div className="border-t border-white/10" />
        </div>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link
              to="/docs"
              className="eyebrow inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
            >
              <BookOpen className="h-3 w-3" />
              Documentation
            </Link>
            <a
              href="https://github.com/Chest-Solutions/Chest-Solutions.github.io/blob/in-dev/CONTRIBUTE.md"
              target="_blank"
              rel="noreferrer"
              className="eyebrow inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
            >
              Contributing
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------
          Community - pure type. Two oversized text links.
          ------------------------------------------------------------ */}
      <section className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[90rem] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 className="tracking-tighter max-w-3xl text-4xl font-semibold md:text-6xl">
              Bugs, ideas, updates - let's engage.
            </h2>
          </Reveal>

          <div className="mt-16 flex flex-col">
            <Reveal delay={0.08}>
              <a
                href="https://discord.gg/MsWqevupwh"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-6 border-t border-white/10 py-8 transition-colors duration-300 md:py-10"
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="tracking-tighter text-3xl font-semibold transition-colors duration-300 group-hover:text-[#5865F2] md:text-5xl">
                    Discord
                  </span>
                  <span className="hidden text-sm text-neutral-500 sm:block">
                    where we answer fastest
                  </span>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/15 text-neutral-400 transition-colors duration-300 group-hover:border-[#5865F2] group-hover:text-[#5865F2]">
                  <DiscordIcon className="h-5 w-5" />
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <a
                href="https://github.com/Chest-Solutions"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-6 border-t border-white/10 py-8 transition-colors duration-300 md:py-10"
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="tracking-tighter text-3xl font-semibold transition-colors duration-300 group-hover:text-accent md:text-5xl">
                    GitHub
                  </span>
                  <span className="hidden text-sm text-neutral-500 sm:block">
                    source, releases, issues
                  </span>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/15 text-neutral-400 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                  <GitHubIcon className="h-5 w-5" />
                </span>
              </a>
            </Reveal>
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>
    </>
  )
}
