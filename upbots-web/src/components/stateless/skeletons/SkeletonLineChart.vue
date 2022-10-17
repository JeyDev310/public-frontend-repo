<template>
  <rect x="8" y="10" rx="0" ry="0" width="2" height="180" />
  <rect x="8" y="190" rx="0" ry="0" width="380" height="2" />
  <path d="M20,60 C240,240 190,-30 380.00,50 L380,180 L20,180 Z" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SkeletonLineChart'
})
</script>
