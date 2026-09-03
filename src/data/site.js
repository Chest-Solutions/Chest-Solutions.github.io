export const products = [
  {
    name: 'MoParticles',
    description:
      'Plays Bedrock MoLang particle animations on Java servers - baked into item displays, with the resource pack generated for you.',
    href: 'https://github.com/Chest-Solutions/MoParticles',
    status: null,
    image: '/img/moparticles.webp',
  },
  {
    name: 'DoorCards',
    description: 'Door-based menus and interactions for Paper servers.',
    href: 'https://github.com/Chest-Solutions',
    status: null,
    image: '/img/doorcards.webp',
  },
  {
    name: 'FoliaShops',
    description: 'Player shops for Folia and Paper servers.',
    href: 'https://github.com/Chest-Solutions',
    status: null,
    image: '/img/foliashops.webp',
  },
  {
    name: 'FoliaGUI',
    description: 'A lightweight GUI framework for Folia and Paper plugins.',
    href: 'https://github.com/Chest-Solutions',
    status: null,
    image: '/img/foliagui.webp',
  },
]

// Team members. `discordId` lets the site resolve the member's *current*
// Discord avatar at runtime (same public user lookup the vibebot.gg tools
// use); `avatar` is the fallback shown if that lookup fails.
export const teamMembers = [
  {
    name: 'RedSnicker',
    role: 'Founder',
    github: 'https://github.com/redsnicker',
    discord: 'redsnicker',
    discordId: '1043959796778405950',
    avatar:
      'https://cdn.discordapp.com/avatars/1043959796778405950/fd60331f22f1835fa779ba4dd6321f8e.png?size=256',
  },
  {
    name: 'anmvc',
    role: 'Founder',
    github: 'https://github.com/anmvc',
    discord: 'anmvc',
    discordId: '926199368518864966',
    avatar:
      'https://cdn.discordapp.com/avatars/926199368518864966/de989e4d21de854a95968be1a90a45f9.png?size=256',
  },
  {
    name: 'Lammy12k',
    role: 'Staff',
    github: 'https://github.com/KyfStore11k',
    discord: 'lammy12k',
    discordId: '1334287928473551008',
    avatar:
      'https://cdn.discordapp.com/avatars/1334287928473551008/c023c47554cf80443e6fc28895080d83.png?size=256',
  },
  {
    name: 'rytedd',
    role: 'Staff',
    github: 'https://github.com/Rytedd',
    discord: 'rytedd',
    discordId: '1259867754580676708',
    avatar:
      'https://cdn.discordapp.com/avatars/1259867754580676708/f7c0bf3691909208b83b17899e191187.png?size=256',
  },
  {
    name: 'brain._.storm',
    role: 'Staff',
    github: null,
    discord: 'brain._.storm',
    // No numeric Discord ID yet, so the live avatar lookup is skipped and
    // the default avatar below is shown until an ID is added.
    discordId: null,
    avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
  },
]

// GitHub logins that belong to team members (including alts), excluded
// from the dynamically fetched contributor list.
export const teamGithubLogins = [
  'redsnicker',
  'anmvc',
  'kystore11k',
  'lammy12k',
  'rytedd',
]

// Shown while the live contributor list loads, and whenever the GitHub
// API is unreachable or rate-limited.
export const contributorsFallback = [
  {
    login: 'maiminhdung',
    avatar: 'https://github.com/maiminhdung.png?size=256',
    profile: 'https://github.com/maiminhdung',
  },
  {
    login: 'Economic1024',
    avatar: 'https://github.com/Economic1024.png?size=256',
    profile: 'https://github.com/Economic1024',
  },
]
