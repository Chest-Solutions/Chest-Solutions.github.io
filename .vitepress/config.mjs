import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

const IMAGE_RE = /\.(png|jpe?g|gif|tiff|webp|avif|svg)$/i

// vite-plugin-image-optimizer keys its cache by file *path*, not by content:
// replace a screenshot and the stale compressed copy keeps being reused. Fold a
// hash of the source images into the cache directory, so editing an image gets
// a fresh directory and is recompressed instead of serving the stale copy.
function hashImages(dir) {
  const hash = createHash('sha256')
  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (IMAGE_RE.test(entry.name)) {
        hash.update(relative(dir, full))
        hash.update(readFileSync(full))
      }
    }
  }
  if (existsSync(dir)) walk(dir)
  return hash.digest('hex').slice(0, 12)
}

// Throwaway locally, cacheable on CI.
const imageCacheDir = `node_modules/.cache/vite-plugin-image-optimizer/${hashImages('public')}`

export default defineConfig({
  title: 'Chest Solutions',
  description:
    'Chest Solutions is a community-driven, open-source group making free software for Minecraft servers. Our first project, MoParticles, brings Bedrock-style MoLang particle effects to Paper.',
  lang: 'en-US',
  base: '/',
  outDir: 'dist',
  cleanUrls: true,
  lastUpdated: true,
  // Repository docs that are not part of the website
  srcExclude: ['COC.md', 'CONTRIBUTE.md', 'README.md'],
  head: [
    // The favicon is the brand mark itself: the nav logo and hero mark already
    // pull /brand/logo.svg, so pointing the icon at the same URL means the
    // browser reuses that cached response instead of fetching a second file.
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/brand/logo.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'true' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap',
      },
    ],
    ['meta', { property: 'og:title', content: 'Chest Solutions' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Chest Solutions — free, open-source software for Minecraft servers, built in the open by the community.',
      },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Chest Solutions' }],
    ['meta', { property: 'og:url', content: 'https://chest-solutions.github.io/' }],
    // Brand icon (not a per-project image) — absolute URL so scrapers that
    // don't resolve relative paths still pick it up.
    [
      'meta',
      { property: 'og:image', content: 'https://chest-solutions.github.io/brand/logo.png' },
    ],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:width', content: '512' }],
    ['meta', { property: 'og:image:height', content: '512' }],
    [
      'meta',
      { property: 'og:image:alt', content: 'The Chest Solutions chest icon' },
    ],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'Chest Solutions' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Chest Solutions — free, open-source software for Minecraft servers, built in the open by the community.',
      },
    ],
    [
      'meta',
      { name: 'twitter:image', content: 'https://chest-solutions.github.io/brand/logo.png' },
    ],
    ['meta', { name: 'theme-color', content: '#4aa8f0' }],
    [
      'script',
      '',
      // Default to dark; the user's saved choice (theme toggle) still wins.
      "(function(){try{if(localStorage.getItem('vitepress-theme-appearance')==='light')return;}catch(e){}document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';})();",
    ],
  ],
  vite: {
    plugins: [
      tailwindcss(),
      // Compress every image that ends up in the build: imported assets plus
      // everything in `public/` (brand art, showcase screenshots). `sharp` and
      // `svgo` are separate peer installs, both pinned in devDependencies.
      ViteImageOptimizer({
        // Every image on the site lives in public/ and is copied verbatim by
        // Vite — without this the brand + showcase PNGs ship untouched.
        includePublic: true,
        logStats: true,
        // Screenshots are photography-like: a light lossy pass is ~10x smaller
        // than lossless PNG and visually identical at display size.
        png: { quality: 82, compressionLevel: 9, effort: 6 },
        jpeg: { quality: 82, mozjpeg: true },
        jpg: { quality: 82, mozjpeg: true },
        webp: { quality: 82 },
        avif: { quality: 60 },
        gif: {},
        // Keep ids: the mark's gradients are referenced with url(#...), and
        // minifying them breaks the reference. (`cleanupIds` is the SVGO v4
        // spelling — svgo 3 called it `cleanupIDs`.)
        svg: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  cleanupIds: { minify: false, remove: false },
                  convertPathData: false,
                },
              },
            },
            'sortAttrs',
          ],
        },
        // Re-compressing ~5 MB of PNGs on every build is wasteful. The cache is
        // content-hashed above, so it can never hand back a stale image.
        cache: true,
        cacheLocation: imageCacheDir,
      }),
    ],
    server: {
      host: '0.0.0.0',
      // Allow sandbox/preview hosts during local development.
      allowedHosts: ['.e2b.app', 'localhost'],
    },
  },
  themeConfig: {
    logo: '/brand/logo.svg',
    siteTitle: 'Chest Solutions',
    nav: [
      { text: 'Docs', link: '/docs' },
      { text: 'Downloads', link: '/downloads' },
      { text: 'Team', link: '/team' },
      { text: 'Contact', link: '/contact' },
    ],
    // Keyed by path on purpose. A plain array is applied to *every* page, which
    // puts the docs sidebar on the home page and on the standalone site pages
    // too (VitePress only skips it for an exact `layout: home`, and this site's
    // home uses the custom `layout: Home`). With the object form, only paths
    // under /docs/ get sidebar items, so `hasSidebar` — and with it the fixed
    // <aside> and VPContent's sidebar padding — stay on the doc pages.
    // /docs itself opts out with `sidebar: false` in frontmatter: it is a hub,
    // and the cards already link to everything listed here.
    sidebar: {
      '/docs/': [
        {
          text: 'MoParticles',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/docs/moparticles/' },
            { text: 'Getting started', link: '/docs/moparticles/getting-started' },
            { text: 'Commands', link: '/docs/moparticles/commands' },
            { text: 'Particle format', link: '/docs/moparticles/particles' },
            { text: 'Plugin API', link: '/docs/moparticles/api' },
            { text: 'FAQ', link: '/docs/moparticles/faq' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Chest-Solutions' },
      { icon: 'discord', link: 'https://discord.gg/MsWqevupwh' },
    ],
    search: { provider: 'local' },
    footer: {
      message: 'Free, open-source software for Minecraft servers.',
      copyright: '© 2026 Chest Solutions',
    },
    outline: { label: 'On this page', level: [2, 3] },
    docFooter: { prev: 'Previous', next: 'Next' },
  },

})
