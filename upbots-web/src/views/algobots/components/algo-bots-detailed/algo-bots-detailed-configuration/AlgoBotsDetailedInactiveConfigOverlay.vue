<template>
  <div class="flex flex-col flex-grow w-full items-center justify-center">
    <div class="flex flex-col items-center w-full mb-25">
      <div class="mb-10">
        <span class="text-xl md:text-2xl text-bianchi-green font-semibold">Unlock Now</span>
      </div>

      <div class="flex flex-col items-center w-full">
        <router-link #default="{ navigate }" :to="{ name: routeNames.staking }" custom>
          <AppButton size="xlg" class="mb-14" @click="navigate()">
            Stake on UpBots
          </AppButton>
        </router-link>

        <p class="text-sm text-chicory-flower dark:text-white">
          APR variable min 2500 UBXT
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { routeNames } from '@/router'

export default defineComponent({
  name: 'AlgoBotsDetailedInactiveConfigOverlay',

  setup () {
    return { routeNames }
  }
})
</script>
