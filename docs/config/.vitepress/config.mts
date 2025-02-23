import {PageData, TransformPageContext} from 'vitepress';
import {tabsMarkdownPlugin} from 'vitepress-plugin-tabs'
import defineVersionedConfig from "vitepress-versioning-plugin";
import {applySEO, removeVersionedItems} from './seo';

// https://vitepress.dev/reference/site-config
export default defineVersionedConfig({
  lang: 'en-US',
  title: 'FoliaMines',
  description: 'Mines plugin for folia and papermc servers.',
  versioning: {
    latestVersion: '0.0.1-SNAPSHOT',
  },
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-example' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Chest-Solutions/FoliaMines' },
      { icon: 'discord', link: 'https://discord.gg/hhAxBTatCM' }
    ]
  }
}, __dirname)
