<template>
  <div class="container flex flex-col text-nile-blue dark:text-white">
    <div class="my-40">
      <p>Simple confirm</p>
      <AppButton class="mb-20" @click="showSimple">Open</AppButton>
    </div>
    <div class="my-40">
      <p>Custom body confirm</p>
      <AppButton class="mb-20" @click="showCustom">Open simple modal</AppButton>
    </div>
    <div class="my-40">
      <p>Title only</p>
      <AppButton class="mb-20" @click="showTitleOnly">Open simple modal</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { appConfirm } from '@/components/stateless/confirms/confirm.state'
import { appNotify } from '@/components/stateless/notifications/notification.state'

export default defineComponent({
  name: 'PgConfirms',

  setup () {
    function showSimple () {
      appConfirm({
        title: 'Confirm your action',
        body: 'Are you sure to proceed with this action?'
      }).then(isCanceled => {
        console.log('[showSimple]: ', isCanceled)
        appNotify({ type: 'info', message: isCanceled ? 'Confirmed' : 'Canceled' })
      })
    }

    function showCustom () {
      appConfirm({
        title: 'Confirm your action',
        body: 'Are you sure to <span class="text-tradewind">proceed</span> <br/> with this action?',
        actionsName: ['Disallow', 'Allow']
      }).then(isCanceled => {
        console.log('[showCustom]: ', isCanceled)
        appNotify({ type: 'info', message: isCanceled ? 'Confirmed' : 'Canceled' })
      })
    }

    function showTitleOnly () {
      appConfirm('Are you sure?').then(isCanceled => {
        console.log('[showTitleOnly]: ', isCanceled)
        appNotify({ type: 'info', message: isCanceled ? 'Confirmed' : 'Canceled' })
      })
    }

    return {
      showSimple,
      showCustom,
      showTitleOnly
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  max-width: 300px;
}
</style>
