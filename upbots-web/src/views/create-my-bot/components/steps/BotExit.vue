<template>
  <AppCard class="flex flex-col p-10">
    <AppExpand
      v-model="expandValue"
      preview-classes="items-center"
      content-classes="flex flex-col"
      :expand-icon-name="expandValue ? 'minus' : 'plus'"
      expand-icon-size="20"
      transition-type="secondary"
      class="relative"
    >
      <!-- EXPAND PREVIEW -->
      <template #preview>
        <div class="w-full">
          <div class="flex items-center">
            <AppIcon name="exit" size="30" class="text-namara-grey dark:text-white" />
            <span class="text-namara-grey dark:text-white font-medium text-md leading-1 ml-6">
              Bot Exit
            </span>
          </div>
        </div>
      </template>

      <!-- EXPAND PREVIEW -->
      <template #content>
        <div class="flex flex-col w-full">
          <!-- TRIGGER -->
          <div class="bot-exit__grid-item grid grid-cols-1 gap-y-20 md:gap-y-0 md:gap-x-20 items-center mb-20">
            <p class="text-heavy-metal-armor dark:text-blair font-medium">Trigger</p>
            <p class="text-namara-grey dark:text-white font-medium text-md">{{ trigger }}</p>
          </div>

          <!-- TRADINGVIEW EXIT ALERT -->
          <div class="bot-exit__grid-item grid grid-cols-1 gap-y-20 md:gap-y-0 md:gap-x-20 items-center">
            <p class="text-heavy-metal-armor dark:text-blair font-medium">TradingView Exit Alert</p>
            <AppToggle
              v-model="myBotExitAlert"
              type="secondary"
              :disabled="!myBotAvailableAccounts.length"
            />
          </div>
        </div>
      </template>
    </AppExpand>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

import { useCreateMyBot } from '../../create-my-bot.setup'

export default defineComponent({
  name: 'BotExit',

  setup () {
    const { myBotExitAlert, trigger, myBotAvailableAccounts } = useCreateMyBot()

    /* STATE */
    const state = reactive({
      expandValue: true as boolean
    })

    return {
      ...toRefs(state),
      myBotAvailableAccounts,
      myBotExitAlert,
      trigger
    }
  }
})
</script>

<style lang="scss" scoped>
.bot-exit {
  &__grid-item {
    @media(min-width: 1280px) {
      grid-template-columns: 1fr 4fr;
    }

    @media(min-width: 768px) and (max-width: 1279px) {
      grid-template-columns: 1fr 2.5fr;
    }
  }
}
</style>
