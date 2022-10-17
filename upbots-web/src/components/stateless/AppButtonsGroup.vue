<template>
  <div class="buttons-group flex" :class="[buttonSize, buttonTypes, isDarkMode && 'is-dark']">
    <template v-for="item in options" :key="item.value">
      <Compute
        #default="{ isDisabled }"
        :isDisabled="disabled || disabledOptions.includes(item.value)"
      >
        <button
          data-test="item"
          class="buttons-group__item flex justify-center items-center focus:outline-none cursor-pointer"
          :class="[
            buttonTypes,
            isDarkMode && 'is-dark',
            { 'is-active': item.value === modelValue },
            { 'is-disabled': isDisabled }
          ]"
          :style="[`width: ${width}`]"
          :disabled="isDisabled"
          @click="isDisabled ? null : setSelection(item)"
        >
          <span
            class="buttons-group__item-label"
            :class="item.value !== modelValue && 'text-opacity-50'"
          >
            <AppTruncatedTooltip :content="item.label" />
          </span>
        </button>
      </Compute>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { TIndexedObject } from '@/types'
import { useGlobal } from '@/global-setup/global.composition.setup'

type TSelectOption = TIndexedObject<string | number>
type TSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xlg'
type TTypes = 'outlined' | 'badge' | 'underline' | 'filled'

const types: TIndexedObject<string> = Object.freeze({
  outlined: 'is-outlined',
  badge: 'is-badge',
  underline: 'is-underline',
  filled: 'is-filled'
})

export default defineComponent({
  name: 'AppButtonsGroup',

  props: {
    modelValue: {
      type: [Number, String],
      required: true
    },

    width: {
      type: String as PropType<string>,
      default: 'auto'
    },

    options: {
      type: Array as PropType<Array<TSelectOption>>,
      required: true,
      validator: (prop: TSelectOption) => prop.length > 1
    },

    size: {
      type: String as PropType<TSizes>,
      default: 'md'
    },

    type: {
      type: String as PropType<TTypes>,
      default: ''
    },

    disabledOptions: {
      type: Array as PropType<Array<string | number>>,
      default: () => []
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue', 'change'],

  setup (props, { emit }) {
    const { isDarkMode } = useGlobal()

    const buttonSize = computed((): string => props.type !== 'badge' ? `size-${props.size}` : '')

    const buttonTypes = computed((): string => types[props.type])

    function setSelection (option: TSelectOption): void {
      emit('update:modelValue', option.value)
      emit('change', option.value)
    }

    return { isDarkMode, buttonSize, buttonTypes, setSelection }
  }
})
</script>

<style lang="scss" scoped>
.buttons-group {
  &.is-filled {
     @apply flex items-center justify-between h-40 bg-coconut-white px-5 rounded-xl1;
     box-shadow: inset 0px 10px 18px #CCD7E4;

     &.is-dark {
       @apply bg-black bg-opacity-10;
       box-shadow: inset 0px 10px 18px rgba(0, 0, 0, 0.25);
     }
  }

  &__item {
    @apply transition duration-300;

    &:not(.is-badge):not(.is-underline):not(.is-outlined):not(.is-filled) {
      @apply
        first:ml-0 -ml-1
        py-2 px-14
        border border-solid border-tradewind border-opacity-50;

      .buttons-group {
        &__item-label {
          @apply text-white;
        }
      }

      &:not(.is-active) {
        .buttons-group {
          &__item-label {
            @apply text-tradewind dark:text-white text-opacity-100 dark:text-opacity-50;
          }
        }
      }

      &:not(.is-active):not(.is-disabled) {
        @apply hover:bg-tradewind hover:bg-opacity-10 hover:border-hidden-sea-glass;

        &:hover {
          .buttons-group {
            &__item-label {
              @apply transition text-opacity-100;
            }
          }
        }
      }

      &:first-child {
        @apply rounded-l-sm;
      }

      &:last-child {
        @apply rounded-r-sm;
      }

      &.is-active {
        @apply bg-tradewind border-tradewind z-1;
      }
    }

    &.is-filled {
      @apply h-32 rounded-full;

      &.is-active {
        @apply bg-white;

        &.is-dark {
          background: linear-gradient(128.47deg, #41536D 21.26%, rgba(45, 59, 80, 0.56) 78.06%),
          linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
          box-shadow: 0px 12px 27px rgba(0, 0, 0, 0.25), 0px 28px 42px rgba(0, 0, 0, 0.08);
        }

        .buttons-group {
          &__item-label {
            @apply dark:text-white;
          }
        }
      }

      .buttons-group {
        &__item-label {
          @apply text-beguiling-blue dark:text-frills;
        }
      }
    }

    &.is-badge {
      @apply py-2 px-14 rounded-xlg;

      .buttons-group {
        &__item-label {
          @apply text-cold-blue font-medium;
        }
      }

      &.is-active {
        @apply border border-solid border-chicory-flower dark:border-hidden-sea-glass;

        .buttons-group {
          &__item-label {
            @apply text-chicory-flower dark:text-white;
          }
        }
      }
    }

    &.is-underline {
      @apply relative py-6 px-14;

      &:after {
        @apply absolute left-0 bottom-0 w-full h-1 bg-blair bg-opacity-50;
        content: '';
      }

      .buttons-group {
        &__item-label {
          @apply text-beguiling-blue dark:text-blair font-medium;
        }
      }

      &.is-active {
        @apply relative;

        &:after {
          @apply absolute left-0 bottom-0 w-full h-2 bg-beguiling-blue dark:bg-tradewind;
          content: '';
        }

        .buttons-group {
          &__item-label {
            @apply text-beguiling-blue dark:text-tradewind font-semibold;
          }
        }
      }
    }

    &.is-outlined {
      @apply border border-solid border-chicory-flower dark:border-kentucky-blue
        py-2 px-14 mr-16 last:mr-0 rounded-xlg;

      .buttons-group {
        &__item-label {
          @apply text-chicory-flower dark:text-cashmere-blue font-medium;
        }
      }

      &.is-active {
        @apply border-2 border-chicory-flower dark:border-hidden-sea-glass;

        .buttons-group {
          &__item-label {
            @apply text-chicory-flower dark:text-hidden-sea-glass font-semibold;
          }
        }
      }

      &:not(.is-disabled) {
        &:hover {
          @apply border-2 border-hidden-sea-glass;
          .buttons-group {
            &__item-label {
              @apply text-hidden-sea-glass;
            }
          }
        }
      }

      &:not(.is-active) {
        .buttons-group {
          &__item-label {
            @apply text-opacity-60;
          }
        }
        @apply border-opacity-60 text-opacity-60;
      }
    }

    &.is-disabled {
      @apply cursor-not-allowed opacity-50;
    }
  }

  &__item-label {
    @apply font-semibold transition duration-300;
  }

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

  &.size-lg2 {
    min-height: 42px;
  }

  &.size-xlg {
    min-height: 44px;
  }
}
</style>
