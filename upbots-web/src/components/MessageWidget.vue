<template>
  <div
    class="
      flex
      flex-grow
      bg-cotton-boll
      dark:bg-hidden-sea-glass
      dark:bg-opacity-10
      border-l-2
      border-solid
      border-beguiling-blue
      dark:border-hidden-sea-glass
      rounded-r-sm1
      py-12
      md:py-16
      3xl:py-20
      px-14
      md:px-20
      3xl:px-24
    "
  >
    <AppIcon
      :name="iconName"
      :size="!is4XL ? '30' : '24'"
      class="text-beguiling-blue dark:text-hidden-sea-glass text-xl mt-4 mr-12 md:mr-24"
    />

    <!-- SLOT -->
    <div class="text-beguiling-blue dark:text-crushed-ice" :class="descriptionClasses">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'MessageWidget',

  props: {
    iconName: {
      type: String as PropType<string>,
      required: true
    },

    descriptionClasses: {
      type: String as PropType<string>,
      default: ''
    }
  },

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL } = useCustomBreakpoints()

    return { is4XL }
  }
})
</script>
