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
    body: 'Every project is public and MIT licensed - read it, patch it, run it on your network.',
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

export default function Home() {
  useTitle()

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
        {/* Background photo - scaled up heavily + offset so it covers the
            entire section. A light blur washes it into a soft scrim so
            the centered text reads cleanly on top. */}
        <img
          src="/img/hero-birch.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute left-1/2 top-1/2 -z-20 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 object-cover blur-sm"
        />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        {/* Letterbox vignette - darkens the frame edges so the hero reads
            like a shot, with the title plated over the centre. */}
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]"
        />
        <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-[#161310] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-b from-transparent to-[#161310]" />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center">
          <Reveal>
            <p className="eyebrow">
              Minecraft mods &amp; plugins ‧ Paper / Folia
            </p>
            <h1 className="mt-6 tracking-tighter text-5xl font-medium leading-[1.02] md:text-7xl">
              Modern mods &amp; plugins.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-300 md:text-lg">
              Free, open-source Minecraft software - built for performance and stability.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/downloads" className="btn-primary">
                Downloads
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/docs" className="btn-secondary">
                <BookOpen className="h-4 w-4" />
                Documentation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Notes */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          {/* Section slate - index number, label, hairline to the edge. */}
          <div className="flex items-center gap-6">
            <p className="eyebrow shrink-0">01 — Principles</p>
            <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
          </div>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {notes.map((note, i) => (
            <Reveal key={note.title} delay={i * 0.08}>
              <h2 className="text-sm font-semibold tracking-tight">{note.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{note.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">02 — Projects</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  Everything we ship
                </h2>
                <p className="mt-3 max-w-xl text-neutral-400">
                  Mods and plugins for Paper and Folia servers, all free.
                </p>
              </div>
              <Link to="/downloads" className="btn-secondary">
                All downloads
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Community - mirrors the plugin card grid: two banner cards,
          one for Discord, one for GitHub. Same banner-art aesthetic as
          the plugin cards above (cosmic aurora, grain). */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="eyebrow">03 — Community</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Find us
            </h2>
            <p className="mt-3 max-w-xl text-neutral-400">
              Bugs, ideas and updates live where the community does.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {/* Discord */}
            <Reveal delay={0.08}>
              <a
                href="https://discord.gg/MsWqevupwh"
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-white/10">
                  <img
                    src="/img/discord-card.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between p-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">Discord</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                      That is where we answer fastest.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover:bg-[#5865F2] group-hover:text-white">
                    <DiscordIcon className="h-4 w-4" />
                    Join
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </Reveal>

            {/* GitHub */}
            <Reveal delay={0.16}>
              <a
                href="https://github.com/Chest-Solutions"
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-white/10">
                  <img
                    src="/img/github-card.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between p-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">GitHub</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                      Source, releases and issues for every project.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-white/10">
                    <GitHubIcon className="h-4 w-4" />
                    Visit
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
