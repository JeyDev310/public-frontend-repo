<template>
  <div class="flex flex-col overflow-y-hidden custom-scrollbar">
    <!-- TITLE -->
    <div class="flex items-center mb-10 md:mb-20">
      <AppIcon
        name="parameters"
        :size="!isMD ? 28 : 24"
        class="text-white"
      />
      <span class="text-white font-bold md:text-md leading-1 ml-6">Bot Parameters</span>
    </div>

    <!-- INFO -->
    <ul class="flex flex-col space-y-6 w-full">
      <!-- BOT NAME -->
      <li class="flex items-center">
        <span class="flex-shrink-0 text-let-it-snow mr-4">Bot name:</span>
        <AppTruncatedTooltip :content="myBotName ? myBotName : '-'" class="text-white font-medium" />
      </li>

      <!-- ACCOUNT -->
      <li class="flex items-center">
        <span class="flex-shrink-0 text-let-it-snow mr-4">Account:</span>
        <AppTruncatedTooltip
          :content="myBotAccount?.name || '-'"
          class="text-white font-medium"
        />
      </li>

      <!-- PAIR -->
      <li class="flex items-center">
        <span class="text-let-it-snow mr-4">Pair:</span>
        <span class="text-white font-medium">
          {{ myBotPair?.label || '-' }}
        </span>
      </li>

      <!-- STRATEGY -->
      <li class="flex items-center">
        <span class="text-let-it-snow mr-4">Strategy:</span>
        <span class="text-white font-medium">
          <template v-if="myBotStrategy">
            <Compute
              #default="{ formatedItem }"
              :formatedItem="strategyOptions.find(el => el.value === myBotStrategy)"
            >
              {{ formatedItem.label }}
            </Compute>
          </template>

          <template v-else>-</template>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useCreateMyBot } from '../../create-my-bot.setup'

export default defineComponent({
  name: 'BotInfoParameters',

  setup () {
    const { isMD } = useCustomBreakpoints()
    const {
      myBotName,
      myBotStrategy,
      strategyOptions,
      myBotAccount,
      myBotPair
    } = useCreateMyBot()

    return {
      isMD,
      myBotName,
      myBotAccount,
      myBotPair,
      myBotStrategy,
      strategyOptions
    }
  }
})
</script>
