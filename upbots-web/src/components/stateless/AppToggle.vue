<template>
  <div class="toggle__wrap flex items-center" :class="{ 'is-disabled': disabled }">
    <div
      v-if="activeLabel"
      data-test="active-label"
      class="text-nile-blue dark:text-blair text-sm mr-8"
      :class="labelClick && 'cursor-pointer select-none'"
      @click="switchOff"
    >
      {{ activeLabel }}
    </div>

    <button
      class="toggle__inner flex items-center"
      :class="[toggleTypes, classes]"
      :disabled="disabled"
      @click.stop="toggle"
    >
      <div class="toggle rounded-full" data-test="toggler" />
    </button>

    <div
      v-if="inactiveLabel"
      data-test="inactive-label"
      class="text-nile-blue dark:text-blair text-sm ml-8"
      :class="labelClick && 'cursor-pointer select-none'"
      @click="switchOn"
    >
      {{ inactiveLabel }}
    </div>
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
  name: 'AppToggle',

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true
    },

    activeLabel: {
      type: String as PropType<string>,
      default: ''
    },

    inactiveLabel: {
      type: String as PropType<string>,
      default: ''
    },

    labelClick: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    type: {
      type: String as PropType<TTypes>,
      default: 'primary'
    }
  },

  emits: ['update:modelValue', 'change'],

  setup (props, { emit }) {
    const classes = computed((): string => props.modelValue ? 'is-checked' : 'is-unchecked')

    const toggleTypes = computed((): string => types[props.type])

    function toggle (): void {
      if (props.disabled) return
      emit('update:modelValue', !props.modelValue)
      emit('change', !props.modelValue)
    }

    function switchOff (): void {
      if (props.disabled || !props.labelClick) return
      emit('update:modelValue', false)
      emit('change', false)
    }

    function switchOn (): void {
      if (props.disabled || !props.labelClick) return
      emit('update:modelValue', true)
      emit('change', true)
    }

    return {
      classes,
      toggleTypes,
      toggle,
      switchOff,
      switchOn
    }
  }
})
</script>

<style lang="scss" scoped>
.toggle {
  transition: all 350ms;
  background-blend-mode: overlay, normal;
  &__wrap {
    &.is-disabled {
      @apply cursor-not-allowed opacity-50;
      .toggle {
        &__inner {
          @apply cursor-not-allowed;
        }
      }
    }
  }
}

.is-primary {
  width: 55px;
  @apply h-30 bg-black bg-opacity-20 shadow-700 p-2 focus:outline-none rounded-full;

  .toggle {
    @apply w-24 h-24 bg-alexandria;
  }

  &.is-checked {
    .toggle {
      transform: translateX(26px);
      @apply bg-spring-bouquet;
    }
  }
}

.is-secondary {
  @apply h-20 bg-light-pale-lilac dark:bg-blueberry-dream focus:outline-none;
  width: 47px;
  box-shadow: 0px 13px 35px rgba(30, 28, 47, 0.29);
  border-radius: 23px;

  .toggle {
    @apply h-24 w-24 bg-blueberry-dream dark:bg-blair;
    box-shadow: 0px 4px 8px rgba(10, 14, 29, 0.32);
  }

  &.is-checked {
    background: linear-gradient(84.68deg, #6AD0C8 -17.95%, #271A54 496.85%);
    .toggle {
      transform: translateX(24px);
    }
  }
}
</style>
