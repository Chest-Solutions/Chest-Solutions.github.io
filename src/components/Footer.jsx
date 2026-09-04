import { GitHubIcon, DiscordIcon, ModrinthIcon } from './icons.jsx'

/**
 * Colophon-style footer: an oversized wordmark like a film's end card,
 * then one hairline row of links and legal small print.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-16 md:px-10">
        <p className="tracking-tighter select-none text-[16vw] font-semibold leading-none text-white/[0.06] sm:text-8xl md:text-9xl">
          Nocturne
        </p>

        <div className="mt-10 flex flex-col justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <a
              href="https://github.com/Chest-Solutions"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://modrinth.com/organization/Chest-Solutions"
              target="_blank"
              rel="noreferrer"
              className="social-modrinth inline-flex items-center gap-2 text-sm"
            >
              <ModrinthIcon className="h-4 w-4" />
              Modrinth
            </a>
            <a
              href="https://discord.gg/MsWqevupwh"
              target="_blank"
              rel="noreferrer"
              className="social-discord inline-flex items-center gap-2 text-sm"
            >
              <DiscordIcon className="h-4 w-4" />
              Discord
            </a>
          </div>
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Nocturne · Not affiliated with Mojang or Microsoft
          </p>
        </div>
      </div>
    </footer>
  )
}
