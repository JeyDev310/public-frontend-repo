<template>
  <div
    class="
      absolute
      inset-0
      flex
      items-center
      justify-center
      w-full
      h-full
      bg-emptiness
      bg-opacity-60
      dark:bg-calico-dress
      dark:bg-opacity-60
      z-99
    "
  >
    <div
      class="loader relative"
      :class="getSize"
      :style="getLoaderStyle"
    >
      <div
        v-for="n in 12"
        :key="n"
        class="loader__dot absolute"
        :class="[getModeName, getSize]"
        :style="getDotStyle(n)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'

type TSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xlg'

export default defineComponent({
  name: 'AppLoader',

  props: {
    size: {
      type: String as PropType<TSizes>,
      default: 'lg'
    }
  },

  setup (props) {
    const { getModeName } = useGlobal()

    const getSize = computed((): string => `size-${props.size}`)

    const getRadius = computed((): number => {
      if (props.size === 'xlg') return 34
      if (props.size === 'md') return 24
      if (props.size === 'sm') return 20
      if (props.size === 'xs') return 12
      return 26
    })

    const getDotSize = computed((): number => {
      if (props.size === 'xlg') return 8
      if (props.size === 'md') return 5
      if (props.size === 'sm') return 4
      if (props.size === 'xs') return 3
      return 6
    })

    function calPosition (angle: number): number[] {
      const x = getRadius.value * Math.sin(22 / 7 * 2 * angle / 360)
      const y = getRadius.value * Math.cos(22 / 7 * 2 * angle / 360)
      return [getRadius.value + Math.round(x), Math.abs(Math.round(getRadius.value - y))]
    }

    function getDotStyle (index: number): string {
      const position = calPosition(360 - (index * 30))

      return `left: ${position[0]}px; 
              top: ${position[1]}px; 
              animation-delay: ${0.1 - (0.1 * index)}s;
              height: ${getDotSize.value}px;
              width: ${getDotSize.value}px;
              `
    }

    const getLoaderStyle = computed((): string =>
    `height: ${(getRadius.value + getDotSize.value / 2) * 2}px; 
     width: ${(getRadius.value + getDotSize.value / 2) * 2}px`)

    return {
      getRadius,
      getSize,
      getModeName,
      getDotStyle,
      getLoaderStyle
    }
  }
})
</script>

<style lang="scss">
.loader {
  &__dot {
    border-radius: 50%;
    animation: loader 1.2s linear infinite;

    &.is-dark {
      @apply bg-let-it-snow;
    }

    &.is-light {
      @apply bg-nile-blue;
    }
  }
}

@keyframes loader {
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }
}
</style>
