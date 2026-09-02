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
    <div class="site-container">
      <div class="mb-14 mt-24 text-center md:mt-32">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-300"
        >
          How it works
        </span>
        <h2
          class="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          MoLang in, <span class="aurora-text">item displays out</span>
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          MoParticles parses Bedrock particle JSON, bakes it into frames while it loads, and plays
          it back with vanilla item displays. Players just need the generated resource pack.
        </p>
      </div>

      <div class="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            v-for="f in features"
            :key="f.title"
            class="group rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-brand-500/40 hover:bg-white/[0.04]"
          >
            <span class="text-lg">{{ f.icon }}</span>
            <h3 class="mt-3 font-display text-[15px] font-semibold text-white">{{ f.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-zinc-500">{{ f.desc }}</p>
          </div>
        </div>

        <div class="relative">
          <div
            class="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-2xl shadow-brand-600/10"
          >
            <div class="flex items-center gap-4 border-b border-white/5 p-6">
              <img src="/brand/moparticles.png" alt="MoParticles" class="h-16 w-16 animate-float rounded-2xl" />
              <div>
                <h3 class="font-display text-lg font-semibold text-white">MoParticles</h3>
                <p class="text-sm text-zinc-500">MoLang → item displays, baked &amp; replayed</p>
              </div>
              <span
                class="ml-auto rounded-full border border-aqua-400/30 bg-aqua-400/10 px-3 py-1 text-[11px] font-semibold text-aqua-300"
              >
                v1.1.0
              </span>
            </div>
            <div class="bg-ink-950/80 p-6 font-mono text-[13px] leading-7">
              <div class="mb-4 flex gap-1.5">
                <span class="h-3 w-3 rounded-full bg-white/10" />
                <span class="h-3 w-3 rounded-full bg-white/10" />
                <span class="h-3 w-3 rounded-full bg-white/10" />
                <span class="ml-3 text-xs text-zinc-600">server console</span>
              </div>
              <p>
                <span class="text-brand-400">player</span>
                <span class="text-zinc-300"> /moparticles playhere snowstorm:fire</span>
              </p>
              <p>
                <span class="text-zinc-600">[MoParticles]</span>
                <span class="text-aqua-300"> ✓ snowstorm:fire playing — radius 10.0</span>
              </p>
              <p>
                <span class="text-zinc-600">[MoParticles]</span>
                <span class="text-zinc-400"> animation 8f3c…6f7e started (48 frames baked)</span>
              </p>
              <p>
                <span class="text-brand-400">player</span>
                <span class="text-zinc-300"> /moparticles stopall</span>
              </p>
              <p>
                <span class="text-zinc-600">[MoParticles]</span>
                <span class="text-aqua-300"> ✓ stopped all animations</span>
              </p>
              <p class="text-zinc-500">
                <span class="inline-block h-4 w-2 animate-pulse bg-brand-400" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
