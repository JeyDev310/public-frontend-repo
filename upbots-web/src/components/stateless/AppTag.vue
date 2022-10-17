<template>
  <div class="app-tag flex items-center justify-center" :class="[tagSize, tagRounded, tagTypes]">
    <!-- DEFAULT SLOT -->
    <slot>
      <AppTruncatedTooltip v-if="data" :content="data" />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { TIndexedObject } from '@/types'

type TTypes = 'primary' | 'secondary' | 'tertiary'
type TSizes = 'sm' | 'md' | 'lg'

const types: TIndexedObject<string> = Object.freeze({
  primary: 'is-primary',
  secondary: 'is-secondary',
  tertiary: 'is-tertiary'
})

export default defineComponent({
  name: 'AppTag',

  props: {
    data: {
      type: String as PropType<string>,
      default: ''
    },

    type: {
      type: String as PropType<TTypes>,
      default: 'primary'
    },

    size: {
      type: String as PropType<TSizes>,
      default: 'md'
    },

    rounded: {
      type: String as PropType<string>,
      default: 'xl1'
    }
  },

  setup (props) {
    const tagSize = computed((): string => `size-${props.size}`)

    const tagRounded = computed((): string => `rounded-${props.rounded}`)

    const tagTypes = computed((): string => types[props.type])

    return { tagSize, tagTypes, tagRounded }
  }
})
</script>

<style lang="scss" scoped>
.app-tag {
  &.is-primary,
  &.is-secondary,
  &.is-tertiary {
    @apply bg-wizard-white text-beguiling-blue;
  }

  &.is-primary,
  &.is-tertiary {
    @apply font-semibold;
  }

  &.is-primary,
  &.is-secondary {
    @apply dark:text-white dark:bg-opacity-20;
  }

  &.is-primary {
    @apply dark:bg-tradewind bg-opacity-60 dark:bg-opacity-20;
  }

  &.is-secondary {
    @apply dark:bg-dark dark:bg-opacity-20;
  }

  &.is-tertiary {
    @apply dark:bg-bluish-purple-anemone dark:text-pale-blue;
  }

  &.size-sm {
    @apply h-16 text-xs leading-1 px-10 p-5;
  }

  &.size-md {
    @apply h-24 text-sm px-10 p-5;
  }

  &.size-lg {
    @apply h-32 px-10 p-5;
  }
}
</style>
