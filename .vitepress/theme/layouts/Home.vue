<script setup>
import { nextTick, onMounted } from 'vue'
import { VPHomeHero, VPHomeFeatures } from 'vitepress/theme'
import Showcase from '../../components/Showcase.vue'
import ValuesCards from '../../components/ValuesCards.vue'
import CtaBand from '../../components/CtaBand.vue'
import CommunityCards from '../../components/CommunityCards.vue'
import { syncParticleField } from '../particleField.js'

// The boot-time route hook fires before hydration; mount the canvas once
// this layout is actually in the hydrated DOM. nextTick so that Vue has
// finished mount() (and tagged #app with the app instance) before we sync.
onMounted(() => nextTick(() => syncParticleField()))
</script>

<template>
  <div class="site-home">
    <VPHomeHero>
      <template #home-hero-info-before>
        <img src="/brand/mark-square.svg" alt="" class="hero-mark" />
      </template>
    </VPHomeHero>

    <VPHomeFeatures />

    <Showcase />
    <ValuesCards />
    <CtaBand />
    <CommunityCards />
  </div>
</template>

<style scoped>
.site-home {
  margin-bottom: 64px;
}

.hero-mark {
  display: block;
  width: 112px;
  height: 112px;
  margin: 0 auto 28px;
  mix-blend-mode: screen;
  animation: float 7s ease-in-out infinite;
}
</style>
