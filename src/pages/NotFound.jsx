import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { useTitle } from '../hooks/useTitle.js'

export default function NotFound() {
  useTitle('Page not found')

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Reveal>
        <p className="eyebrow">Error 404</p>
        <h1 className="tracking-tighter mt-5 text-5xl font-semibold md:text-7xl">
          Lost in <span className="display-accent text-neutral-400">the dark.</span>
        </h1>
        <p className="mt-4 text-sm text-neutral-400">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn-secondary mt-10">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back home
        </Link>
      </Reveal>
    </section>
  )
}
