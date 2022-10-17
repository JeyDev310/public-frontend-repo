<template>
  <div
    class="checkbox__inner flex items-center cursor-pointer"
    :class="[checkboxTypes, { 'is-checked': checked, 'is-disabled': disabled }]"
  >
    <div class="checkbox__wrap relative flex">
      <input
        :id="fieldId"
        class="absolute inset-0 w-full h-full opacity-0 z-1 cursor-pointer"
        type="checkbox"
        :checked="checked"
        :disabled="disabled"
        data-test="checkbox"
        @input="check()"
      >
      <AppIcon
        data-test="icon"
        :size="checkboxSize"
        :name="checkboxIcon"
        class="checkbox__icon transition duration-300"
      />
    </div>

    <label
      class="checkbox__label pl-10 cursor-pointer"
      :class="`text-${labelSize}`"
      :for="fieldId"
      data-test="label"
      @click.stop
    >
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { TIndexedObject } from '@/types'

type TTypes = 'primary' | 'secondary'

const types: TIndexedObject<string> = Object.freeze({
  primary: 'is-primary',
  secondary: 'is-secondary'
})

export default defineComponent({
  name: 'AppMultipleCheckbox',

  props: {
    value: {
      type: String as PropType<string>,
      required: true
    },

    fieldId: {
      type: String as PropType<string>,
      required: true
    },

    items: {
      type: Array,
      required: true
    },

    labelSize: {
      type: String as PropType<string>,
      default: 'xs'
    },

    type: {
      type: String as PropType<TTypes>,
      default: 'primary'
    },

    checkboxSize: {
      type: String as PropType<string>,
      default: '20'
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:items', 'toggleExchange'],

  setup (props, { emit }) {
    const checked = computed((): boolean => props.items.includes(props.value))

    function check (): void {
      if (props.disabled) return

      const updatedItems = [...props.items]
      if (checked.value) {
        updatedItems.splice(updatedItems.indexOf(props.value), 1)
      } else {
        updatedItems.push(props.value)
      }

      emit('update:items', updatedItems)
      emit('toggleExchange', props.value)
    }

    const checkboxTypes = computed((): string => types[props.type])

    const checkboxIcon = computed((): string => {
      if (props.type === 'primary') {
        return checked.value ? 'circle-checkbox-checked' : 'circle-checkbox'
      } else {
        return checked.value ? 'square-checkbox-checked' : 'square-checkbox'
      }
    })

    return { check, checked, checkboxTypes, checkboxIcon }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/app-checkbox";
</style>
