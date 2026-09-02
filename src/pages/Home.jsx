import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { useTitle } from '../hooks/useTitle.js'

export default function Home() {
  useTitle()

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-6">
      <Reveal>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Modern mods &amp; plugins.
          <span className="block text-neutral-400">Free &amp; open-source.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
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
      </Reveal>
    </section>
  )
}
