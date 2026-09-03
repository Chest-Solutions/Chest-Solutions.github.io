// The single source of truth for everything downloadable.
//
// Consumed in three places: the /downloads index lists it, each
// /downloads/<id> page renders from it, and `downloads/[plugin].paths.js` turns
// it into the route list VitePress generates. Adding a plugin here is the only
// step — no new page file, no navbar entry.
//
// `versions` is newest first: index 0 is what the page offers as the current
// download, and every entry stays listed under "All versions".

export const plugins = [
  {
    id: 'moparticles',
    name: 'MoParticles',
    tagline: 'Bedrock-style particles for Paper',
    description:
      "A Paper plugin that parses MoLang — Bedrock's particle language — bakes the result into a Java-compatible animation using item displays, and generates a resource pack with the necessary textures.",
    icon: '/brand/moparticles.png',
    github: 'https://github.com/Chest-Solutions/MoParticles',
    docs: '/docs/moparticles/getting-started',
    badges: ['Java 21+', 'Paper 1.21.x', 'Shaded all-in-one jar'],
    versions: [
      {
        version: 'v1.1.0',
        file: 'MoParticles-1.1-all.jar',
        url: 'https://github.com/Chest-Solutions/MoParticles/releases/download/v1.1.0/MoParticles-1.1-all.jar',
        released: '15 Aug 2026',
      },
      {
        version: 'v1.0.0',
        file: 'MoParticles-1.0-all.jar',
        url: 'https://github.com/Chest-Solutions/MoParticles/releases/download/v1.0.0/MoParticles-1.0-all.jar',
        released: '15 Aug 2026',
      },
    ],
  },
]

export function findPlugin(id) {
  return plugins.find((plugin) => plugin.id === id)
}

/** Newest version of a plugin — the one the download button offers. */
export function latest(plugin) {
  return plugin.versions[0]
}

export default plugins
