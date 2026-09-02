import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  DoorOpen,
  ExternalLink,
  LayoutGrid,
  Sparkles,
  Store,
} from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { docRegistry } from '../data/docs.js'

const icons = {
  MoParticles: Sparkles,
  DoorCards: DoorOpen,
  FoliaShops: Store,
  FoliaGUI: LayoutGrid,
}

function firstSectionId(doc) {
  return doc.sections[0]?.id
}

function UserDocs(doc) {
  return doc.sections.filter((section) => section.id !== 'developer')
}

function DeveloperDocs(doc) {
  return doc.sections.filter((section) => section.id === 'developer')
}

function PluginSelect({ activeSlug, className = 'lg:w-64' }) {
  const navigate = useNavigate()
  const current = docRegistry[activeSlug]

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="docs-plugin" className="sr-only">
        Select plugin
      </label>
      <select
        id="docs-plugin"
        value={activeSlug}
        onChange={(event) => {
          const slug = event.target.value
          if (slug === activeSlug) return
          const doc = docRegistry[slug]
          if (doc) navigate(`/docs/${slug}/${firstSectionId(doc)}`)
        }}
        className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 pr-9 text-sm text-white outline-none transition-colors duration-200 focus:border-white/25"
      >
        {Object.entries(docRegistry).map(([slug, doc]) => (
          <option key={slug} value={slug} className="bg-[#2b2826] text-white">
            {doc.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
    </div>
  )
}

function SidebarLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`block rounded-md px-2 py-1.5 transition-colors duration-200 ${
        active ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'
      }`}
    >
      {children}
    </Link>
  )
}

function DocsSidebar({ activeSlug, activeSectionId }) {
  const doc = docRegistry[activeSlug]
  if (!doc) return null

  const user = UserDocs(doc)
  const developer = DeveloperDocs(doc)

  return (
    <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto pr-4 text-sm lg:block">
      <div className="mb-6">
        <PluginSelect activeSlug={activeSlug} />
      </div>

      <nav className="space-y-8">
        <div>
          <p className="mb-2 px-2 text-xs uppercase tracking-[0.15em] text-neutral-500">
            User Setup
          </p>
          <ul className="space-y-1 border-l border-white/10 pl-4">
            {user.map((section) => (
              <li key={section.id}>
                <SidebarLink
                  to={`/docs/${activeSlug}/${section.id}`}
                  active={section.id === activeSectionId}
                >
                  {section.title}
                </SidebarLink>
              </li>
            ))}
          </ul>
        </div>

        {developer.length > 0 && (
          <div>
            <p className="mb-2 px-2 text-xs uppercase tracking-[0.15em] text-neutral-500">
              Developer Setup
            </p>
            <ul className="space-y-1 border-l border-white/10 pl-4">
              {developer.map((section) => (
                <li key={section.id}>
                  <SidebarLink
                    to={`/docs/${activeSlug}/${section.id}`}
                    active={section.id === activeSectionId}
                  >
                    {section.title}
                  </SidebarLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  )
}

function DocsMobileNav({ activeSlug, activeSectionId }) {
  const doc = docRegistry[activeSlug]
  if (!doc) return null

  return (
    <div className="mb-8 lg:hidden">
      <PluginSelect activeSlug={activeSlug} className="w-full" />

      <div className="mt-4 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 whitespace-nowrap">
          {doc.sections.map((section) => (
            <Link
              key={section.id}
              to={`/docs/${activeSlug}/${section.id}`}
              className={`rounded-full border border-white/10 px-3 py-1.5 text-sm transition-colors duration-200 hover:border-white/25 hover:text-white ${
                section.id === activeSectionId
                  ? 'bg-white/10 text-white'
                  : 'text-neutral-400'
              }`}
            >
              {section.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function OnThisPage({ doc, section }) {
  return (
    <div className="sticky top-24 text-sm">
      <p className="mb-3 text-xs uppercase tracking-[0.15em] text-neutral-500">
        On this page
      </p>
      <ul className="space-y-2">
        <li>
          <a href={`#${section.id}`} className="text-neutral-400 transition-colors duration-200 hover:text-white">
            {section.title}
          </a>
        </li>
      </ul>

      <div className="mt-8">
        <p className="mb-3 text-xs uppercase tracking-[0.15em] text-neutral-500">
          Plugin
        </p>
        <div className="flex items-center gap-2 text-neutral-400">{doc.name}</div>
      </div>
    </div>
  )
}

function DocPage({ slug, section }) {
  const doc = docRegistry[slug]
  const current = doc?.sections.find((item) => item.id === section)

  if (!doc) {
    return <Navigate to="/docs/moparticles/overview" replace />
  }

  if (!current) {
    return <Navigate to={`/docs/${slug}/${firstSectionId(doc)}`} replace />
  }

  const Icon = icons[doc.name] ?? Sparkles
  const index = doc.sections.findIndex((item) => item.id === section)
  const previous = doc.sections[index - 1]
  const next = doc.sections[index + 1]

  return (
    <article className="pb-16 pt-20">
      <div className="mx-auto w-full max-w-[1600px] px-6">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_220px]">
          <DocsSidebar activeSlug={slug} activeSectionId={section} />

          <div className="min-w-0">
            <DocsMobileNav activeSlug={slug} activeSectionId={section} />

            <Reveal>
              <div className="flex flex-wrap items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5 text-neutral-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                    {doc.name} — Docs
                  </p>
                  <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
                    {current.title}
                  </h1>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {doc.versions.map((version) => (
                  <span
                    key={version}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-neutral-300"
                  >
                    {version}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a href={doc.github} target="_blank" rel="noreferrer" className="btn-primary">
                  <ExternalLink className="h-4 w-4" />
                  Open GitHub
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div
                id={current.id}
                className="mt-10 max-w-3xl scroll-mt-24 space-y-4 text-sm leading-relaxed text-neutral-400"
              >
                {current.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <div className="mt-14 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
              {previous ? (
                <Link
                  to={`/docs/${slug}/${previous.id}`}
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {previous.title}
                </Link>
              ) : (
                <span />
              )}

              {next ? (
                <Link
                  to={`/docs/${slug}/${next.id}`}
                  className="inline-flex items-center gap-1.5 text-right text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  {next.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>

          <aside className="hidden xl:block">
            <OnThisPage doc={doc} section={current} />
          </aside>
        </div>
      </div>
    </article>
  )
}

export default function Docs() {
  const { slug, section } = useParams()
  const doc = docRegistry[slug]
  const current = doc?.sections.find((item) => item.id === section)
  useTitle(doc && current ? `${current.title} — ${doc.name} — Docs` : 'Docs')

  if (!slug) {
    return <Navigate to="/docs/moparticles/overview" replace />
  }

  return <DocPage slug={slug} section={section} />
}
