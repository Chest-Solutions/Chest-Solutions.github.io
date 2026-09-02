import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { DiscordIcon, GitHubIcon } from '../components/icons.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { products } from '../data/site.js'

const notes = [
  {
    title: 'Free and open source',
    body: 'Every project is public and MIT licensed — read it, patch it, run it on your network.',
  },
  {
    title: 'No client mod required',
    body: 'Everything runs server-side. ExpandFont only needs the resource pack your players already load.',
  },
  {
    title: 'Early where it says so',
    body: 'Pre-alpha and alpha builds are labelled on the card, so you know what is going into production.',
  },
]

export default function Home() {
  useTitle()

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
        <img
          src="/img/hero-sunset.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-neutral-800/70" />
        <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-neutral-800/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-neutral-800" />

        <div className="mx-auto w-full max-w-6xl px-6 py-24">
          <Reveal>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Modern mods &amp; plugins.
              <span className="block text-neutral-300">Free &amp; open-source.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg">
              High-quality Minecraft software built for performance, stability, and accessibility.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/downloads" className="btn-primary">
                Downloads
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/docs" className="btn-secondary">
                <BookOpen className="h-4 w-4" />
                Documentation
              </Link>
            </div>
            <p className="mt-20 flex items-center gap-3 text-xs text-neutral-500">
              <span className="h-8 w-px bg-white/25" />
              Scroll for what is inside
            </p>
          </Reveal>
        </div>
      </section>

      {/* Notes */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {notes.map((note, i) => (
            <Reveal key={note.title} delay={i * 0.08}>
              <h2 className="text-sm font-semibold tracking-tight">{note.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{note.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Everything we ship
                </h2>
                <p className="mt-3 max-w-xl text-neutral-400">
                  Three projects, all free, all on GitHub.
                </p>
              </div>
              <Link to="/downloads" className="btn-secondary">
                All downloads
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.name} product={product} delay={i * 0.08} />
            ))}
          </div>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400">
              <Link
                to="/docs"
                className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white"
              >
                <BookOpen className="h-4 w-4" />
                Documentation
              </Link>
              <a
                href="https://github.com/Chest-Solutions/Chest-Solutions.github.io/blob/in-dev/CONTRIBUTE.md"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white"
              >
                Contributing
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Community */}
      <section className="relative isolate overflow-hidden border-t border-white/10">
        <img
          src="/img/mining.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-neutral-800/85" />

        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center">
          <Reveal>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              Bugs, ideas and updates land in Discord
            </h2>
            <p className="mt-3 max-w-xl text-neutral-400">
              That is where we answer fastest — and where the ExpandFont docs send you when a
              placeholder stops rendering.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://discord.gg/MsWqevupwh"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <DiscordIcon className="h-4 w-4" />
                Join Discord
              </a>
              <a
                href="https://github.com/Chest-Solutions"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
