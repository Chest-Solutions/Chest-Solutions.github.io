import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import SectionSlate from '../components/SectionSlate.jsx'
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
        className={`flex ${className} items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-medium text-neutral-400`}
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
      className={`${className} rounded-2xl border border-white/10 object-cover`}
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
    <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
      <Avatar
        src={avatar}
        name={member.name}
        className="h-16 w-16 grayscale transition-all duration-500 group-hover:grayscale-0"
      />
      <h2 className="mt-6 text-base font-semibold tracking-tight">
        {member.name}
      </h2>
      <p className="mt-1 text-xs text-neutral-500">{member.role}</p>
      <div className="mt-5 flex flex-wrap items-center gap-4 pt-5 text-neutral-400">
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs transition-colors duration-300 hover:text-white"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
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

function TeamSection({ label, members, columns }) {
  return (
    <div className="mt-16 first:mt-0">
      <Reveal>
        <SectionSlate label={label} />
      </Reveal>
      <div className={`mt-10 grid gap-4 ${columns}`}>
        {members.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.08} className="h-full">
            <TeamCard member={member} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default function Team() {
  useTitle('Team')
  const contributors = useContributors()

  const founders = teamMembers.filter((member) => member.role === 'Founder')
  const staff = teamMembers.filter((member) => member.role !== 'Founder')

  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-28">
      <Reveal>
        <SectionSlate label="People" />
        <h1 className="mt-8 text-4xl font-semibold tracking-tight md:text-6xl">
          Team
        </h1>
        <p className="mt-4 text-neutral-400">The people behind Dark.</p>
      </Reveal>

      <div className="mt-16">
        <TeamSection label="Founders" members={founders} columns="sm:grid-cols-2" />
        <TeamSection label="Staff" members={staff} columns="sm:grid-cols-2 lg:grid-cols-3" />
      </div>

      {/* Contributors - a single glass panel: the avatar stack on the
          left, the live count and context on the right. */}
      <section className="mt-24">
        <Reveal>
          <SectionSlate label="Contributors" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              <div className="flex -space-x-3">
                {contributors.map((contributor) => (
                  <a
                    key={contributor.login}
                    href={contributor.profile}
                    target="_blank"
                    rel="noreferrer"
                    title={
                      contributor.contributions != null
                        ? `${contributor.login} - ${contributor.contributions} contributions`
                        : contributor.login
                    }
                    className="rounded-full ring-2 ring-[#0a0a0c] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={contributor.avatar}
                      alt={contributor.login}
                      loading="lazy"
                      className="h-12 w-12 rounded-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                    />
                  </a>
                ))}
              </div>
              <div className="max-w-sm">
                <p className="eyebrow">
                  {contributors.length} contributors - live from GitHub
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                  Everyone who has committed to a Dark repo, aggregated
                  across the organization.
                </p>
                <a
                  href="https://github.com/Chest-Solutions"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                >
                  View on GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
