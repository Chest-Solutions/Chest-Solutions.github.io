<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { findPlugin, latest } from '../data/plugins.js'

// The route is generated from the plugin list (see downloads/[plugin].paths.js),
// so `params.plugin` is always one of our ids; the fallback only covers a
// hand-typed or stale URL.
const { params } = useData()
const plugin = computed(() => findPlugin(params.value?.plugin))
const current = computed(() => (plugin.value ? latest(plugin.value) : undefined))
</script>

<template>
  <div v-if="plugin" class="my-8 overflow-hidden rounded-[28px] border border-line bg-surface">
    <div class="relative flex flex-col gap-8 p-8 sm:flex-row sm:items-start">
      <img
        :src="plugin.icon"
        :alt="plugin.name"
        class="h-28 w-28 shrink-0 rounded-[24px] shadow-2xl shadow-brand/30 sm:h-32 sm:w-32"
      />
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="font-display text-2xl font-semibold text-heading sm:text-3xl">
            {{ plugin.name }}
          </h2>
          <span
            class="rounded-full border border-brand-border bg-brand-subtle px-3 py-1 text-xs font-semibold text-accent"
          >
            {{ current.version }}
          </span>
        </div>
        <p class="mt-3 max-w-xl text-sm leading-relaxed text-body sm:text-base">
          {{ plugin.description }}
        </p>

        <div class="mt-5 flex flex-wrap gap-2.5">
          <span
            v-for="badge in plugin.badges"
            :key="badge"
            class="inline-flex items-center gap-2 rounded-full border border-line bg-fill px-3.5 py-1.5 text-xs font-medium text-body"
          >
            {{ badge }}
          </span>
        </div>

        <div class="mt-7 flex flex-wrap gap-3">
          <a
            :href="current.url"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-brand-background px-6 py-3 text-sm font-semibold text-brand-foreground no-underline shadow-brand-glow transition-all duration-200 hover:bg-brand-hover hover:scale-[1.03] active:scale-[0.98]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download {{ current.version }}
          </a>
          <a
            :href="plugin.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-fill px-6 py-3 text-sm font-semibold text-heading no-underline backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:bg-fill-strong active:scale-[0.98]"
          >
            GitHub
          </a>
          <a
            v-if="plugin.docs"
            :href="plugin.docs"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-fill px-6 py-3 text-sm font-semibold text-heading no-underline backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:bg-fill-strong active:scale-[0.98]"
          >
            Install guide
          </a>
        </div>

      </div>
    </div>

    <div class="border-t border-line px-8 py-7">
      <h3 class="font-display text-lg font-semibold text-heading">All versions</h3>
      <ul class="mt-4 divide-y divide-line">
        <li
          v-for="v in plugin.versions"
          :key="v.version"
          class="flex flex-wrap items-center justify-between gap-3 py-3.5"
        >
          <div class="min-w-0">
            <p class="text-sm font-semibold text-heading">
              {{ v.version }}
              <span
                v-if="v.version === current.version"
                class="ml-2 rounded-full border border-brand-border bg-brand-subtle px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent"
              >
                Latest
              </span>
            </p>
            <p class="mt-0.5 text-xs text-muted">{{ v.file }} &middot; {{ v.released }}</p>
          </div>
          <a
            :href="v.url"
            class="inline-flex items-center gap-1.5 rounded-full border border-line bg-fill px-4 py-2 text-xs font-semibold text-heading no-underline transition-all duration-200 hover:bg-fill-strong"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div v-else class="my-8 rounded-[28px] border border-line bg-surface p-8">
    <h2 class="font-display text-2xl font-semibold text-heading">Unknown plugin</h2>
    <p class="mt-3 text-sm leading-relaxed text-body">
      There is no download page for “{{ params?.plugin }}”.
    </p>
    <a
      href="/downloads"
      class="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-fill px-5 py-2.5 text-sm font-semibold text-heading no-underline transition-all duration-200 hover:bg-fill-strong"
    >
      &larr; All downloads
    </a>
  </div>
</template>
