<template>
  <div class="flex flex-col overflow-y-hidden custom-scrollbar">
    <!-- TUTORIAL -->
    <Portal to="h-three">
      <div class="flex space-x-10 md:space-x-16 4xl:space-x-30 mr-10 md:mr-16 4xl:mr-30">
        <div class="header__nav-menu-item-wrap">
          <AppIcon
            name="question-circle"
            class="header__nav-menu-item bg-blair"
            :class="!isHeroMobilePage ? 'text-blair bg-opacity-10' : 'text-white bg-opacity-30'"
            :size="is3XL ? '20' : !is4XL ? '30' : '22'"
            @click="isTutorialModalOpened = true"
          />
        </div>
      </div>
    </Portal>

    <!-- DESKTOP -->
    <mq-layout
      mq="lg+"
      class="
        flex
        flex-col
        flex-grow
        w-full
        space-y-20
        4xl:space-y-24
        overflow-y-auto
        custom-scrollbar
      "
    >
      <!-- GET 200 UBXT -->
      <Portal to="h-two">
        <router-link #default="{ navigate }" :to="{ name: routeNames.referral}" custom>
          <div class="mr-10 md:mr-16 4xl:mr-30">
            <AppButton type="white-outlined" rounded="md" @click="navigate">Get 200 UBXT</AppButton>
          </div>
        </router-link>
      </Portal>

      <!-- HOME HERO SECTION -->
      <HomeHero :data="cryptoPriceData" />

      <div class="flex flex-col flex-shrink-0 w-full">
        <!-- WM (should add z-10) in default mode should remove relative z-10 -->
        <div
          class="
            home__top-side
            flex
            flex-col
            xl:flex-row
            relative
            xl:space-x-20
            4xl:space-x-24
            space-y-20
            xl:space-y-0
            w-full
            px-20
          "
        >
          <!-- HOME BANNER CAROUSEL -->
          <HomeBannerCarousel :loading="algoBotsLoading" />

          <!-- MARKET VALUE WIDGET -->
          <MarketValueWidget :cryptoList="cryptoList" :data="cryptoPriceData" />
        </div>
      </div>

      <!-- OVERVIEW SECTION -->
      <div class="flex flex-col flex-shrink-0 w-full px-20">
        <h2
          class="
            tracking-tightest
            text-heavy-metal-armor
            dark:text-cashmere-blue
            text-xl
            4xl:text-2xl
            uppercase
            font-semibold
            mb-20
            4xl:mb-24
          "
        >
          Overview
        </h2>

        <div
          class="
            home__section-overview
            flex
            flex-col
            xl:flex-row
            xl:grid
            w-full
            space-y-20
            xl:space-y-0
            xl:gap-x-20
            4xl:gap-x-24
          "
        >
          <div class="grid grid-rows-1 gap-y-20 4xl:gap-y-24">
            <!-- TOTAL BALANCE CARD -->
            <router-link #default="{ navigate }" :to="{ name: routeNames.portfolioSummary}" custom>
              <HomeTotalCard
                title="Total Balance"
                :loading="loadingPortfolio"
                :currency-value="getTotalBalance"
                @click="navigate()"
              />
            </router-link>

            <div class="grid grid-cols-2 gap-x-20 4xl:gap-x-24">
              <!-- TOTAL DEX(S) CARD -->
              <router-link #default="{ navigate }" :to="{ name: routeNames.portfolioEth}" custom>
                <HomeTotalCard
                  title="Total DEX(s)"
                  :loading="loadingPortfolio"
                  :currency-value="getDexBalance"
                  @click="navigate()"
                />
              </router-link>

              <!-- TOTAL CEX(S) CARD -->
              <router-link #default="{ navigate }" :to="{ name: routeNames.portfolioCexs}" custom>
                <!-- N/A TODO -->
                <HomeTotalCard
                  title="Total CEX(s)"
                  :loading="loadingPortfolio"
                  :currency-value="getCexBalance"
                  :not-available-data="getPortfolioCEXsError"
                  @click="navigate()"
                />
              </router-link>
            </div>
          </div>

          <!-- PORTFOLIO EVOLUTION CHART -->
          <div class="home__portfolio-evolution-chart w-full overflow-hidden relative">
            <AppLoader v-if="loadingPortfolio" class="rounded-xlg" />

            <PortfolioEvolutionChart
              v-else
              :data="getTotalEvolution"
              tab-name="summary"
              :add-key-link="!loadingPortfolio ? false : true"
              class="flex flex-col flex-grow pt-20 px-20"
              title
            />
          </div>
        </div>

        <div class="flex flex-col items-end w-full mt-20 4xl:mt-24">
          <router-link #default="{ navigate }" :to="{ name: routeNames.portfolioSummary }" custom>
            <AppButton
              type="grey-outlined"
              rounded="lg"
              @click="navigate()"
            >
              See more
            </AppButton>
          </router-link>
        </div>
      </div>

      <!-- TOOLS SECTION -->
      <HomeTools />

      <!-- ALGOBOTS SECTION -->
      <HomeAlgobots :loading="algoBotsLoading" />
    </mq-layout>

    <!-- MOBILE -->
    <mq-layout
      mq="sm-md"
      class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar"
    >
      <!-- TITLE -->
      <Portal to="h-title">
        <h2 :class="!isHeroMobilePage ? 'text-nile-blue dark:text-let-it-snow' : 'text-white'">
          Home
        </h2>
      </Portal>

      <!-- HOME HERO MOBILE -->
      <HomeHeroMobile :loading="loadingPortfolio" :value="getTotalBalance" />

      <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
        <!-- TABS SELECT -->
        <AppButtonsGroup
          v-model="configTab"
          :options="configTabs"
          type="underline"
          width="100%"
          class="flex-shrink-0 mb-20"
        />

        <!-- WALLET TAB -->
        <div
          v-if="configTab === configTabs[0].value"
          class="flex flex-col flex-grow w-full px-12 overflow-y-auto custom-scrollbar"
        >
          <div class="flex flex-col w-full flex-shrink-0 space-y-12">
            <router-link :to="{ name: routeNames.portfolioSummary }">
              <HomeTotalCard
                title="Total Balance"
                :is-default-card-bg="false"
                :loading="loadingPortfolio"
                :currency-value="getTotalBalance"
                class="home__total-card-bg"
              />
            </router-link>

            <div class="grid grid-cols-2 w-full space-x-12">
              <router-link :to="{ name: routeNames.portfolioEth }">
                <HomeTotalCard
                  title="Total DEX(s)"
                  :loading="loadingPortfolio"
                  :currency-value="getDexBalance"
                />
              </router-link>

              <router-link :to="{ name: routeNames.portfolioCexs }">
                <HomeTotalCard
                  title="Total CEX(s)"
                  :loading="loadingPortfolio"
                  :currency-value="getCexBalance"
                  :not-available-data="getPortfolioCEXsError"
                />
              </router-link>
            </div>
          </div>

          <div class="flex flex-col flex-shrink-0">
            <h2 class="text-heavy-metal-armor dark:text-cashmere-blue text-md font-medium mb-10 mt-10">
              Evolution
            </h2>

            <!-- PORTFOLIO EVOLUTION CHART -->
            <div class="home__portfolio-evolution-chart w-full mb-10 relative">
              <AppLoader v-if="loadingPortfolio" class="rounded-xlg" />
              <PortfolioEvolutionChart
                v-else
                :data="getTotalEvolution"
                class="flex flex-col-reverse pb-5 rounded-xl"
                :add-key-link="!loadingPortfolio ? false : true"
                toolbar-classes="px-10"
                tab-name="summary"
              />
            </div>

            <div class="flex flex-col w-full">
              <router-link #default="{ navigate }" :to="{ name: routeNames.portfolioSummary }" custom>
                <AppButton
                  type="grey-outlined"
                  size="xlg"
                  rounded="lg"
                  @click="navigate()"
                >
                  See more
                </AppButton>
              </router-link>
            </div>
          </div>
        </div>

        <!-- MY BOTS TAB -->
        <div
          v-if="configTab === configTabs[1].value"
          class="flex flex-col flex-grow w-full px-12 overflow-y-auto custom-scrollbar"
        >
          <!-- ACTIVE BOTS -->
          <HomeAlgobotsActiveMobile v-if="Object.keys(subscriptedBots).length" :loading="algoBotsLoading" />

          <!-- ALL BOTS -->
          <HomeAlgobotsMobile v-else />
        </div>

        <!-- TOOLS TAB -->
        <div
          v-if="configTab === configTabs[2].value"
          class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar"
        >
          <HomeToolsMobile />

          <div class="flex flex-col flex-shrink-0 mt-auto">
            <HomeBannerCarousel class="flex-shrink-0" :loading="algoBotsLoading" />
          </div>
        </div>
      </div>
    </mq-layout>

    <!-- TUTORIAL MODAL -->
    <AppModal v-model="isTutorialModalOpened">
      <TutorialModals @close="isTutorialModalOpened = false" />
    </AppModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRefs, reactive, onMounted } from 'vue'
import { routeNames } from '@/router'

import { vuex } from '@/store'
import { localStorageService } from '@/services'
import { ICoinItem } from '@/types/crypto.types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import HomeHero from '@/views/home/components/hero/HomeHero.vue'
import HomeHeroMobile from '@/views/home/components/hero/HomeHeroMobile.vue'
import HomeBannerCarousel from '@/views/home/components/HomeBannerCarousel.vue'
import MarketValueWidget from '@/views/home/components/market-widget/MarketValueWidget.vue'
import HomeTotalCard from '@/views/home/components/overview-section/HomeTotalCard.vue'
import PortfolioEvolutionChart from '@/views/portfolio/components/PortfolioEvolutionChart.vue'
import HomeTools from '@/views/home/components/tools-section/HomeTools.vue'
import HomeToolsMobile from '@/views/home/components/tools-section/HomeToolsMobile.vue'
import HomeAlgobots from '@/views/home/components/algobots-section/HomeAlgobots.vue'
import HomeAlgobotsActiveMobile from '@/views/home/components/algobots-section/active-bots/HomeAlgobotsActiveMobile.vue'
import HomeAlgobotsMobile from '@/views/home/components/algobots-section/all-bots/HomeAlgobotsMobile.vue'
import TutorialModals from '@/views/home/components/tutorial/TutorialModals.vue'

export default defineComponent({
  name: 'Home',

  components: {
    HomeHero,
    HomeHeroMobile,
    HomeBannerCarousel,
    MarketValueWidget,
    HomeTotalCard,
    PortfolioEvolutionChart,
    HomeTools,
    HomeToolsMobile,
    HomeAlgobots,
    HomeAlgobotsActiveMobile,
    HomeAlgobotsMobile,
    TutorialModals
  },

  setup () {
    const { is3XL, is4XL } = useCustomBreakpoints()
    const {
      fetchPortfolioData,
      getCexBalance,
      getDexBalance,
      getTotalBalance,
      getTotalEvolution,
      getFavoriteCurrency,
      isHeroMobilePage,
      getPortfolioCEXsError,
      fetchUserCoupons
    } = useGlobal()
    const {
      bots,
      botsLoading,
      subscriptedBots,
      fetchPerformanceSubscriptionCycles,
      fetchAllAndSubscriptedBots
    } = useBots()

    const state = reactive({
      loadingPortfolio: true as boolean,
      algoBotsLoading: true as boolean,
      isTutorialModalOpened: false as boolean
    })

    const { email: userEmail } = toRefs(vuex.auth.user)

    const cryptoList: ICoinItem[] = [
      { title: 'Bitcoin (BTC)', name: 'bitcoin', symbol: 'BTC', srcCoin: '' },
      { title: 'Ethereum (ETH)', name: 'ethereum', symbol: 'ETH', srcCoin: '' },
      { title: 'UpBots (UBXT)', name: 'upbots', symbol: 'UBXT', srcCoin: '' }
    ]

    const configTab = ref<string>('summary')
    const configTabs: { label: string; value: string; }[] = [
      { label: 'Summary', value: 'summary' },
      { label: 'Algobots', value: 'my-bots' },
      { label: 'Tools', value: 'tools' }
    ]

    const cryptoPriceData = computed(() => vuex.home.marketPriceData)

    function mapCryptoPriceData (coin: ICoinItem): void {
      vuex.home.fetchMarketValueData({
        cryptoSymbol: coin.name,
        fiatSymbol: getFavoriteCurrency.value.value
      })
    }

    async function fetchCryptoPriceData (): Promise<void> {
      await Promise.all(cryptoList.map((coin: ICoinItem) => mapCryptoPriceData(coin)))
    }

    function showTutorial (): void {
      const shown = localStorageService.getItem(`tuto_${userEmail.value}`) as string

      if (!shown) {
        state.isTutorialModalOpened = true
        localStorageService.setItem(`tuto_${userEmail.value}`, userEmail.value)
      }
    }

    async function fetchPortfolio (): Promise<void> {
      await fetchPortfolioData()
      state.loadingPortfolio = false
    }

    async function fetchAlgoBots (): Promise<void> {
      state.algoBotsLoading = true

      try {
        await fetchAllAndSubscriptedBots()
        await fetchPerformanceSubscriptionCycles()
      } finally {
        state.algoBotsLoading = false
      }
    }

    async function initData (): Promise<void> {
      fetchAlgoBots()
      showTutorial()
      fetchUserCoupons()
      fetchCryptoPriceData()
      fetchPortfolio()
    }

    onMounted(() => { initData() })

    return {
      ...toRefs(state),
      routeNames,
      is3XL,
      is4XL,
      bots,
      subscriptedBots,
      botsLoading,
      configTab,
      isHeroMobilePage,
      configTabs,
      cryptoPriceData,
      cryptoList,
      userEmail,
      getCexBalance,
      getDexBalance,
      getTotalBalance,
      getTotalEvolution,
      getFavoriteCurrency,
      getPortfolioCEXsError
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  &__top-side {
    margin-top: -60px;
  }

  &__total-card-bg {
    background:
    linear-gradient(114.51deg, #6AD0C8 16.18%, #8482D2 124.51%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%) no-repeat;
  }

  @media(max-width: 1280px) {
    &__portfolio-evolution-chart {
      height: 320px;
    }
  }

  @media(max-width: 767px) {
    &__portfolio-evolution-chart {
      height: 200px;
    }
  }

  @media(min-width: 1280px) {
    &__section-overview {
      grid-template-columns: 1fr 2fr;
    }
  }

  @media(min-width: 2500px) {
    &__top-side {
      min-height: 160px;
      max-height: 160px;
      margin-top: -90px;
    }

    &__section-overview {
      height: 388px;
    }
  }

  @media(min-width: 1280px) and (max-width: 2499px) {
    &__top-side {
      min-height: 120px;
      max-height: 120px;
      margin-top: -90px;
    }

    &__section-overview {
      height: 324px;
    }
  }
}

.header {
  &__nav-menu-item-wrap {
    &:active {
      .header {
        &__nav-menu-item {
          @apply md:bg-opacity-100;

          &--icon {
            @apply text-white;
          }
        }
      }
    }
  }

  &__nav-menu-item {
    @apply
    flex items-center justify-center
    w-full h-full
    md:hover:bg-opacity-30
    rounded-full
    cursor-pointer
    transition duration-300;
  }

  @media(min-width: 2500px) {
    &__nav-menu-item-wrap {
      @apply w-60 h-60;
    }
  }

  @media(min-width: 1920px) and (max-width: 2499px) {
    &__nav-menu-item-wrap {
      height: 42px;
      width: 42px;
    }
  }

  @media(max-width: 1919px) {
    &__nav-menu-item-wrap {
      @apply h-40 w-40;
    }
  }
}
</style>
