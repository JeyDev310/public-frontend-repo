<template>
  <div class="grid grid-cols-1 items-center justify-between flex-shrink-0 gap-x-10 md:gap-x-20 mb-10">
    <div
      v-for="(item, index) in labels"
      :key="index"
      class="flex"
    >
      <span class="text-beguiling-blue dark:text-cotton-ball-second font-semibold">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyBotPairLabels',

  setup () {
    const labels = ['Pair']

    return { labels }
  }
})
</script>
