import { nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Home from './layouts/Home.vue'
import Site from './layouts/Site.vue'
import Showcase from '../components/Showcase.vue'
import ValuesCards from '../components/ValuesCards.vue'
import CtaBand from '../components/CtaBand.vue'
import CommunityCards from '../components/CommunityCards.vue'
import Downloads from '../components/Downloads.vue'
import TeamGrid from '../components/TeamGrid.vue'
import ContactCards from '../components/ContactCards.vue'
import { syncParticleField } from './particleField.js'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // Custom layouts, referenced by name in frontmatter (`layout: Home`, `layout: site`)
    app.component('Home', Home)
    app.component('site', Site)

    // Components used directly in markdown
    app.component('Showcase', Showcase)
    app.component('ValuesCards', ValuesCards)
    app.component('CtaBand', CtaBand)
    app.component('CommunityCards', CommunityCards)
    app.component('Downloads', Downloads)
    app.component('TeamGrid', TeamGrid)
    app.component('ContactCards', ContactCards)

    // Mount the particle canvas on the hero, unmount it elsewhere (client only).
    // VitePress's router is not vue-router: it exposes onAfterRouteChange, not afterEach.
    // syncParticleField no-ops until the app has hydrated.
    if (typeof window !== 'undefined') {
      const sync = () => nextTick(() => syncParticleField())
      router.onAfterRouteChange = sync
      sync()
    }
  },
}
