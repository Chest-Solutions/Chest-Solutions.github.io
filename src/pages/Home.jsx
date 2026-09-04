import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import SectionSlate from '../components/SectionSlate.jsx'
import ProductCard, { FeaturedProduct } from '../components/ProductCard.jsx'
import { DiscordIcon, GitHubIcon } from '../components/icons.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { products } from '../data/site.js'

const EASE = [0.16, 1, 0.3, 1]

// Apple-style staggered entrance: every line of the title card rises
// and un-blurs in sequence, one beat after the other.
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const RISE = {
  hidden: { opacity: 0, y: 28, filter: 'blur(16px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE },
  },
}

const principles = [
  {
    title: 'Free and open source',
    body: 'Every project is public and MIT licensed - read it, patch it, run it on your network.',
  },
  {
    title: 'Performance comes first',
    body: 'Built for the tick budget, not for symmetry - plugins you can actually ship to a busy production server.',
  },
  {
    title: 'Across most platforms',
    body: 'Available on Modrinth and GitHub - the same jar, wherever your players are.',
  },
]

const facts = ['04 Projects', 'MIT Licensed', 'Paper ‧ Folia', 'Free forever']

export default function Home() {
  useTitle()

  const heroRef = useRef(null)
  const reduce = useReducedMotion()

  // Scroll-linked hero: the plate drifts up and the backdrop slowly
  // pushes in as the first section leaves the viewport.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-50%', '-36%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const fadeY = useTransform(scrollYProgress, [0, 0.75], [0, -48])

  const featured = products[0]
  const rest = products.slice(1)

  return (
    <>
      {/* Hero - full-viewport title card over the sunset shot. */}
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden"
      >
        {/* Backdrop - oversized, softly blurred, with a slow parallax
            push as the page scrolls. Wrapped in a motion div so the
            scroll transform never fights the centering classes. */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[115%] w-[115%]"
            style={reduce ? undefined : { x: '-50%', y: imgY, scale: imgScale }}
          >
            <img
              src="/img/hero-sunset.webp"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover blur-sm"
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 -z-10 bg-black/60" />
        {/* Letterbox vignette - darkens the frame edges so the hero reads
            like a shot, with the title plated over the lower third. */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-[#0a0a0c] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-b from-transparent to-[#0a0a0c]" />

        <motion.div
          style={reduce ? undefined : { opacity: fade, y: fadeY }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-6"
        >
          <motion.div
            variants={STAGGER}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="max-w-3xl py-28"
          >
            <motion.p variants={RISE} className="eyebrow">
              Open source ‧ Minecraft software
            </motion.p>
            <motion.h1
              variants={RISE}
              className="mt-7 tracking-tighter text-5xl font-medium leading-[1.0] md:text-8xl"
            >
              This is Dark.
            </motion.h1>
            <motion.p
              variants={RISE}
              className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300 md:text-xl"
            >
              Your new home for Minecraft mods &amp; plugins - free, open
              source, and built for busy servers.
            </motion.p>
            <motion.div
              variants={RISE}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link to="/downloads" className="btn-primary">
                Downloads
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/docs" className="btn-secondary">
                <BookOpen className="h-4 w-4" />
                Documentation
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Lower-third fact strip - small, informative, edge to edge. */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3 border-t border-white/10 pt-6">
            {facts.map((fact) => (
              <p key={fact} className="eyebrow">
                {fact}
              </p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 01 - Why Dark: a statement on the left, the principles stacked
          on the right. The statement pins while the principles scroll. */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <SectionSlate index={1} label="Why Dark" />
        </Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <h2 className="text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">
                Server software that stays out of the way.
              </h2>
            </Reveal>
          </div>
          <div>
            {principles.map((note, i) => (
              <Reveal key={note.title} delay={i * 0.08}>
                <div className="border-t border-white/10 py-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7">
                  <h3 className="text-sm font-semibold tracking-tight">
                    {note.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {note.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 - Projects: one featured release, then the rest of the
          catalogue underneath. */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <SectionSlate index={2} label="What we ship" />
            <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Everything we ship
              </h2>
              <Link to="/downloads" className="btn-secondary">
                All downloads
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12">
            <FeaturedProduct product={featured} />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((product, i) => (
              <ProductCard
                key={product.name}
                product={product}
                delay={i * 0.08}
              />
            ))}
          </div>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400">
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

      {/* 03 - Community: one glass panel split in two - Discord on the
          left, GitHub on the right, divided by a hairline. */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <SectionSlate index={3} label="Community" />
            <h2 className="mt-10 text-3xl font-semibold tracking-tight md:text-4xl">
              Find us
            </h2>
            <p className="mt-3 max-w-xl text-neutral-400">
              Bugs, ideas and updates live where the community does.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-2">
              <a
                href="https://discord.gg/MsWqevupwh"
                target="_blank"
                rel="noreferrer"
                className="group border-b border-white/10 p-10 transition-colors duration-300 hover:bg-white/[0.04] md:border-b-0 md:border-r"
              >
                <p className="eyebrow">Discord</p>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-300">
                  That is where we answer fastest - bugs, ideas and
                  early builds land here first.
                </p>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 group-hover:text-white">
                  <DiscordIcon className="h-4 w-4" />
                  Join
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
              <a
                href="https://github.com/Chest-Solutions"
                target="_blank"
                rel="noreferrer"
                className="group p-10 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <p className="eyebrow">GitHub</p>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-300">
                  Source, releases and issues for every project under the
                  organization.
                </p>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 group-hover:text-white">
                  <GitHubIcon className="h-4 w-4" />
                  Visit
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
