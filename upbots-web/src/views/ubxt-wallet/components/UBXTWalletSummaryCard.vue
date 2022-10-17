<template>
  <AppCard v-bind="$attrs" class="flex flex-col relative items-center w-full h-120">
    <!-- TTILE -->
    <h3 class="w-full md:text-md text-center text-chicory-flower dark:text-soaring-eagle leading-1">
      {{ title }}
    </h3>

    <!-- CONTENT -->
    <div
      class="
        flex
        flex-wrap
        justify-center
        items-center
        w-full
        text-xl
        xl:text-2xl
        leading-1
        text-beguiling-blue
        dark:text-white
        mt-10
      "
    >
      <!-- VALUE -->
      <AppFormatNumber
        :data="value"
        :to-fixed="2"
        :is-math-symbols="false"
        text-size="text-xl xl:text-2xl leading-1 font-semibold"
        class="text-beguiling-blue dark:text-white"
      />

      <!-- SYMBOL -->
      <span v-if="symbol" class="">&nbsp;{{ symbol }}</span>

      <!-- SLOT -->
      <slot />
    </div>

    <!-- SLOT SECONDARY -->
    <div v-if="isSecondarySlot">
      <slot name="secondary" />
    </div>

    <!-- SLOT DROPDOWN -->
    <div v-if="isDropdownSlot" class="absolute right-10 top-10">
      <slot name="dropdown" />
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

export default defineComponent({
  name: 'UBXTWalletSummaryCard',

  props: {
    title: {
      type: String as PropType<string>,
      required: true
    },

    value: {
      type: Number as PropType<number>,
      required: true
    },

    symbol: {
      type: String as PropType<string>,
      default: ''
    }
  },

  setup (_, { slots }) {
    const isDropdownSlot = computed(() => !!slots.dropdown)
    const isSecondarySlot = computed(() => !!slots.secondary)

    return { isDropdownSlot, isSecondarySlot }
  }
})
</script>
