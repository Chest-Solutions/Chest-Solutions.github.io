# Chest Solutions — Website

The website for [Chest Solutions](https://github.com/Chest-Solutions), a community-driven,
open-source group building free software for Minecraft servers.

Currently featuring **[MoParticles](https://github.com/Chest-Solutions/MoParticles)** — a Paper
plugin that brings Bedrock-style MoLang particle effects to Java Edition.

## Stack

The entire site — landing page and documentation — is a single [VitePress](https://vitepress.dev)
project styled with [Tailwind CSS v4](https://tailwindcss.com). One build, one theme, one look.

## Development

```bash
npm install

# dev server (http://localhost:5173)
npm run dev

# production build → dist/
npm run build

# serve the production build locally
npm run preview

# lint
npm run lint
```

## Structure

```text
├── .vitepress/
│   ├── config.mjs        # site config (nav, sidebar, theme)
│   ├── theme/            # custom theme: brand CSS, layouts, particle field
│   ├── components/       # site sections (hero showcase, downloads, team, …)
│   └── dist/             # build output (gitignored)
├── index.md              # home page (hero + features + sections)
├── downloads.md          # MoParticles downloads
├── team.md / contact.md / terms.md / privacy.md
├── moparticles/          # documentation
│   ├── index.md          # overview
│   ├── getting-started.md
│   ├── commands.md
│   ├── particles.md
│   ├── api.md
│   └── faq.md
├── public/               # brand art, favicon
└── scripts/preview.mjs   # local static server for the built site
```

The GitHub Pages workflow (`.github/workflows/jekyll-gh-pages.yml`) runs `npm run build` and
deploys `dist/`.
