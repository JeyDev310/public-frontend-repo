<template>
  <div class="flex flex-col flex-grow md:flex-1 overflow-y-auto custom-scrollbar">
    <!-- FILTERS -->
    <CopyTradingFilters />

    <!-- DESKTOP | TABLET -->
    <mq-layout mq="lg+">
      <!-- LOADING -->
      <template v-if="loading">
        <AppCard class="copy-trading-trades__card relative overflow-hidden">
          <AppLoader />
        </AppCard>
      </template>

      <template v-else>
        <!-- DATA -->
        <template v-if="getTradersData.length">
          <div
            class="
            copy-trading-trades__card
            grid
            grid-rows-1
            lg:grid-rows-none
            lg:grid-cols-2
            2xl:grid-cols-3
            3xl:grid-cols-4
            gap-20
            lg:gap-24
            4xl:gap-28
          "
          >
            <AppCard v-for="(item, index) in getTradersData" :key="index" class="flex flex-col flex-grow">
              <CopyTradingTradersCard :data="item" :index="index" />
            </AppCard>
          </div>
        </template>

        <!-- NO DATA -->
        <template v-else>
          <AppCard class="copy-trading-trades__card flex items-center justify-center p-30">
            <AppNoData title="No data found. Please try again!" />
          </AppCard>
        </template>
      </template>
    </mq-layout>

    <!-- MOBILE -->
    <mq-layout mq="sm-md" class="copy-trading-trades__card flex flex-col flex-grow">
      <!-- LOADING -->
      <template v-if="loading">
        <AppCard class="flex flex-col flex-grow relative overflow-hidden">
          <AppLoader />
        </AppCard>
      </template>

      <template v-else>
        <!-- DATA -->
        <template v-if="getTradersData.length">
          <div class="flex flex-col flex-grow space-y-20">
            <CopyTradingTradersCard
              v-for="(item, index) in getTradersData"
              :key="index"
              :data="item"
              :index="index"
            />
          </div>
        </template>

        <!-- NO DATA -->
        <template v-else>
          <AppCard class="flex flex-col flex-grow items-center justify-center p-30">
            <AppNoData title="No data found. Please try again!" />
          </AppCard>
        </template>
      </template>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import dayjs from 'dayjs'

import { EBotSorted, EBotStatus, EBotStrategy, IBotSnapshot } from '@/types'

import { useCopyTrading } from '../../copy-trading.composition.setup'

import CopyTradingTradersCard from './CopyTradingTradersCard.vue'
import CopyTradingFilters from './CopyTradingFilters.vue'

export default defineComponent({
  name: 'CopyTradingTraders',

  components: { CopyTradingTradersCard, CopyTradingFilters },

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup (props) {
    const { tradersFilters, getCopyBots } = useCopyTrading()
    const { getSubscriptedCopyBots } = useCopyTrading()

    function sortBotsList (val: IBotSnapshot[]): IBotSnapshot[] {
      const sortedByValue = tradersFilters.value.sortedBy.value
      if (sortedByValue === EBotSorted.Performance) {
        return val.sort((a, b) => (b.perfSnapshots?.allmonths || 0) - (a.perfSnapshots?.allmonths || 0))
      } else if (sortedByValue === EBotSorted.Performance6M) {
        return val.sort((a, b) => (b.perfSnapshots?.month6 || 0) - (a.perfSnapshots?.month6 || 0))
      } else if (sortedByValue === EBotSorted.Performance3M) {
        return val.sort((a, b) => (b.perfSnapshots?.month3 || 0) - (a.perfSnapshots?.month3 || 0))
      } else if (sortedByValue === EBotSorted.Date) {
        return val.sort((a, b) => {
          if (a.perfSnapshots?.charts.daylyChart?.labels && b.perfSnapshots?.charts.daylyChart?.labels) {
            return dayjs(a.perfSnapshots?.charts?.daylyChart?.labels[0])
              .isBefore(b.perfSnapshots?.charts?.daylyChart?.labels[0]) ? -1 : 1
          }
          return 0
        })
      }
      return val
    }

    const getTradersData = computed((): IBotSnapshot[] => {
      if (props.loading) return []

      const search = tradersFilters.value.search
      const strategyValue = tradersFilters.value.strategy.value
      const pairValue = tradersFilters.value.pairs
      const exchangesValue = tradersFilters.value.exchanges
      const statusValue = tradersFilters.value.status.value

      const toReturn = getCopyBots.value.filter((bot) => {
        const searchCondition = bot.name.toLowerCase().includes(search.toLowerCase())

        const statusCondition = statusValue === EBotStatus.Active
          ? getSubscriptedCopyBots.value.filter(
            subscriptedBot => subscriptedBot.enabled === true).find(b => b.botId === bot.id
          )
          : statusValue === EBotStatus.Inactive
            ? !getSubscriptedCopyBots.value.filter(
              subscriptedBot => subscriptedBot.botId === bot.id).find(b => b.botId === bot.id
            )
            : statusValue === EBotStatus.Paused
              ? getSubscriptedCopyBots.value.filter(
                subscriptedBot => subscriptedBot.enabled === false).find(b => b.botId === bot.id
              )
              : true

        const exchangesCondition = exchangesValue.length
          ? exchangesValue.find(exchange => bot.exchangesType.includes(exchange))
          : true

        const pairsCondition = pairValue.length
          ? pairValue.includes(`${bot.base}${bot.quote}`)
          : true

        const strategyValueCondition = (
          bot.stratType.toLowerCase() === strategyValue.toString().toLowerCase() ||
            strategyValue === EBotStrategy.All || strategyValue === ''
        )

        return (
          searchCondition &&
          strategyValueCondition &&
          pairsCondition &&
          exchangesCondition &&
          statusCondition
        )
      })

      return sortBotsList(toReturn)
    })

    return { getCopyBots, getTradersData }
  }
})
</script>

<style lang="scss" scoped>
.copy-trading-trades {
  &__card {
    min-height: 370px;
  }
}
</style>
