<template>
  <div class="flex flex-col overflow-y-hidden custom-scrollbar">
    <!-- TITLE -->
    <div class="flex items-center mb-10 md:mb-20">
      <AppIcon
        name="exit"
        :size="!isMD ? 30 : 26"
        class="text-white"
      />
      <span class="text-white font-bold md:text-md leading-1 ml-4">Bot Exit</span>
    </div>

    <!-- INFO -->
    <ul class="flex flex-col space-y-6 w-full mb-20">
      <!-- ENTRY TRIGGER -->
      <li class="flex items-center">
        <span class="flex-shrink-0 text-let-it-snow mr-4">Entry trigger:</span>
        <AppTruncatedTooltip :content="trigger || '-'" class="text-white font-medium" />
      </li>

      <!-- TRADING VIEW EXIT ALERT -->
      <li class="flex items-center">
        <span class="text-let-it-snow mr-4">TradingView exit alert:</span>
        <span
          class="w-14 h-14 rounded-full overflow-hidden"
          :class="myBotExitAlert ? 'bg-spring-bouquet' : 'bg-alexandria'"
        />
      </li>
    </ul>

    <!-- ACTION BUTTONS -->
    <div
      class="bot-info-exit__btn flex flex-col xl:self-end self-center xl:items-end w-full mt-auto"
    >
      <template v-if="myBotAvailableAccounts.length">
        <AppButton
          size="xlg"
          :disabled="!isAllowCreate || myBotGlobalLoading"
          class="w-full"
          @click="createNewBot"
        >
          Create
        </AppButton>
      </template>

      <template v-else>
        <router-link #default="{ navigate }" :to="{ name: routeNames.keys }" custom>
          <AppButton size="xlg" class="w-full" @click="navigate()">
            Add an API key
          </AppButton>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { routeNames } from '@/router'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useCreateMyBot } from '../../create-my-bot.setup'

export default defineComponent({
  name: 'BotInfoExit',

  setup () {
    const { isMD } = useCustomBreakpoints()
    const {
      myBotGlobalLoading,
      myBotExitAlert,
      trigger,
      isAllowCreate,
      myBotAvailableAccounts,
      createNewBot
    } = useCreateMyBot()

    return {
      routeNames,
      isMD,
      myBotGlobalLoading,
      myBotAvailableAccounts,
      myBotExitAlert,
      trigger,
      isAllowCreate,
      createNewBot
    }
  }
})
</script>

<style lang="scss" scoped>
.bot-info-exit {
  &__btn {
    max-width: 200px;
    min-height: 54px;
  }
}
</style>
