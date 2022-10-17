<template>
  <!-- BOT PARAMETERS -->
  <BotParameters />

  <!-- BOT ENTRY -->
  <BotEntry type="long" />

  <!-- BOT EXIT -->
  <BotExit />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import { useCreateMyBot } from '../../create-my-bot.setup'

import BotParameters from './BotParameters.vue'
import BotEntry from './BotEntry.vue'
import BotExit from './BotExit.vue'

export default defineComponent({
  name: 'BotSteps',

  components: { BotParameters, BotEntry, BotExit },

  setup () {
    const { fetchInitData } = useCreateMyBot()

    onMounted(() => { fetchInitData() })
  }
})
</script>
