<template>
  <circle cx="240" cy="100" r="80" />
  <rect x="60" y="40" rx="10" ry="10" width="10" height="10" />
  <rect x="80" y="40" rx="5" ry="10" width="40" height="10" />
  <rect x="60" y="55" rx="10" ry="10" width="10" height="10" />
  <rect x="80" y="55" rx="5" ry="10" width="40" height="10" />
  <rect x="60" y="70" rx="10" ry="10" width="10" height="10" />
  <rect x="80" y="70" rx="5" ry="10" width="40" height="10" />
  <rect x="60" y="85" rx="10" ry="10" width="10" height="10" />
  <rect x="80" y="85" rx="5" ry="10" width="40" height="10" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SkeletonPieChart'
})
</script>
