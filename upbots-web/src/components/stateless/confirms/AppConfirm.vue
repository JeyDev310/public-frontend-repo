<template>
  <Confirmation
    v-for="(confirm, index) in confirms"
    :key="confirm.id"
    :confirm="confirm"
    :index="index"
    @cancel="cancel"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { list, removeById } from './confirm.state'

import Confirmation from './Confirmation.vue'

export default defineComponent({
  name: 'AppConfirm',

  components: {
    Confirmation
  },

  setup () {
    const confirms = list
    const cancel = removeById

    return {
      confirms,
      cancel
    }
  }
})
</script>
