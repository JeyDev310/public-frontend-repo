<template>
  <div class="grid grid-cols-3 gap-x-6">
    <div class="flex items-center">
      <AppCryptoCoinChecker
        v-if="data.coin"
        :icon-name="data.coin"
        :icon-size="1.1255"
        :img-size="18"
      />
      <p class="text-beguiling-blue dark:text-let-it-snow uppercase ml-2">
        <AppTruncatedTooltip :content="data.coin" class="text-base md:text-sm 3xl:text-base" />
        <AppTruncatedTooltip
          v-if="data.blockchain"
          :content="data.blockchain === 'bsc' ? ' on BSC' : ''"
          class="text-base md:text-sm 3xl:text-base"
        />
      </p>
    </div>

    <AppFormatNumber
      :data="data.btc"
      format=""
      :to-fixed="formatNumber(data.amount)"
      :is-math-symbols="false"
      :is-colored="false"
    >
      <template #value="{ data: value }">
        <AppTruncatedTooltip
          :content="value"
          class="text-beguiling-blue dark:text-cotton-ball-second text-base md:text-sm 3xl:text-base"
        />
      </template>
    </AppFormatNumber>

    <AppFormatNumber
      :data="data.value"
      format=""
      :to-fixed="formatNumber(data.value)"
      :is-math-symbols="false"
      :is-colored="false"
    >
      <template #value="{ data: value }">
        <AppTruncatedTooltip
          :content="value"
          class="text-beguiling-blue dark:text-cotton-ball-second text-base md:text-sm 3xl:text-base"
        />
      </template>
    </AppFormatNumber>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IBalance } from '@/views/trade/trade-types'

import { useTrade } from '@/views/trade/trade-composition.setup'

export default defineComponent({
  name: 'BalanceItem',

  props: {
    data: {
      type: Object as PropType<IBalance>,
      required: true
    }
  },

  setup () {
    const { formatNumber } = useTrade()

    return { formatNumber }
  }
})
</script>
