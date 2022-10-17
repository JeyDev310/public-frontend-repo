<template>
  <div
    class="notification__wrap"
    data-test="notification-item"
    :class="typeClass"
    @click="handleClick"
    @mouseenter="toggleTimer(true)"
    @mouseleave="toggleTimer(false)"
  >
    <span v-if="type" class="inline-flex items-center mr-8">
      <AppIcon :name="icon" size="24" class="mr-10 text-white" />
      <span class="font-semibold capitalize">{{ type }}:</span>
    </span>

    <span class="flex-grow" data-test="message">{{ message }}</span>

    <AppIcon name="cancel-bold" size="12" class="mr-10 text-white" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, PropType, onMounted } from 'vue'

import { IAppNotification } from '@/types'

import { Timer } from '@/core/helpers'

export default defineComponent({
  name: 'Notification',

  props: {
    notification: {
      type: Object as PropType<IAppNotification>,
      required: true
    }
  },

  emits: ['destroy'],

  setup (props, { emit }) {
    const { id, type, message, duration, onClick, destroyed } = toRefs(props.notification)
    let timer: Timer

    const typeClass = computed(() => {
      return `is-${type.value || 'default'}`
    })

    const icon = computed(() => {
      return `notify-${type.value}`
    })

    function destroy () {
      if (timer) timer.stop()
      emit('destroy', id?.value)

      if (destroyed?.value) {
        // eslint-disable-next-line no-unused-expressions
        destroyed?.value()
      }
    }

    function handleClick () {
      if (onClick?.value) {
        // eslint-disable-next-line no-unused-expressions
        onClick?.value()
      }

      destroy()
    }

    function toggleTimer (toggle: boolean) {
      if (timer) toggle ? timer.pause() : timer.resume()
    }

    onMounted(() => {
      timer = new Timer(destroy, duration?.value || 4000)
    })

    return {
      message,
      icon,
      typeClass,
      type,
      handleClick,
      toggleTimer
    }
  }
})
</script>

<style lang="scss" scoped>
.notification {
  &__wrap {
    @apply flex items-center p-20 mb-20 text-white rounded-sm cursor-pointer pointer-events-auto;
    font-size: 16px;

    &.is-default {
      @apply bg-chicory-flower;
    }

    &.is-info {
      background: #6ACEC5;
    }

    &.is-success {
      background: #53CE76;
    }

    &.is-warning {
      background: #FFB23E;
    }

    &.is-error {
      background: #FF6E6E;
    }
  }
}
</style>
