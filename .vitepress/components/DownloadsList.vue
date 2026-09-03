<script setup>
import { latest, plugins } from '../data/plugins.js'
</script>

<template>
  <div class="my-8 grid gap-6 sm:grid-cols-2">
    <a
      v-for="plugin in plugins"
      :key="plugin.id"
      :href="`/downloads/${plugin.id}`"
      class="group flex flex-col gap-5 rounded-[28px] border border-line bg-surface p-7 no-underline transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
    >
      <div class="flex items-center gap-4">
        <img
          :src="plugin.icon"
          :alt="plugin.name"
          class="h-14 w-14 shrink-0 rounded-2xl shadow-lg shadow-brand/20"
        />
        <div class="min-w-0">
          <h2 class="font-display text-xl font-semibold text-heading">
            {{ plugin.name }}
          </h2>
          <span
            class="mt-1 inline-block rounded-full border border-brand-border bg-brand-subtle px-2.5 py-0.5 text-[11px] font-semibold text-accent"
          >
            {{ latest(plugin).version }}
          </span>
        </div>
      </div>

      <p class="text-sm leading-relaxed text-body">{{ plugin.tagline }}</p>

      <span class="mt-auto text-sm font-semibold text-brand-text">
        View download &rarr;
      </span>
    </a>
  </div>
</template>
