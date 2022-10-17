<template>
  <div id="tradingview_acd56" class="chart-widget" />
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, computed, PropType } from 'vue'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

interface ISettings {
  autosize: boolean;
  symbol: string;
  timezone: string;
  theme: string;
  style: string;
  locale: string;
  // eslint-disable-next-line camelcase
  toolbar_bg: string;
  // eslint-disable-next-line camelcase
  enable_publishing: boolean;
  withdateranges: boolean; // bottom toolbar
  interval: string;
  // eslint-disable-next-line camelcase
  allow_symbol_change: boolean;
  details: boolean;
  hotlist: boolean;
  calendar: boolean;
  // eslint-disable-next-line camelcase
  hide_side_toolbar: boolean;
  // eslint-disable-next-line camelcase
  save_image: boolean;
  // eslint-disable-next-line camelcase
  container_id: string; // the div where the graph will be defined
}

export default defineComponent({
  name: 'TradingViewChart',

  props: {
    clean: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    symbol: {
      type: String as PropType<string>,
      default: ''
    }
  },

  setup (props) {
    const { isDarkMode } = useGlobal()
    const { isMD } = useCustomBreakpoints()

    const chartMode = computed((): string => isDarkMode.value && !isMD.value ? 'Dark' : 'Light')

    const isMobile = computed((): boolean => isMD.value)

    function createGraph (symbol: string): ISettings {
      if (!(window as any).TradingView) return {} as ISettings

      if (props.clean) {
        // eslint-disable-next-line new-cap
        const simpleSettings = new (window as any).TradingView.widget({
          autosize: true,
          symbol: symbol,
          timezone: 'Etc/UTC',
          theme: chartMode.value,
          style: '1',
          locale: 'en',
          toolbar_bg: '#C4C4C4',
          enable_publishing: false,
          withdateranges: true, // bottom toolbar
          interval: '120',
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: false,
          hotlist: false,
          calendar: false,
          container_id: 'tradingview_acd56' // the div where the graph will be defined
        })
        return simpleSettings
      }

      // eslint-disable-next-line new-cap
      const graphSettings = new (window as any).TradingView.widget({
        autosize: true,
        symbol: symbol,
        timezone: 'Etc/UTC',
        theme: chartMode.value,
        style: '1',
        locale: 'en',
        toolbar_bg: '#C4C4C4',
        enable_publishing: false,
        withdateranges: true, // bottom toolbar
        interval: '120',
        allow_symbol_change: true,
        details: false,
        hotlist: false,
        calendar: false,
        hide_side_toolbar: isMobile,
        save_image: isMobile,
        container_id: 'tradingview_acd56' // the div where the graph will be defined
      })
      return graphSettings
    }

    function createChart (): void {
      const tvscript = document.createElement('script')
      tvscript.async = true
      tvscript.onload = () => {
        createGraph(props.symbol)
      }

      tvscript.setAttribute('src', 'https://s3.tradingview.com/tv.js')
      document.head.appendChild(tvscript)
    }

    watch(() => props.symbol, (newVal: string) => {
      createGraph(newVal)
    })

    watch(isDarkMode, () => {
      createChart()
    })

    onMounted(() => { createChart() })
  }
})
</script>
