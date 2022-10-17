<template>
  <AppCard class="flex flex-col relative w-full p-10 md:p-14 lg:p-20">
    <!-- SKELETON -->
    <AppSkeleton v-if="botLoading" type="lineChart" class="w-full h-full" />

    <!-- CONTENT -->
    <template v-else>
      <div class="flex flex-col flex-grow w-full h-full">
        <!-- CHART -->
        <LineChart
          :labels="getChartLabels"
          :data="getChartData"
          :markersData="[]"
          custom-class="flex flex-col flex-grow w-full h-full"
        >
          <!-- NO DATA STATE -->
          <AppNoData v-if="!isAvailableData" class="absolute left-0 top-40 right-0 bottom-0" />

          <!-- FILTER BAR -->
          <template #toolbar>
            <div ref="toolbar" class="flex justify-end space-x-10">
              <!-- FILTERS -->
              <AppSelect v-model="filterValue" :options="filterOptions" return-single-value size="sm" />
            </div>
          </template>
        </LineChart>
      </div>
    </template>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, reactive, toRefs } from 'vue'

import { useMyBotDetailed } from '../../my-bot-detailed.composition.setup'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'

const LineChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/LineChart.vue' /* webpackChunkName: "LineChart" */),
  loadingComponent: ChartSkeleton
})

export default defineComponent({
  name: 'MyBotDetailedChart',

  components: { LineChart },

  setup () {
    const { bot, botLoading } = useMyBotDetailed()

    /* STATE */
    const state = reactive({
      filterValue: 'daylyChart' as string
    })

    /* STATIC DATA */
    const filterOptions: { value: string; label: string; }[] = [
      { value: 'daylyChart', label: 'Daily' },
      { value: 'weeklyChart', label: 'Weekly' },
      { value: 'monthlyChart', label: 'Monthly' }
    ]

    const getChartLabels = computed((): string[] => {
      if (Object.keys(bot.value.perfSnapshots).length) {
        return bot.value.perfSnapshots?.charts[state.filterValue]?.labels
      }
      return []
    })

    const getChartData = computed((): { name: string; data: number[]; }[] => {
      if (Object.keys(bot.value.perfSnapshots).length) {
        return [{ name: '', data: bot.value.perfSnapshots?.charts[state.filterValue]?.data }]
      }
      return [{ name: '', data: []}]
    })

    const isAvailableData = computed((): number => {
      if (!Object.keys(bot.value.perfSnapshots).length) return 0
      const isDailyChart = bot.value?.perfSnapshots?.charts?.daylyChart?.data.length || 0
      const isWeeklyChart = bot.value?.perfSnapshots?.charts?.weeklyChart?.data.length || 0
      const isMonthlyChart = bot.value?.perfSnapshots?.charts?.monthlyChart?.data.length || 0
      return isDailyChart && isWeeklyChart && isMonthlyChart
    })

    return {
      ...toRefs(state),
      botLoading,
      isAvailableData,
      getChartLabels,
      getChartData,
      filterOptions
    }
  }
})
</script>
