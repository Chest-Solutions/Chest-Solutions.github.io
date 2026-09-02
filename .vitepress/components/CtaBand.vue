<script setup>
</script>

<template>
  <section class="bleed">
    <div class="site-container pt-6 md:pt-8">
      <div
        class="relative overflow-hidden rounded-[32px] border border-white/10 bg-ink-900 px-8 py-16 text-center md:py-20"
      >
        <div class="absolute inset-x-0 top-0 h-px bg-brand-400/40" />
        <h2 class="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Free to download, <span class="aurora-text">free to keep</span>
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
          Every Chest Solutions release is free and open source. Grab the latest build, drop it in
          your plugins folder, and you're running — that's the whole install.
        </p>
        <div class="mt-8 flex justify-center">
          <a
            href="/downloads"
            class="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            style="background: var(--color-brand-500)"
          >
            Browse downloads
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
