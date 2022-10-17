<template>
  <button
    class="button transition duration-300 focus:outline-none"
    :class="[
      buttonSize,
      buttonRounded,
      buttonTypes,
      isUppercase && 'uppercase',
      disabled && 'is-disabled',
      getModeName
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { TIndexedObject } from '@/types'
import { useGlobal } from '@/global-setup/global.composition.setup'

type TTypes =
  'primary' |
  'white-outlined' |
  'purple-outlined' |
  'grey-outlined' |
  'grey-filled-gradient' |
  'grey-filled' |
  'primary-border-filled' |
  'primary-border' |
  'green-gradient' |
  'red-gradient' |
  'color-outlined' |
  'text' |
  'text-primary' |
  'purple-gradient' |
  'light-blue-gradient-filled'

type TSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xlg'

type TRounded = 'sm' | 'md' | 'xlg' | 'full'

const types: TIndexedObject<string> = Object.freeze({
  primary: 'is-primary',
  'white-outlined': 'is-white-outlined',
  'purple-outlined': 'is-purple-outlined',
  'grey-outlined': 'is-grey-outlined',
  'grey-filled-gradient': 'is-grey-filled-gradient',
  'grey-filled': 'is-grey-filled',
  'primary-border-filled': 'is-primary-border-filled',
  'primary-border': 'is-primary-border',
  'green-gradient': 'is-green-gradient',
  'red-gradient': 'is-red-gradient',
  'blue-gradient': 'is-blue-gradient',
  'purple-gradient': 'is-purple-gradient',
  'light-blue-gradient-filled': 'is-light-blue-gradient-filled',
  'color-outlined': 'is-color-outlined',
  text: 'is-text',
  'text-primary': 'is-text-primary'
})

export default defineComponent({
  name: 'AppButton',

  props: {
    type: {
      type: String as PropType<TTypes>,
      default: 'primary' // if you need to custom style (you can use type="custom")
    },

    size: {
      type: String as PropType<TSizes>,
      default: 'md'
    },

    rounded: {
      type: String as PropType<TRounded>,
      default: 'sm'
    },

    isUppercase: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['click'],

  setup (props) {
    const { getModeName } = useGlobal()

    const buttonSize = computed((): string => `size-${props.size}`)
    const buttonRounded = computed((): string => `rounded-${props.rounded}`)
    const buttonTypes = computed((): string => types[props.type])

    return { buttonSize, buttonRounded, buttonTypes, getModeName }
  }
})
</script>

<style lang="scss" scoped>
.button {
  &.size-xs {
    @apply text-xs;
  }

  &.size-sm {
    @apply text-sm;
  }

  &.size-md,
  &.size-lg,
  &.size-xlg {
    @apply text-base;
  }

  &.size-xs {
    min-height: 26px;
  }

  &.size-sm {
    min-height: 32px;
  }

  &.size-md {
    min-height: 36px;
  }

  &.size-lg {
    min-height: 40px;
  }

  &.size-xlg {
    min-height: 44px;
  }

  &.is-primary,
  &.is-white-outlined,
  &.is-purple-outlined,
  &.is-grey-outlined,
  &.is-grey-filled-gradient,
  &.is-grey-filled,
  &.is-primary-border-filled,
  &.is-primary-border,
  &.is-color-outlined,
  &.is-blue-gradient {
    @apply py-4 px-20;
  }

  &.is-primary {
    @apply bg-tradewind text-white font-semibold;

    &.is-disabled {
      @apply dark:bg-chicory-flower bg-compact-disc-grey;
    }

    &:not(.is-disabled) {
      @apply hover:bg-emerald-succulent active:bg-emerald-succulent;
    }
  }

  &.is-white-outlined {
    @apply border-solid border border-white text-white font-medium;

    &:not(.is-disabled) {
      @apply hover:bg-tradewind hover:bg-opacity-30 active:bg-tradewind;
    }
  }

  &.is-purple-outlined {
    @apply shadow bg-white text-true-lavender font-semibold;

    &:not(.is-disabled) {
      @apply hover:bg-true-lavender hover:text-white active:bg-true-lavender active:text-white;
    }
  }

  &.is-grey-outlined {
    @apply border-solid border
    border-beguiling-blue dark:border-kentucky-blue text-beguiling-blue dark:text-cashmere-blue font-medium;

    &:not(.is-disabled) {
      &:hover {
        @apply text-beguiling-blue dark:text-tradewind border-beguiling-blue dark:border-tradewind
        bg-moon-white dark:bg-tradewind dark:bg-opacity-10;
      }
      &:active {
        @apply text-white dark:text-tradewind border-beguiling-blue dark:border-tradewind
        bg-aerial-view dark:bg-transparent;
      }
    }
  }

  &.is-grey-filled-gradient {
    @apply text-white shadow-100 font-semibold;
    background: linear-gradient(128.47deg, #41536D 21.26%, rgba(45, 59, 80, 0.56) 78.06%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;

    &:not(.is-disabled) {
      &:hover {
      background: linear-gradient(128.47deg, rgba(45, 59, 80, 0.56) 21.26%, #41536D 78.06%),
      linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
      }
      &:active {
        background: linear-gradient(128.47deg, rgba(45, 59, 80, 0.56) 21.26%, #41536D 78.06%),
        linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
      }
    }
  }

  &.is-grey-filled {
    @apply bg-blair text-blair bg-opacity-10;

    &:not(.is-disabled) {
      @apply hover:bg-opacity-30 active:bg-opacity-100 active:text-white;
    }
  }

  &.is-primary-border-filled {
    @apply border border-solid border-chicory-flower dark:border-hidden-sea-glass
    bg-chicory-flower dark:bg-tradewind
    text-chicory-flower dark:text-white font-semibold bg-opacity-10 dark:bg-opacity-10;

    &:not(.is-disabled) {
      @apply hover:bg-cotton-ball dark:hover:bg-tradewind dark:hover:bg-opacity-30
      active:bg-chicory-flower dark:active:bg-tradewind
      active:border-chicory-flower dark:active:border-tradewind active:text-white;
    }
  }

  &.is-primary-border {
    @apply border border-solid border-chicory-flower dark:border-hidden-sea-glass
    text-chicory-flower dark:text-white font-semibold;

    &:not(.is-disabled) {
      @apply hover:bg-cotton-ball active:bg-chicory-flower active:text-white
       dark:hover:bg-cold-blue dark:hover:bg-opacity-10
       dark:active:bg-cold-blue dark:active:bg-opacity-30
      dark:active:border-hidden-sea-glass;
    }
  }

  &.is-green-gradient {
    @apply text-white font-semibold;
    background:
      linear-gradient(116.84deg, #66CB7C 15.11%, #387346 88.46%),
      linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
    &.is-dark {
      box-shadow: 0px 12px 27px rgba(0, 0, 0, 0.2), 0px 0px 27px rgba(102, 203, 125, 0.44);
    }

    &:not(.is-disabled) {
      &:hover,
      &:active {
        background:
          linear-gradient(282.84deg, #66CB7C 15.11%, #387346 88.46%),
          linear-gradient(116.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
      }
    }
  }

  &.is-red-gradient {
    @apply text-white font-semibold;
    background:
      linear-gradient(116.84deg, #CB6666 15.11%, #7E3A3A 88.46%),
      linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
    &.is-dark {
      box-shadow: 0px 12px 27px rgba(0, 0, 0, 0.2);
    }

    &:not(.is-disabled) {
      &:hover,
      &:active {
        background:
          linear-gradient(282.84deg, #CB6666 15.11%, #7E3A3A 88.46%),
          linear-gradient(116.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
      }
    }
  }

  &.is-blue-gradient {
    @apply text-white font-semibold;
    background: linear-gradient(180deg, #44A0AC 0%, #32DAF5 100%);

    &:not(.is-disabled) {
      &:hover,
      &:active {
        background:linear-gradient(282.84deg, #44A0AC 15.11%, #44A0AC 88.46%);
      }
    }
  }

  &.is-purple-gradient {
    @apply text-white font-semibold;
    background: linear-gradient(180deg, #8482D2 0%, #9A59C9 100%);

    &:not(.is-disabled) {
      &:hover,
      &:active {
        background: linear-gradient(282.84deg, #8482D2 15.11%, #9A59C9 88.46%);
      }
    }
  }

  &.is-light-blue-gradient-filled {
    @apply text-true-lavender font-semibold text-md2;
    border-radius: 30px;
    background: linear-gradient(180deg, #FFFFFF 0%, #D5F2F2 100%);
    box-shadow: 0px 12px 27px rgba(0, 0, 0, 0.15);

    &:not(.is-disabled) {
      &:hover,
      &:active {
        @apply text-blue-haze;
      }
    }
  }

  &.is-color-outlined {
    @apply border-solid border border-kentucky-blue py-4 px-20 text-cashmere-blue;
    &:not(.is-disabled) {
      &:hover {
        @apply text-tradewind border-tradewind bg-tradewind bg-opacity-10;
      }
      &:active {
        @apply text-tradewind border-tradewind bg-transparent;
      }
    }
  }

  &.is-text {
    @apply text-nile-blue dark:text-white font-semibold;

    &:not(.is-disabled) {
      @apply hover:text-opacity-60 active:text-opacity-100;
    }
  }

  &.is-text-primary {
    @apply text-tradewind font-medium;

    &:not(.is-disabled) {
      @apply hover:text-bianchi-green active:text-azure-tide;
    }
  }

  &.is-disabled {
    @apply cursor-not-allowed opacity-50;
  }
}
</style>
