<template>
  <div>
    <transition-group
      enter-active-class="transform duration-200 transition ease-in delay-100"
      enter-from-class="opacity-0 -translate-y-4 translate-x-20"
      enter-to-class="translate-y-0 opacity-100 translate-x-0"
      leave-active-class="absolute w-full transform duration-300 transition ease-out"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-20"
      move-class="transition transform duration-200 delay-100"
    >
      <Notification
        v-for="notificatio in notificatios"
        :key="notificatio.id"
        :notification="notificatio"
        @destroy="remove"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { list, removeById } from './notification.state'

import Notification from './Notification.vue'

export default defineComponent({
  name: 'AppNotification',

  components: { Notification },

  setup () {
    const notificatios = computed(() => {
      return [...list.value].reverse().slice(0, 10)
    })
    const remove = removeById

    return { notificatios, remove }
  }
})
</script>
