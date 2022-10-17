<template>
  <ul
    ref="wrapper"
    class="pagination__wrap relative inline-flex items-center justify-start max-w-full m-0 pl-0 list-none"
    :class="{ 'is-disabled': disabled }"
  >
    <li ref="navPrev" class="flex items-center">
      <button
        type="button"
        class="pagination__item items-center"
        :class="[isFirst ? 'is-disabled' : 'cursor-pointer']"
        data-test="prev"
        v-on="isFirst ? {} : { click: goPrevious }"
      >
        <AppIcon name="chevron-thin" class="pagination__chevron transform rotate-90" />
      </button>
    </li>

    <li v-for="(item, index) in items" :key="item + index" class="flex items-center">
      <!-- ... -->
      <span
        v-if="isNaN(Number(item))"
        class="pagination__item items-end text-stone-silver dark:text-white"
        data-test="item"
      >
        {{ item }}
      </span>

      <!-- items -->
      <button
        v-else
        type="button"
        class="pagination__item items-center"
        :class="item === modelValue ? 'is-active text-white' : 'text-bering-wave dark:text-white'"
        data-test="item"
        @click="clickItem(item)"
      >
        {{ item }}
      </button>
    </li>

    <li ref="navNext" class="flex items-center">
      <button
        type="button"
        class="pagination__item items-center"
        :class="[isLast ? 'is-disabled' : 'cursor-pointer']"
        data-test="next"
        v-on="isLast ? {} : { click: goNext }"
      >
        <AppIcon name="chevron-thin" class="pagination__chevron transform -rotate-90" />
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue'
import { useElementSize } from '@vueuse/core'

export default defineComponent({
  name: 'AppPagination',

  props: {
    modelValue: {
      type: Number,
      required: true
    },

    length: {
      type: Number,
      default: 0
    },

    pages: {
      type: Number,
      default: null
    },

    total: {
      type: Number,
      default: null
    },

    limit: {
      type: Number,
      default: 7
    },

    totalVisible: {
      type: Number,
      default: 7
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'change'],

  setup (props, { emit }) {
    const wrapper = ref() as Ref<HTMLElement>
    const navNext = ref() as Ref<HTMLElement>
    const { width: wrapperWidth } = useElementSize(wrapper)
    const { width: navNextWidth, height: navNextHeight } = useElementSize(navNext)
    const maxButtons = computed(() => {
      return Math.floor(
        (wrapperWidth.value - navNextWidth.value * 2) / navNextHeight.value
      )
    })

    const length = computed(() => {
      if (props.pages) return props.pages

      return Math.ceil(props.total / props.limit)
    })

    const isFirst = computed(() => props.modelValue <= 1)
    const isLast = computed(() => props.modelValue >= length.value)

    function goNext (e: Event) {
      if (props.disabled) return

      e.preventDefault()
      emit('update:modelValue', props.modelValue + 1)
      emit('change', props.modelValue + 1)
    }

    function goPrevious (e: Event) {
      if (props.disabled) return

      e.preventDefault()
      emit('update:modelValue', props.modelValue - 1)
      emit('change', props.modelValue - 1)
    }

    function clickItem (item: number) {
      if (props.disabled) return

      emit('update:modelValue', item)
      emit('change', item)
    }

    function getRange (from: number, to: number) {
      const range = []
      from = from > 0 ? from : 1
      for (let i = from; i <= to; i++) { range.push(i) }

      return range
    }

    const items = computed(() => {
      const maxLength = props.totalVisible > maxButtons.value
        ? maxButtons.value
        : props.totalVisible || maxButtons.value

      if (length.value <= maxLength || maxLength < 1) {
        return getRange(1, length.value)
      }

      const even = maxLength % 2 === 0 ? 1 : 0
      const left = Math.floor(maxLength / 2)
      const right = length.value - left + 1 + even

      if (props.modelValue > left && props.modelValue < right) {
        const start = props.modelValue - left + 2
        const end = props.modelValue + left - 2 - even

        return [1, '...', ...getRange(start, end), '...', length.value]
      } else if (props.modelValue === left) {
        const end = props.modelValue + left - 1 - even

        return [...getRange(1, end), '...', length.value]
      } else if (props.modelValue === right) {
        const start = props.modelValue - left + 1

        return [1, '...', ...getRange(start, length.value)]
      } else {
        return [...getRange(1, left), '...', ...getRange(right, length.value)]
      }
    })

    return {
      maxButtons,
      navNext,
      wrapper,

      isFirst,
      isLast,

      goNext,
      goPrevious,
      clickItem,
      items
    }
  }
})
</script>

<style lang="scss" scoped>
.pagination {
  &__wrap {
    min-width: 365px;

    &.is-disabled {
      @apply cursor-not-allowed opacity-50;

      .pagination__item {
        @apply pointer-events-none;
      }
    }
  }

  &__item {
    @apply
      inline-flex justify-center
      w-32 h-32
      mx-4
      rounded-sm
      outline-none transition duration-300;

    &[type=button]:not(.is-active) {
      @apply
        group
        bg-periwinkle-gray dark:bg-dark-slate-blue
        hover:text-white
        active:text-white;

      &:not(.is-disabled) {
        @apply
          hover:bg-aqua-fresco dark:hover:bg-blue-bayberry
          active:bg-deep-blue-sea dark:active:bg-sultans-silk;

        &:hover,
        &:active {
          .pagination__chevron {
            @apply transition text-white;
          }
        }
      }
    }

    &.is-active {
      @apply bg-tradewind;
    }

    &.is-disabled {
      @apply opacity-40 cursor-not-allowed;
    }
  }
}
</style>
