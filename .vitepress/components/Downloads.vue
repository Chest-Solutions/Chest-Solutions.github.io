<script setup>
const latest = {
  version: 'v1.1.0',
  file: 'MoParticles-1.1-all.jar',
  url: 'https://github.com/Chest-Solutions/MoParticles/releases/download/v1.1.0/MoParticles-1.1-all.jar',
}
</script>

<template>
  <div class="my-8 overflow-hidden rounded-[28px] border border-line bg-surface">
    <div class="relative flex flex-col gap-8 p-8 sm:flex-row sm:items-start">
      <img
        src="/brand/moparticles.png"
        alt="MoParticles"
        class="h-28 w-28 shrink-0 animate-float rounded-[24px] shadow-2xl shadow-brand/30 sm:h-32 sm:w-32"
      />
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="font-display text-2xl font-semibold text-heading sm:text-3xl">MoParticles</h2>
          <span
            class="rounded-full border border-brand-border bg-brand-subtle px-3 py-1 text-xs font-semibold text-accent"
          >
            {{ latest.version }}
          </span>
        </div>
        <p class="mt-3 max-w-xl text-sm leading-relaxed text-body sm:text-base">
          A Paper plugin that parses MoLang — Bedrock's particle language — bakes the result into a
          Java-compatible animation using item displays, and generates a resource pack with the
          necessary textures.
        </p>

        <div class="mt-5 flex flex-wrap gap-2.5">
          <span
            v-for="b in ['Java 21+', 'Paper 1.21.x', 'Shaded all-in-one jar']"
            :key="b"
            class="inline-flex items-center gap-2 rounded-full border border-line bg-fill px-3.5 py-1.5 text-xs font-medium text-body"
          >
            {{ b }}
          </span>
        </div>

        <div class="mt-7 flex flex-wrap gap-3">
          <a
            :href="latest.url"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-brand-background px-6 py-3 text-sm font-semibold text-brand-foreground shadow-brand-glow transition-all duration-200 hover:bg-brand-hover hover:scale-[1.03] active:scale-[0.98]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download {{ latest.version }}
          </a>
          <a
            href="https://github.com/Chest-Solutions/MoParticles"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-fill px-6 py-3 text-sm font-semibold text-heading backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:bg-fill-strong active:scale-[0.98]"
          >
            GitHub
          </a>
          <a
            href="/moparticles/getting-started"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-fill px-6 py-3 text-sm font-semibold text-heading backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:bg-fill-strong active:scale-[0.98]"
          >
            Install guide
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
