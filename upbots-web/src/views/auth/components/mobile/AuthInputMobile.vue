<template>
  <div
    :class="[
      'input__wrap flex flex-col',
      { 'is-disabled' : disabled },
      { 'is-readonly': readonly},
      { 'is-error': errorMessage },
    ]"
  >
    <div
      class="
        input__inner
        relative
        inline-flex
        bg-black
        border
        border-solid
        border-transparent
        bg-opacity-10
        text-md2
        focus:outline-none
        transition
        duration-300
      "
    >
      <!-- PREPEND ICON -->
      <AppIcon
        v-if="prependIcon"
        :name="prependIcon"
        :size="prependIconSize"
        :class="prependIconStyles"
        class="flex items-center justify-center pl-20"
      />

      <!-- INPUT -->
      <input
        :id="id || name || null"
        :autocomplete="autocomplete"
        :value="inputValue"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :readonly="readonly"
        :disabled="disabled"
        class="
          input
          w-full
          bg-transparent
          text-md2
          text-let-it-snow
          px-20
          placeholder-let-it-snow
          focus:outline-none
        "
        @input="onInputHandler"
      >

      <!-- SLOT APPEND -->
      <slot name="append" />

      <!-- ERROR MESSAGE -->
      <p
        v-show="errorMessage"
        class="absolute top-full w-full mt-3 text-xs font-medium text-peachy-pinky"
      >
        <AppTruncatedTooltip :placement="errorTooltipPlacement" :content="errorMessage" />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useField } from 'vee-validate'
import { Placement } from '@popperjs/core'

export default defineComponent({
  name: 'AuthInputMobile',

  props: {
    modelValue: {
      type: String as PropType<string>,
      default: ''
    },

    id: {
      type: String as PropType<string>,
      default: ''
    },

    name: {
      type: String as PropType<string>,
      default: ''
    },

    placeholder: {
      type: String as PropType<string>,
      default: ''
    },

    type: {
      type: String as PropType<string>,
      default: 'text'
    },

    autocomplete: {
      type: String as PropType<string>,
      default: 'off'
    },

    prependIcon: {
      type: String as PropType<string>,
      default: ''
    },

    prependIconSize: {
      type: String as PropType<string>,
      default: '16'
    },

    prependIconStyles: {
      type: String as PropType<string>,
      default: 'text-let-it-snow text-md'
    },

    errorTooltipPlacement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },

    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const {
      value: inputValue,
      errorMessage,
      handleChange
    } = useField(props.name, undefined, {
      initialValue: props.modelValue
    })

    function onInputHandler (e: InputEvent): void {
      const target = e.target as HTMLInputElement

      emit('update:modelValue', target.value)
      handleChange(e)
    }

    return {
      inputValue,
      errorMessage,
      handleChange,
      onInputHandler
    }
  }
})
</script>

<style lang="scss" scoped>
.input {
  height: 46px;

  &__wrap {
    &:not(.is-disabled):not(.is-readonly):not(.is-error) {
      .input {
        &__inner {
          @apply focus-within:border-stoic-white;
        }
      }
    }

    &.is-error {
      .input {
        &__inner {
          @apply border border-peachy-pinky;
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
    border-radius: 30px;
    box-shadow: inset 0px 7px 15px rgba(0, 0, 0, 0.14);
  }
}

.input {
  &:disabled {
    @apply pointer-events-none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
   transition: background-color 5000000s ease-in-out 0s;
   -webkit-text-fill-color: theme('colors.let-it-snow') !important;
   font-size: inherit;
  }
}
</style>
