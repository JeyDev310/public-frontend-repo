<template>
  <!-- DESKTOP -->
  <mq-layout
    mq="lg+"
    class="flex flex-col space-y-20 4xl:space-y-24 overflow-y-auto custom-scrollbar"
  >
    <div class="flex flex-col lg:flex-row justify-between w-full">
      <!-- TOTAL NET BALANCE -->
      <AppCard class="portfolio-summary-skeleton__currency-card p-10">
        <AppSkeleton type="card" class="w-full h-full" />
      </AppCard>

      <div class="self-center my-8 lg:my-0 lg:mx-12">
        <AppIcon name="equal" size="42" class="text-nile-blue dark:text-soaring-eagle" />
      </div>

      <!-- TOTAL CEXS -->
      <AppCard class="portfolio-summary-skeleton__currency-card p-10">
        <AppSkeleton type="card" class="w-full h-full" />
      </AppCard>

      <div class="self-center my-8 lg:my-0 lg:mx-12">
        <AppIcon name="plus-thin" size="42" class="text-nile-blue dark:text-soaring-eagle" />
      </div>

      <!-- TOTAL DEXS -->
      <AppCard class="portfolio-summary-skeleton__currency-card p-10">
        <AppSkeleton type="card" class="w-full h-full" />
      </AppCard>
    </div>

    <!-- PORTFOLIO CHART -->
    <AppCard class="portfolio-summary-skeleton__middle-side w-full">
      <AppSkeleton type="lineChart" class="w-full h-full" />
    </AppCard>

    <div
      class="
        portfolio-summary-skeleton__bottom-side
        flex
        flex-col
        lg:flex-row
        flex-shrink-0
        space-y-24
        lg:space-y-0
        lg:space-x-24
        xl:space-x-28
      "
    >
      <!-- PORTFOLIO DISTRIBUTION TABLE -->
      <AppCard class="portfolio-summary__distribution-table flex flex-col items-center justify-center w-full lg:w-1/2">
        <AppSkeleton type="table" view-box="0 0 1000 570" class="w-full h-full" />
      </AppCard>

      <!-- PORTFOLIO DISTRIBUTION CHART -->
      <AppCard class="portfolio-summary__distribution-table flex flex-col items-center justify-center w-full lg:w-1/2">
        <AppSkeleton type="pieChart" class="w-full h-full" />
      </AppCard>
    </div>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout
    mq="sm-md"
    class="flex flex-col space-y-24 pb-20 overflow-y-auto custom-scrollbar"
  >
    <!-- PORTFOLIO SUMMARY -->
    <AppCard class="portfolio-summary-skeleton__currency-card">
      <AppSkeleton type="card" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO CHART -->
    <AppCard class="portfolio-summary-skeleton__middle-side w-full">
      <AppSkeleton type="lineChart" class="w-full h-full" />
    </AppCard>

    <!-- PORTFOLIO DISTRIBUTION PIE CHART -->
    <AppCard class="portfolio-summary__distribution-table w-full">
      <AppSkeleton type="pieChart" />
    </AppCard>

    <!-- PORTFOLIO DISTRIBUTION TABLE -->
    <AppCard class="portfolio-summary__distribution-table w-full">
      <AppSkeleton type="table" view-box="0 0 1000 570" />
    </AppCard>
  </mq-layout>
</template>

<script lang="ts">
export default {
  name: 'PortfolioSummarySkeleton'
}
</script>

<style lang="scss" scoped>
.portfolio-summary-skeleton {
  &__currency-card {
    @apply flex flex-col justify-center items-center w-full;
    height: 100px;
  }

  @media(min-width: 768px) {
    &__currency-card {
      @apply flex flex-col items-center w-full;
      height: 130px;
    }

    &__middle-side {
      height: 330px;
    }
  }

  @media(min-width: 1024px) {
    &__bottom-side {
      height: 400px;
    }
  }

  @media(min-width: 2500px) {
    &__currency-card {
      height: 160px;
    }

    &__bottom-side {
      height: 570px;
    }
  }

  @media(max-width: 767px) {
    &__middle-side {
      height: 220px;
    }

    &__distribution-chart {
      min-height: 350px;
    }

    &__distribution-table {
      max-height: 350px;
    }

    &__currency-card {
      height: 91px;
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
