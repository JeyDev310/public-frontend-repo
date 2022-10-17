<template>
  <AppCard class="flex-col relative" :class="getLoading ? 'px-10 py-45' : 'py-8 px-10'">
    <!-- LOADER -->
    <AppLoader v-if="getLoading" size="xs" class="rounded-xlg" />

    <!-- CONTENT -->
    <template v-else>
      <div class="flex items-start">
        <Compute #default="{ foundItem }" :foundItem="bots.find(e => e.id === item.botId)">
          <template v-if="Object.keys(foundItem).length">
            <router-link
              #default="{ navigate }"
              :to="{
                name: getBotDetailedRedirectRoute(foundItem.category),
                params: { id: foundItem.id, name: foundItem.name }
              }"
              custom
            >
              <div class="flex items-start flex-grow space-x-10 mb-10" @click="navigate()">
                <!-- CURRENCY ICONS -->
                <div class="flex items-center">
                  <template
                    v-for="(token, tokenIndex) in [foundItem.base, foundItem.quote]"
                    :key="tokenIndex"
                  >
                    <AppCryptoCoinChecker
                      v-if="token"
                      :icon-name="token"
                      :icon-size="1.2"
                      :img-size="18"
                      class="first:-ml-0 -ml-10"
                      :style="tokenIndex >= 1 && `z-index: ${tokenIndex};`"
                    />
                  </template>
                </div>

                <div class="flex flex-col ml-18">
                  <!-- BOT NAME -->
                  <AppTruncatedTooltip
                    v-if="foundItem.name ? foundItem.name : '-'"
                    :content="foundItem.name"
                    class="text-beguiling-blue dark:text-white text-base font-semibold"
                  />

                  <!-- BOT CREATOR -->
                  <AppTruncatedTooltip
                    v-if="foundItem.creator ? foundItem.creator : '-'"
                    :content="foundItem.creator"
                    class="text-beguiling-blue dark:text-white text-sm"
                  />
                </div>
              </div>
            </router-link>
          </template>
        </Compute>

        <!-- BOT TOTAL GAINED -->
        <div class="flex-shrink-0">
          <AppFormatNumber :data="getTotalGain">
            <template #value="{ data }">
              <span class="font-medium">$</span>
              <AppTruncatedTooltip :content="data" class="font-semibold" />
            </template>
          </AppFormatNumber>
        </div>
      </div>

      <div class="flex space-x-10">
        <div class="flex flex-grow space-x-6">
          <!-- BOT CURRENT PROFIT -->
          <AppTag type="tertiary" class="flex space-x-2">
            <template v-if="getOpenPositionProfit">
              <div>Open</div>
              <div>
                <AppFormatNumber
                  :data="getOpenPositionProfit"
                  percent
                  text-size="text-sm"
                  class="font-medium"
                />
              </div>
            </template>

            <template v-else>
              <AppNoData title="Closed" class="text-sm" color="" />
            </template>
          </AppTag>

          <!-- BOT ACCOUNT -->
          <AppTag type="tertiary" class="flex space-x-2">
            <Compute
              #default="{ foundItem }"
              :foundItem="availableAccounts.find(key => key.id === item.apiKeyRef)"
            >
              <div v-if="Object.keys(foundItem).length" class="flex items-center space-x-4">
                <img
                  :src="`/img/cryptocoins/${foundItem.exchange}.svg`"
                  :alt="foundItem.name"
                  class="w-12 h-12 max-w-12"
                >
                <AppTruncatedTooltip :content="foundItem.name" />
              </div>
              <span v-else>-</span>
            </Compute>
          </AppTag>

          <!-- BOT TRADES -->
          <AppTag type="tertiary" class="flex space-x-2">
            <Compute #default="{ foundItem }" :foundItem="bots.find(e => e.id === item.botId)">
              <div v-if="Object.keys(foundItem).length">{{ foundItem.avgtrades }}</div>
            </Compute>

            <div>trades</div>
          </AppTag>
        </div>

        <AppToggle
          type="secondary"
          :model-value="item.enabled"
          class="flex-shrink-0"
          @change="onChangeActivation(item, $event)"
        />
      </div>
    </template>
  </AppCard>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { ISubscriptedBots, IAlgoBotSubscription } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'

export default defineComponent({
  name: 'HomeAlgobotsActiveMobileItem',

  props: {
    item: {
      type: Object as PropType<ISubscriptedBots>,
      required: true
    },

    index: {
      type: Number as PropType<number>,
      required: true
    },

    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup (props) {
    const { availableAccounts } = useGlobal()
    const {
      bots,
      performanceSubscriptionCycles,
      changeActivation,
      confirmChangeActivation,
      fetchAllAndSubscriptedBots,
      fetchPerformanceSubscriptionCycles,
      getBotDetailedRedirectRoute
    } = useBots()

    const getLoading = computed((): boolean => props.loading)

    const getTotalGain = computed((): number => {
      const data = performanceSubscriptionCycles.value[props.index]
      return data?.length ? data.reduce((acc, cur) => acc + (cur?.realisedGain?.usd || 0), 0) : 0
    })

    const getOpenPositionProfit = computed((): number | null => {
      const data = performanceSubscriptionCycles.value[props.index]

      if (!data?.length) return null
      return data[0]?.profitPercentage || 0
    })

    async function onChangeActivation (row: IAlgoBotSubscription, value: boolean): Promise<void> {
      const isAllow = await confirmChangeActivation(value)

      if (isAllow) {
        await changeActivation(row, value)
        await fetchAllAndSubscriptedBots()
        await fetchPerformanceSubscriptionCycles()
      }
    }

    return {
      getLoading,
      bots,
      availableAccounts,
      getTotalGain,
      getOpenPositionProfit,
      onChangeActivation,
      getBotDetailedRedirectRoute
    }
  }
})
</script>
