<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- DESKTOP -->
    <mq-layout
      mq="lg+"
      class="
        flex
        flex-col
        flex-grow
        w-full
        space-y-20
        4xl:space-y-24
        overflow-y-auto
        custom-scrollbar
      "
    >
      <!-- ALGOBOTS HERO -->
      <!-- WM (should add relative) in default mode should remove relative -->
      <div class="algobots-rental-hero flex flex-col">
        <!-- WM -->
        <!-- <HeroWMSection /> -->

        <div class="algobots-rental-hero__container flex flex-grow items-center xl:items-start w-full">
          <div class="flex flex-col text-4xl 3xl:text-5xl 4xl:text-6xl font-semibold text-white">
            <span>Rent an</span>
            <span>Algorithm</span>
          </div>
        </div>
      </div>

      <!-- ALGOBOTS TUTORIAL -->
      <!-- WM (should add relative) || in default mode should remove relative -->
      <mq-layout mq="xl+" class="flex flex-col flex-shrink-0 w-full px-20">
        <AlgoBotTuto />
      </mq-layout>

      <!-- ALGOBOT SECTIONS -->
      <div class="flex flex-col pt-30">
        <!-- TOP PERFORMING BOTS -->
        <AlgoBotsTopPerformingBots class="md:px-20 mb-70 4xl:mb-80" />

        <!-- ALGOBOTS MOST POPULAR BOTS (NOT USED FOR NOW) -->
        <!-- <AlgoBotsMostPopularBots class="md:px-20 mb-70 4xl:mb-80" /> -->

        <!-- ALGOBOTS ALL BOTS -->
        <div class="flex flex-col w-full px-12 md:px-20 space-y-20 4xl:space-y-24">
          <!-- ALGOBOTS FILTER BAR -->
          <AlgoBotsFiltersBar
            :loading="loading"
            @on-search-change="onSearchHandler"
            @on-status-change="onStatusHandler"
            @on-strategy-change="onStrategyHandler"
            @on-exchanges-change="onExchangesHandler"
            @on-pairs-change="onPairsHandler"
            @on-sorted-by-change="onSortedByHandler"
            @on-my-bots="onMyBotsHandler"
            @on-reset-filter="onResetFilterHandler"
          />

          <AlgoRentalAllBots :data="algoBotsFiltered" :loading="botsLoading" />
        </div>
      </div>
    </mq-layout>

    <!-- MOBILE VIEW -->
    <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <!-- TITLE -->
      <Portal to="h-title">
        <h2 class="text-nile-blue dark:text-let-it-snow">Algo bots</h2>
      </Portal>

      <!-- ALGOBOT TABS (MOBILE) -->
      <AppButtonsGroup
        v-model="mobileActiveTab"
        :options="mobileActiveTabOptions"
        type="underline"
        size="sm"
        width="100%"
        class="self-center w-full mb-20"
      />

      <div class="flex w-full flex-col flex-grow overflow-y-auto custom-scrollbar">
        <!-- TOP PERFORMING BOTS -->
        <AlgoBotsTopPerformingBots v-show="mobileActiveTab === mobileActiveTabOptions[0].value" />
        <div v-show="mobileActiveTab === mobileActiveTabOptions[0].value" class="w-full px-12">
          <AppButton
            type="grey-outlined"
            class="w-full mt-20"
            @click="mobileActiveTab = mobileActiveTabOptions[1].value"
          >
            See All
          </AppButton>
        </div>

        <!-- ALGOBOTS MOST POPULAR BOTS (NOT USED FOR NOW) -->
        <!-- <AlgoBotsMostPopularBots
          v-show="mobileActiveTab === mobileActiveTabOptions[1].value"
          class="md:px-20 mb-70 4xl:mb-80"
        /> -->

        <!-- ALGOBOTS ALL BOTS -->
        <div v-show="mobileActiveTab === mobileActiveTabOptions[1].value" class="flex flex-col w-full px-12 space-y-10">
          <!-- TITLE -->
          <h2 class="text-heavy-metal-armor dark:text-blair text-md font-medium">
            All The Bots
          </h2>

          <!-- ALGOBOTS FILTER BAR -->
          <div class="flex flex-col flex-shrink-0 w-full">
            <AlgoBotsFiltersBar
              :loading="loading"
              @on-search-change="onSearchHandler"
              @on-status-change="onStatusHandler"
              @on-strategy-change="onStrategyHandler"
              @on-exchanges-change="onExchangesHandler"
              @on-pairs-change="onPairsHandler"
              @on-sorted-by-change="onSortedByHandler"
              @on-my-bots="onMyBotsHandler"
              @on-reset-filter="onResetFilterHandler"
            />
          </div>

          <!-- BOTS LIST -->
          <AlgoRentalAllBots :data="algoBotsFiltered" :loading="botsLoading" />
        </div>
      </div>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, onMounted } from 'vue'

import dayjs from 'dayjs'

import {
  EAlgoBotsCardType,
  EBotSorted,
  EBotStatus,
  EBotStrategy,
  ECategory,
  IBotSnapshot,
  TDropdownOption
} from '@/types'
import { IAlgobotFilters } from '@/types/user/user-settings.types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useAlgoBots } from './algobots.composition.setup'

import AlgoBotTuto from '@/views/algobots/components/AlgoBotTuto.vue'
import AlgoRentalAllBots from '@/views/algobots/components/AlgoRentalAllBots.vue'
import AlgoBotsFiltersBar from '@/views/algobots/components/AlgoBotsFiltersBar.vue'
import AlgoBotsTopPerformingBots from './components/AlgoBotsTopPerformingBots.vue'

/* WM */
// import HeroWMSection from '@/components/winter-mode/HeroWMSection.vue'

export default defineComponent({
  name: 'AlgoBots',

  components: {
    AlgoBotTuto,
    AlgoRentalAllBots,
    AlgoBotsFiltersBar,
    AlgoBotsTopPerformingBots
  },

  setup () {
    const { is2XL } = useCustomBreakpoints()
    const { userSettings, updateUserSettings } = useGlobal()
    const { bots, subscriptedBots, botsLoading, fetchAllAndSubscriptedBots } = useBots()

    const {
      setBotStatusFilter,
      setBotStrategyFilter,
      setBotExchangeFilter,
      setBotPairFilter,
      setBotSortByValueFilter,
      setBotMyBotsFilter,
      setAllBotFilterSetting
    } = useAlgoBots()

    const state = reactive({
      loading: false as boolean,
      searchBot: '' as string,
      mobileActiveTab: 'top-performing-bots' as string
    })

    const mobileActiveTabOptions: { label: string; value: string; }[] = [
      { label: 'Top Performers', value: 'top-performing-bots' },
      { label: 'All Bots', value: 'all-bots' }
    ]

    // NOT USED FOR NOW
    // const filteredMostPopularBots = computed(() => {
    //   if (mostPopularBotsLoading.value) return []
    //   return mostPopularBots.value.filter(bot => bot.category === ECategory.AlgoBot)
    // })

    const botSettings = computed((): IAlgobotFilters => userSettings.value.algobotFilters)

    // SWIPER CONFIGS //
    const swiperBestBotConfig: { breakpoint: number; slidesPerView: number; spaceBetween: number; }[] = [
      { breakpoint: 320, slidesPerView: 1, spaceBetween: 20 },
      { breakpoint: 1024, slidesPerView: 2, spaceBetween: 20 }
    ]

    const swiperPopularBotConfig: { breakpoint: number; slidesPerView: number; spaceBetween: number; }[] = [
      { breakpoint: 320, slidesPerView: 1, spaceBetween: 20 },
      { breakpoint: 1024, slidesPerView: 2, spaceBetween: 24 },
      { breakpoint: 1440, slidesPerView: 3, spaceBetween: 24 },
      { breakpoint: 1920, slidesPerView: 4, spaceBetween: 24 },
      { breakpoint: 2500, slidesPerView: 4, spaceBetween: 28 }
    ]

    async function saveAlgobotFilterSettings (): Promise<void> {
      state.loading = true

      try {
        const payload: IAlgobotFilters = {
          status: botSettings.value.status,
          strategy: botSettings.value.strategy,
          exchanges: botSettings.value.exchanges,
          pairs: botSettings.value.pairs,
          sortedByValue: botSettings.value.sortedByValue,
          isMyBots: false
        }

        await updateUserSettings({ ...userSettings.value, algobotFilters: payload })
      } finally {
        state.loading = false
      }
    }

    async function onResetFilterHandler (): Promise<void> {
      state.searchBot = ''
      const payload: IAlgobotFilters = {
        status: { label: 'All', value: 'all' },
        strategy: { label: 'All', value: 'all' },
        exchanges: [],
        pairs: [],
        sortedByValue: { label: 'Total perf %', value: 'performance' },
        isMyBots: false
      }
      setAllBotFilterSetting(payload)
      await saveAlgobotFilterSettings()
    }

    function onSearchHandler (val: string): void {
      state.searchBot = val
    }

    async function onStatusHandler (val: {value: string; label: string;}): Promise<void> {
      setBotStatusFilter(val)
      await saveAlgobotFilterSettings()
    }

    function onStrategyHandler (val: {value: string; label: string;}): void {
      setBotStrategyFilter(val)
      saveAlgobotFilterSettings()
    }

    function onExchangesHandler (val: TDropdownOption): void {
      const exchanges = userSettings.value.algobotFilters.exchanges
      const indexOfVal = exchanges.indexOf(val.value.toString())
      if (indexOfVal > -1) {
        exchanges.splice(indexOfVal, 1)
        setBotExchangeFilter(exchanges)
      } else {
        setBotExchangeFilter([...exchanges, val.value.toString()])
      }
      saveAlgobotFilterSettings()
    }

    function onPairsHandler (val: TDropdownOption): void {
      const pairs = userSettings.value.algobotFilters.pairs
      const indexOfVal = pairs.indexOf(val.value.toString())
      if (indexOfVal > -1) {
        pairs.splice(indexOfVal, 1)
        setBotPairFilter(pairs)
      } else {
        setBotPairFilter([...pairs, val.value.toString()])
      }
      saveAlgobotFilterSettings()
    }

    function onSortedByHandler (val: {value: string; label: string;}): void {
      setBotSortByValueFilter(val)
      saveAlgobotFilterSettings()
    }

    function onMyBotsHandler (val: boolean): void {
      setBotMyBotsFilter(val)
    }

    function sortBotsList (val: IBotSnapshot[]): IBotSnapshot[] {
      const sortedByValue = botSettings.value.sortedByValue.value
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

    const algoBotsFiltered = computed((): IBotSnapshot[] => {
      if (botsLoading.value) {
        return [{}, {}, {}] as IBotSnapshot[]
      } else {
        const strategyValue = botSettings.value.strategy.value
        const pairValue = botSettings.value.pairs
        const exchangesValue = botSettings.value.exchanges
        const statusValue = botSettings.value.status.value
        const myBotsValue = botSettings.value.isMyBots

        const toReturn = bots.value.filter((bot) => {
          const searchCondition = bot.name.toLowerCase().includes(state.searchBot.toLowerCase())

          const statusCondition = statusValue === EBotStatus.Active
            ? subscriptedBots.value.filter(a => a.enabled === true).find(b => b.botId === bot.id)
            : statusValue === EBotStatus.Inactive
              ? !subscriptedBots.value.filter(a => a.botId === bot.id).find(b => b.botId === bot.id)
              : statusValue === EBotStatus.Paused
                ? subscriptedBots.value.filter(a => a.enabled === false).find(b => b.botId === bot.id)
                : true

          const exchangesCondition = exchangesValue.length
            ? exchangesValue.find(exchange => bot.exchangesType.includes(exchange))
            : true

          const strategyValueCondition = (
            bot?.stratType?.toLowerCase() === strategyValue.toString().toLowerCase() ||
            strategyValue === EBotStrategy.All || strategyValue === ''
          )
          const pairCondition = pairValue.length
            ? pairValue.includes(`${bot.base}${bot.quote}`)
            : true

          const isUserBot = myBotsValue
            ? bot.category === ECategory.UserBot
            : true

          const isAlgoBot = bot.category === ECategory.AlgoBot
          return (
            isAlgoBot &&
            isUserBot &&
            searchCondition &&
            strategyValueCondition &&
            pairCondition &&
            exchangesCondition &&
            statusCondition
          )
        })

        return sortBotsList(toReturn)
      }
    })

    async function initData (): Promise<void> {
      state.loading = true
      try {
        await fetchAllAndSubscriptedBots()
      } finally {
        state.loading = false
      }
    }

    onMounted(() => { initData() })

    return {
      ...toRefs(state),
      EAlgoBotsCardType,
      is2XL,
      mobileActiveTabOptions,
      swiperBestBotConfig,
      swiperPopularBotConfig,
      algoBotsFiltered,
      botsLoading,
      onMyBotsHandler,
      onSearchHandler,
      onStatusHandler,
      onStrategyHandler,
      onExchangesHandler,
      onPairsHandler,
      onSortedByHandler,
      onResetFilterHandler
    }
  }
})
</script>

<style lang="scss" scoped>
.algobots-rental-hero {
  @media(min-width: 768px) {
    border-radius: 0px 0px 24px 52px;
    /* WM */
    // background: url("/img/winter-mode/algobots-hero-bg-wm.jpg") no-repeat top center / cover,
    // linear-gradient(180deg, rgba(0, 0, 0, 0.76) -8.62%, rgba(0, 0, 0, 0) 78.16%),
    // linear-gradient(101.45deg, #60BCB5 22.36%, #7F86FF 93.31%) no-repeat top center / cover;

    /* Default mode */
    background: url("/img/algo-bots/hero/hero-bg.jpg") no-repeat top center / cover,
    linear-gradient(180deg, rgba(0, 0, 0, 0.76) -8.62%, rgba(0, 0, 0, 0) 78.16%),
    linear-gradient(101.45deg, #60BCB5 22.36%, #7F86FF 93.31%) no-repeat top center / cover;
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    &__container {
      @apply pb-60;
    }
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    min-height: 320px;

    &__container {
      @apply px-40 pb-40;
    }
  }

  @media(min-width: 768px) and (max-width: 1023px) {
    min-height: 320px;

    &__container {
      @apply px-30;
    }
  }

  @media(min-width: 1280px) {
    &__container {
      padding: 130px 50px 50px 95px;
    }
  }

  @media(min-width: 2500px) {
    min-height: 520px;

    &__container {
      padding: 185px 70px 70px 95px;
    }
  }
}
</style>
