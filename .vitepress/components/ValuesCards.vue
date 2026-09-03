<script setup>
const values = [
  {
    title: 'Stable',
    desc: 'We test releases on our own servers before publishing them.',
  },
  {
    title: 'Open source',
    desc: 'Everything is on GitHub. Read the code, fork it, or send a pull request.',
  },
  {
    title: 'Cheap to run',
    desc: 'We do the expensive work at load time and profile what ships, so your tick loop stays yours.',
  },
]
</script>

<template>
  <section class="bleed">
    <div class="site-container pt-8 pb-2.5 md:pt-12 md:pb-4">
      <div class="mb-16 text-center">
        <h2
          class="font-display text-3xl font-semibold tracking-tight text-heading sm:text-4xl md:text-5xl"
        >
          What we <span class="aurora-text">care about</span>
        </h2>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
          A few things we hold every project to.
        </p>
      </div>

      <!-- No max-width and no card cap: the grid spans the same content width
           as the CTA band below it, and the cards split it three ways. -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="v in values"
          :key="v.title"
          class="group overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
        >
          <div
            class="flex h-full flex-col items-center justify-center gap-3 p-7 text-center"
          >
            <h3 class="font-display text-xl font-semibold text-heading">{{ v.title }}</h3>
            <p class="text-sm leading-relaxed text-muted">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
