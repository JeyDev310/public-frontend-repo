<template>
  <rect x="50%" y="20" rx="8" width="190" height="14" transform="translate(-95)" />
  <rect x="50%" y="45" rx="8" width="120" height="12" transform="translate(-60)" />

  <rect x="60" y="80" rx="8" width="70" height="12" />
  <rect x="60" y="100" rx="8" width="100" height="12" />

  <rect x="100%" y="80" rx="8" width="100" height="12" transform="translate(-160)" />
  <rect x="100%" y="100" rx="8" width="60" height="12" transform="translate(-160)" />

  <rect x="60" y="130" rx="8" width="90" height="12" />
  <rect x="60" y="150" rx="8" width="100" height="12" />

  <rect x="100%" y="130" rx="8" width="100" height="12" transform="translate(-160)" />
  <rect x="100%" y="150" rx="8" width="80" height="12" transform="translate(-160)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SkeletonCard'
})
</script>
