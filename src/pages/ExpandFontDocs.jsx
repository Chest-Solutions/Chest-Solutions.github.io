import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Accordion from '../components/Accordion.jsx'
import { useTitle } from '../hooks/useTitle.js'

const sections = [
  { id: 'getting-started', label: 'Getting started' },
  { id: 'installation', label: 'Installation' },
  { id: 'how-to-use', label: 'How to use' },
  { id: 'faq', label: 'FAQ' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'advanced', label: 'Advanced features' },
]

const faq = [
  {
    q: 'What is ExpandFont?',
    a: 'ExpandFont is a PlaceholderAPI expansion developed by Chest Solutions. It lets you use custom resource pack fonts inside placeholders, so text can render in styles like small caps or bold.',
  },
  {
    q: 'Is ExpandFont stable for use?',
    a: 'ExpandFont is still under development and may not be stable. Use it with caution.',
  },
  {
    q: 'Are there plans for future features?',
    a: 'Yes — built-in styles like small caps and bold are planned for future updates.',
  },
]

const troubleshooting = [
  {
    q: 'Why are my placeholders not displaying correctly?',
    a: 'Make sure the resource pack with the font is loaded on the client, the placeholder syntax is correct, PlaceholderAPI is working, and ExpandFont loaded without errors on startup.',
  },
  {
    q: 'Why do my placeholders show as plain text?',
    a: 'The resource pack is usually not enabled or downloaded, or the font file is missing the style referenced by the placeholder. Check the font.json for the required styles and characters.',
  },
  {
    q: 'The plugin isn\'t working after installation.',
    a: 'Check server logs for startup errors, confirm you are using a compatible PlaceholderAPI version, and run /papi list to verify ExpandFont is active. If it isn\'t listed, ask for help in our Discord server.',
  },
  {
    q: 'Changes to my resource pack aren\'t showing in-game.',
    a: 'Clear the client-side resource pack cache, reapply the pack, and restart the client. Confirm the edits went to the pack currently in use.',
  },
  {
    q: 'My custom fonts don\'t appear in the game.',
    a: 'Verify the font file is formatted per Minecraft\'s specifications and that every character used in your placeholders is defined in the font file.',
  },
]

function Code({ children }) {
  return (
    <pre className="my-3 overflow-x-auto rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 font-mono text-[13px] leading-relaxed text-neutral-300">
      {children}
    </pre>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

export default function ExpandFontDocs() {
  useTitle('ExpandFont docs')

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-20">
      <Link
        to="/docs"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Docs
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_200px]">
        <article className="max-w-2xl">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">ExpandFont</h1>
            <p className="mt-3 text-neutral-400">
              A PlaceholderAPI expansion that renders custom resource pack fonts inside placeholders.
            </p>
          </Reveal>

          <div className="mt-14 space-y-14">
            <Reveal>
              <Section id="getting-started" title="Getting started">
                <p className="text-sm leading-relaxed text-neutral-400">
                  ExpandFont is a server-side plugin for Minecraft. It uses PlaceholderAPI to render
                  custom resource pack fonts inside your placeholders.
                </p>
                <p className="text-sm leading-relaxed text-neutral-400">
                  For detailed information and updates, visit the{' '}
                  <a
                    href="https://github.com/Chest-Solutions/Expandfont"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    GitHub repository
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  .
                </p>
              </Section>
            </Reveal>

            <Reveal>
              <Section id="installation" title="Installation">
                <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-neutral-400">
                  <li>Open your server panel (Pterodactyl, Pelican, etc.).</li>
                  <li>
                      Download the latest expandfont.jar from the{' '}
                    <a
                      href="https://github.com/Chest-Solutions/Expandfont/tree/main/expandfont/out/artifacts/expandfont_jar"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                    >
                      artifacts
                    </a>
                    .
                  </li>
                  <li>Place the jar in your plugins folder.</li>
                  <li>Start your server — you're all set.</li>
                </ol>
              </Section>
            </Reveal>

            <Reveal>
              <Section id="how-to-use" title="How to use">
                <div className="space-y-5 text-sm leading-relaxed text-neutral-400">
                  <div>
                    <h3 className="font-medium text-white">Create placeholders</h3>
                    <p className="mt-2">
                      Use custom fonts from your resource pack in any placeholder, for example:
                    </p>
                    <Code>{'Placeholder:  %expandfont_customfont:example_text%\nOutput:       𝐄𝐱𝐚𝐦𝐩𝐥𝐞 𝐓𝐞𝐱𝐭'}</Code>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Preview a placeholder</h3>
                    <p className="mt-2">See how a placeholder renders in-game:</p>
                    <Code>/expandfont [FONT] [PLACEHOLDER]</Code>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Include the font in your resource pack</h3>
                    <p className="mt-2">
                      Placeholders need the matching font files in the resource pack. Without them,
                      text won't render correctly.
                    </p>
                  </div>
                </div>
              </Section>
            </Reveal>

            <Reveal>
              <Section id="faq" title="FAQ">
                <Accordion items={faq} />
              </Section>
            </Reveal>

            <Reveal>
              <Section id="troubleshooting" title="Troubleshooting">
                <Accordion items={troubleshooting} />
              </Section>
            </Reveal>

            <Reveal>
              <Section id="advanced" title="Advanced features">
                <div className="space-y-5 text-sm leading-relaxed text-neutral-400">
                  <div>
                    <h3 className="font-medium text-white">Custom placeholder integration</h3>
                    <p className="mt-2">
                      Combine font styles with dynamic values like player counts or ranks — for
                      example, <code className="font-mono text-neutral-300">%expandfont_MyFont:small_caps_online%</code> renders the
                      online player count in the style defined by your font file.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Multiple styles in one placeholder</h3>
                    <p className="mt-2">
                      Chain placeholders to mix styles in a single line —{' '}
                      <code className="font-mono text-neutral-300">%expandfont_MyFont:small_caps_hello%</code>{' '}
                      and{' '}
                      <code className="font-mono text-neutral-300">%expandfont_MyFont:bold_world%</code>{' '}
                      render "hello" in small caps and "world" in bold.
                    </p>
                  </div>
                </div>
              </Section>
            </Reveal>
          </div>
        </article>

        {/* In-page navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">On this page</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  )
}
