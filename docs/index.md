---
layout: site
title: Docs
description: Documentation for every Chest Solutions project.
sidebar: false
---

<script setup>
import { data } from './docs.data.js'
</script>

# Docs

Pick a project to read its documentation.

<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <a
    v-for="project in data"
    :key="project.url"
    :href="project.url"
    class="group flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface-2 p-6 no-underline transition-all duration-300 hover:-translate-y-1 hover:border-brand-border hover:bg-brand-subtle"
  >
    <span class="block">
      <span class="block font-display text-lg font-semibold text-heading">{{ project.title }}</span>
      <span class="mt-1 block text-sm leading-relaxed text-muted">{{ project.tagline }}</span>
    </span>
    <span class="text-sm font-medium text-brand-text">Read &rarr;</span>
  </a>
</div>
