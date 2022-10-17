<template>
  <div class="flex">
    <div class="relative">
      <div>
        <AppIcon
          v-for="item in 5"
          :key="item"
          :size="size"
          name="star"
          aria-hidden="true"
          class="text-blair text-opacity-30 mr-5 last:mr-0"
        />
      </div>

      <div
        data-test="fill-line"
        class="absolute top-0 overflow-hidden text-chicory-flower dark:text-blair"
        :style="calculateRating"
      >
        <AppIcon
          v-for="item in 5"
          :key="item"
          :size="size"
          name="star"
          aria-hidden="true"
          class="mr-5 last:mr-0"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

export default defineComponent({
  name: 'AppRating',

  props: {
    modelValue: {
      type: Number,
      required: true,
      validator: (prop: number) => prop <= 5 && prop >= 0
    },

    size: {
      type: String as PropType<string>,
      default: '18'
    }
  },

  setup (props) {
    const calculateRating = computed((): { width: string; } => {
      const val = (100 * props.modelValue) / 5
      return { width: `${val}%` }
    })

    return { calculateRating }
  }
})
</script>
