import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { GitHubIcon, DiscordIcon } from '../components/icons.jsx'
import { useTitle } from '../hooks/useTitle.js'
import {
  teamMembers,
  teamGithubLogins,
  contributorsFallback,
} from '../data/site.js'

const GITHUB_API = 'https://api.github.com'

function initialsOf(name) {
  return name
    .split(/[\s_]/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Avatar({ src, name, className = 'h-12 w-12' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex ${className} items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-neutral-400`}
      >
        {initialsOf(name)}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} rounded-xl border border-white/10 object-cover`}
    />
  )
}

/**
 * Resolves a member's *current* Discord avatar from their user ID - the
 * same public lookup that powers tools like vibebot.gg's avatar
 * downloader / ID lookup. Falls back to the stored avatar URL if the
 * lookup fails for any reason (offline, CORS, rate limit).
 */
function useDiscordAvatar(discordId, fallback) {
  const [src, setSrc] = useState(fallback)

  useEffect(() => {
    if (!discordId) return
    let cancelled = false

    fetch(`https://japi.rest/discord/v1/user/${discordId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('lookup failed'))))
      .then((json) => {
        const url = json?.data?.avatarURL
        if (!cancelled && url) setSrc(`${url}?size=256`)
      })
      .catch(() => {
        /* keep the fallback avatar */
      })

    return () => {
      cancelled = true
    }
  }, [discordId])

  return src
}

function TeamCard({ member }) {
  const avatar = useDiscordAvatar(member.discordId, member.avatar)

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <Avatar src={avatar} name={member.name} />
      <h2 className="mt-5 text-sm font-semibold">{member.name}</h2>
      <p className="mt-1 text-xs text-neutral-500">{member.role}</p>
      <div className="mt-4 flex items-center gap-4 pt-4 text-neutral-400">
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on GitHub`}
            className="transition-colors duration-300 hover:text-white"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
        )}
        {member.discord && (
          <span
            title={member.discord}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500"
          >
            <DiscordIcon className="h-4 w-4 text-neutral-400" />
            {member.discord}
          </span>
        )}
      </div>
    </div>
  )
}

/**
 * Live contributor list from the GitHub API: aggregates contributors
 * across every repo owned by the org (forks excluded, so upstream
 * authors don't sneak in), drops bots and team members, and sorts by
 * total contributions. Falls back to a small curated list whenever the
 * API can't be reached.
 */
function useContributors() {
  const [list, setList] = useState(contributorsFallback)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const reposRes = await fetch(`${GITHUB_API}/orgs/Chest-Solutions/repos?per_page=100`)
        if (!reposRes.ok) throw new Error('repo list failed')
        const repos = await reposRes.json()

        const contributorLists = await Promise.all(
          repos
            .filter((repo) => !repo.fork)
            .map(async (repo) => {
              try {
                const res = await fetch(`${GITHUB_API}/repos/${repo.full_name}/contributors?per_page=100`)
                return res.ok ? await res.json() : []
              } catch {
                return []
              }
            }),
        )

        const merged = new Map()
        for (const contributors of contributorLists) {
          if (!Array.isArray(contributors)) continue
          for (const entry of contributors) {
            if (!entry?.login || /\[bot\]$/i.test(entry.login)) continue
            if (teamGithubLogins.includes(entry.login.toLowerCase())) continue
            const key = entry.login.toLowerCase()
            const current = merged.get(key) ?? {
              login: entry.login,
              avatar: entry.avatar_url,
              profile: entry.html_url,
              contributions: 0,
            }
            current.contributions += entry.contributions ?? 0
            merged.set(key, current)
          }
        }

        const sorted = [...merged.values()]
          .sort((a, b) => b.contributions - a.contributions)
          .slice(0, 8)

        if (!cancelled && sorted.length > 0) setList(sorted)
      } catch {
        /* keep the fallback list */
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return list
}

function ContributorCard({ contributor, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={contributor.profile}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
      >
        <Avatar src={contributor.avatar} name={contributor.login} />
        <h2 className="mt-5 text-sm font-semibold">{contributor.login}</h2>
        <p className="mt-1 text-xs text-neutral-500">
          {contributor.contributions != null
            ? `${contributor.contributions} contribution${contributor.contributions === 1 ? '' : 's'}`
            : 'Contributor'}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 pt-4 text-xs text-neutral-500 transition-colors duration-300 group-hover:text-white">
          GitHub
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </a>
    </Reveal>
  )
}

export default function Team() {
  useTitle('Team')
  const contributors = useContributors()

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-20">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Team</h1>
        <p className="mt-3 text-neutral-400">The people behind Chest Solutions.</p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.08} className="h-full">
            <TeamCard member={member} />
          </Reveal>
        ))}
      </div>

      <section className="mt-20 border-t border-white/10 pt-12">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Contributors
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
            Everyone who has committed to a Chest Solutions repo, pulled
            live from GitHub.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contributors.map((contributor, i) => (
            <ContributorCard
              key={contributor.login}
              contributor={contributor}
              delay={i * 0.06}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
