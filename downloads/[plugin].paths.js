import { plugins } from '../.vitepress/data/plugins.js'

// VitePress expands `downloads/[plugin].md` into one page per entry returned
// here, so a new plugin in the data file gets its page automatically.
// (VitePress looks for this file as [plugin].paths.js / .ts / .mjs / .mts.)
export default {
  paths: () => plugins.map((plugin) => ({ params: { plugin: plugin.id } })),
}
