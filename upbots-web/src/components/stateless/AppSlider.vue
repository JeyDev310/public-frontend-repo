<template>
  <div class="flex flex-col">
    <div class="slider" :class="disabled && 'opacity-50 select-none cursor-not-allowed'">
      <div
        ref="wrapper"
        role="group"
        data-test="range-wrap"
        class="slider__wrap"
        :class="getModeName"
        :style="cssVars"
      >
        <div class="slider__track" />
        <input
          v-model="rangeOne"
          class="slider__input"
          type="range"
          data-test="range-one"
          :min="min"
          :max="max"
          :step="step"
          :disabled="disabled"
          @change="({ target: { value } }) => handleChange(value, '1')"
          @input="({ target: { value } }) => handleChange(value, '1')"
        >
        <input
          v-if="multiple"
          v-model="rangeTwo"
          class="slider__input"
          type="range"
          data-test="range-two"
          :min="min"
          :max="max"
          :step="step"
          :disabled="disabled"
          @change="({ target: { value } }) => handleChange(value, '2')"
          @input="({ target: { value } }) => handleChange(value, '2')"
        >
      </div>
    </div>

    <div v-if="isSliderValue" class="flex justify-between">
      <span class="text-bluster-blue dark:text-skylar" :class="labelClasses">
        {{ !multiple ? `${Math.trunc(modelValue)}%` : `${modelValue[0]}%, ${modelValue[1]}%` }}
      </span>
      <span class="text-brainstem-grey dark:text-blair" :class="labelClasses">
        {{ `${max}%` }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue'
import { useElementBounding } from '@vueuse/core'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'AppSlider',

  props: {
    modelValue: {
      type: Array as PropType<number[]>,
      default: () => [0, 0]
    },

    multiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    min: {
      type: [String, Number] as PropType<string | number>,
      default: 0
    },

    max: {
      type: [String, Number] as PropType<string | number>,
      default: 100
    },

    step: {
      type: [String, Number] as PropType<string | number>,
      default: 1
    },

    isSliderValue: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    labelClasses: {
      type: String as PropType<string>,
      default: ''
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue', 'changed', 'input'],

  setup (props, { emit }) {
    const { getModeName } = useGlobal()

    const wrapper = ref(null)

    const rangeOne = computed({
      get: () => props.modelValue[0],
      set: (value) => {
        const modelValueCopy = props.modelValue.slice()
        modelValueCopy[0] = Number(value)

        emit('update:modelValue', modelValueCopy)
      }
    })

    const rangeTwo = computed({
      get: () => props.multiple ? props.modelValue[1] || 0 : 0,
      set: (value) => {
        const modelValueCopy = props.modelValue.slice()

        if (props.multiple) {
          modelValueCopy[1] = Number(value)
          emit('update:modelValue', modelValueCopy)
        } else {
          modelValueCopy[0] = Number(value)
          emit('update:modelValue', modelValueCopy)
        }
      }
    })

    const { width } = useElementBounding(wrapper)
    const cssVars = computed(() => ({
      '--a': rangeOne.value,
      '--b': rangeTwo.value,
      '--min': props.min,
      '--max': props.max,
      '--w': width.value,
      '--modifier': props.multiple ? 1 : 0
    }))

    function handleChange (value: string, slider: string): void {
      const modelValueCopy = props.modelValue.slice()

      if (slider === '1') {
        modelValueCopy[0] = Number(value)

        emit('changed', modelValueCopy)
        emit('input', modelValueCopy)
      }

      if (slider === '2') {
        if (props.multiple) {
          modelValueCopy[1] = Number(value)
          emit('changed', modelValueCopy)
          emit('input', modelValueCopy)
        } else {
          modelValueCopy[0] = Number(value)
          emit('changed', modelValueCopy)
          emit('input', modelValueCopy)
        }
      }
    }

    return {
      getModeName,
      rangeOne,
      rangeTwo,
      wrapper,
      cssVars,
      handleChange
    }
  }
})
</script>

<style lang="scss" scoped>
@mixin track() {
  @apply w-full h-full bg-none;
}

@mixin thumb() {
  @apply bg-bel-air-blue-second dark:bg-skylar rounded-full cursor-pointer;

  transform: translateY(calc(-50% + 2px));
  width: 22px;
  height: 22px;
  pointer-events: auto;
  box-sizing: border-box;
  box-shadow: none;

  &:not(:disabled) {
    &:hover {
      @apply w-30 h-30;
    }
  }

  &:not(:disabled) {
    &:active {
      @apply w-30 h-30;
      cursor: grabbing;
    }
  }
}

.slider {
  @apply flex items-center h-30 overflow-hidden;

  &__wrap {
    --h: 4;
    --th: 44;
    --d: .5*var(--th);
    --r: calc((.5*var(--d) * var(--modifier)) * 1px);
    --uw: calc((var(--w) - var(--d)) * 1px);
    --height: calc(var(--h) * 1px);
    --width: calc(var(--w) * 1px);
    --dif: calc(var(--max) - var(--min));

    @apply grid;
    grid-template: repeat(2, max-content) 4px/1fr 1fr;

    width: var(--width);
    height: var(--height);
    @apply relative w-full bg-boundless bg-opacity-30 dark:bg-skylar dark:bg-opacity-40;

    &::before, &::after {
      content: "";
      grid-column: 1/span 2;
      grid-row: 3;
      height: var(--height);
    }

    &.is-dark {
      &::before, &::after {
        background: linear-gradient(90deg, #407672 0%, #60BCB5 100%);
      }
    }

    &.is-light {
      &::before, &::after {
        background: linear-gradient(90deg, #5F748F 0%, #9AB0CD 100%);
      }
    }

    &::before {
      margin-left: calc(
        var(--r) + (var(--a) - var(--min)) / var(--dif) * var(--uw)
      );
      width: calc(
        (var(--b) - var(--a)) / var(--dif) * var(--uw)
      );
    }

    &::after {
      margin-left: calc(
        var(--r) + (var(--b) - var(--min)) / var(--dif) * var(--uw)
      );
      width: calc(
        (var(--a) - var(--b)) / var(--dif) * var(--uw)
      );
    }
  }

  &__track {
    @apply absolute top-0 left-0 w-full;

    height: var(--height);
  }

  &__input[type=range] {
    &::-webkit-slider-runnable-track,
    &::-webkit-slider-thumb, & {
      -webkit-appearance: none
    }

    grid-column: 1/span 2;
    grid-row: 3;
    @apply -top-0 left-0 m-0 pointer-events-none z-1 bg-boundless bg-opacity-30 dark:bg-skylar dark:bg-opacity-30;

    &::-webkit-slider-runnable-track { @include track; }
    &::-moz-range-track { @include track; }

    &::-webkit-slider-thumb { @include thumb; }
    &::-moz-range-thumb { @include thumb; }

    &:focus {
      @apply outline-none;
      z-index: 2;
    }
  }
}
</style>
