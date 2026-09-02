import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { useTitle } from '../hooks/useTitle.js'

export default function NotFound() {
  useTitle('Page not found')

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-neutral-400">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-secondary mt-8">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </Reveal>
    </section>
  )
}
