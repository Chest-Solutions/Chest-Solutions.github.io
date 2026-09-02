import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { GitHubIcon, DiscordIcon } from '../components/icons.jsx'
import { useTitle } from '../hooks/useTitle.js'
import { teamMembers } from '../data/site.js'

function Avatar({ src, name }) {
  const [failed, setFailed] = useState(false)
  const initials = name
    .split(/[\s_]/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (failed) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-neutral-400">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-12 w-12 rounded-xl border border-white/10 object-cover"
    />
  )
}

export default function Team() {
  useTitle('Team')

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-20">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Team</h1>
        <p className="mt-3 text-neutral-400">The people behind Chest Solutions.</p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <Avatar src={member.avatar} name={member.name} />
              <h2 className="mt-5 text-sm font-semibold">{member.name}</h2>
              <p className="mt-1 text-xs text-neutral-500">{member.role}</p>
              <div className="mt-4 flex items-center gap-4 pt-4 text-neutral-400">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on GitHub`}
                  className="transition-colors duration-300 hover:text-white"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
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
          </Reveal>
        ))}
      </div>
    </div>
  )
}
