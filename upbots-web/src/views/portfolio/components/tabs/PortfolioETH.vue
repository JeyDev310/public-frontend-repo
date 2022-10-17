<template>
  <!-- DESKTOP -->
  <mq-layout
    mq="lg+"
    class="flex flex-col space-y-20 4xl:space-y-24 overflow-y-auto custom-scrollbar"
  >
    <div
      class="
        portfolio-eth__top-side
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
      <div class="portfolio-eth__top-side--left flex flex-col space-y-20 4xl:space-y-24">
        <!-- TOTAL NET BALANCE -->
        <PortfolioCurrencyCard
          title="Total Net Balance"
          :currency-value="getDexBalance"
          tab-name="dex"
          wrap-classes="portfolio-eth__currency-card"
        />

        <!-- CAPITAL -->
        <PortfolioCurrencyCard
          title="Capital"
          :currency-value="capital"
          tab-name="dex"
          wrap-classes="portfolio-eth__currency-card"
          value-classes="text-spring-bouquet"
        />

        <!-- DEBTS -->
        <PortfolioCurrencyCard
          title="Debts"
          :currency-value="debts"
          tab-name="dex"
          wrap-classes="portfolio-eth__currency-card"
        />
      </div>

      <!-- PORTFOLIO EVOLUTION CHART -->
      <div class="portfolio-eth__evolution-chart w-full overflow-hidden">
        <PortfolioEvolutionChart
          :data="getDexEvolution"
          tab-name="dex"
          class="flex flex-col flex-grow w-full pt-20 px-30"
          title
        />
      </div>
    </div>

    <!-- TABLET -->
    <mq-layout
      mq="2xl+"
      class="portfolio-eth__bottom-side flex flex-shrink-0 space-x-20 4xl:space-x-24"
    >
      <!-- PORTFOLIO WALLETS -->
      <div class="portfolio-eth__bottom-side--left flex flex-col flex-grow">
        <PortfolioWallets wallet-type="dex" />
      </div>

      <div class="flex flex-grow w-full space-x-20 4xl:space-x-28 overflow-hidden">
        <!-- PORTFOLIO DISTRIBUTION TABLE -->
        <PortfolioDistributionTable
          :data="getDexDistribution"
          tab-name="dex"
          class="portfolio-eth__distribution-table flex flex-col"
        />

        <!-- PORTFOLIO DISTRIBUTION CHART -->
        <PortfolioDistributionChart
          :data="getDexDistributionChart"
          tab-name="dex"
          chart-wrap-classes="overflow-y-auto custom-scrollbar"
          inner-classes="overflow-y-auto custom-scrollbar"
          class="portfolio-eth__distribution-chart flex flex-col overflow-y-auto custom-scrollbar"
        />
      </div>
    </mq-layout>

    <!-- TABLET -->
    <mq-layout mq="sm-xl" class="portfolio-eth__bottom-side flex flex-col flex-shrink-0 space-y-20">
      <div class="flex flex-col lg:flex-row w-full space-y-20 lg:space-y-0 lg:space-x-20">
        <!-- PORTFOLIO WALLETS -->
        <div class="portfolio-eth__wallets flex flex-col flex-grow w-full">
          <PortfolioWallets wallet-type="dex" />
        </div>

        <!-- PORTFOLIO DISTRIBUTION CHART -->
        <PortfolioDistributionChart
          :data="getDexDistributionChart"
          tab-name="dex"
          class="portfolio-eth__distribution-chart flex flex-col flex-grow w-full"
        />
      </div>

      <!-- PORTFOLIO DISTRIBUTION TABLE -->
      <PortfolioDistributionTable
        :data="getDexDistribution"
        tab-name="dex"
        class="portfolio-eth__distribution-table flex flex-col"
      />
    </mq-layout>

    <!-- PORTFOLIO PROJECTS -->
    <!-- <PortfolioProjects /> -->
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md" class="relative">
    <div class="flex flex-col space-y-24 pb-70 overflow-y-auto custom-scrollbar">
      <div class="grid grid-cols-2 items-center w-full flex-shrink-0 gap-x-10">
        <!-- TOTAL NET BALANCE -->
        <PortfolioCurrencyCard
          title="Total Net Balance"
          :currency-value="getDexBalance"
          tab-name="dex"
          value-classes="text-nile-blue dark:text-white text-2xl font-semibold text-center"
          title-classes="text-nile-blue dark:text-white"
          wrap-classes="portfolio-eth__currency-card flex-col-reverse items-center"
        />

        <div class="flex flex-col w-full space-y-10">
          <!-- CAPITAL -->
          <PortfolioCurrencyCard
            title="Capital"
            :currency-value="capital"
            tab-name="dex"
            value-classes="text-spring-bouquet font-semibold"
            title-classes="text-hard-coal dark:text-light-steel-blue text-sm"
            wrap-classes="portfolio-eth__currency-card flex-col-reverse items-center"
          />

          <!-- DEBTS -->
          <PortfolioCurrencyCard
            title="Debts"
            :currency-value="debts"
            tab-name="dex"
            value-classes="text-hard-coal dark:text-light-steel-blue font-semibold"
            title-classes="text-hard-coal dark:text-light-steel-blue text-sm"
            wrap-classes="portfolio-eth__currency-card flex-col-reverse items-center"
          />
        </div>
      </div>

      <!-- POSTFOLIO WALLETS -->
      <PortfolioWallets wallet-type="dex" />

      <!-- PORTFOLIO EVOLUTION CHART -->
      <div class="portfolio-eth__evolution-chart flex flex-shrink-0">
        <PortfolioEvolutionChart
          :data="getDexEvolution"
          tab-name="dex"
          class="flex flex-col rounded-xl"
        />
      </div>

      <!-- PORTFOLIO DISTRIBUTION CHART -->
      <div class="flex flex-col">
        <h2 class="w-full text-md font-medium text-nile-blue dark:text-blair mb-16">
          Portfolio Distribution Chart
        </h2>

        <PortfolioDistributionChart
          :data="getDexDistributionChart"
          tab-name="dex"
          class="portfolio-eth__distribution-chart flex flex-col w-full px-10 py-20"
        />
      </div>

      <!-- PORTFOLIO DISTRIBUTION TABLE -->
      <div class="flex flex-col">
        <h2 class="w-full text-md font-medium text-nile-blue dark:text-blair mb-16">
          Portfolio Distribution Table
        </h2>

        <PortfolioDistributionTable
          :data="getDexDistribution"
          tab-name="dex"
          class="portfolio-eth__distribution-table flex flex-col w-full"
        />
      </div>

      <!-- PORTFOLIO PROJECTS -->
      <!-- <PortfolioProjects /> -->
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
      @click="isModalOpen = true"
    >
      <AppIcon
        name="plus-bold"
        size="32"
        class="text-white rounded-full overflow-hidden"
      />
    </div>

    <!-- ADD NEW WALLET MODAL -->
    <AppModal v-model="isModalOpen" :beforeClose="handleModalClose">
      <AddDexWalletModal @success="() => isModalOpen = false" />
    </AppModal>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { vuex } from '@/store'

import { appConfirm } from '@/components/stateless/confirms/confirm.state'

import { usePortfolio } from '@/views/portfolio/portfolio.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

import PortfolioCurrencyCard from '@/views/portfolio/components/PortfolioCurrencyCard.vue'
import PortfolioEvolutionChart from '@/views/portfolio/components/PortfolioEvolutionChart.vue'
import PortfolioWallets from '@/views/portfolio/components/PortfolioWallets.vue'
import PortfolioDistributionTable from '@/views/portfolio/components/PortfolioDistributionTable.vue'
import PortfolioDistributionChart from '@/views/portfolio/components/PortfolioDistributionChart.vue'
// import PortfolioProjects from '@/views/portfolio/components/projects/PortfolioProjects.vue'
import AddDexWalletModal from '@/views/portfolio/components/AddDexWalletModal.vue'

export default defineComponent({
  name: 'PortfolioETH',

  components: {
    PortfolioCurrencyCard,
    PortfolioEvolutionChart,
    PortfolioWallets,
    PortfolioDistributionTable,
    PortfolioDistributionChart,
    // PortfolioProjects,
    AddDexWalletModal
  },

  emits: ['update:selectedPortfolios', 'selected'],

  setup () {
    const { getDexBalance, getDexEvolution } = useGlobal()
    const { getDexDistribution, getDexDistributionChart } = usePortfolio()

    const isModalOpen = ref<boolean>(false)

    const capital = computed(() => vuex.dex.getCapital)
    const debts = computed(() => vuex.dex.getDebts)

    function handleModalClose () {
      return appConfirm({ title: 'Confirm your action', body: 'Are you sure to close?' })
    }

    return {
      getDexDistribution,
      getDexEvolution,
      getDexDistributionChart,
      getDexBalance,
      capital,
      debts,
      isModalOpen,
      handleModalClose
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.portfolio-eth__currency-card) {
  @media screen and (min-width: 768px) and (max-width: 1279px) {
    height: 120px;
  }
}

.portfolio-eth {
  @media(min-width: 1280px) {
    &__top-side {
      height: 350px;
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
      height: 200px;
    }

    &__distribution-chart {
      min-height: 350px;
    }

    &__distribution-table {
      height: 400px;
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
