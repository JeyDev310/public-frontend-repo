<template>
  <div class="radio-button__wrap" :class="disabled && 'is-disabled'">
    <input
      :id="uid"
      :value="modelValue"
      :checked="isChecked"
      :disabled="disabled"
      v-bind="$attrs"
      data-test="radio"
      type="radio"
      class="radio-button"
      @change="$emit('update:modelValue', inputValue || label)"
    >

    <label data-test="label" class="radio-button__label flex" :class="radioSize" :for="uid">
      {{ label }}
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, PropType } from 'vue'

type TSizes = 'sm' | 'md' | 'lg'

export default defineComponent({
  name: 'AppRadio',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: null
    },

    inputValue: {
      type: String as PropType<string>,
      default: null
    },

    label: {
      type: String as PropType<string>,
      require: true
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    size: {
      type: String as PropType<TSizes>,
      default: 'sm'
    }
  },

  emits: ['update:modelValue'],

  setup (props) {
    const uid = getCurrentInstance()?.uid

    const radioSize = computed((): string => `size-${props.size}`)

    const isChecked = computed((): boolean => props.modelValue === (props.inputValue || props.label))

    return { isChecked, uid, radioSize }
  }
})
</script>

<style lang="scss" scoped>
.radio-button {
  @apply hidden;

  &__wrap {
    &:not(.is-disabled) {
      .radio-button {
        &__label {
          &:hover {
            &:after {
              @apply border-chicory-flower dark:border-blair
              bg-chicory-flower bg-opacity-20 dark:bg-blair dark:bg-opacity-20;
            }
          }
        }
      }
    }

    .radio-button:checked + .radio-button__label:before, .radio-button__label:hover:before {
      @apply bg-chicory-flower dark:bg-blair;
    }

    .radio-button:checked + .radio-button__label:after, .radio-button__label:hover:after {
      @apply border-chicory-flower dark:border-blair;
    }

    &.is-disabled {
      @apply opacity-50 select-none cursor-not-allowed;

      .radio-button {
        &__label {
          @apply pointer-events-none;
        }
      }
    }
  }

  &__label {
    @apply
      relative
      text-xs
      text-chicory-flower
      dark:text-blair
      cursor-pointer
      focus:outline-none
      transition duration-300;

    &:before,
    &:after {
      @apply
        absolute top-1/2 transform -translate-y-1/2
        rounded-full
        transition duration-300;

      content: "";
    }

    &:after {
      @apply left-0 border border-solid border-chicory-flower dark:border-blair;
    }

    &.size-sm {
      @apply pl-30 text-base;

      &:before {
        @apply w-10 h-10;
        left: 5px;
      }

      &:after {
        @apply w-20 h-20;
      }
    }

    &.size-md {
      @apply text-md;
      padding-left: 42px;

      &:before {
        @apply w-14 h-14;
        left: 7px;
      }

      &:after {
        @apply w-28 h-28;
      }
    }

    &.size-lg {
      @apply text-lg;
      padding-left: 54px;

      &:before {
        @apply w-18 h-18;
        left: 9px;
      }

      &:after {
        @apply w-36 h-36;
      }
    }
  }
}
</style>
