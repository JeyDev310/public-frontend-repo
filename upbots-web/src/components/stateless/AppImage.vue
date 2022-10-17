<template>
  <figure v-lazyload class="image-wrapper w-full overflow-hidden">
    <img :alt="alt" :class="imgClass" class="animate-blur-in" :src="emptySrc" :data-url="src">
  </figure>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

const emptySvgTemplate = (width: string | number, height: string | number) => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3C/svg%3E`
}

export default defineComponent({
  name: 'AppImage',

  props: {
    src: {
      type: String as PropType<string>,
      required: true
    },

    alt: {
      type: String as PropType<string>,
      required: true
    },

    width: {
      type: [String, Number] as PropType<string | number>,
      default: 15
    },

    height: {
      type: [String, Number] as PropType<string | number>,
      default: 15
    },

    imgClass: {
      type: String as PropType<string>,
      default: ''
    }
  },

  setup (props) {
    const emptySrc = computed((): string => {
      return props.width && props.height ? emptySvgTemplate(props.width, props.height) : '/img/empty-placeholder.png'
    })

    return { emptySrc }
  }
})
</script>

<style lang="scss">
/*! purgecss start ignore */
.image-wrapper {
  .animate-blur-in,
  .animate-opacity {
    opacity: 0;
  }
  .animate-opacity {
    transition: all 0.25s ease;
  }

  &.lazy-img-loaded {
    .animate-blur-in {
      animation: roll-in-blurred-left 0.9s cubic-bezier(0.23, 1, 0.32, 1) both;
    }
    .animate-opacity {
      opacity: 1;
    }
  }
}
/*! purgecss end ignore */

@keyframes roll-in-blurred-left {
  0% {
    -webkit-filter: blur(50px);
    filter: blur(50px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
</style>
