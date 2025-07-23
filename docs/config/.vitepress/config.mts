import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Chest-Solutions',
  cleanUrls: true,
  themeConfig: {
   socialLinks: [
      { icon: 'github', link: 'https://github.com/Chest-Solutions' },
      { icon: 'discord', link: 'https://discord.gg/hhAxBTatCM' }
    ],
  },
})
