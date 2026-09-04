import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PluginSelect from '../components/PluginSelect.jsx'
import PluginTile from '../components/PluginTile.jsx'
import Reveal from '../components/Reveal.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { docRegistry } from '../data/docs.js'

function firstSectionId(doc) {
  return doc.sections[0]?.id
}

/** The `/docs` landing page: a list of every plugin's docs. Clicking a
 * card opens that plugin's first doc section. */
function DocsIndex() {
  const entries = Object.entries(docRegistry)

  return (
    <section className="pb-24 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-10">
        <Reveal>
          <h1 className="tracking-tighter text-5xl font-semibold md:text-7xl">
            Read <span className="display-accent text-neutral-400">the docs.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-400">
            Everything we’ve written about our plugins, organised per
            project. Pick one to start reading.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col">
          {entries.map(([slug, doc], i) => {
            return (
              <Reveal key={slug} delay={0.06 * i}>
                <Link
                  to={`/docs/${slug}/${firstSectionId(doc)}`}
                  className="group grid items-center gap-x-6 gap-y-3 border-t border-white/10 py-8 md:grid-cols-12 md:py-10"
                >
                  <div className="md:col-span-4">
                    <h2 className="tracking-tighter text-3xl font-semibold transition-colors duration-300 group-hover:text-accent md:text-4xl">
                      {doc.name}
                    </h2>
                  </div>

                  <p className="max-w-md text-sm leading-relaxed text-neutral-400 md:col-span-5">
                    {doc.tagline}
                  </p>

                  <p className="eyebrow md:col-span-2">
                    {doc.stub ? 'Coming soon' : 'Docs available'}
                  </p>

                  <span className="hidden justify-self-end text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white md:col-span-1 md:block">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
          <div className="border-t border-white/10" />
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
    return <Navigate to="/docs" replace />
  }

  if (!current) {
    return <Navigate to={`/docs/${slug}/${firstSectionId(doc)}`} replace />
  }

  const index = doc.sections.findIndex((item) => item.id === section)
  const previous = doc.sections[index - 1]
  const next = doc.sections[index + 1]

  return (
    <article className="pb-16 pt-28">
      <div className="mx-auto w-full max-w-[1600px] px-6">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_220px]">
          <DocsSidebar activeSlug={slug} activeSectionId={section} />

          <div className="min-w-0">
            <DocsMobileNav activeSlug={slug} activeSectionId={section} />

            <Reveal>
              <div className="flex flex-wrap items-start gap-3">
                <PluginTile name={doc.name} />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                    {doc.name} - Docs
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
                {doc.stub && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-neutral-500">
                    Docs coming soon
                  </span>
                )}
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
                {current.body.map((block, i) =>
                  typeof block === 'string' ? (
                    <p key={i}>{block}</p>
                  ) : (
                    <pre
                      key={i}
                      className="overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4 text-xs leading-relaxed text-neutral-300"
                    >
                      <code>{block.code}</code>
                    </pre>
                  ),
                )}
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
  useTitle(doc && current ? `${current.title} - ${doc.name} - Docs` : 'Docs')

  // No slug selected - show the plugin listing.
  if (!slug) {
    return <DocsIndex />
  }

  return <DocPage slug={slug} section={section} />
}
