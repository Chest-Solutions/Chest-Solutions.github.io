import { Link } from 'react-router-dom'
import { GitHubIcon, DiscordIcon, ModrinthIcon } from './icons.jsx'
import Logo from './Logo.jsx'
import { products } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Informative columns: what we make, where to read, where to talk.
            Small text only - no decorative objects. */}
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-5 w-5 opacity-80" />
              <span className="text-sm font-medium text-white">Dark</span>
            </div>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-neutral-500">
              Free, open-source Minecraft software. Read it, patch it,
              run it on your network.
            </p>
          </div>

          <div>
            <p className="eyebrow">Software</p>
            <ul className="mt-5 space-y-2.5">
              {products.map((product) => (
                <li key={product.name}>
                  <Link
                    to="/downloads"
                    className="text-xs text-neutral-400 transition-colors duration-300 hover:text-white"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Resources</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link
                  to="/downloads"
                  className="text-xs text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  Downloads
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="text-xs text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-xs text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  Team
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Chest-Solutions/Chest-Solutions.github.io/blob/in-dev/CONTRIBUTE.md"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  Contributing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Community</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href="https://github.com/Chest-Solutions"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://modrinth.com/organization/Chest-Solutions"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-neutral-400 transition-colors duration-300 hover:text-[#1bd96a]"
                >
                  <ModrinthIcon className="h-3.5 w-3.5" />
                  Modrinth
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/MsWqevupwh"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-neutral-400 transition-colors duration-300 hover:text-[#5865F2]"
                >
                  <DiscordIcon className="h-3.5 w-3.5" />
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-8 text-[11px] text-neutral-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Dark - MIT licensed.</p>
          <p className="uppercase tracking-[0.22em]">
            Open source ‧ Paper ‧ Folia
          </p>
          <p>Not affiliated with Mojang or Microsoft.</p>
        </div>
      </div>
    </footer>
  )
}
