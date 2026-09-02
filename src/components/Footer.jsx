import { GitHubIcon, DiscordIcon } from './icons.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <img src="/chest.svg" alt="" className="h-5 w-5 opacity-80" />
            <span className="text-sm font-medium text-white">Chest Solutions</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-400">
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
              href="https://discord.gg/MsWqevupwh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
            >
              <DiscordIcon className="h-4 w-4" />
              Discord
            </a>
          </div>
        </div>
        <p className="mt-8 text-xs text-neutral-500">
          © {new Date().getFullYear()} Chest Solutions. Not affiliated with Mojang or Microsoft.
        </p>
      </div>
    </footer>
  )
}
