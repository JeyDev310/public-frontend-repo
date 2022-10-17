<template>
  <div class="text-nile-blue dark:text-white">
    <h2 class="mb-20 text-xl font-semibold">Charts:</h2>

    <div class="mb-40">
      <div class="p-20">
        <LineChart :labels="labels" :data="data" customClass="line-chart-wrapper">
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
            <button
              v-for="legend of legends"
              :key="legend.name"
              class="p-10 mr-10"
              :style="{backgroundColor: selected.includes(legend.name) ? legend.itemStyle.color : null}"
              @mouseenter="legendHighlight(legend.name)"
              @mouseout="legendDownplay(legend.name)"
              @click="legendToggle(legend.name)"
            >
              {{ legend.name }}
            </button>
          </template>
        </LineChart>
      </div>
      <button @click="test">Update data</button>
    </div>

    <div class="mb-40">
      <div class="p-20 pie-chart-wrapper">
        <PieChart :chart-data="pieChartData">
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
            <button
              v-for="legend of legends"
              :key="legend.name"
              class="p-10 mr-10"
              :style="{backgroundColor: selected.includes(legend.name) ? legend.color.from : null}"
              @mouseenter="legendHighlight(legend.name)"
              @mouseout="legendDownplay(legend.name)"
              @click="legendToggle(legend.name)"
            >
              {{ legend.name }}
            </button>
          </template>
        </PieChart>
      </div>
    </div>

    <div>
      <div class="p-20 preview-chart-wrapper">
        <SingleLineChart :data="singleLineData" />
      </div>

      <div class="grid grid-cols-5 gap-x-20 p-20 preview-chart-wrapper h-300">
        <SingleColoredChart v-for="(item, index) in 5" :key="item" :data="singleColoredLineData" :index="index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'

const LineChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/LineChart.vue' /* webpackChunkName: "LineChart" */),
  loadingComponent: ChartSkeleton
})
const PieChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/PieChart.vue' /* webpackChunkName: "PieChart" */),
  loadingComponent: ChartSkeleton
})
const SingleLineChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/SingleLineChart.vue' /* webpackChunkName: "SingleLineChart" */),
  loadingComponent: ChartSkeleton
})
const SingleColoredChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/SingleColoredChart.vue' /* webpackChunkName: "SingleColoredChart" */),
  loadingComponent: ChartSkeleton
})

function generateData () {
  return Math.round(Math.random() * 100)
}

export default defineComponent({
  name: 'PgCharts',

  components: {
    LineChart,
    PieChart,
    SingleLineChart,
    SingleColoredChart
  },

  setup () {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const data = ref([
      { name: 'BTC', data: labels.map(generateData) },
      { name: 'USD', data: labels.map(generateData) },
      { name: 'EUR', data: labels.map(generateData) }
    ])

    const singleLineData = ref(Array.from({ length: 100 }, () => generateData()))
    // const singleLineData = ref([0, 10, 0, 20, 10, 25, 30, 0])

    const singleColoredLineData = ref(
      [
        {
          name: 'BTC',
          data: [78, 64, 52, 83, 84, 7, 36]
        }
      ]
    )

    function test () {
      data.value.splice(0, 1)
      data.value[2] = { name: 'EUR', data: labels.map(generateData) }
      data.value.push({ name: 'ETH', data: labels.map(generateData) })
    }

    const pieChartData = ref([
      { name: 'USD', data: generateData() },
      { name: 'BTC', data: generateData() },
      { name: 'EUR', data: generateData() },
      { name: 'ETH', data: generateData() },
      { name: 'BNB', data: generateData() },
      { name: 'SOL', data: generateData() }
    ])

    return {
      labels,
      data,
      test,
      pieChartData,
      singleLineData,
      singleColoredLineData
    }
  }
})
</script>

<style lang="scss">
.line-chart-wrapper {
  height: 400px!important;
}
.pie-chart-wrapper {
  height: 400px;
}
.preview-chart-wrapper {
  height: 160px;
}
</style>
