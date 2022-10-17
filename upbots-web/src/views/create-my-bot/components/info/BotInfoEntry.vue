<template>
  <div class="flex flex-col overflow-y-hidden custom-scrollbar">
    <!-- TITLE -->
    <div class="flex items-center mb-10 md:mb-20">
      <AppIcon
        name="entry"
        :size="!isMD ? 30 : 26"
        class="text-white"
      />
      <!-- <span class="text-white font-bold md:text-md leading-1 capitalize ml-4">Bot Entry ({{ type }})</span> -->
      <span class="text-white font-bold md:text-md leading-1 capitalize ml-4">Bot Entry</span>
    </div>

    <!-- INFO -->
    <ul class="flex flex-col space-y-6 w-full">
      <!-- ENTRY TRIGGER -->
      <li class="flex items-center">
        <span class="flex-shrink-0 text-let-it-snow mr-4">Entry trigger:</span>
        <AppTruncatedTooltip :content="trigger || '-'" class="text-white font-medium" />
      </li>

      <!-- ORDER TYPE -->
      <!-- <li class="flex items-center">
        <span class="text-let-it-snow mr-4">Order type:</span>
        <span class="text-white font-medium">
          <template v-if="entry[type].orderType">
            <Compute
              #default="{ formatedItem }"
              :formatedItem="orderTypeOptions.find(el => el.value === entry[type].orderType)"
            >
              {{ formatedItem.label }}
            </Compute>
          </template>

          <template v-else>-</template>
        </span>
      </li> -->

      <!-- SIZE POSITION -->
      <li class="flex items-center">
        <span class="text-let-it-snow mr-4">Size position:</span>
        <span class="text-white font-medium">
          {{ myBotEntry[type].sizePosition?.length ? `${myBotEntry[type].sizePosition[0]}%` : '-' }}
        </span>
      </li>

      <!-- LEVERAGE -->
      <li v-if="isFutureAccount" class="flex items-center">
        <span class="text-let-it-snow mr-4">Leverage:</span>
        <span class="text-white font-medium">
          <template v-if="myBotEntry[type].leverage">
            <Compute
              #default="{ formattedItem }"
              :formattedItem="leverageOptions.find(el => el.value === myBotEntry[type].leverage)"
            >
              {{ formattedItem.label }}
            </Compute>
          </template>

          <template v-else>-</template>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useCreateMyBot } from '../../create-my-bot.setup'

export default defineComponent({
  name: 'BotInfoEntry',

  props: {
    type: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup () {
    const { isMD } = useCustomBreakpoints()
    const {
      myBotEntry,
      orderTypeOptions,
      leverageOptions,
      isFutureAccount,
      trigger
    } = useCreateMyBot()

    return {
      isMD,
      myBotEntry,
      trigger,
      orderTypeOptions,
      leverageOptions,
      isFutureAccount
    }
  }
})
</script>
