<template>
  <div class="fixed" :style="zIndex" data-test="confirmation-item">
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
        class="confirm__backdrop fixed top-0 left-0 w-full h-full"
        :class="getModeName"
        @click="backdropClick"
      />
    </transition>

    <transition
      enter-active-class="transform duration-200 transition in-expo delay-100"
      enter-from-class="opacity-0 -translate-y-20"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transform duration-200 transition out-expo"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-10"
    >
      <div
        v-if="isOpen"
        class="confirm__wrap fixed top-0 left-0 right-0 bottom-0 w-full h-fit mt-40 mx-auto pointer-events-auto"
      >
        <div
          class="confirm relative p-40 text-center text-nile-blue dark:text-let-it-snow rounded-xl"
          :class="[{'animate-wiggle': isDisallowAnimation}, getModeName]"
          @click.stop
        >
          <AppIcon
            name="cross-medium"
            size="16"
            class="confirm__close absolute text-blue-heeler dark:text-bel-air-blue cursor-pointer"
            @click="onCancel"
          />

          <h2 class="text-lg mb-20" data-test="title">{{ title }}</h2>

          <p v-if="body" v-html="body" />

          <div class="flex space-x-40 justify-center w-full mt-40">
            <AppButton
              data-test="confirm"
              type="primary-border-filled"
              class="confirm__btn"
              @click="onConfirm"
            >
              {{ actionsName && actionsName[1] }}
            </AppButton>

            <AppButton
              type="grey-outlined"
              data-test="cancel"
              class="confirm__btn"
              @click="onCancel"
            >
              {{ actionsName && actionsName[0] }}
            </AppButton>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed, PropType, onMounted } from 'vue'

import { timeout } from '@/core/helpers'
import { IConfirm } from './confirm.types'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'Confirmation',

  props: {
    maxWidth: {
      type: [String, Number],
      default: 500
    },

    confirm: {
      type: Object as PropType<IConfirm>,
      required: true
    },

    index: {
      type: Number,
      default: 0
    }
  },

  emits: ['update:modelValue', 'cancel'],

  setup (props, { emit }) {
    const { getModeName } = useGlobal()

    const { title, body, actionsName } = toRefs(props.confirm)

    const isOpen = ref(false)
    const isDisallowAnimation = ref(false)
    const zIndex = computed(() => ({ zIndex: 1000 + props.index }))

    onMounted(() => {
      isOpen.value = true
    })

    // TODO showDisallowAnimation make reusable for Modals and Confirms
    async function showDisallowAnimation () {
      isDisallowAnimation.value = false
      isDisallowAnimation.value = true
      await timeout(200)
      isDisallowAnimation.value = false
    }

    function backdropClick () {
      showDisallowAnimation()
    }

    async function close () {
      isOpen.value = false
      await timeout(200)
      emit('cancel', props.confirm?.id)
    }

    async function onCancel () {
      await close()
      props.confirm.resolve(false)
    }

    async function onConfirm () {
      await close()
      props.confirm.resolve(true)
    }

    return {
      getModeName,
      isOpen,
      isDisallowAnimation,
      zIndex,
      title,
      body,
      actionsName,
      onCancel,
      onConfirm,
      backdropClick
    }
  }
})
</script>

<style lang="scss" scoped>
.confirm {
  &.is-dark {
    @apply shadow-100;
    background: linear-gradient(128.47deg, #41536D 21.26%, rgba(45, 59, 80, 0.56) 78.06%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
  }

  &.is-light {
    @apply bg-white shadow-300;
  }

  &__wrap {
    max-width: 500px;
    min-width: 300px;
  }

  &__btn {
    min-width: 124px;
  }

  &__backdrop {
    &.is-dark {
      background: linear-gradient(0deg, rgba(12, 15, 19, 0.68), rgba(12, 15, 19, 0.68));
    }

    &.is-light {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.68));
    }
  }

  &__close {
    top: 25px;
    right: 25px;
  }
}
</style>
