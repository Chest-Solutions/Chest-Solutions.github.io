<script setup>
const values = [
  {
    title: 'Stable',
    desc: 'We test releases on our own servers before publishing them.',
    img: '/brand/showcase-stability.png',
  },
  {
    title: 'Open source',
    desc: 'Everything is on GitHub. Read the code, fork it, or send a pull request.',
    img: '/brand/showcase-open.png',
  },
  {
    title: 'Cheap to run',
    desc: 'We do the expensive work at load time and profile what ships, so your tick loop stays yours.',
    img: '/brand/showcase-performance.png',
  },
]
</script>

<template>
  <section class="bleed">
    <div class="site-container">
      <div class="mb-14 text-center">
        <h2
          class="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          What we <span class="aurora-text">care about</span>
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          A few things we hold every project to.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="v in values"
          :key="v.title"
          class="group overflow-hidden rounded-3xl border border-white/8 bg-ink-900 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
        >
          <div class="relative h-52 overflow-hidden bg-black">
            <img
              :src="v.img"
              :alt="v.title"
              class="h-full w-full object-cover opacity-90 mix-blend-screen transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-ink-900/45"
            />
          </div>
          <div class="p-7">
            <h3 class="font-display text-xl font-semibold text-white">{{ v.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-zinc-500">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
