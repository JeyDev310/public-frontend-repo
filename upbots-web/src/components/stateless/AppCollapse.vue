<template>
  <div>
    <!-- IF DATA -->
    <slot v-if="data.length" />

    <!-- NO DATA AVAILABLE -->
    <div v-else class="flex flex-grow items-center justify-center text-nile-blue dark:text-let-it-snow p-20">
      No data
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, toRefs, readonly } from 'vue'
import { TIndexedObject } from '@/types'

export default defineComponent({
  name: 'AppCollapse',

  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => []
    },

    data: {
      type: Array as PropType<TIndexedObject[]>,
      required: true
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const { modelValue } = toRefs(props)

    function handleChangeCollapseItem (value: string[]): void {
      emit('update:modelValue', value)
    }

    provide('activeNames', readonly(modelValue))
    provide('change', handleChangeCollapseItem)
  }
})
</script>
