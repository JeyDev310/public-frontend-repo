<template>
  <!-- DESKTOP -->
  <mq-layout
    mq="lg+"
    class="flex flex-col space-y-20 4xl:space-y-24 overflow-y-auto custom-scrollbar"
  >
    <div
      class="
        portfolio-eth-skeleton__top-side
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
      <div
        class="
          portfolio-eth-skeleton__top-side--left
          flex
          flex-col
          space-y-20
          xl:space-y-0
          xl:grid
          xl:grid-rows-3
          xl:gap-y-20
          4xl:gap-y-24
        "
      >
        <!-- TOTAL NEW BALANCE -->
        <AppCard class="portfolio-eth-skeleton__currency-card">
          <AppSkeleton type="card" class="w-full h-full" />
        </AppCard>

        <!-- CAPITAL -->
        <AppCard class="portfolio-eth-skeleton__currency-card">
          <AppSkeleton type="card" class="w-full h-full" />
        </AppCard>

        <!-- DEBTS -->
        <AppCard class="portfolio-eth-skeleton__currency-card">
          <AppSkeleton type="card" class="w-full h-full" />
        </AppCard>
      </div>

      <!-- PORTFOLIO EVOLUTION CHART -->
      <AppCard class="portfolio-eth-skeleton__evolution-chart flex flex-col items-center justify-center w-full">
        <AppSkeleton type="lineChart" class="w-full h-full" />
      </AppCard>
    </div>

    <mq-layout mq="2xl+" class="portfolio-eth-skeleton__bottom-side flex flex-shrink-0 space-x-28">
      <!-- PORTFOLIO WALLETS -->
      <div class="portfolio-eth-skeleton__bottom-side--left flex flex-col flex-grow">
        <AppCard class="flex flex-col items-center justify-center flex-grow">
          <AppSkeleton type="card" class="w-full h-full" />
        </AppCard>
      </div>

      <div class="flex flex-grow w-full space-x-28">
        <!-- PORTFOLIO DISTRIBUTION TABLE -->
        <AppCard class="portfolio-eth-skeleton__distribution-table flex flex-col items-center justify-center w-full">
          <AppSkeleton type="table" view-box="0 0 1000 570" class="w-full h-full" />
        </AppCard>

        <!-- PORTFOLIO DISTRIBUTION CHART -->
        <AppCard class="portfolio-eth-skeleton__distribution-chart flex flex-col items-center justify-center w-full">
          <AppSkeleton type="pieChart" class="w-full" />
        </AppCard>
      </div>
    </mq-layout>

    <!-- TABLET -->
    <mq-layout mq="sm-xl" class="portfolio-eth-skeleton__bottom-side flex flex-col flex-shrink-0 space-y-24">
      <div class="flex flex-col lg:flex-row w-full space-y-24 lg:space-y-0 lg:space-x-24">
        <!-- MY WALLETS CARD -->
        <AppCard class="portfolio-eth-skeleton__wallets flex flex-col flex-grow w-full lg:w-1/2">
          <AppSkeleton type="card" class="w-full h-full" />
        </AppCard>

        <!-- PORTFOLIO DISTRIBUTION CHART -->
        <AppCard
          class="portfolio-eth-skeleton__distribution-chart flex flex-col items-center justify-center w-full lg:w-1/2"
        >
          <AppSkeleton type="pieChart" class="w-full h-full" />
        </AppCard>
      </div>

      <!-- PORTFOLIO DISTRIBUTION TABLE -->
      <AppCard class="portfolio-eth-skeleton__distribution-table flex flex-col">
        <AppSkeleton type="table" view-box="0 0 1000 570" class="w-full h-full" />
      </AppCard>
    </mq-layout>

    <!-- PORTFOLIO PROJECTS -->
    <!-- <div class="flex flex-col w-full space-y-28">
      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>
    </div> -->
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md" class="flex flex-col space-y-24 pb-20 overflow-y-auto custom-scrollbar">
    <!-- PORTFOLIO SUMMARY -->
    <AppCard class="portfolio-eth-skeleton__currency-card">
      <AppSkeleton type="card" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO WALLETS -->
    <AppCard class="portfolio-eth-skeleton__wallets-card">
      <AppSkeleton type="card" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO EVOLUTION CHART -->
    <AppCard class="portfolio-eth-skeleton__evolution-chart flex flex-col items-center justify-center w-full">
      <AppSkeleton type="lineChart" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO DISTRIBUTION CHART -->
    <AppCard class="portfolio-eth-skeleton__distribution-chart w-full">
      <AppSkeleton type="pieChart" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO DISTRIBUTION TABLE -->
    <AppCard class="portfolio-eth-skeleton__distribution-table w-full mb-40">
      <AppSkeleton type="table" view-box="0 0 1000 570" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO PROJECTS -->
    <!-- <div class="flex flex-col w-full space-y-12">
      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>

      <AppCard class="portfolio-eth-skeleton__projects-table">
        <AppSkeleton type="table" class="w-full h-full" view-box="0 0 1000 570" />
      </AppCard>
    </div> -->
  </mq-layout>
</template>

<script lang="ts">
export default {
  name: 'PortfolioETHSkeleton'
}
</script>

<style lang="scss" scoped>
.portfolio-eth-skeleton {
  &__currency-card {
    @apply flex flex-col justify-center items-center md:h-full w-full;
  }

  &__projects-table {
    @apply flex flex-col items-center justify-center w-full;
    height: 130px;
  }

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

  @media(max-width: 1279px) {
    &__currency-card {
      @apply p-10;
    }
  }

  @media(max-width: 767px) {
    &__currency-card {
      height: 91px;
    }

    &__wallets-card {
      height: 60px;
    }

    &__evolution-chart {
      height: 200px;
    }

    &__distribution-chart {
      max-height: 350px;
    }

    &__distribution-table {
      height: 400px;
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
