<script setup>
</script>

<template>
  <div class="site-page">
    <div class="vp-doc site-doc">
      <Content />
    </div>
  </div>
</template>

<style scoped>
.site-page {
  padding: 56px 24px 112px;
}

@media (min-width: 768px) {
  .site-page {
    padding: 72px 32px 128px;
  }
}

.site-doc {
  max-width: 52rem;
  margin: 0 auto;
}
</style>
