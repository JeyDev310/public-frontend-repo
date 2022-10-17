<template>
  <AppFlyout
    :disabled="disabled"
    :placement="placement"
    :offset="offset"
    :trigger="trigger"
    :popperClasses="content ? tooltipClasses : ''"
    :showArrow="!hideArrow"
    :arrowClasses="arrowClasses"
    :appendToBody="appendToBody"
  >
    <template #activator>
      <slot />
    </template>

    <template #popper>
      <slot name="content">
        {{ content }}
      </slot>
    </template>
  </AppFlyout>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Placement } from '@popperjs/core'

export default defineComponent({
  name: 'AppTooltip',

  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'top'
    },

    offset: {
      type: Number as PropType<number>,
      default: 10
    },

    tooltipClasses: {
      type: String as PropType<string>,
      default: 'app-tooltip'
    },

    trigger: {
      type: String as PropType<string>,
      default: 'hover'
    },

    content: {
      type: [String, Number] as PropType<string | number>
    },

    hideArrow: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    arrowClasses: {
      type: String as PropType<string>,
      default: 'border border-solid border-puerto-rico dark:border-black'
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    appendToBody: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  }
})
</script>

<style lang="scss">
.app-tooltip {
  @apply bg-white text-astral dark:text-kuroi-black p-10 rounded-md font-medium
  border border-solid border-puerto-rico dark:border-black break-all;
  max-width: 350px;
}
</style>
