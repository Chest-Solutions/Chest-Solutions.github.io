import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

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
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
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
      { property: 'og:image', content: 'https://chest-solutions.github.io/brand/mark-square.png' },
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
      { name: 'twitter:image', content: 'https://chest-solutions.github.io/brand/mark-square.png' },
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
    plugins: [tailwindcss()],
    server: {
      host: '0.0.0.0',
      // Allow sandbox/preview hosts during local development.
      allowedHosts: ['.e2b.app', 'localhost'],
    },
  },
  themeConfig: {
    logo: '/brand/mark-square.svg',
    siteTitle: 'chest solutions',
    nav: [
      { text: 'MoParticles', link: '/moparticles/' },
      { text: 'Downloads', link: '/downloads' },
      { text: 'Team', link: '/team' },
      { text: 'Contact', link: '/contact' },
    ],
    sidebar: [
      {
        text: 'MoParticles',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/moparticles/' },
          { text: 'Getting started', link: '/moparticles/getting-started' },
          { text: 'Commands', link: '/moparticles/commands' },
          { text: 'Particle format', link: '/moparticles/particles' },
          { text: 'Plugin API', link: '/moparticles/api' },
          { text: 'FAQ', link: '/moparticles/faq' },
        ],
      },
    ],
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
