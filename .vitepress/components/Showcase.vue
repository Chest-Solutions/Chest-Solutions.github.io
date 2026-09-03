<script setup>
const features = [
  {
    icon: '✨',
    title: 'Speaks MoLang',
    desc: 'Import Bedrock particle effects — including the SnowStorm library — as plain JSON files.',
  },
  {
    icon: '📦',
    title: 'Vanilla item displays',
    desc: 'Baked frames replayed with item displays. No client mod, no custom protocol.',
  },
  {
    icon: '🎨',
    title: 'Automatic resource pack',
    desc: 'Textures are synthesized and the resource pack is generated on boot.',
  },
  {
    icon: '🔌',
    title: 'Developer API',
    desc: 'List, play, and stop effects from your own plugin with a small public API.',
  },
]
</script>

<template>
  <section class="bleed">
    <div class="site-container pt-20 md:pt-24">
      <div class="mb-12 text-center md:mb-16">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-line bg-fill px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent"
        >
          Featured project
        </span>
        <h2
          class="mt-4 font-display text-3xl font-semibold tracking-tight text-heading sm:text-4xl md:text-5xl"
        >
          Meet <span class="aurora-text">MoParticles</span>
        </h2>
        <p
          class="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-body sm:mt-5 sm:text-lg"
        >
          Our first release brings Bedrock-style MoLang particle effects to Paper: it parses
          particle JSON, bakes it into frames while it loads, and plays it back with vanilla item
          displays. Players just need the generated resource pack. More projects are in the works.
        </p>
        <div class="mt-7 flex flex-wrap items-center justify-center gap-3 md:mt-8">
          <a
            href="/downloads"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-brand-background px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all duration-200 hover:bg-brand-hover hover:scale-[1.03] active:scale-[0.98]"
          >
            Download MoParticles
          </a>
          <a
            href="/docs"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-fill px-5 py-2.5 text-sm font-semibold text-heading transition-all duration-200 hover:border-brand-500/40 hover:bg-fill-strong"
          >
            Read the docs
          </a>
        </div>
      </div>

      <div class="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            v-for="f in features"
            :key="f.title"
            class="group rounded-2xl border border-line bg-fill/50 p-5 transition-colors duration-300 hover:border-brand-500/40 hover:bg-fill"
          >
            <span class="text-lg">{{ f.icon }}</span>
            <h3 class="mt-3 font-display text-[15px] font-semibold text-heading">{{ f.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ f.desc }}</p>
          </div>
        </div>

        <div class="relative">
          <div
            class="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-brand-600/10"
          >
            <div class="flex items-center gap-4 border-b border-line p-6">
              <img src="/brand/moparticles.png" alt="MoParticles" class="h-16 w-16 animate-float rounded-2xl" />
              <div>
                <h3 class="font-display text-lg font-semibold text-heading">MoParticles</h3>
                <p class="text-sm text-muted">MoLang → item displays, baked &amp; replayed</p>
              </div>
              <span
                class="ml-auto rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold text-accent"
              >
                v1.1.0
              </span>
            </div>
            <div class="bg-surface-2 p-6 font-mono text-[13px] leading-7">
              <div class="mb-4 flex gap-1.5">
                <span class="h-3 w-3 rounded-full bg-fill-strong" />
                <span class="h-3 w-3 rounded-full bg-fill-strong" />
                <span class="h-3 w-3 rounded-full bg-fill-strong" />
                <span class="ml-3 text-xs text-muted">server console</span>
              </div>
              <p>
                <span class="text-accent">player</span>
                <span class="text-body"> /moparticles playhere snowstorm:fire</span>
              </p>
              <p>
                <span class="text-muted">[MoParticles]</span>
                <span class="text-accent"> ✓ snowstorm:fire playing — radius 10.0</span>
              </p>
              <p>
                <span class="text-muted">[MoParticles]</span>
                <span class="text-body"> animation 8f3c…6f7e started (48 frames baked)</span>
              </p>
              <p>
                <span class="text-accent">player</span>
                <span class="text-body"> /moparticles stopall</span>
              </p>
              <p>
                <span class="text-muted">[MoParticles]</span>
                <span class="text-accent"> ✓ stopped all animations</span>
              </p>
              <p class="text-muted">
                <span class="inline-block h-4 w-2 animate-pulse bg-brand-400" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
