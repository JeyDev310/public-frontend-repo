<template>
  <AppCard
    :is-default-background="isDefaultBg"
  >
    <!-- TODO CLASSES PROP -->
    <div
      class="flex flex-col flex-grow px-10 md:py-20 md:px-20 4xl:px-30 relative"
      :class="innerClasses"
    >
      <AppLoader v-if="getLoading" />

      <mq-layout
        mq="lg+"
        class="text-md 4xl:text-lg text-chicory-flower dark:text-blair font-medium px-8 4xl:m-10"
      >
        Portfolio Distribution Chart
      </mq-layout>

      <!-- TODO CLASSES PROP -->
      <div
        v-if="chartData?.length > 1"
        class="flex flex-col md:flex-row flex-grow w-full md:mt-14"
        :class="chartWrapClasses"
      >
        <PieChart
          :key="chartData.length + Math.floor(Math.random() * 10)"
          :chart-data="chartData"
          chart-classes="w-full md:w-7/10 h-3/5 md:h-auto"
        >
          <template #toolbar="{
            legends,
            selected,
            events: {
              legendHighlight,
              legendDownplay,
              legendToggle
            }
          }"
          >
            <div
              class="flex flex-wrap items-start justify-center md:justify-start w-full h-2/5 md:h-auto md:w-3/10 z-10
              custom-scrollbar md:verflow-x-auto md:overflow-y-auto"
            >
              <button
                v-for="legend of legends"
                :key="legend.name"
                class="flex items-center m-5 xl:m-8 4xl:m-10"
                @mouseenter="legendHighlight(legend.name)"
                @mouseout="legendDownplay(legend.name)"
                @click="legendToggle(legend.name)"
              >
                <Compute
                  #default="{ dotBg }"
                  :dotBg="selected.includes(legend.name) ? legend.color.from : null"
                >
                  <div class="flex flex-shrink-0 w-12 h-12 4xl:w-20 4xl:h-20 mr-8 4xl:mr-14">
                    <div v-if="dotBg" :style="{ backgroundColor: dotBg }" class="rounded-full w-full h-full" />
                    <AppIcon v-else name="notify-error" size="12" />
                  </div>

                  <AppTruncatedTooltip
                    :content="legend.name"
                    class="font-medium text-chicory-flower dark:text-let-it-snow text-sm 4xl:text-base"
                  />
                </Compute>
              </button>
            </div>
          </template>
        </PieChart>
      </div>

      <div v-else class="flex flex-grow items-center justify-center py-60">
        <span class="text-chicory-flower dark:text-let-it-snow">No data</span>
      </div>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, computed, PropType } from 'vue'

import { vuex } from '@/store'
import { IDistributionChartData } from '@/types'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'

const PieChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/PieChart.vue' /* webpackChunkName: "PieChart" */),
  loadingComponent: ChartSkeleton
})

export default defineComponent({
  name: 'PortfolioDistributionChart',

  components: { PieChart },

  props: {
    data: {
      type: Array as PropType<IDistributionChartData[]>,
      required: true
    },

    isDefaultBg: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    tabName: {
      type: String as PropType<'cex' | 'dex' | 'summary'>,
      required: true
    },

    innerClasses: {
      type: String as PropType<string>,
      default: ''
    },

    chartWrapClasses: {
      type: String as PropType<string>,
      default: ''
    }
  },

  setup (props) {
    const getLoading = computed(() => {
      if (props.tabName === 'summary') {
        return false
      } else {
        return vuex[props.tabName].loading
      }
    })

    const chartData = computed(() => props.data.map((coin: IDistributionChartData) => {
      return {
        name: coin.blockchain && coin.blockchain === 'bsc' ? `${coin.currency} on BSC` : coin.currency,
        data: coin.percentage
      }
    }))

    return { chartData, getLoading }
  }
})
</script>
