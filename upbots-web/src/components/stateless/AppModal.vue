<template>
  <teleport to="#modals">
    <transition
      enter-active-class="transition duration-200 in-expo"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100 "
      leave-active-class="transform duration-100 transition out-expo delay-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="modal__backdrop fixed top-0 left-0 w-full h-full z-100"
        :class="getModeName"
        @click="backdropClick"
      />
    </transition>

    <transition
      enter-active-class="transform duration-200 transition in-expo delay-100"
      enter-from-class="opacity-0 scale-50"
      enter-to-class="scale-1 opacity-100"
      leave-active-class="transform duration-200 transition out-expo"
      leave-from-class="opacity-100 scale-1"
      leave-to-class="opacity-0 scale-50"
    >
      <div
        v-if="isOpen"
        data-test="modal-wrap"
        class="
          fixed
          w-full
          inset-0
          m-auto
          p-20
          pointer-events-auto
          z-100
          overflow-y-auto
          custom-scrollbar"
        :class="!closeOnBackdrop ? 'h-full sm:h-fit' : 'h-full'"
        :style="`max-width: ${modalWidth}px`"
      >
        <div
          class="modal w-full relative px-20 py-40 md:p-60 rounded-xl"
          :class="[{ 'animate-wiggle': isDisallowAnimation }, getModeName]"
          @click.stop
        >
          <AppIcon
            name="cross-medium"
            size="16"
            class="modal__close absolute text-blue-heeler dark:text-bel-air-blue cursor-pointer"
            @click="close"
          />

          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, PropType } from 'vue'
import { timeout } from '@/core/helpers'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'AppModal',

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true
    },

    modalWidth: {
      type: String as PropType<string>,
      default: '600'
    },

    beforeClose: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null
    },

    closeOnBackdrop: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },

  emits: ['update:modelValue', 'closed'],

  setup (props, { emit }) {
    const { getModeName } = useGlobal()

    const { modelValue: isOpen, beforeClose, closeOnBackdrop } = toRefs(props)
    const isDisallowAnimation = ref<boolean>(false)

    function open (): void {
      emit('update:modelValue', true)
    }

    async function showDisallowAnimation (): Promise<void> {
      isDisallowAnimation.value = false
      isDisallowAnimation.value = true
      await timeout(200)
      isDisallowAnimation.value = false
    }

    function closeModal (): void {
      emit('update:modelValue', false)
      emit('closed')
    }

    function handleBeforeClose (): void {
      beforeClose.value().then(allowClose => {
        allowClose && closeModal()
      })
    }

    function close (): void {
      (beforeClose.value) ? handleBeforeClose() : closeModal()
    }

    function backdropClick (): void {
      closeOnBackdrop.value ? close() : showDisallowAnimation()
    }

    return {
      getModeName,
      isOpen,
      isDisallowAnimation,
      open,
      close,
      backdropClick
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  &.is-dark {
    @apply shadow-100;
    background: linear-gradient(128.47deg, #41536D 21.26%, rgba(45, 59, 80, 0.56) 78.06%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
  }
  &.is-light {
    @apply bg-white shadow-300;
  }

  &__close {
    top: 42px;
    right: 42px;
  }

  &__backdrop {
    &.is-dark {
      background: linear-gradient(0deg, rgba(12, 15, 19, 0.68), rgba(12, 15, 19, 0.68));
    }

    &.is-light {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.68));
    }
  }

  @media(max-width: 767px) {
    &__close {
      top: 20px;
      right: 20px;
    }
  }
}
</style>
