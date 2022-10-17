<template>
  <div class="container flex flex-col">
    <AppButton class="mb-20" @click="add">Show default</AppButton>
    <AppButton class="mb-20" @click="add('info')">Show info</AppButton>
    <AppButton class="mb-20" @click="add('warning')">Show warning</AppButton>
    <AppButton class="mb-20" @click="add('success')">Show success</AppButton>
    <AppButton class="mb-20" @click="add('error')">Show error</AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { appNotify } from '@/components/stateless/notifications'

export default defineComponent({
  name: 'PgNotifications',

  setup () {
    function add (type = null) {
      appNotify({
        type: type,
        message: 'Test notification',
        onClick () {
          console.log('clicked')
        },
        destroyed () {
          console.log('destroyed')
        }
      })
    }

    return {
      add
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  max-width: 300px;
}
</style>
