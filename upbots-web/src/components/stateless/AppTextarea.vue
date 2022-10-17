<template>
  <div
    class="textarea__wrap flex flex-col"
    :class="[{ 'is-disabled' : disabled }, { 'is-readonly': readonly}]"
  >
    <!-- INPUT LABEL -->
    <label v-if="label" :for="id || name" :class="[labelClasses, labelSize]">{{ label }}</label>

    <div class="textarea__inner" :class="[innerClasses, rounded]">
      <textarea
        :id="id || name"
        :value="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :class="{ 'resize-none' : !resize }"
        :rows="rows"
        data-test="textarea"
        class="textarea custom-scrollbar"
        @textarea="onTextareaHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'AppTextarea',

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

    placeholder: {
      type: String as PropType<string>,
      default: ''
    },

    innerClasses: {
      type: String as PropType<string>,
      default: ''
    },

    resize: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    rows: {
      type: Number,
      default: 4
    },

    rounded: {
      type: String as PropType<string>,
      default: 'rounded-sm'
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

  setup (_, { emit }) {
    function onTextareaHandler (e: Event): void {
      const target = e.target as HTMLTextAreaElement

      emit('update:modelValue', target.value)
    }

    return { onTextareaHandler }
  }
})
</script>

<style lang="scss" scoped>
.textarea {
  &__wrap {
    &:not(.is-disabled):not(.is-readonly):not(.is-error) .textarea__inner {
      @apply dark:hover:border-tradewind dark:focus-within:border-tradewind;
    }

    &.is-error {
      @apply border-peachy-pinky;
    }

    &.is-readonly {
      @apply bg-opacity-20 dark:bg-opacity-30;
    }

    &.is-disabled {
      @apply opacity-50 select-none cursor-not-allowed;
    }

  }
}

.textarea {
  @apply
    w-full h-full
    py-8 px-10
    bg-transparent
    text-base
    text-bluster-blue
    dark:text-white
    placeholder-bluster-blue
    dark:placeholder-white
    focus:outline-none;

  min-height: 38px;

  &__inner {
    @apply
      relative
      bg-whiteout
      inline-flex
      border border-solid border-transparent
      dark:bg-black
      dark:bg-opacity-10
      focus:outline-none transition duration-300;
  }

  &:disabled {
    @apply pointer-events-none;
  }
}
</style>
