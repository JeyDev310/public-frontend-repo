<template>
  <slot
    name="toolbar"
    :chartRef="chart"
    :legends="series"
    :events="{ legendHighlight, legendDownplay, legendToggle }"
    :selected="selectedLegends"
  />

  <slot />

  <VChart
    :key="option.series.length"
    ref="chart"
    :class="customClass"
    :theme="mode"
    :option="option"
    autoresize
  />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, PropType } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { registerChartTheme } from '@/plugins'
import { portfolioEvolutionSeries } from './chart.service'

import {
  defaultGrid,
  defaultTooltip,
  defaultXAxis,
  defaultYAxis
} from './charts.config'

import { IEvolutionData } from '@/types'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { IGridPaddingConfig } from './chart.types'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

import VChart from 'vue-echarts'

registerChartTheme()

use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
  LineChart
])

export default defineComponent({
  name: 'LineChartTwoYAxis',

  components: { VChart },

  props: {
    labels: {
      type: Array as PropType<string[]>,
      default: () => []
    },

    data: {
      type: Array as PropType<IEvolutionData[]>,
      default: () => []
    },

    customClass: {
      type: String as PropType<string>,
      default: 'px-30'
    },

    paddingConfig: {
      type: Object as PropType<IGridPaddingConfig>,
      default: () => ({ left: '40px', right: '40px', bottom: '40px', top: '20px' })
    },

    showAxisLine: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },

  setup: (props) => {
    const { isDarkMode } = useGlobal()

    const mode = computed(() => isDarkMode.value ? 'upbDark' : 'light')

    const chart: any = ref(null)

    const labels = computed(() => props.labels)

    const series = computed(() => portfolioEvolutionSeries({ data: props.data }))
    const legend = {
      show: false,
      data: series.value.map((d: { name: any; }) => d.name)
    }

    const selectedLegends = ref(series.value.map((d: { name: any; }) => d.name))
    watch(series, (val) => {
      selectedLegends.value = [...selectedLegends.value, ...val.map((d: { name: any; }) => d.name)]
    })

    const minBTC = computed(() => {
      const minBTCValue = Math.min.apply(null, props.data[0].data)
      if (minBTCValue < 1) return Math.round((minBTCValue - 0.0001) * 10000) / 10000

      return Math.round(minBTCValue)
    })
    const minUSD = computed(() => Math.min.apply(null, props.data[1].data))

    const option = reactive({
      grid: defaultGrid(props.paddingConfig),
      tooltip: defaultTooltip(),
      xAxis: { ...defaultXAxis(), data: labels },
      yAxis: [
        { ...defaultYAxis('none'), min: minBTC.value ? minBTC.value : 0 },
        { ...defaultYAxis(props.showAxisLine ? isDarkMode.value ? '#1A2E37' : '#D5F2F2' : 'none'), min: minUSD.value ? Math.round(minUSD.value) : 0 }],
      legend,
      series
    })

    function legendHighlight (name: string) {
      chart.value.dispatchAction({ type: 'highlight', seriesName: name })
    }

    function legendDownplay (name: string) {
      chart.value.dispatchAction({ type: 'downplay', seriesName: name })
    }

    function legendToggle (name: string) {
      chart.value.dispatchAction({ type: 'legendToggleSelect', name: name })

      if (selectedLegends.value.includes(name)) {
        selectedLegends.value = selectedLegends.value.filter((l: string) => l !== name)
      } else {
        selectedLegends.value.push(name)
      }
    }

    return {
      option,
      mode,
      chart,
      series,

      legendHighlight,
      legendDownplay,
      legendToggle,
      selectedLegends
    }
  }
})
</script>
