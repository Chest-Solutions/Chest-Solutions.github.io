<script setup>
</script>

<template>
  <section class="bleed">
    <div class="site-container py-12 md:py-16">
      <div
        class="relative overflow-hidden rounded-[32px] border border-white/10 bg-ink-900 px-8 py-16 text-center md:py-20"
      >
        <div
          class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_80%_at_50%_120%,rgba(124,107,255,0.25),transparent_70%)]"
        />
        <div class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-400/60 to-transparent" />
        <h2 class="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Documentation
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
          Installation, commands, the particle format, and the plugin API — all in one place.
        </p>
        <div class="mt-8 flex justify-center">
          <a
            href="/moparticles/"
            class="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            style="
              background: linear-gradient(100deg, var(--color-brand-500), var(--color-aqua-500));
              box-shadow: 0 0 24px rgba(124, 107, 255, 0.35);
            "
          >
            Read the docs
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
