<template>
  <AppCard class="flex flex-col relative w-full p-10 md:p-14 lg:p-20">
    <div class="flex flex-col flex-grow w-full h-full">
      <!-- LOADER -->
      <!-- <AppLoader v-if="isTradeChartLoading && chartActiveTab === chartTabs[1].value" class="rounded-xlg" /> -->
      <AppLoader v-if="isTradeChartLoading" class="rounded-xlg" />

      <!-- CHART -->
      <LineChart
        :labels="getChartLabels"
        :data="getChartData"
        :markers-data="getChartMarkers"
        custom-class="flex flex-col flex-grow w-full h-full"
      >
        <!-- NO DATA STATE -->
        <AppNoData v-if="chartNoAvailableData" class="absolute left-0 top-40 right-0 bottom-0" />

        <!-- CONTENT -->
        <template #toolbar>
          <div ref="toolbar" class="flex justify-between space-x-10">
            <!-- TABS (TABLET - DESKTOP) -->
            <mq-layout mq="lg+">
              <AppButtonsGroup v-model="chartActiveTab" :options="chartTabs" type="badge" @change="handleTabChange" />
            </mq-layout>

            <!-- TABS (MOBILE) -->
            <mq-layout mq="sm-md">
              <AppSelect
                v-model="chartActiveTab"
                :options="chartTabs"
                return-single-value
                size="sm"
                @change="handleTabChange"
              />
            </mq-layout>

            <!-- FILTERS -->
            <AppSelect
              v-model="getActiveChartFilters"
              :options="getChartFiltersOptions"
              return-single-value
              size="sm"
              @change="handleFilterChange"
            />
          </div>
        </template>
      </LineChart>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed, PropType } from 'vue'

import toISO from '@/utils/to-iso'

import { algoBotsService } from '@/services'
import { IPerformanceBotCycles } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'

const LineChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/LineChart.vue' /* webpackChunkName: "LineChart" */),
  loadingComponent: ChartSkeleton
})

export default defineComponent({
  name: 'AlgoBotsDetailedInactiveChart',

  components: { LineChart },

  props: {
    botHistory: {
      type: Array as PropType<IPerformanceBotCycles[]>,
      required: true
    }
  },

  setup (props) {
    /* USE ALGO BOTS SETUP */
    const { getPerfBotCyclesDataById } = useAlgoBots()

    const isTradeChartLoading = ref<boolean>(false)

    const klinesLabels = ref()
    const klinesData = ref()

    // CHART FILTER //
    const performanceFilterOptions: { value: string; label: string; }[] = [
      { value: 'daylyChart', label: 'Daily' },
      { value: 'weeklyChart', label: 'Weekly' },
      { value: 'monthlyChart', label: 'Monthly' }
    ]
    const performanceActiveFilter = ref<string>('daylyChart')

    const tradeFilterOptions: { value: string; label: string; }[] = [
      { value: '14', label: 'Last 14 days' },
      { value: '30', label: 'Last Month' },
      { value: '400', label: 'All' }
    ]
    const tradeActiveFilter = ref<string>(tradeFilterOptions[0].value)

    const chartTabs: { value: string; label: string; }[] = [
      { value: 'performance', label: 'Performance' }
      // { value: 'trade', label: 'Trade' }
    ]
    const chartActiveTab = ref<string>(chartTabs[0].value)

    const getActiveChartFilters = computed({
      get () {
        if (chartActiveTab.value === chartTabs[0].value) {
          return performanceActiveFilter.value
        }

        return tradeActiveFilter.value
      },
      set (value: string | number) {
        return value
      }
    })

    const getChartFiltersOptions = computed(() => {
      if (chartActiveTab.value === chartTabs[0].value) {
        return performanceFilterOptions
      }

      return tradeFilterOptions
    })

    const getChartLabels = computed(() => {
      if (chartActiveTab.value === chartTabs[0].value) {
        // TODO FIX TYPE FOR getBotPerfSubscriptionSnapshotData //
        return (getPerfBotCyclesDataById.value as any).perfSnapshots?.charts[performanceActiveFilter.value]?.labels
      }

      return klinesLabels.value
    })

    const getChartData = computed(() => {
      if (chartActiveTab.value === chartTabs[0].value) {
        // TODO FIX TYPE FOR getBotPerfSubscriptionSnapshotData //
        return [{ name: '', data: (getPerfBotCyclesDataById.value as any).perfSnapshots?.charts[performanceActiveFilter.value]?.data }]
      }

      return [{ name: '', data: klinesData.value }]
    })

    const getChartMarkers = computed(() => chartActiveTab.value === chartTabs[0].value ? [] : props.botHistory)

    const fetchPricesHistory = async (days = tradeFilterOptions[0].value) => {
      isTradeChartLoading.value = true
      try {
        if (getPerfBotCyclesDataById.value?.base && getPerfBotCyclesDataById.value?.allocatedCurrency) {
          const result = await algoBotsService.getPricesHistory({
            crypto: getPerfBotCyclesDataById.value?.base || '',
            fiat: getPerfBotCyclesDataById.value?.allocatedCurrency || '',
            days: Number(days)
          })
          klinesLabels.value = result.data.map((e: any) => toISO(e[0])[0])
          klinesData.value = result.data.map((e: any) => e[1])
        }
      } catch (e) {
        appNotify({ type: 'error', message: e?.response?.data?.message || 'Something went wrong' })
      } finally {
        isTradeChartLoading.value = false
      }
    }

    function handleFilterChange ({ value }: { value: any; }) {
      if (chartActiveTab.value === chartTabs[0].value) {
        performanceActiveFilter.value = value
      }

      // if (chartActiveTab.value === chartTabs[1].value) {
      //   tradeActiveFilter.value = value
      //   fetchPricesHistory(value)
      // }
    }

    function handleTabChange () {
      if (chartActiveTab.value === chartTabs[0].value) {
        performanceActiveFilter.value = performanceFilterOptions[0].value
      }

      // if (chartActiveTab.value === chartTabs[1].value) {
      //   tradeActiveFilter.value = tradeFilterOptions[0].value
      // }
    }

    function initData () {
      fetchPricesHistory()
    }
    initData()

    // const isTradeDataAvailable = computed(() => klinesData.value && Object.keys(klinesData.value).length)

    const isPerformanceDataAvailable = computed(() => {
      return getPerfBotCyclesDataById.value?.perfSnapshots?.charts?.daylyChart?.data?.length &&
      getPerfBotCyclesDataById.value?.perfSnapshots?.charts?.weeklyChart?.data?.length &&
      getPerfBotCyclesDataById.value?.perfSnapshots?.charts?.monthlyChart?.data?.length
    })

    const chartNoAvailableData = computed(() => {
      if (chartActiveTab.value === chartTabs[0].value) {
        return !isPerformanceDataAvailable.value
      }
      // if (chartActiveTab.value === chartTabs[1].value) {
      //   return !isTradeDataAvailable.value
      // }

      return false
    })

    return {
      chartNoAvailableData,
      isTradeChartLoading,
      performanceFilterOptions,
      performanceActiveFilter,
      tradeFilterOptions,
      tradeActiveFilter,
      chartTabs,
      chartActiveTab,
      getActiveChartFilters,
      getChartFiltersOptions,
      getChartLabels,
      getChartData,
      getChartMarkers,
      handleFilterChange,
      handleTabChange
    }
  }
})
</script>
