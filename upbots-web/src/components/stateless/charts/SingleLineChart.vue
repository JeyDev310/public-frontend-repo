<template>
  <VChart
    ref="chart"
    class="h-full w-full"
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

import { use, ECharts } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'

import VChart from 'vue-echarts'

registerChartTheme()

use([
  CanvasRenderer,
  LineChart
])

export default defineComponent({
  name: 'SingleLineChart',

  components: { VChart },

  props: {
    labels: {
      type: Array as PropType<string[]>,
      default: () => []
    },

    data: {
      type: Array as PropType<ILineChartDataRaw[]>,
      default: () => []
    }
  },

  setup: (props) => {
    const { isDarkMode } = useGlobal()
    const mode = computed(() => isDarkMode.value ? 'upbDark' : 'light')

    const chart = ref() as Ref<ECharts>

    const series = computed(() => ({
      data: props.data,
      showSymbol: false,
      type: 'line',
      lineStyle: {
        width: 2
      },
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0.5,
        y2: 0,
        colorStops: [
          { offset: 0, color: 'rgba(108, 104, 242, 0.3)' },
          { offset: 0.4, color: 'rgba(108, 104, 242, 0.7)' },
          { offset: 1, color: 'rgba(108, 104, 242, 1)' }
        ]
      }
    }))

    const labels = computed(() => props.labels)

    const option = reactive({
      grid: {
        show: false,
        left: '10px',
        right: '10px',
        bottom: '0px',
        top: '10px'
      },
      xAxis: {
        boundaryGap: false,
        data: labels,
        show: false
      },
      yAxis: {
        type: 'value',
        show: false,
        scale: true
      },
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#222'
          }
        }
      },

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
