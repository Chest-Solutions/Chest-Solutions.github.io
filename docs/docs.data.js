import { createContentLoader } from 'vitepress'

// The /docs hub is a project index, not a page index: one card per project,
// not one per page. It reads each project's index.md and its `tagline`, so a
// new project only needs an index.md under docs/ to appear here — no list to
// maintain by hand.
export default createContentLoader('/docs/*/index.md', {
  render: false,
  transform(pages) {
    return pages
      .map(({ url, frontmatter }) => ({
        url,
        title: frontmatter.title,
        tagline: frontmatter.tagline,
      }))
      .sort((a, b) => String(a.title).localeCompare(String(b.title)))
  },
})
