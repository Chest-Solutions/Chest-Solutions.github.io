import { GitHubIcon, DiscordIcon, ModrinthIcon } from './icons.jsx'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <Logo className="h-5 w-5 opacity-80" />
            <span className="text-sm font-medium text-white">Dark</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400">
            <a
              href="https://github.com/Chest-Solutions"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://modrinth.com/organization/Chest-Solutions"
              target="_blank"
              rel="noreferrer"
              className="social-modrinth inline-flex items-center gap-2"
            >
              <ModrinthIcon className="h-4 w-4" />
              Modrinth
            </a>
            <a
              href="https://discord.gg/MsWqevupwh"
              target="_blank"
              rel="noreferrer"
              className="social-discord inline-flex items-center gap-2"
            >
              <DiscordIcon className="h-4 w-4" />
              Discord
            </a>
          </div>
        </div>
        {/* Informative micro-strip - the small caps "ticker" line. */}
        <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
          Open source ‧ MIT licensed ‧ Built for Paper &amp; Folia
        </p>
        <p className="mt-3 text-xs text-neutral-500">
          © {new Date().getFullYear()} Dark. Not affiliated with Mojang or Microsoft.
        </p>
      </div>
    </footer>
  )
}
