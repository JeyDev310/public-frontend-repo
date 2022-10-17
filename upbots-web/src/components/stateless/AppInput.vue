<template>
  <div
    :class="[
      'input__wrap flex flex-col',
      { 'is-disabled' : disabled },
      { 'is-readonly': readonly},
      { 'is-copy': allowCopy},
      { 'is-error': errorMessage },
    ]"
  >
    <!-- INPUT LABEL -->
    <label v-if="label" :for="id || name" :class="[labelClasses, labelSize]">{{ label }}</label>

    <div
      data-test="inner-wrap"
      class="input__inner border"
      :class="[innerClasses, inputSize, inputShadow, inputRounded]"
    >
      <!-- SLOT PREPEND -->
      <slot name="prepend" />

      <!-- INPUT -->
      <input
        :id="id || name || null"
        data-test="input"
        :autocomplete="autocomplete"
        :value="inputValue"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :readonly="readonly"
        :disabled="disabled"
        class="input w-full"
        :class="[showLastDigits && 'is-last-digits', allowCopy && 'is-allow-copy']"
        @input="onInputHandler"
      >

      <!-- SHOW DIGITS -->
      <span
        v-if="showLastDigits"
        data-test="last-digits"
        class="absolute top-0 right-0 flex items-center h-full px-10 text-rushing-river dark:text-searching-blue"
      >
        {{ lastDigits }}
      </span>

      <!-- COPY -->
      <span
        v-if="allowCopy"
        data-test="copy-trigger"
        class="absolute flex items-center justify-center top-0 right-0 bottom-0 w-36"
      >
        <AppIcon
          name="copy"
          size="20"
          class="text-bluster-blue dark:text-white"
          :class="disabled ? 'cursor-not-allowed' : 'cursor-copy'"
          @click="$emit('on-copy', inputValue)"
        />
      </span>

      <!-- SLOT APPEND -->
      <slot name="append" />

      <!-- ERROR MESSAGE -->
      <p v-show="errorMessage" class="absolute top-full w-full mt-3 text-xs text-peachy-pinky">
        <AppTruncatedTooltip :placement="errorTooltipPlacement" :content="errorMessage" />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'

import { useField } from 'vee-validate'
import { Placement } from '@popperjs/core'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'AppInput',

  props: {
    id: {
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

    autocomplete: {
      type: String as PropType<string>,
      default: 'off'
    },

    modelValue: {
      type: String as PropType<string>,
      default: ''
    },

    placeholder: {
      type: String as PropType<string>,
      default: ''
    },

    innerClasses: {
      type: String as PropType<string>,
      default: ''
    },

    errorTooltipPlacement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },

    name: {
      type: String as PropType<string>,
      default: ''
    },

    type: {
      type: String as PropType<string>,
      default: 'text'
    },

    size: {
      type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xlg'>,
      default: 'md'
    },

    showLast: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    allowCopy: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    inputRounded: {
      type: String as PropType<string>,
      default: 'rounded-sm'
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue', 'on-copy'],

  setup (props, { emit }) {
    const { isDarkMode } = useGlobal()

    const {
      value: inputValue,
      errorMessage,
      handleChange,
      meta
    } = useField(props.name, undefined, {
      initialValue: props.modelValue
    })

    const showPassword = ref<boolean>(false)

    function onInputHandler (e: InputEvent): void {
      const target = e.target as HTMLInputElement

      emit('update:modelValue', target.value)
      handleChange(e)
    }

    const lastDigits = computed((): string => inputValue.value.substring(inputValue.value.length - 4))

    const showLastDigits = computed((): boolean => props.showLast && inputValue.value.length > 4)

    const inputSize = computed((): string => `size-${props.size}`)

    const inputShadow = computed((): string => isDarkMode.value ? 'shadow-700' : 'shadow-800')

    return {
      handleChange,
      errorMessage,
      inputValue,
      meta,
      showPassword,
      onInputHandler,
      lastDigits,
      showLastDigits,
      inputSize,
      inputShadow
    }
  }
})
</script>

<style lang="scss" scoped>
.input {
  &__wrap {
    &:not(.is-disabled):not(.is-readonly):not(.is-copy):not(.is-error) .input__inner {
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

  &.is-last-digits {
    @apply pr-60;
  }

  &.is-allow-copy {
    @apply pr-40;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000000s ease-in-out 0s;
    -webkit-text-fill-color: theme('colors.bluster-blue') !important;
    font-size: inherit;
  }

  html.dark input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
    transition: background-color 5000000s ease-in-out 0s;
    -webkit-text-fill-color: theme('colors.white') !important;
    font-size: inherit;
  }
}
</style>
