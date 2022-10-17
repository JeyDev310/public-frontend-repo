<template>
  <slot
    name="toolbar"
    :chartRef="chart"
    :legends="series && series.data"
    :events="{ legendHighlight, legendDownplay, legendToggle }"
    :selected="selectedLegends"
  />

  <slot />

  <VChart
    :key="option.series.length"
    ref="chart"
    class="flex flex-col flex-grow h-full overflow-hidden"
    :class="chartClasses"
    :theme="mode"
    :option="option"
    autoresize
  />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, PropType } from 'vue'
import { buildPieChartData } from './chart.service'
import { ILineChartDataRaw } from '@/types'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

import VChart from 'vue-echarts'
import { useGlobal } from '@/global-setup/global.composition.setup'

use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
  PieChart
])

export default defineComponent({
  name: 'PieChart',

  components: { VChart },

  props: {
    chartData: {
      type: Array as PropType<ILineChartDataRaw[]>,
      default: () => []
    },

    chartClasses: {
      type: String as PropType<string>,
      default: 'w-full'
    }
  },

  setup: (props) => {
    const { isDarkMode } = useGlobal()

    const mode = computed(() => isDarkMode.value ? 'upbDark' : 'light')

    const chart: any = ref(null)

    const series = computed(() => buildPieChartData(props.chartData))

    const selectedLegends = ref(series.value.data.map((d: any) => d.name))
    watch(series, (val) => {
      selectedLegends.value = [...selectedLegends.value, ...val.data.map((d: any) => d.name)]
    })

    const option = reactive({
      tooltip: {
        trigger: 'item',
        formatter (params: any) {
          return `${params.marker} ${params.name} ${params.percent}%`
        },
        textStyle: {
          fontWeight: 'bold'
        }
      },
      legend: {
        show: false
      },
      series: [
        {
          type: 'pie',
          radius: ['60%', '95%'],
          data: series.value.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: false,
            position: 'center'
          },
          color: series.value.color
        }
      ]
    })

    function legendHighlight (name: string) {
      chart.value.dispatchAction({ type: 'highlight', name: name })
    }

    function legendDownplay (name: string) {
      chart.value.dispatchAction({ type: 'downplay', name: name })
    }

    function legendToggle (name: string) {
      chart.value.dispatchAction({ type: 'legendToggleSelect', name: name })

      if (selectedLegends.value.includes(name)) {
        selectedLegends.value = selectedLegends.value.filter((l: any) => l !== name)
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
