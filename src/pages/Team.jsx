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

function Avatar({ src, name, className = 'h-14 w-14' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex ${className} items-center justify-center border border-white/10 bg-white/5 text-sm font-medium text-neutral-400`}
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
      className={`${className} border border-white/10 object-cover grayscale transition-all duration-500 group-hover:grayscale-0`}
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

/**
 * A team member as an editorial index row: number, portrait, name in
 * display type, role, then contact links pushed to the right edge.
 */
function TeamRow({ member }) {
  const avatar = useDiscordAvatar(member.discordId, member.avatar)

  return (
    <div className="group grid items-center gap-x-6 gap-y-4 border-t border-white/10 py-6 md:grid-cols-12 md:py-8">
      <div className="flex items-center gap-5 md:col-span-7">
        <Avatar src={avatar} name={member.name} />
        <h2 className="tracking-tighter text-2xl font-semibold md:text-3xl">
          {member.name}
        </h2>
      </div>

      <p className="eyebrow md:col-span-2">{member.role}</p>

      <div className="flex items-center gap-5 text-neutral-400 md:col-span-3 md:justify-self-end">
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

function ContributorRow({ contributor, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <a
        href={contributor.profile}
        target="_blank"
        rel="noreferrer"
        className="group grid items-center gap-x-6 gap-y-3 border-t border-white/10 py-5 md:grid-cols-12"
      >
        <div className="flex items-center gap-4 md:col-span-7">
          <Avatar src={contributor.avatar} name={contributor.login} className="h-10 w-10" />
          <h2 className="text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
            {contributor.login}
          </h2>
        </div>

        <p className="eyebrow md:col-span-3">
          {contributor.contributions != null
            ? `${contributor.contributions} contribution${contributor.contributions === 1 ? '' : 's'}`
            : 'Contributor'}
        </p>

        <span className="hidden text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white md:col-span-2 md:block md:justify-self-end">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>
    </Reveal>
  )
}

export default function Team() {
  useTitle('Team')
  const contributors = useContributors()

  return (
    <div className="mx-auto w-full max-w-[90rem] px-6 pb-24 pt-32 md:px-10 md:pt-40">
      <Reveal>
        <h1 className="tracking-tighter text-5xl font-semibold md:text-7xl">
          The people <span className="display-accent text-neutral-400">behind Nocturne.</span>
        </h1>
      </Reveal>

      <div className="mt-16 flex flex-col">
        {teamMembers.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.08}>
            <TeamRow member={member} />
          </Reveal>
        ))}
        <div className="border-t border-white/10" />
      </div>

      <section className="mt-24 md:mt-32">
        <Reveal>
          <h2 className="tracking-tighter text-3xl font-semibold md:text-4xl">
            Contributors, <span className="display-accent text-neutral-400">pulled live from GitHub.</span>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col">
          {contributors.map((contributor, i) => (
            <ContributorRow
              key={contributor.login}
              contributor={contributor}
              delay={i * 0.06}
            />
          ))}
          <div className="border-t border-white/10" />
        </div>
      </section>
    </div>
  )
}
