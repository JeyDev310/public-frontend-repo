<template>
  <div
    class="input-autocomplete__wrap flex flex-col relative"
    :class="[{ 'is-disabled' : disabled }, getModeName]"
  >
    <div class="input-autocomplete__inner" :class="[inputSize, inputRounded]">
      <AppIcon name="search" size="22" class="self-center text-bluster-blue dark:text-electronic pl-10" />

      <!-- INPUT -->
      <input
        :value="modelValue"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        class="input-autocomplete w-full"
        :class="inputRounded"
        @input="onInputHandler"
      >
    </div>

    <!-- TODO AUTOCOMPLETE -->
    <!-- <div
      v-if="isOptionsOpened"
      class="input-autocomplete__content flex flex-col w-full absolute left-0
      bg-crow-black rounded-md py-2 px-20 overflow-y-auto custom-scrollbar z-100"
    >
      <div class="flex flex-col w-full flex-grow overflow-y-auto custom-scrollbar">
        <template v-if="!isLoading">
          <template v-if="isDataAvailable">
            <span
              v-for="(item, index) in 10"
              :key="index"
              tabindex="0"
              class="input-autocomplete__option-item"
              @click="handleSelection(item)"
            >
              {{ item }}
            </span>
          </template>

          <template v-else>
            <span class="flex items-center justify-center py-10 text-white">No data found</span>
          </template>
        </template>

        <span v-else class="py-12 text-white">
          Searching ...
        </span>
      </div>
    </div> -->

    <!-- <div
      v-if="isOptionsOpened"
      class="input-autocomplete__backdrop fixed top-0 left-0 right-0 bottom-0 w-full h-full cursor-pointer"
      @click="isOptionsOpened = false"
    /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from 'vue'
import { Placement } from '@popperjs/core'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'AppInputAutocomplete',

  props: {
    modelValue: {
      type: String as PropType<string>,
      default: ''
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

    inputRounded: {
      type: String as PropType<string>,
      default: 'rounded-sm'
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const { getModeName } = useGlobal()

    const isOptionsOpened = ref(false)
    const isLoading = ref(false)

    function onInputHandler (e: Event) {
      const target = e.target as HTMLInputElement

      emit('update:modelValue', target.value)
    }

    function handleSelection (item: any) {
      console.log('item: ', item)
    }

    const isDataAvailable = computed(() => true)

    const inputSize = computed(() => `size-${props.size}`)

    return {
      getModeName,

      onInputHandler,
      inputSize,
      isOptionsOpened,
      isDataAvailable,
      isLoading,
      handleSelection
    }
  }
})
</script>

<style lang="scss" scoped>
.input-autocomplete {
  @apply
    px-10
    bg-transparent
    text-base
    text-bluster-blue
    dark:text-windsurf-blue
    placeholder-bluster-blue
    dark:placeholder-windsurf-blue
    focus:outline-none;

  &:disabled {
    @apply pointer-events-none;
  }

  &__wrap {
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

  &__content {
    top: 56px;
    max-height: 195px;
  }

  &__option-item {
    @apply border-b border-solid border-waterhen-back py-10 text-md font-medium text-white cursor-pointer;
    &:last-child {
      @apply border-none;
    }
  }
}
</style>
