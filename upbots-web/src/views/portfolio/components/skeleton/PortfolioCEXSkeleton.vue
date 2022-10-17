<template>
  <!-- DESKTOP -->
  <mq-layout
    mq="lg+"
    class="flex flex-col space-y-20 4xl:space-y-24 overflow-y-auto custom-scrollbar"
  >
    <div
      class="
        portfolio-cex-skeleton__top-side
        flex
        flex-col
        xl:flex-row
        flex-shrink-0
        space-y-24
        xl:space-y-0
        xl:space-x-20
        4xl:space-x-24
      "
    >
      <div class="portfolio-cex-skeleton__top-side--left flex flex-col space-y-20 4xl:space-y-24">
        <!-- TOTAL NET BALANCE -->
        <AppCard class="portfolio-cex-skeleton__currency-card flex-grow">
          <AppSkeleton type="card" class="w-full h-full" />
        </AppCard>
      </div>

      <!-- CHART -->
      <AppCard class="portfolio-cex-skeleton__evolution-chart flex flex-col items-center justify-center w-full">
        <AppSkeleton type="lineChart" class="w-full h-full" />
      </AppCard>
    </div>

    <mq-layout mq="2xl+" class="portfolio-cex-skeleton__bottom-side flex flex-shrink-0 space-x-20 4xl:space-x-24">
      <!-- MY WALLETS CARD -->
      <div class="portfolio-cex-skeleton__bottom-side--left flex flex-col flex-grow">
        <AppCard class="flex flex-col items-center justify-center flex-grow">
          <AppSkeleton type="card" class="w-full h-full" />
        </AppCard>
      </div>

      <div class="flex w-full space-x-20 4xl:space-x-24">
        <!-- PORTFOLIO DISTRIBUTION TABLE -->
        <AppCard class="portfolio-cex-skeleton__distribution-table flex flex-col items-center justify-center w-full">
          <AppSkeleton type="table" view-box="0 0 1000 570" class="w-full h-full" />
        </AppCard>

        <!-- PORTFOLIO DISTRIBUTION PIE CHART -->
        <AppCard class="portfolio-cex-skeleton__distribution-chart flex flex-col items-center justify-center w-full">
          <AppSkeleton type="pieChart" class="w-full" />
        </AppCard>
      </div>
    </mq-layout>

    <!-- TABLET -->
    <mq-layout
      mq="sm-xl"
      class="portfolio-cex-skeleton__bottom-side flex flex-col flex-shrink-0 space-y-24"
    >
      <div class="flex flex-col lg:flex-row w-full space-y-24 lg:space-y-0 lg:space-x-24">
        <!-- PORTFOLIO WALLETS -->
        <AppCard class="portfolio-cex-skeleton__wallets flex flex-col flex-grow w-full lg:w-1/2">
          <AppSkeleton type="card" class="w-full h-full" />
        </AppCard>

        <!-- PORTFOLIO DISTRIBUTION CHART -->
        <AppCard
          class="portfolio-cex-skeleton__distribution-chart flex flex-col items-center justify-center w-full lg:w-1/2"
        >
          <AppSkeleton type="pieChart" class="w-full h-full" />
        </AppCard>
      </div>

      <!-- PORTFOLIO DISTRIBUTION TABLE -->
      <AppCard class="portfolio-cex-skeleton__distribution-table flex flex-col">
        <AppSkeleton type="table" view-box="0 0 1000 570" class="w-full h-full" />
      </AppCard>
    </mq-layout>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout
    mq="sm-md"
    class="flex flex-col space-y-24 pb-20 overflow-y-auto custom-scrollbar"
  >
    <!-- PORTFOLIO TOTAL NEW BALANCE -->
    <AppCard class="portfolio-cex-skeleton__currency-card">
      <AppSkeleton type="card" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO WALLETS -->
    <AppCard class="portfolio-cex-skeleton__wallets-card">
      <AppSkeleton type="card" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO EVOLUTION CHART -->
    <AppCard class="portfolio-cex-skeleton__evolution-chart flex flex-col items-center justify-center w-full">
      <AppSkeleton type="lineChart" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO DISTRIBUTION CHART -->
    <AppCard class="portfolio-cex-skeleton__distribution-chart w-full">
      <AppSkeleton type="pieChart" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO DISTRIBUTION TABLE -->
    <AppCard class="portfolio-cex-skeleton__distribution-table w-full mb-40">
      <AppSkeleton type="table" view-box="0 0 1000 570" class="w-full h-full" />
    </AppCard>
  </mq-layout>
</template>

<script lang="ts">
export default {
  name: 'PortfolioCEXSkeleton'
}
</script>

<style lang="scss" scoped>
.portfolio-cex-skeleton {
  &__currency-card {
    @apply flex flex-col justify-center items-center w-full;
    height: 60px;
  }

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

    &__currency-card {
      @apply h-1/2;
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
    &__wallets-card {
      height: 60px;
    }

    &__evolution-chart {
      height: 220px;
    }

    &__distribution-chart {
      max-height: 350px;
    }

    &__distribution-table {
      height: 350px;
      max-height: 350px;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1279px) {
    &__currency-card {
      height: 120px;
    }

    &__evolution-chart,
    &__distribution-table,
    &__distribution-chart {
      height: 330px;
      max-height: 330px;
    }

    &__wallets {
      min-height: 330px;
    }
  }
}
</style>
