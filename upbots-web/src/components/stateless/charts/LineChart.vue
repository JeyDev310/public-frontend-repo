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
import { buildChartData, createMarkers, createMarkersData } from './chart.service'

import {
  defaultGrid,
  defaultTooltip,
  defaultXAxis,
  defaultYAxis
} from './charts.config'

import { ILineChartDataRaw, IPerformanceBotCycles } from '@/types'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import 'echarts/lib/component/markPoint'

import { LineChart } from 'echarts/charts'
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
  name: 'LineChart',

  components: { VChart },

  props: {
    labels: {
      type: Array as PropType<string[]>,
      default: () => []
    },

    data: {
      type: Array as PropType<ILineChartDataRaw[]>,
      default: () => []
    },

    customClass: {
      type: String,
      default: ''
    },

    markersData: {
      type: Array as PropType<IPerformanceBotCycles[]>,
      required: true
    }
  },

  setup: (props) => {
    const { isDarkMode } = useGlobal()

    const mode = computed(() => isDarkMode.value ? 'upbDark' : 'light')

    const chart: any = ref(null)

    const labels = computed(() => props.labels)
    const series = computed(() => {
      if (props.markersData?.length) {
        return buildChartData({
          data: props.data,
          markers: createMarkers(createMarkersData(props.markersData)),
          symbolSize: 0
        })
      }

      return buildChartData({ data: props.data })
    })

    const legend = {
      show: false,
      data: series.value.map(d => d.name)
    }

    const selectedLegends = ref(series.value.map(d => d.name))

    watch(series, (val) => {
      selectedLegends.value = [...selectedLegends.value, ...val.map(d => d.name)]
    })

    const option = reactive({
      grid: defaultGrid(),
      tooltip: defaultTooltip(),
      xAxis: { ...defaultXAxis(), data: labels },
      yAxis: defaultYAxis(mode.value === 'upbDark' ? '#1A2E37' : '#D5F2F2'),
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
        selectedLegends.value = selectedLegends.value.filter(l => l !== name)
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
