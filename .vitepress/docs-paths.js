// THE one place that decides what counts as documentation.
//
// Imported by config.mjs (nav link, sidebar key, and the build-time `is-docs`
// stamp) and by the theme (keeping `is-docs` correct across client-side
// navigation). Nothing else should test a path for docs-ness, and no other
// file should hard-code "/docs".

export const DOCS_ROOT = '/docs'

/**
 * Normalise a URL path or a VitePress source page path to a slash-prefixed
 * path with no trailing slash and no `index`:
 *   "/docs/moparticles/"            -> "/docs/moparticles"
 *   "docs/moparticles/index.md"     -> "/docs/moparticles"
 *   "/docs"                         -> "/docs"
 */
function normalize(pathname) {
  let path = String(pathname ?? '/').replace(/\\/g, '/')

  if (!path.startsWith('/')) path = `/${path}` // source path -> URL path
  path = path.replace(/\.md$/, '') // strip the .md extension
  path = path.replace(/\/index$/, '/') // /docs/moparticles/index -> /docs/moparticles/
  path = path.replace(/\/$/, '') // then drop the trailing slash

  return path || '/'
}

/**
 * True for pages under DOCS_ROOT. `/docs` itself is the project index rather
 * than a doc page, so it is deliberately excluded: it needs a segment after
 * the root.
 */
export function isDocsPath(pathname) {
  return normalize(pathname).startsWith(`${DOCS_ROOT}/`)
}
