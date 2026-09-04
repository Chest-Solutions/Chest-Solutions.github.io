import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { useTitle } from '../hooks/useTitle.js'

export default function NotFound() {
  useTitle('Page not found')

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6">
      {/* The status code, plated huge and almost-gone behind the message. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute select-none text-[30vw] font-semibold leading-none tracking-tighter text-white/[0.04] blur-[6px]"
      >
        404
      </p>
      <Reveal className="relative z-10 flex flex-col items-center text-center">
        <p className="eyebrow">404 - Not found</p>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
          This page doesn't exist.
        </h1>
        <p className="mt-3 text-sm text-neutral-400">
          The link may be broken, or the page may have moved.
        </p>
        <Link to="/" className="btn-secondary mt-9">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </Reveal>
    </section>
  )
}
