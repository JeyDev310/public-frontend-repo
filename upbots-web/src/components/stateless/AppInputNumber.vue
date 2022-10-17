<template>
  <div
    :class="[
      'input__wrap flex flex-col',
      { 'is-disabled' : disabled },
      { 'is-readonly': readonly},
      { 'is-error': errorMessage },
    ]"
  >
    <!-- INPUT LABEL -->
    <label v-if="label" :for="id || name" :class="[labelClasses, labelSize]">{{ label }}</label>

    <div data-test="inner-wrap" :class="['input__inner', inputSize, inputShadow, inputRounded]">
      <!-- INPUT -->
      <input
        :id="id || name || null"
        data-test="input"
        :value="modelValue"
        type="number"
        :placeholder="placeholder"
        :name="name"
        :min="min"
        :max="max"
        :readonly="readonly"
        :disabled="disabled"
        class="input w-full"
        :class="[isArrow && 'is-arrow']"
        @input="onInputHandler"
      >

      <!-- SLOT APPEND -->
      <slot name="append" />

      <div
        v-if="isArrow"
        class="absolute flex flex-col items-center justify-around h-full right-10 top-1/2 transform -translate-y-1/2"
        :class="disabled && 'cursor-not-allowed select-none'"
      >
        <AppIcon
          name="chevron-bold"
          size="12"
          :class="[disbaledUpArrow || disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer']"
          class="block text-kettleman dark:text-white transform -rotate-180"
          @click="changeAmount('up')"
        />
        <AppIcon
          name="chevron-bold"
          size="12"
          :class="[disbaledDownArrow || disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer']"
          class="block text-kettleman dark:text-white transform"
          @click="changeAmount('down')"
        />
      </div>

      <!-- ERROR MESSAGE -->
      <p v-show="errorMessage" class="absolute top-full w-full mt-3 text-xs text-peachy-pinky">
        <AppTruncatedTooltip :placement="errorTooltipPlacement" :content="errorMessage" />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import Decimal from 'decimal.js-light'

import { useField } from 'vee-validate'
import { Placement } from '@popperjs/core'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'AppInputNumber',

  props: {
    modelValue: {
      type: Number as PropType<number>,
      default: 0
    },

    step: {
      type: Object,
      default: () => ({ size: 1, value: 1 })
    },

    id: {
      type: String as PropType<string>,
      default: ''
    },

    name: {
      type: String as PropType<string>,
      default: ''
    },

    label: {
      type: String as PropType<string>,
      default: ''
    },

    labelClasses: {
      type: String as PropType<string>,
      default: 'inline-block text-nile-blue dark:text-let-it-snow leading-1 mb-6 cursor-pointer'
    },

    labelSize: {
      type: String as PropType<string>,
      default: 'text-base 4xl:text-md 5xl:text-lg'
    },

    min: {
      type: Number as PropType<number>,
      default: 0
    },

    max: {
      type: Number as PropType<number>,
      default: 1000000
    },

    placeholder: {
      type: String as PropType<string>,
      default: ''
    },

    errorTooltipPlacement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },

    size: {
      type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xlg'>,
      default: 'md'
    },

    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    inputRounded: {
      type: String as PropType<string>,
      default: 'rounded-sm'
    },

    isArrow: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue', 'change'],

  setup (props, { emit }) {
    const { isDarkMode } = useGlobal()

    const {
      value: inputValue,
      errorMessage,
      handleChange
    } = useField(props.name, undefined, {
      initialValue: props.modelValue
    })

    function onInputHandler (e: InputEvent): void {
      const target = e.target as HTMLInputElement

      emit('update:modelValue', Number(target.value))
      emit('change', Number(target.value))
      handleChange(e)
    }

    const inputSize = computed((): string => `size-${props.size}`)

    const inputShadow = computed((): string => isDarkMode.value ? 'shadow-700' : 'shadow-800')

    const disbaledUpArrow = computed((): boolean => props.modelValue >= props.max)

    const disbaledDownArrow = computed((): boolean => props.modelValue <= props.min)

    function changeAmount (value: string): void {
      const number = +props.modelValue

      if (value === 'down' && number <= 0) {
        return
      }

      Decimal.config({ rounding: props.step.size })
      const a = new Decimal(props.modelValue)

      let newValue

      if (value === 'up') {
        const val = a.plus(props.step.value || 0.1).toNumber()
        if (val > props.max) { return }
        newValue = val
      } else {
        const val = a.minus(props.step.value || 0.1).toNumber()
        if (val < props.min) { return }
        newValue = val
      }

      inputValue.value = newValue
      emit('update:modelValue', Number(newValue))
      emit('change', Number(newValue))
    }

    return {
      // For validation
      handleChange,
      errorMessage,
      inputValue,

      onInputHandler,
      inputSize,
      inputShadow,
      disbaledUpArrow,
      disbaledDownArrow,

      changeAmount
    }
  }
})
</script>

<style lang="scss" scoped>
.input {
  &__wrap {
    &:not(.is-disabled):not(.is-readonly):not(.is-error) .input__wrap-inner {
      @apply dark:hover:border-tradewind dark:focus-within:border-tradewind;
    }

    &.is-error {
      .input {
        &__inner {
          @apply border-peachy-pinky;
        }
      }
    }

    &.is-readonly {
      .input {
        &__inner {
          @apply bg-opacity-20 dark:bg-opacity-30;
        }
      }
    }

    &.is-disabled {
      .input {
        &__inner {
          @apply opacity-50 select-none cursor-not-allowed;
        }
      }
    }
  }

  &__inner {
    @apply
      relative
      bg-whiteout
      inline-flex
      border border-solid border-transparent
      dark:bg-black
      dark:bg-opacity-10
      focus:outline-none transition duration-300;

    &.size-md,
    &.size-lg,
    &.size-xlg {
      .input {
        @apply text-base;
      }
    }

    &.size-xs,
    &.size-sm {
      .input {
        @apply text-sm;
      }
    }

    &.size-xs {
      @apply h-28;
    }

    &.size-sm {
      @apply h-32;
    }

    &.size-md {
      height: 35px;
    }

    &.size-lg {
      height: 38px;
    }

    &.size-xlg {
      height: 42px;
    }
  }
}

.input {
  @apply
    px-10
    bg-transparent
    text-base
    text-bluster-blue
    dark:text-white
    placeholder-bluster-blue
    dark:placeholder-white
    focus:outline-none;

  &:disabled {
    @apply pointer-events-none;
  }

  &.is-arrow {
    @apply pr-30;
  }
}
</style>
