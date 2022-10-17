<template>
  <div
    class="
      bot-info
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
      gap-y-30
      md:gap-20
      xl:gap-y-0
      xl:gap-x-30
      flex-shrink-0
      w-full
      rounded-xlg
      p-20
    "
  >
    <!-- BOT INFO PARAMETERS -->
    <BotInfoParameters />

    <!-- BOT INFO ENTRY -->
    <BotInfoEntry type="long" />

    <!-- BOT INFO EXIT -->
    <BotInfoExit />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import BotInfoParameters from './BotInfoParameters.vue'
import BotInfoEntry from './BotInfoEntry.vue'
import BotInfoExit from './BotInfoExit.vue'

export default defineComponent({
  name: 'BotInfo',

  components: { BotInfoParameters, BotInfoEntry, BotInfoExit }
})
</script>

<style lang="scss" scoped>
.bot-info {
  min-height: 205px;
  background:
  linear-gradient(128.47deg, theme('colors.astral') 21.26%, theme('colors.true-lavender') 78.06%),
  linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D no-repeat top center / cover;
}
</style>
