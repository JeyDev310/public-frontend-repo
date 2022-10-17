<template>
  <AppCard
    :is-default-background="!background"
    :class="[background, wrapperPadding, {'pointer-events-none cursor-not-allowed opacity-50': disabled} ]"
    :rounded="rounded"
    class="flex flex-col p-10"
  >
    <div :class="previewClasses" class="flex cursor-pointer" @click="handleOpenExpand">
      <slot name="preview" />

      <div class="flex flex-col items-center justify-center ml-10">
        <AppIcon
          :name="expandIconName"
          :size="expandIconSize"
          class="block text-soaring-eagle dark:text-white p-6 transform transition duration-300"
          :class="modelValue && 'rotate-180'"
        />
      </div>
    </div>

    <template v-if="transitionType === '' || transitionType === 'primary'">
      <transition
        enter-active-class="transform duration-200 transition in-expo delay-100"
        enter-from-class="opacity-0 scale-50"
        enter-to-class="scale-1 opacity-100"
        leave-active-class="transform duration-200 transition out-expo"
        leave-from-class="opacity-100 scale-1"
        leave-to-class="opacity-0 scale-50"
      >
        <div v-if="modelValue" :class="contentClasses" class="flex mt-10">
          <slot name="content" />
        </div>
      </transition>
    </template>

    <template v-if="transitionType === 'secondary'">
      <transition
        enter-active-class="transform duration-200 transition in-expo delay-100"
        enter-from-class="opacity-0 transform -translate-x-1/2"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transform duration-200 transition out-expo"
        leave-from-class="opacity-100 transform translate-x-0"
        leave-to-class="opacity-0 transform translate-x-1/2"
      >
        <div v-if="modelValue" :class="contentClasses" class="flex mt-10">
          <slot name="content" />
        </div>
      </transition>
    </template>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'AppExpand',

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    background: {
      type: String as PropType<string>,
      default: ''
    },

    previewClasses: {
      type: String as PropType<string>,
      default: ''
    },

    contentClasses: {
      type: String as PropType<string>,
      default: ''
    },

    wrapperPadding: {
      type: String as PropType<string>,
      default: 'p-10'
    },

    rounded: {
      type: String as PropType<string>,
      default: 'rounded-xlg'
    },

    expandIconName: {
      type: String as PropType<string>,
      default: 'chevron-bold'
    },

    expandIconSize: {
      type: String as PropType<string>,
      default: '14'
    },

    transitionType: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary'
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const isExpanded = ref<boolean>(props.modelValue)

    function handleOpenExpand (): void {
      emit('update:modelValue', isExpanded.value = !isExpanded.value)
    }

    return { handleOpenExpand }
  }
})
</script>
