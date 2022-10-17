<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE (DESKTOP) -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Portfolio</h2>
    </Portal>

    <!-- PORTFOLIO TABS (DESKTOP) -->
    <mq-layout mq="lg+" class="mr-16">
      <Portal to="h-one">
        <AppButtonsGroup
          v-model="configTab"
          :options="configTabs"
          :disabled-options="configDisabledTabs"
          type="outlined"
          :size="is3XL ? 'sm' : !is4XL ? 'xlg' : 'md'"
          :width="isLG ? '95px' : '110px'"
          class="md:ml-10 lg:ml-20 4xl:ml-24"
          @change="changeTab"
        />
      </Portal>
    </mq-layout>

    <!-- PORTFOLIO TABS (MOBILE) -->
    <mq-layout mq="sm-md" class="flex-shrink-0 mb-20">
      <AppButtonsGroup
        v-model="configTab"
        :options="configTabs"
        :disabled-options="configDisabledTabs"
        type="underline"
        size="lg"
        width="100%"
        @change="changeTab"
      />
    </mq-layout>

    <!-- CONTENT -->
    <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <!-- PORTFOLIO SUMMARY TAB -->
      <template v-if="route.name === configTabs[0].value">
        <!-- PORTFOLIO SUMMARY SKELETON -->
        <template v-if="loading">
          <PortfolioSummarySkeleton />
        </template>

        <!-- PORTFOLIO SUMMARY -->
        <template v-else-if="!loading">
          <PortfolioSummary />
        </template>

        <!-- NO DATA AVAILABLE -->
        <template v-else>
          <AppCard class="flex flex-col flex-grow items-center justify-center p-20">
            <AppNoData color="text-chicory-flower dark:text-blair" class="text-4xl font-semibold" />
          </AppCard>
        </template>
      </template>

      <!-- PORTFOLIO CEX TAB -->
      <template v-if="route.name === configTabs[1].value">
        <!-- PORTFOLIO CEX SKELETON -->
        <template v-if="loading">
          <PortfolioCEXSkeleton />
        </template>

        <!-- PORTFOLIO CEX -->
        <template v-else-if="!loading">
          <PortfolioCEX />
        </template>

        <!-- NO DATA AVAILABLE -->
        <template v-else>
          <AppCard class="flex flex-col flex-grow items-center justify-center p-20">
            <AppNoData color="text-chicory-flower dark:text-blair" class="text-4xl font-semibold" />
          </AppCard>
        </template>
      </template>

      <!-- PORTFOLIO ETH TAB -->
      <template v-if="route.name === configTabs[2].value">
        <!-- PORTFOLIO ETH SKELETON -->
        <template v-if="loading">
          <PortfolioETHSkeleton />
        </template>

        <!-- PORTFOLIO ETH -->
        <template v-else-if="!loading">
          <PortfolioETH />
        </template>

        <!-- NO DATA AVAILABLE -->
        <template v-else>
          <AppCard class="flex flex-col flex-grow items-center justify-center p-20">
            <AppNoData color="text-chicory-flower dark:text-blair" class="text-4xl font-semibold" />
          </AppCard>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, router, routeNames } from '@/router'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import PortfolioSummary from '@/views/portfolio/components/tabs/PortfolioSummary.vue'
import PortfolioSummarySkeleton from '@/views/portfolio/components/skeleton/PortfolioSummarySkeleton.vue'
import PortfolioCEX from '@/views/portfolio/components/tabs/PortfolioCEX.vue'
import PortfolioCEXSkeleton from '@/views/portfolio/components/skeleton/PortfolioCEXSkeleton.vue'
import PortfolioETH from '@/views/portfolio/components/tabs/PortfolioETH.vue'
import PortfolioETHSkeleton from '@/views/portfolio/components/skeleton/PortfolioETHSkeleton.vue'

export default defineComponent({
  name: 'Portfolio',

  components: {
    PortfolioSummary,
    PortfolioSummarySkeleton,
    PortfolioCEX,
    PortfolioCEXSkeleton,
    PortfolioETH,
    PortfolioETHSkeleton
  },

  beforeRouteEnter (to: any, from: any, next: any) {
    if (to.name === routeNames.portfolio) {
      next('/portfolio/summary')
    } else {
      next()
    }
  },

  setup () {
    const route = useRoute()

    const { fetchPortfolioData, getPortfolioCEXsError } = useGlobal()
    const { isLG, is3XL, is4XL } = useCustomBreakpoints()

    const loading = ref<boolean>(true)

    // Config Portfolio tabs //
    const configTab = ref<string>(routeNames.portfolioSummary)

    const configTabs = computed(() => [
      { label: 'Summary', value: routeNames.portfolioSummary },
      { label: `${getPortfolioCEXsError.value ? 'CEXs (N/A)' : 'CEXs'}`, value: routeNames.portfolioCexs },
      { label: 'ETH/BSC', value: routeNames.portfolioEth }
    ])

    const configDisabledTabs = computed(() => getPortfolioCEXsError.value ? [routeNames.portfolioCexs] : [])

    function changeTab (item: string): void {
      if (route.name !== `${item}`) {
        router.push({ name: item })
      }
    }

    function setCurrentTab (): void {
      const curr = configTabs.value.find((el) => el.value === route.name)

      if (curr?.value) {
        configTab.value = curr.value
      }
    }

    async function initData (): Promise<void> {
      try {
        setCurrentTab()
        await fetchPortfolioData()
      } finally {
        loading.value = false
      }
    }

    onMounted(() => { initData() })

    return {
      isLG,
      is3XL,
      is4XL,
      loading,
      configTab,
      configTabs,
      route,
      configDisabledTabs,
      changeTab
    }
  }
})
</script>
