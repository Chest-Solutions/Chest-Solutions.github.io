import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import PluginSelect from '../components/PluginSelect.jsx'
import PluginTile from '../components/PluginTile.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionSlate from '../components/SectionSlate.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { docRegistry } from '../data/docs.js'

function firstSectionId(doc) {
  return doc.sections[0]?.id
}

/**
 * Thin reading-progress line that pins to the top of the viewport while
 * the doc scrolls. Maps scroll position directly (no easing loop), so
 * it always tells you exactly where you are in the document. Sticky,
 * not fixed: the routed <main> keeps a blur filter on it, which would
 * otherwise become the containing block and break position:fixed.
 */
function ReadingProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="sticky top-0 z-40 h-[2px] origin-left bg-sky-400/80"
    />
  )
}

/** The `/docs` landing page: a track list of every plugin's docs. */
function DocsIndex() {
  const entries = Object.entries(docRegistry)

  return (
    <section className="pb-28 pt-28">
      <ReadingProgress />
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <SectionSlate label="Documentation" />
          <h1 className="mt-8 text-4xl font-semibold tracking-tight md:text-6xl">
            Plugin docs
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400">
            Everything we’ve written about our plugins, organised per
            project. Pick a plugin to read its documentation.
          </p>
        </Reveal>

        <div className="mt-14 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          {entries.map(([slug, doc], i) => (
            <Reveal key={slug} delay={0.05 * i}>
              <Link
                to={`/docs/${slug}/${firstSectionId(doc)}`}
                className="group flex items-center gap-5 px-6 py-6 transition-colors duration-300 hover:bg-white/[0.04] md:px-8"
              >
                <PluginTile name={doc.name} size="h-10 w-10" iconSize="h-4 w-4" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold tracking-tight">
                    {doc.name}
                  </h2>
                  <p className="mt-1 truncate text-xs text-neutral-500 md:text-sm">
                    {doc.tagline}
                  </p>
                </div>
                <span className="hidden shrink-0 text-xs text-neutral-500 sm:block">
                  {doc.stub ? 'Coming soon' : `${doc.sections.length} sections`}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function UserDocs(doc) {
  return doc.sections.filter((section) => section.id !== 'developer')
}

function DeveloperDocs(doc) {
  return doc.sections.filter((section) => section.id === 'developer')
}

function SidebarLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors duration-200 ${
        active ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'
      }`}
    >
      {active && <span className="h-1 w-1 shrink-0 rounded-full bg-sky-400" />}
      <span className="truncate">{children}</span>
    </Link>
  )
}

function DocsSidebar({ activeSlug, activeSectionId }) {
  const doc = docRegistry[activeSlug]
  if (!doc) return null

  const user = UserDocs(doc)
  const developer = DeveloperDocs(doc)

  return (
    <aside className="hidden lg:block">
      {/* Glass rail: the plugin picker and the section nav float in one
          frosted panel beside the article. */}
      <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm">
        <PluginSelect activeSlug={activeSlug} className="w-full" />

        <nav className="mt-6 space-y-8">
          <div>
            <p className="mb-2 px-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
              User setup
            </p>
            <ul className="space-y-1">
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
              <p className="mb-2 px-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                Developer setup
              </p>
              <ul className="space-y-1">
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
      </div>
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
              className={`rounded-full border border-white/10 px-3.5 py-1.5 text-xs transition-colors duration-200 hover:border-white/25 hover:text-white ${
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
    <div className="sticky top-28 text-sm">
      <p className="eyebrow">On this page</p>
      <ul className="mt-4 space-y-2">
        <li>
          <a
            href={`#${section.id}`}
            className="flex items-center gap-2 text-neutral-400 transition-colors duration-200 hover:text-white"
          >
            <span className="h-1 w-1 rounded-full bg-sky-400" />
            {section.title}
          </a>
        </li>
      </ul>

      <div className="mt-10">
        <p className="eyebrow">Plugin</p>
        <div className="mt-4 flex items-center gap-3 text-neutral-400">
          <PluginTile name={doc.name} size="h-8 w-8" iconSize="h-3.5 w-3.5" />
          <span className="text-sm">{doc.name}</span>
        </div>
      </div>

      <div className="mt-10">
        <p className="eyebrow">Versions</p>
        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          {doc.versions.join(' ‧ ')}
        </p>
      </div>
    </div>
  )
}

function DocPage({ slug, section }) {
  const doc = docRegistry[slug]
  const current = doc?.sections.find((item) => item.id === section)

  if (!doc) {
    return <Navigate to="/docs" replace />
  }

  if (!current) {
    return <Navigate to={`/docs/${slug}/${firstSectionId(doc)}`} replace />
  }

  const index = doc.sections.findIndex((item) => item.id === section)
  const previous = doc.sections[index - 1]
  const next = doc.sections[index + 1]

  return (
    <article className="pb-20 pt-28">
      <ReadingProgress />
      <div className="mx-auto w-full max-w-[1600px] px-6">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_220px]">
          <DocsSidebar activeSlug={slug} activeSectionId={section} />

          <div className="min-w-0">
            <DocsMobileNav activeSlug={slug} activeSectionId={section} />

            <Reveal>
              <p className="eyebrow">
                Docs ‧ {doc.name} ‧ {String(index + 1).padStart(2, '0')}/
                {String(doc.sections.length).padStart(2, '0')}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <PluginTile name={doc.name} />
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {current.title}
                </h1>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {doc.versions.map((version) => (
                  <span
                    key={version}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-neutral-300"
                  >
                    {version}
                  </span>
                ))}
                {doc.stub && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-neutral-500">
                    Docs coming soon
                  </span>
                )}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={doc.github} target="_blank" rel="noreferrer" className="btn-primary">
                  <ExternalLink className="h-4 w-4" />
                  Open GitHub
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div
                id={current.id}
                className="mt-12 max-w-3xl scroll-mt-24 space-y-4 text-sm leading-relaxed text-neutral-400"
              >
                {current.body.map((block, i) =>
                  typeof block === 'string' ? (
                    <p key={i}>{block}</p>
                  ) : (
                    <pre
                      key={i}
                      className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs leading-relaxed text-neutral-300"
                    >
                      <code>{block.code}</code>
                    </pre>
                  ),
                )}
              </div>
            </Reveal>

            {/* Prev / next as two glass cards rather than bare links. */}
            <div className="mt-16 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2">
              {previous ? (
                <Link
                  to={`/docs/${slug}/${previous.id}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06]"
                >
                  <p className="eyebrow">Previous</p>
                  <p className="mt-3 flex items-center gap-2 text-sm font-medium text-neutral-300 transition-colors duration-300 group-hover:text-white">
                    <ArrowLeft className="h-4 w-4 shrink-0" />
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}

              {next ? (
                <Link
                  to={`/docs/${slug}/${next.id}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-right transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06]"
                >
                  <p className="eyebrow">Next</p>
                  <p className="mt-3 flex items-center justify-end gap-2 text-sm font-medium text-neutral-300 transition-colors duration-300 group-hover:text-white">
                    {next.title}
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </p>
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
  useTitle(doc && current ? `${current.title} - ${doc.name} - Docs` : 'Docs')

  // No slug selected - show the plugin listing.
  if (!slug) {
    return <DocsIndex />
  }

  return <DocPage slug={slug} section={section} />
}
