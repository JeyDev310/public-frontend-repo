<template>
  <div class="flex h-full relative">
    <router-view />
  </div>

  <teleport to="#notifications">
    <AppNotification />
  </teleport>

  <teleport to="#modals">
    <AppConfirm />
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AppNotification from '@/components/stateless/notifications/AppNotification.vue'

export default defineComponent({
  name: 'App',

  components: { AppNotification }
})
</script>
