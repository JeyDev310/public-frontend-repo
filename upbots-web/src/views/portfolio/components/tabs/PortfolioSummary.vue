<template>
  <!-- DESKTOP -->
  <mq-layout
    mq="lg+"
    class="flex flex-col space-y-20 4xl:space-y-24 overflow-y-auto custom-scrollbar"
  >
    <div class="flex flex-col lg:flex-row justify-between flex-shrink-0 w-full">
      <!-- TOTAL NET BALANCE -->
      <PortfolioCurrencyCard
        title="Total Net Balance"
        :currency-value="getTotalBalance"
        tab-name="summary"
        wrap-classes="portfolio-summary__currency-card"
      />

      <div class="self-center my-8 lg:my-0 lg:mx-12">
        <AppIcon name="equal" size="42" class="text-nile-blue dark:text-soaring-eagle" />
      </div>

      <!-- TOTAL CEXS -->
      <!-- N/A TODO -->
      <PortfolioCurrencyCard
        title="Total CEX Balance"
        :currency-value="getCexBalance"
        tab-name="summary"
        :not-available-data="getPortfolioCEXsError"
        wrap-classes="portfolio-summary__currency-card"
      />

      <div class="self-center my-8 lg:my-0 lg:mx-12">
        <AppIcon name="plus-thin" size="42" class="text-nile-blue dark:text-soaring-eagle" />
      </div>

      <!-- TOTAL DEXS -->
      <PortfolioCurrencyCard
        title="Total DEX Balance"
        :currency-value="getDexBalance"
        tab-name="summary"
        wrap-classes="portfolio-summary__currency-card"
      />
    </div>

    <!-- PORTFOLIO EVOLUTION CHART -->
    <div class="portfolio-summary__evolution-chart flex flex-shrink-0">
      <PortfolioEvolutionChart
        :data="getTotalEvolution"
        class="flex flex-col flex-grow w-full pt-20 px-20 4xl:px-30"
        title
        tab-name="summary"
      />
    </div>

    <div
      class="
        portfolio-summary__bottom-side
        flex
        flex-col
        lg:flex-row
        flex-shrink-0
        space-y-20
        lg:space-y-0
        lg:space-x-20
        4xl:space-x-24
      "
    >
      <!-- PORTFOLIO DISTRIBUTION TABLE -->
      <PortfolioDistributionTable
        :data="totalDistributionTable"
        tab-name="summary"
        class="portfolio-summary__distribution-table flex flex-col w-full lg:w-1/2"
      />

      <!-- PORTFOLIO DISTRIBUTION CHART -->
      <PortfolioDistributionChart
        :data="totalDistributionChart"
        tab-name="summary"
        class="portfolio-summary__distribution-chart flex flex-col w-full lg:w-1/2"
      />
    </div>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md" class="flex flex-col space-y-24 overflow-y-auto custom-scrollbar">
    <div class="grid grid-cols-2 items-center w-full flex-shrink-0 gap-x-20">
      <!-- TOTAL NET BALANCE -->
      <PortfolioCurrencyCard
        title="Total Net Balance"
        :currency-value="getTotalBalance"
        tab-name="summary"
        value-classes="text-nile-blue dark:text-white text-2xl font-semibold text-center"
        title-classes="text-nile-blue dark:text-white"
        wrap-classes="flex-col-reverse items-center"
      />

      <div class="flex flex-col w-full space-y-10">
        <!-- TOTAL DEXS -->
        <PortfolioCurrencyCard
          title="Total DEXs"
          :currency-value="getDexBalance"
          tab-name="summary"
          value-classes="text-hard-coal dark:text-light-steel-blue font-semibold"
          title-classes="text-hard-coal dark:text-light-steel-blue text-sm"
          wrap-classes="flex-col-reverse items-center"
        />

        <!-- TOTAL CEXS -->
        <PortfolioCurrencyCard
          title="Total CEXs"
          :currency-value="getCexBalance"
          :not-available-data="getPortfolioCEXsError"
          tab-name="summary"
          value-classes="text-hard-coal dark:text-light-steel-blue text-base font-semibold"
          title-classes="text-hard-coal dark:text-light-steel-blue text-sm"
          wrap-classes="flex-col-reverse items-center"
        />
      </div>
    </div>

    <!-- PORTFOLIO EVOLUTION CHART -->
    <div class="portfolio-summary__evolution-chart flex flex-shrink-0">
      <PortfolioEvolutionChart
        :data="getTotalEvolution"
        class="flex flex-col rounded-xl"
        tab-name="summary"
      />
    </div>

    <!-- PORTFOLIO DISTRIBUTION CHART -->
    <div class="flex flex-col">
      <h2 class="w-full text-md font-medium text-nile-blue dark:text-blair mb-16">
        Portfolio Distribution Chart
      </h2>

      <PortfolioDistributionChart
        :data="totalDistributionChart"
        tab-name="summary"
        class="portfolio-summary__distribution-chart flex flex-col w-full px-10 py-20"
      />
    </div>

    <!-- PORTFOLIO DISTRIBUTION TABLE -->
    <div class="flex flex-col">
      <h2 class="w-full text-md font-medium text-nile-blue dark:text-blair mb-16">
        Portfolio Distribution Table
      </h2>

      <PortfolioDistributionTable
        :data="totalDistributionTable"
        tab-name="summary"
        class="portfolio-summary__distribution-table flex flex-col w-full"
      />
    </div>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { generateTotalDistributionTable, generateTotalDistributionChart } from '@/core/helpers'

import { usePortfolio } from '@/views/portfolio/portfolio.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

import PortfolioCurrencyCard from '@/views/portfolio/components/PortfolioCurrencyCard.vue'
import PortfolioEvolutionChart from '@/views/portfolio/components/PortfolioEvolutionChart.vue'
import PortfolioDistributionTable from '@/views/portfolio/components/PortfolioDistributionTable.vue'
import PortfolioDistributionChart from '@/views/portfolio/components/PortfolioDistributionChart.vue'

export default defineComponent({
  name: 'PortfolioSummary',

  components: {
    PortfolioCurrencyCard,
    PortfolioEvolutionChart,
    PortfolioDistributionTable,
    PortfolioDistributionChart
  },

  setup () {
    const {
      getCexBalance,
      getDexBalance,
      getTotalBalance,
      getTotalEvolution,
      getPortfolioCEXsError
    } = useGlobal()
    const { getCexDistribution, getDexDistribution } = usePortfolio()

    const totalDistributionTable = computed(() =>
      generateTotalDistributionTable(getCexDistribution.value, getDexDistribution.value)
    )

    const totalDistributionChart = computed(() => generateTotalDistributionChart(totalDistributionTable.value))

    return {
      getTotalBalance,
      getCexBalance,
      getDexBalance,
      totalDistributionTable,
      totalDistributionChart,
      getTotalEvolution,
      getPortfolioCEXsError
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.portfolio-summary__currency-card) {
  @media(min-width: 768px) {
    height: 130px;
  }

  @media(min-width: 2500px) {
    height: 160px;
  }
}

.portfolio-summary {
  @media(min-width: 768px) {
    &__evolution-chart {
      height: 330px;
    }
  }

  @media(min-width: 2500px) {
    &__bottom-side {
      height: 570px;
    }
  }

  @media(max-width: 767px) {
    &__evolution-chart {
      height: 220px;
    }

    &__distribution-chart {
      min-height: 350px;
    }

    &__distribution-table {
      height: 350px;
      max-height: 350px;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    &__distribution-table,
    &__distribution-chart {
      height: 400px;
      max-height: 400px;
    }
  }

  @media screen and (min-width: 1024px) and (max-width: 2499px) {
    &__bottom-side {
      height: 420px;
    }
  }
}
</style>
