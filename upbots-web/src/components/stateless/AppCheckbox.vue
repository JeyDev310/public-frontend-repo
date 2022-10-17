<template>
  <div
    class="checkbox__inner group flex items-center cursor-pointer"
    :class="[checkboxTypes, { 'is-checked': modelValue, 'is-disabled': disabled }]"
  >
    <div class="checkbox__wrap relative flex">
      <input
        :id="uid"
        class="absolute inset-0 w-full h-full opacity-0 z-1 cursor-pointer"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        data-test="checkbox"
        @input="onInputHandler"
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
      :for="uid"
      data-test="label"
      @click.stop
    >
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, PropType, computed } from 'vue'
import { TIndexedObject } from '@/types'

type TTypes = 'primary' | 'secondary' | 'tertiary'

const types: TIndexedObject<string> = Object.freeze({
  primary: 'is-primary',
  secondary: 'is-secondary',
  tertiary: 'is-tertiary'
})

export default defineComponent({
  name: 'AppCheckbox',

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    type: {
      type: String as PropType<TTypes>,
      default: 'primary'
    },

    checkboxSize: {
      type: String as PropType<string>,
      default: '20'
    },

    labelSize: {
      type: String as PropType<string>,
      default: 'xs'
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue', 'change'],

  setup (props, { emit }) {
    const currentInstance = getCurrentInstance()
    const uid = currentInstance?.uid

    const checkboxTypes = computed((): string => types[props.type])

    const checkboxIcon = computed((): string => {
      if (props.type === 'secondary') return props.modelValue ? 'square-checkbox-checked' : 'square-checkbox'
      return props.modelValue ? 'circle-checkbox-checked' : 'circle-checkbox'
    })

    function onInputHandler (e: InputEvent) {
      const target = e.target as HTMLInputElement

      emit('update:modelValue', target.checked)
      emit('change', target.checked)
    }

    return {
      uid,
      checkboxTypes,
      checkboxIcon,
      onInputHandler
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/components/app-checkbox";
</style>
