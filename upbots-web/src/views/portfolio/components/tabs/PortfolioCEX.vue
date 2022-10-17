<template>
  <!-- DESKTOP -->
  <mq-layout
    mq="lg+"
    class="flex flex-col space-y-20 4xl:space-y-24 overflow-y-auto custom-scrollbar"
  >
    <div
      class="
        portfolio-cex__top-side
        flex
        flex-col
        xl:flex-row
        flex-shrink-0
        space-y-20
        xl:space-y-0
        xl:space-x-20
        4xl:space-x-24
      "
    >
      <div class="portfolio-cex__top-side--left flex flex-col">
        <!-- TOTAL NEW BALANCE -->
        <PortfolioCurrencyCard
          title="Total Net Balance"
          :currency-value="getCexBalance"
          tab-name="cex"
          wrap-classes="portfolio-cex__currency-card"
        />
      </div>

      <!-- PORTFOLIO EVOLUTION CHART -->
      <div class="portfolio-cex__evolution-chart w-full overflow-hidden">
        <PortfolioEvolutionChart
          :data="getCexEvolution"
          tab-name="cex"
          class="flex flex-col flex-grow w-full pt-20 px-20 4xl:px-30"
          title
        />
      </div>
    </div>

    <mq-layout
      mq="2xl+"
      class="portfolio-cex__bottom-side flex flex-shrink-0 space-x-20 4xl:space-x-24"
    >
      <!-- PORTFOLIO WALLETS -->
      <div class="portfolio-cex__bottom-side--left flex flex-col flex-grow">
        <PortfolioWallets wallet-type="cex" />
      </div>

      <div class="flex flex-grow w-full space-x-20 4xl:space-x-24 overflow-hidden">
        <!-- PORTFOLIO DISTRIBUTION TABLE -->
        <PortfolioDistributionTable
          :data="getCexDistribution"
          tab-name="cex"
          class="portfolio-cex__distribution-table flex flex-col"
        />

        <!-- PORTFOLIO DISTRIBUTION CHART -->
        <PortfolioDistributionChart
          :data="getCexDistributionChart"
          tab-name="cex"
          class="portfolio-cex__distribution-chart flex flex-col overflow-hidden"
        />
      </div>
    </mq-layout>

    <!-- TABLET -->
    <mq-layout
      mq="sm-xl"
      class="portfolio-cex__bottom-side flex flex-col flex-shrink-0 space-y-24"
    >
      <div class="flex flex-col lg:flex-row w-full space-y-24 lg:space-y-0 lg:space-x-24">
        <!-- PORTFOLIO WALLETS -->
        <div class="portfolio-cex__wallets flex flex-col flex-grow w-full">
          <PortfolioWallets wallet-type="cex" />
        </div>

        <!-- PORTFOLIO DISTRIBUTION CHART -->
        <PortfolioDistributionChart
          :data="getCexDistributionChart"
          tab-name="cex"
          class="portfolio-cex__distribution-chart flex flex-col w-full"
        />
      </div>

      <!-- PORTFOLIO DISTRIBUTION TABLE -->
      <PortfolioDistributionTable
        :data="getCexDistribution"
        tab-name="cex"
        class="portfolio-cex__distribution-table flex flex-col"
      />
    </mq-layout>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md" class="relative">
    <div class="flex flex-col space-y-24 pb-70 overflow-y-auto custom-scrollbar">
      <div class="flex flex-col flex-shrink-0 space-y-20 overflow-y-auto custom-scrollbar">
        <!-- TOTAL NET BALANCE -->
        <div class="flex flex-col self-start">
          <PortfolioCurrencyCard
            title="Total Net Balance"
            :currency-value="getCexBalance"
            tab-name="cex"
            value-classes="text-nile-blue dark:text-white text-2xl font-semibold text-center"
            title-classes="text-nile-blue dark:text-white"
            wrap-classes="flex-col-reverse items-center"
          />
        </div>

        <!-- PORTFOLIO WALLETS -->
        <PortfolioWallets wallet-type="cex" />
      </div>

      <!-- PORTFOLIO EVOLUTION CHART -->
      <div class="portfolio-cex__evolution-chart flex flex-shrink-0">
        <PortfolioEvolutionChart
          :data="getCexEvolution"
          class="flex flex-col rounded-xl"
          tab-name="cex"
        />
      </div>

      <!-- PORTFOLIO DISTRIBUTION CHART -->
      <div class="flex flex-col">
        <h2 class="w-full text-md font-medium text-nile-blue dark:text-blair mb-16">
          Portfolio Distribution Chart
        </h2>

        <PortfolioDistributionChart
          :data="getCexDistributionChart"
          tab-name="cex"
          class="portfolio-cex__distribution-chart flex flex-col w-full px-10 py-20"
        />
      </div>

      <!-- PORTFOLIO DISTRIBUTION TABLE -->
      <div class="flex flex-col">
        <h2 class="w-full text-md font-medium text-nile-blue dark:text-blair mb-16">
          Portfolio Distribution Table
        </h2>

        <PortfolioDistributionTable
          :data="getCexDistribution"
          tab-name="cex"
          class="portfolio-cex__distribution-table flex flex-col w-full"
        />
      </div>
    </div>

    <!-- ADD NEW WALLET BUTTON -->
    <div
      class="
        fixed
        bottom-70
        right-10
        flex
        items-center
        justify-center
        w-60
        h-60
        bg-true-lavender
        rounded-full
        overflow-hidden
        z-20
      "
    >
      <router-link #default="{ navigate }" :to="{ name: routeNames.keys }" custom>
        <AppIcon
          name="plus-bold"
          size="32"
          class="text-white rounded-full overflow-hidden"
          @click="navigate()"
        />
      </router-link>
    </div>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { routeNames } from '@/router'

import { generateTotalDistributionChart } from '@/core/helpers'

import { usePortfolio } from '@/views/portfolio/portfolio.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

import PortfolioCurrencyCard from '@/views/portfolio/components/PortfolioCurrencyCard.vue'
import PortfolioEvolutionChart from '@/views/portfolio/components/PortfolioEvolutionChart.vue'
import PortfolioWallets from '@/views/portfolio/components/PortfolioWallets.vue'
import PortfolioDistributionTable from '@/views/portfolio/components/PortfolioDistributionTable.vue'
import PortfolioDistributionChart from '@/views/portfolio/components/PortfolioDistributionChart.vue'

export default defineComponent({
  name: 'PortfolioCEX',

  components: {
    PortfolioCurrencyCard,
    PortfolioEvolutionChart,
    PortfolioWallets,
    PortfolioDistributionTable,
    PortfolioDistributionChart
  },

  emits: ['update:selectedPortfolios', 'selected'],

  setup () {
    const { getCexBalance, getCexEvolution } = useGlobal()
    const { getCexDistribution } = usePortfolio()

    const getCexDistributionChart = computed(() => generateTotalDistributionChart(getCexDistribution.value))

    const dropdownActions: { label: string; method: string; icon: string; }[] = [
      { label: 'Edit key', method: 'edit', icon: 'edit' },
      { label: 'Delete', method: 'remove', icon: 'trash' }
    ]

    return {
      routeNames,
      getCexBalance,
      getCexEvolution,
      getCexDistribution,
      getCexDistributionChart,
      dropdownActions
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.portfolio-cex__currency-card) {
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    height: 120px;
  }
}

.portfolio-cex {
  @media(min-width: 1280px) {
    &__top-side {
      height: 330px;
    }

    &__top-side,
    &__bottom-side {
      &--left {
        min-width: 350px;
      }
    }

    &__bottom-side {
      height: 450px;
    }

    &__distribution-table {
      @apply w-3/5;
    }

    &__distribution-chart {
      @apply w-2/5;
    }
  }

  @media(min-width: 2500px) {
    &__top-side {
      height: 400px;
    }

    &__bottom-side {
      height: 560px;
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

  @media screen and (min-width: 768px) and (max-width: 1279px) {
    &__evolution-chart,
    &__distribution-table,
    &__distribution-chart {
      height: 330px;
      max-height: 330px;
    }

    &__wallets {
      min-height: 200px;
      max-height: 330px;
    }
  }
}
</style>
