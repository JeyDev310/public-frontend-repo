<template>
  <VChart
    ref="chart"
    :theme="mode"
    :option="option"
    autoresize
  />
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive, computed, PropType } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { registerChartTheme } from '@/plugins'

import { ILineChartDataRaw } from '@/types'

import VChart from 'vue-echarts'
import { use, ECharts } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { buildChartData } from './chart.service'
import { IGridPaddingConfig } from './chart.types'
import {
  defaultGrid,
  defaultTooltip,
  defaultXAxis,
  defaultYAxis
} from './charts.config'

registerChartTheme()

use([CanvasRenderer, LineChart])

export default defineComponent({
  name: 'SingleColoredChart',

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

    index: {
      required: true,
      type: Number as PropType<number>
    }, // for colors

    paddingConfig: {
      type: Object as PropType<IGridPaddingConfig>,
      default: () => ({ left: '5px', right: '5px', top: '5px', bottom: '5px' })
    },

    displayLabels: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup: (props) => {
    const { isDarkMode } = useGlobal()

    const mode = computed(() => isDarkMode.value ? 'upbDark' : 'light')

    const chart = ref() as Ref<ECharts>
    const labels = computed(() => props.labels)

    const series = computed(() => buildChartData({
      data: props.data,
      outherIndex: props.index,
      symbolSize: 3
    }))

    const option = reactive({
      grid: defaultGrid(props.paddingConfig, props.displayLabels),
      tooltip: defaultTooltip(),
      xAxis: { ...defaultXAxis(props.displayLabels), data: labels },
      yAxis: defaultYAxis('transparent', props.displayLabels), // default #6DD3C9,
      series
    })

    return {
      option,
      mode,
      chart,
      series
    }
  }
})
</script>
