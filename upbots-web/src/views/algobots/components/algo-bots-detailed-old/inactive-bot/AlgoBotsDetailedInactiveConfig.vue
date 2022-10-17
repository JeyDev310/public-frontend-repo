<template>
  <AppCard class="algobot-detailed-config flex flex-shrink-0 relative w-full p-14 lg:p-20">
    <template v-if="getConfigAccess">
      <!-- LOADER -->
      <AppLoader v-if="loading" class="rounded-xlg" />

      <!-- CONTENT -->
      <div class="flex flex-col w-full">
        <div class="flex flex-col 2xl:grid 2xl:grid-cols-3 2xl:gap-x-20 w-full space-y-14 2xl:space-y-0">
          <!-- SELECT YOUR WALLET -->
          <div
            class="
              algobot-detailed-config__item-1
              flex
              flex-col
              md:border-b
              2xl:border-r
              border-blue-heeler
              dark:border-himalaya-sky
              2xl:pr-14
              pb-14
            "
          >
            <div class="flex items-center mb-14">
              <div class="algobot-detailed-config__step">1</div>
              <div class="text-nile-blue dark:text-white font-bold ml-10">Select your wallet</div>
            </div>

            <p class="text-nile-blue dark:text-blair italic text-sm mb-14">
              Select the API key that the bot will use to trade
            </p>

            <AppSelect
              :model-value="exchange.state"
              :options="getAvailableExchangesFiltered"
              item-label="name"
              item-key="id"
              size="md"
              style="min-width: 220px;"
              :disabled="!getAvailableExchangesFiltered.length"
              @change="handleAccountSelection"
            >
              <template #selection="{ value, hasInitialValue }">
                <template v-if="hasInitialValue && !value?.isDefaultPair">
                  <div class="flex items-center">
                    <img :src="value.img" :alt="value.value" class="w-16 h-16 mr-5">
                    <p>{{ value.name }}</p>
                  </div>
                </template>

                <template v-else>Select your account</template>
              </template>

              <template #options="{ item }">
                <div class="flex items-center">
                  <img :src="item.img" :alt="item.value" class="w-16 h-16 mr-5">
                  <p>{{ item.name }}</p>
                </div>
              </template>
            </AppSelect>

            <!-- TRADING STRATEGY GROUP -->
            <div v-if="exchange.state.type === 'future'">
              <p class="text-nile-blue dark:text-blair italic text-sm mt-14 mb-8">
                Select the trading strategy you want to follow
              </p>
              <div class="mr-auto">
                <AppButtonsGroup
                  v-model="tradingStrategyValue" :options="tradingStrategyData" size="xs"
                />
              </div>
            </div>

            <div v-if="exchange.state.type === 'future'">
              <p class="text-nile-blue dark:text-blair italic text-sm mt-14 mb-8">
                Define the leverage for the orders
              </p>
              <div class="mr-auto">
                <AppButtonsGroup
                  v-model="accountLeverageValue" :options="accountLeverageDataFiltered" size="xs"
                />
              </div>
            </div>
            <!-- LEVERAGE  GROUP -->
          </div>

          <!-- POSITION SIZE -->
          <div
            class="
              algobot-detailed-config__item-2
              flex
              flex-col
              md:border-b
              2xl:border-r
              border-blue-heeler
              dark:border-himalaya-sky
              2xl:pr-14
              pb-14
            "
          >
            <div class="flex items-center mb-14">
              <div class="algobot-detailed-config__step">2</div>
              <div class="text-nile-blue dark:text-white font-bold mx-10">Position size</div>
              <AppSelect
                :model-value="positionSizeTypeValue"
                :options="positionSizeTypeData"
                :disabled="!positionSizeTypeData.length"
                size="md"
                style="min-width: 160px;"
                @change="handlePositionSizeTypeValue"
              />
            </div>

            <template v-if="positionSizeTypeValue.value === 'fixed'">
              <p class="text-nile-blue dark:text-blair italic text-sm mb-14">
                Select the amount that would like to trade, your profits wont be reinvested
              </p>

              <div class="flex items-center w-full mb-14">
                <AppInputNumber
                  v-model="baseAvailable"
                  :disabled="!getAvailableExchangesFiltered.length || isFreeStakers"
                  class="w-full"
                  size="md"
                  :min="0"
                  :max="baseInitialAvailable ?? 0"
                  :is-arrow="false"
                  @change="handleFixedValue"
                >
                  <template v-if="!(!getAvailableExchangesFiltered.length || isFreeStakers)" #append>
                    <span
                      class="
                        self-center
                        text-nile-blue
                        dark:text-blair
                        text-sm
                        hover:underline
                        ml-10
                        pr-10
                        cursor-pointer
                      "
                      @click="baseAvailable = baseInitialAvailable"
                    >
                      Max
                    </span>
                  </template>
                </AppInputNumber>
                <span
                  class="
                    text-nile-blue
                    dark:text-let-it-snow
                    bg-white
                    dark:bg-passionate-blueberry
                    py-6
                    px-10
                    rounded-sm
                  "
                >
                  {{ orderCostCurrency }}
                </span>
              </div>
            </template>

            <template v-if="positionSizeTypeValue.value === 'percentage'">
              <p class="text-nile-blue dark:text-blair italic text-sm mb-14">
                % of your USDT balance that the bot will trade
              </p>

              <div class="flex items-center w-full mb-14">
                <AppSlider
                  v-model="percentageValue"
                  min="0"
                  max="100"
                  class="w-full"
                  label-classes="text-sm 3xl:text-base"
                  :disabled="!getAvailableExchangesFiltered.length"
                  @changed="handlePercentageValue"
                  @input="handlePercentageValue"
                />
              </div>

              <div class="flex items-center">
                <span class="text-nile-blue dark:text-blair text-base mr-10">Initial cap:</span>
                <span
                  class="
                    text-nile-blue
                    dark:text-let-it-snow
                    bg-white
                    dark:bg-passionate-blueberry
                    py-6
                    px-10
                    rounded-sm
                  "
                >
                  {{
                    isBaseAvailableLimit ?
                      Math.trunc(getPerfBotCyclesDataById?.allocatedMaxAmount) :
                      Math.trunc(baseAvailable)
                  }}
                  <!-- {{ orderCostCurrency }} -->
                </span>
                <AppSelect
                  :model-value="selectedQuote"
                  :options="filteredQuotes"
                  size="md"
                  style="min-width: 120px;"
                  title="Stable coins"
                  @change="handleQuoteSelection"
                >
                  <template #selection="{ value }">
                    <div class="flex items-center">
                      <p>{{ value }}</p>
                    </div>
                  </template>

                  <template #options="{ item }">
                    <div class="flex items-center">
                      <p>{{ item }}</p>
                    </div>
                  </template>
                </AppSelect>
              </div>
            </template>

            <div v-if="costLimitError" class="flex mt-10">
              <span class="text-sm text-alexandria">{{ costLimitError }}</span>
            </div>
          </div>

          <!-- ALLOCATE UBXT -->
          <div class="algobot-detailed-config__item-3 flex flex-col">
            <div class="flex items-center mb-20">
              <!-- ALLOCATE UBXT TITLE -->
              <div class="algobot-detailed-config__step">3</div>
              <div class="flex font-bold ml-10">
                <span
                  class="mr-2"
                  :class="isFreeStakers ? 'text-gull-gray' : 'text-nile-blue dark:text-white'"
                >
                  Allocate UBXT
                </span>

                <!-- TODO ADD TEXT -->
                <!-- <AppIcon name="question-circle" size="14" class="ml-4 text-nile-blue dark:text-blair" /> -->
              </div>

              <!-- ALLOCATE UBXT BUTTONS GROUP -->
              <div class="ml-auto">
                <AppButtonsGroup v-model="allocationMethodValue" :options="allocationMethodData" size="xs" />
              </div>
            </div>

            <!-- UI FOR AUTOMATIC STATE -->
            <template v-if="allocationMethodValue === allocationMethodData[0].value">
              <!-- UBXT BALANCE -->
              <div class="flex-col flex-grow w-full mb-14 space-y-10">
                <div class="flex items-center">
                  <p class="text-nile-blue dark:text-blair mr-4">UBXT Balance:</p>

                  <AppFormatNumber
                    :data="getPerfeesUserWalletAvailableAmount"
                    :to-fixed="2"
                    :is-math-symbols="false"
                    text-size="font-medium"
                    class="text-bluster-blue dark:text-skylar"
                  />
                </div>

                <!-- UBXT VIRTUAL CREDIT -->
                <div class="flex items-center">
                  <p class="text-nile-blue dark:text-blair mr-4">UBXT Virtual Credit:</p>

                  <AppFormatNumber
                    :data="getPerfeesBotWalletsById?.creditAmount"
                    :to-fixed="2"
                    :is-math-symbols="false"
                    text-size="font-medium"
                    class="text-bluster-blue dark:text-skylar"
                  />
                </div>

                <!-- BONUS -->
                <div class="flex items-center">
                  <span class="text-nile-blue dark:text-blair mr-4">Bonus:</span>
                  <AppFormatNumber
                    :data="getVirtualCreditAmount"
                    :to-fixed="2"
                    :is-math-symbols="false"
                    text-size="font-medium"
                    class="text-bluster-blue dark:text-skylar"
                  />
                </div>
              </div>
            </template>

            <!-- UI FOR MANUAL STATE -->
            <template v-if="allocationMethodValue === allocationMethodData[1].value">
              <div class="flex justify-end 2xl:justify-start mb-14">
                <!-- BALANCE DROPDOWN -->
                <AppDropdown
                  title="Balance"
                  :actions="balanceDropdown"
                  placement="left-start"
                  dropdown-width="80px"
                >
                  <template #preview="{ preview }">
                    <div class="flex items-center cursor-pointer">
                      <p class="text-nile-blue dark:text-blair mr-4">Total Available:</p>

                      <AppFormatNumber
                        :data="getTotalBalance"
                        :to-fixed="2"
                        :is-math-symbols="false"
                        text-size="font-medium"
                        class="text-bluster-blue dark:text-skylar"
                      />

                      <AppIcon
                        name="chevron-bold"
                        size="10"
                        class="text-nile-blue dark:text-turquoise-chalk ml-7 transition duration-300 transform"
                        :class="[preview ? 'rotate-180' : 'rotate-0']"
                      />
                    </div>
                  </template>
                  <template #content>
                    <!-- UBXT BALANCE -->
                    <div class="flex-col flex-grow w-full py-12 space-y-10">
                      <div class="flex items-center">
                        <p class="text-nile-blue dark:text-blair mr-4">UBXT Balance:</p>

                        <AppFormatNumber
                          :data="getPerfeesUserWalletAvailableAmount"
                          :to-fixed="2"
                          :is-math-symbols="false"
                          text-size="font-medium"
                          class="text-bluster-blue dark:text-skylar"
                        />
                      </div>

                      <!-- UBXT VIRTUAL CREDIT -->
                      <div class="flex items-center">
                        <p class="text-nile-blue dark:text-blair mr-4">UBXT Virtual Credit:</p>

                        <AppFormatNumber
                          :data="getPerfeesBotWalletsById?.creditAmount"
                          :to-fixed="2"
                          :is-math-symbols="false"
                          text-size="font-medium"
                          class="text-bluster-blue dark:text-skylar"
                        />
                      </div>

                      <!-- BONUS -->
                      <div class="flex items-center">
                        <p class="text-nile-blue dark:text-blair mr-4">Bonus:</p>

                        <AppFormatNumber
                          :data="getVirtualCreditAmount"
                          :to-fixed="2"
                          :is-math-symbols="false"
                          text-size="font-medium"
                          class="text-bluster-blue dark:text-skylar"
                        />
                      </div>
                    </div>
                  </template>
                </AppDropdown>
              </div>

              <!-- INPUT UBXT TO ALLOCATE -->
              <div class="flex flex-col w-full">
                <AppInputNumber
                  v-model="ubxtToAllocate"
                  :disabled="!getAvailableExchangesFiltered.length || isFreeStakers"
                  class="w-full"
                  size="md"
                  :min="getMiniumUbxtToDeposit"
                  :max="getTotalBalance"
                  :is-arrow="false"
                >
                  <template v-if="!(!getAvailableExchangesFiltered.length || isFreeStakers)" #append>
                    <span
                      class="
                        self-center
                        text-nile-blue
                        dark:text-blair
                        text-sm
                        hover:underline
                        ml-10
                        pr-10
                        cursor-pointer
                      "
                      @click="ubxtToAllocate = Number(Math.trunc(getAvailableUbxtToDeposit))"
                    >
                      Max
                    </span>
                  </template>
                </AppInputNumber>

                <!-- MINIMUM INPUT VALUE -->
                <div class="flex items-center mt-4">
                  <span class="text-nile-blue dark:text-blair text-sm mr-4">Minimum:</span>
                  <AppFormatNumber
                    :data="getMiniumUbxtToDeposit"
                    :to-fixed="3"
                    :is-math-symbols="false"
                    text-size="text-sm font-medium"
                    class="text-bluster-blue dark:text-skylar"
                  />
                </div>
              </div>
            </template>

            <div class="flex flex-grow items-end justify-end">
              <AppButton
                size="xs"
                type="grey-outlined"
                class="algobot-detailed-config__topup-btn"
                @click="isModalTopUpOpen = true"
              >
                Add Token
              </AppButton>

              <!-- if we need disable deposit please use this code -->
              <!-- <AppTooltip
                :trigger="!isMD ? 'hover' : 'click'"
                placement="top"
                content="Due to maintenance work UBXT deposits are temporarily disabled."
              >
                <AppButton
                  size="xs"
                  type="grey-outlined"
                  class="algobot-detailed-config__topup-btn is-disabled"
                >
                  Add Token
                </AppButton>
              </AppTooltip> -->
            </div>

            <div class="flex flex-col justify-end mt-20">
              <div v-if="getAvailableExchangesFiltered.length" class="flex flex-col w-full space-y-4">
                <AppButton
                  size="md"
                  class="algobot-detailed-config__action-btn self-center 2xl:self-end uppercase"
                  :disabled="!allowSubmit || !isDepositable"
                  @click="showConfirmActivationBotModal()"
                >
                  Start
                </AppButton>

                <p v-if="isFreeStakers" class="text-sm dark:text-white text-chicory-flower italic">Free for Stakers</p>
              </div>

              <div v-else class="flex flex-col w-full items-center">
                <router-link #default="{ navigate }" :to="{ name: routeNames.keys }" custom>
                  <AppButton
                    size="md"
                    class="algobot-detailed-config__action-btn self-center 2xl:self-end"
                    @click="navigate()"
                  >
                    Add an API key
                  </AppButton>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppModal v-model="isConfirmActivationBotOpened">
        <!-- LOADER -->
        <AppLoader v-if="loading" class="rounded-xlg" />

        <!-- CONTENT -->
        <div class="flex flex-col items-center justify-center">
          <h2 class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-20">
            Do you confirm that you want to activate this bot?
          </h2>

          <AppCheckbox
            v-model="agreeTermsConditions"
            type="secondary"
          >
            <p>
              I agree to the UpBots
              <router-link
                :to="{name: routeNames.termsConditions}"
                target="_blank"
                class="text-bianchi-green hover:underline"
              >
                terms and conditions
              </router-link>
            </p>
          </AppCheckbox>

          <div class="flex items-center justify-center w-full space-x-20 mt-40">
            <AppButton type="primary-border-filled" @click="isConfirmActivationBotOpened = false">
              Cancel
            </AppButton>
            <AppButton :disabled="!agreeTermsConditions" @click="followBot()">
              Confirm
            </AppButton>
          </div>
        </div>
      </AppModal>
    </template>
    <template v-else>
      <AlgoBotsDetailedInactiveStakingOverlay />
    </template>
  </AppCard>

  <!-- TOT UP MODAL -->
  <AppModal v-model="isModalTopUpOpen" modal-width="700">
    <UBXTTopUpModal />
  </AppModal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { routeNames, useRoute } from '@/router'

import { useDebounceFn } from '@vueuse/core'
import { formatNumber } from '@/core/helpers'

import { vuex } from '@/store'
import { algoBotsService, globalService, http } from '@/services'
import { IExchangeKey } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useBots } from '@/global-setup/bots.composition.setup'
import { useAlgoBotsDetailed } from '@/views/algobots/components/algo-bots-detailed/algo-bots-detailed.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

import AlgoBotsDetailedInactiveStakingOverlay from '@/views/algobots/components/algo-bots-detailed/inactive-bot/AlgoBotsDetailedInactiveStakingOverlay.vue'
import UBXTTopUpModal from '@/views/ubxt-wallet/components/ubxt-balance/UBXTTopUpModal.vue'

export default defineComponent({
  name: 'AlgoBotsDetailedInactiveConfig',

  components: { AlgoBotsDetailedInactiveStakingOverlay, UBXTTopUpModal },

  setup () {
    /* USE ROUTE */
    const route = useRoute()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD } = useCustomBreakpoints()

    /* STABLE QUOTES */
    const quotes = ['USDT', 'TUSD', 'BUSD', 'USDC']

    /* USE BOTS */
    const { fetchAllAndSubscriptedBots } = useBots()

    /* USE GLOBAL SETUP */
    const { getPerfeesUserWalletAvailableAmount, hasCouponsWithCorrectPromo } = useGlobal()

    /* USE ALGO BOTS DETAILED SETUP */
    const {
      getAvailableExchanges,
      getUserWalletData,
      getPerfeesBotWalletsById,
      setAutoRefill,
      cryptoPriceCoinGecko,
      fetchCryptoPriceCoinGecko
    } = useAlgoBotsDetailed()

    /* USE ALGO BOTS SETUP */
    const { getPerfBotCyclesDataById } = useAlgoBots()

    // LOADING //
    const loading = ref<boolean>(false)

    // SELECTED QUOTE
    const filteredQuotes = ref<string[]>([])
    const selectedQuote = ref<string>(quotes[0])

    // UBXT TOPUP MODAL //
    const isModalTopUpOpen = ref<boolean>(false)

    const exchange: any = reactive({
      state: {}
    })
    const tradingStrategyValue = ref<string>('long')
    const tradingStrategyData: {value: string; label: string;}[] = [
      { value: 'long', label: 'Long' },
      { value: 'short', label: 'Short' },
      { value: 'long_short', label: 'Long & Short' }
    ]
    const accountLeverageValue = ref<number>(1)
    const accountLeverageData: {value: number; label: string;}[] = [
      { value: 1, label: 'x1' },
      { value: 2, label: 'x2' },
      { value: 3, label: 'x3' },
      { value: 5, label: 'x5' }
    ]

    const positionSizeTypeData: {value: string; label: string;}[] = [
      { value: 'percentage', label: '% available' },
      { value: 'fixed', label: 'Fixed amount' }
    ]
    const positionSizeTypeValue = ref<{value: string; label: string;}>(positionSizeTypeData[0])

    const balanceDropdown: {label: string;}[] = [{ label: 'Balance' }]

    const allocationMethodValue = ref<string>('automatic')
    const allocationMethodData: {value: string; label: string;}[] = [
      { value: 'automatic', label: 'Auto' },
      { value: 'manual', label: 'Manual' }
    ]

    // IS SHORT TRADING BOT
    const isShortTradingBot = computed(() =>
      getPerfBotCyclesDataById.value?.stratType === 'SHORT' || getPerfBotCyclesDataById.value?.stratType === 'LONG_SHORT'
    )

    const accountLeverageDataFiltered = computed(() => {
      if (!isShortTradingBot.value) {
        return [accountLeverageData[0]]
      } else {
        if (getPerfBotCyclesDataById.value?.botRef === 'SUPERTRADERLINK' || getPerfBotCyclesDataById.value?.botRef === 'HARSIBTC') {
          return [accountLeverageData[0]]
        }
        return accountLeverageData
      }
    })

    const getAvailableExchangesFiltered = computed(() => {
      if (getPerfBotCyclesDataById.value?.base === 'AVAX') {
        return getAvailableExchanges.value
      } else {
        let accounts = getAvailableExchanges.value.filter((x) => x.tradingAllowed)
        if (!isShortTradingBot.value) {
          accounts = accounts.filter((x) => x.type !== 'future')
        } else {
          if (getPerfBotCyclesDataById.value?.botRef === 'SURGEBOTSXP') {
            accounts = accounts.filter((x) => x.exchange === 'binance' || x.exchange === 'binance-future')
          }
        }
        if (getPerfBotCyclesDataById.value?.base === 'FTT') {
          return accounts.filter((x) => x.exchange !== 'kucoin')
        } else if (getPerfBotCyclesDataById.value?.base === 'TOMO') {
          return accounts.filter((x) => x.exchange !== 'huobi')
        } else if (getPerfBotCyclesDataById.value?.base === 'CAKE') {
          return accounts.filter((x) => x.exchange !== 'ftx' && x.exchange !== 'huobi')
        } else if (getPerfBotCyclesDataById.value?.base === 'BAT' ||
          getPerfBotCyclesDataById.value?.base === 'ETC' ||
          getPerfBotCyclesDataById.value?.base === 'SHIB'
        ) {
          return accounts.filter((x) => x.exchange !== 'ftx')
        } else {
          return accounts
        }
      }
    })

    const isFreeStakers = computed(() => {
      if (!getPerfBotCyclesDataById.value) return false
      const freeStakersBots = ['Community bot TOMO LO1', 'Community Bot AVAX']
      return freeStakersBots.indexOf(getPerfBotCyclesDataById.value.name) > -1
    })

    // GET DEFAULT EXCHANGE //
    function getDefaultExchange () {
      if (getAvailableExchangesFiltered.value.length) {
        const isBinance = getAvailableExchangesFiltered.value.filter((el) => {
          return el.exchange.toLowerCase() === 'binance'
        }) || []

        if (isBinance.length) {
          exchange.state = isBinance[0]
        } else {
          exchange.state = getAvailableExchangesFiltered.value[0]
        }
      } else {
        return {}
      }
    }

    // GET TRADNG SETTINGS DATA //
    const getTradingSettings = computed(() => vuex.algobots.tradingSettings)

    // GET AVAILABLE PAIRS //
    const getAvailablePairs = computed(() => {
      if (!getTradingSettings.value.length || !getAvailableExchangesFiltered.value.length) {
        return []
      } else {
        const exPair = getTradingSettings.value.find((ex) => ex.name === exchange.state.exchange)
        if (exPair) {
          const pairs = exPair.pairs
            .map((pair: any) => {
              if (quotes.includes(pair.quoteCurrency.toUpperCase()) &&
                !filteredQuotes.value.includes(pair.quoteCurrency)) {
                filteredQuotes.value.push(pair.quoteCurrency)
              }
              const basePair = pair.baseCurrency === 'XBT' ? 'BTC' : pair.baseCurrency // for bitmex XBT is BTC
              return {
                ...pair,
                label: `${basePair}/${pair.quoteCurrency}`,
                name: `${pair.baseCurrency}/${pair.quoteCurrency}`
              }
            })
            .filter((p: any) => p.tradingAllowed)

          return pairs
        } else {
          return []
        }
      }
    })

    // SELECTED PAIR START //
    const selectedPair: any = reactive({
      state: {}
    })
    function setSelectedPair () {
      selectedPair.state = getAvailablePairs.value.find((p) => {
        return p.baseCurrency === getPerfBotCyclesDataById.value?.base &&
        p.quoteCurrency === selectedQuote.value // getPerfBotCyclesDataById.value?.quote
      })
    }
    // SELECTED PAIR END //

    // FETCH BASE AVAILABLE START //
    const baseAvailable = ref<number>(0)
    const baseInitialAvailable = ref<number>(0)
    const selectedAccountDist: any = reactive({
      state: {}
    })
    async function fetchBaseAvailable () {
      try {
        const res = await algoBotsService.getPortfolioTradeBalance(exchange.state?.id || '')
        selectedAccountDist.state = res.data

        if (selectedAccountDist.state?.freeBalances) {
          const notExist = Object.keys(selectedAccountDist.state.freeBalances).length === 0

          if (notExist) {
            baseAvailable.value = 0
          } else {
            if (selectedAccountDist.state.freeBalances &&
              selectedAccountDist.state.freeBalances[selectedPair.state.quoteCurrency]) {
              baseAvailable.value = selectedAccountDist.state.freeBalances[selectedPair.state.quoteCurrency]
            } else {
              baseAvailable.value = 0
              appNotify({ type: 'info', message: 'Not enought USDT on your account' })
            }
          }
        }
        baseInitialAvailable.value = baseAvailable.value
      } catch (error) {
        appNotify({ type: 'error', message: error?.response?.data?.message || 'Something went wrong' })
      }
    }
    // FETCH BASE AVAILABLE END //

    const isBaseAvailableLimit = computed(() => {
      return baseAvailable.value >= (getPerfBotCyclesDataById.value?.allocatedMaxAmount || 0)
    })

    // MARKET PRICE START //
    const marketPrice = ref<number>(0)
    async function fetchCurrentPrice () {
      try {
        const { data } = await globalService.getCryptoPrice(
          {
            accExchange: exchange.state.exchange,
            base: selectedPair.state.baseCurrency,
            quote: selectedPair.state.quoteCurrency
          }
        )
        marketPrice.value = (data?.Latest.close) || 0
      } catch (error: any) {
        appNotify({ type: 'error', message: error?.response?.data?.message || 'Unable to get the price of the selected pair.' })
      }
    }
    // MARKET PRICE START //

    // COST LEMIT ERROR MESSAGE //
    const costLimitError = ref<string>('')

    // ALLOW ACTIVE SUBMIT BTN //
    const allowSubmit = ref<boolean>(false)

    // VALIDATE TRADE COST //
    async function validateTradeCost () {
      await fetchCurrentPrice()

      const quantity = baseAvailable.value / marketPrice.value

      try {
        const sym = selectedPair.state.symbol
        const exch = exchange.state.exchange

        const res: any = await http.get(
          `/trade/format-validity/${exch}?symbol=${sym}&quantity=${quantity}&price=${marketPrice.value}`
        )

        if (res.data.checkList && res.data.checkList.costLimit === false) {
          allowSubmit.value = false
          costLimitError.value = res.data.comments
        } else {
          costLimitError.value = ''
          if (baseAvailable.value <= baseInitialAvailable.value) {
            allowSubmit.value = true
          }
        }
      } catch (error) {
        appNotify({ type: 'error', message: error?.response?.data?.message || 'This pair is not available now.' })
      }
    }

    // HANDLE PERCENTAGE VALUE START //
    const validateTradeCostDebounce = useDebounceFn(async () => {
      try {
        await validateTradeCost()
      } finally {
        loading.value = false
      }
    }, 600)

    function handlePositionSizeTypeValue (item: {value: string; label: string;}) {
      positionSizeTypeValue.value = item
    }

    const percentageValue = ref([100])
    async function handlePercentageValue (item: number) {
      loading.value = true
      baseAvailable.value = Number(((baseInitialAvailable.value / 100) * Number(item)).toFixed(0))

      validateTradeCostDebounce()
    }

    async function handleFixedValue (item: number) {
      loading.value = true
      baseAvailable.value = Number(item)

      validateTradeCostDebounce()
    }

    // HANDLE PERCENTAGE VALUE END //

    // ORDER COST CURRENCY //
    const orderCostCurrency = computed(() => {
      if (getAvailableExchangesFiltered.value.length) {
        if (selectedPair.state?.inverse && selectedPair.state?.perpetualContract) {
          return selectedPair.value.baseCurrency
        }
        return selectedPair.state?.quoteCurrency
      } else {
        return ''
      }
    })

    // HANDLE ACCOUNT SELECTION //
    async function handleAccountSelection (item: IExchangeKey) {
      loading.value = true
      exchange.state = item
      filteredQuotes.value = []

      try {
        setSelectedPair()
        await fetchBaseAvailable()
        await validateTradeCost()
      } finally {
        loading.value = false
      }
    }

    async function handleQuoteSelection (item: string) {
      loading.value = true
      selectedQuote.value = item

      try {
        setSelectedPair()
        await validateTradeCost()
      } finally {
        loading.value = false
      }
    }

    const getAvailableUbxtToDeposit = computed(() => {
      if (!Object.keys(getUserWalletData.value).length) return 0

      let botCreditAmount = 0
      if (getPerfeesBotWalletsById.value) {
        botCreditAmount = getPerfeesBotWalletsById.value?.creditAmount || 0
      }
      return getUserWalletData.value.availableAmount + botCreditAmount
    })

    // GET CURRENT UBXT PRICE //
    const getCurrentUbxtPrice = computed(() => {
      const pair = 'upbots/usd'
      const pairData = cryptoPriceCoinGecko.data[pair]
      if (pairData) {
        const latestPrice = pairData.prices[pairData.prices.length - 1][1]
        return latestPrice
      }
      return 0
    })

    // GET MINIMUM UBXT TO DEPOSIT //
    const getMiniumUbxtToDeposit = computed(() => {
      const ubxtPrice = getCurrentUbxtPrice.value
      if (ubxtPrice === 0) {
        return 0
      } else {
        return Math.ceil(baseAvailable.value * 0.003 / ubxtPrice)
      }
    })

    // HANDLE AUTO REFILL //
    const advancedAllocation = ref<boolean>(false)

    // ALLOCATE //
    const ubxtToAllocate = ref<number>(0)
    const ubxtToDeposit = ref<number>(0)
    const getVirtualCreditAmount = computed((): number => vuex.algobots.perfeesUserWalletData?.creditAmount || 0)
    const isDepositableAmount = computed(() => {
      const depositAmount = ubxtToAllocate.value
      const isBigThanMin = depositAmount >= getMiniumUbxtToDeposit.value
      const isSmallThanMax = depositAmount <= getAvailableUbxtToDeposit.value + getVirtualCreditAmount.value
      return isBigThanMin && isSmallThanMax
    })
    const isDepositableAmountAtAutoRefill = computed(() => {
      const minAmount = 100
      const isSmallThanMax = minAmount <= getAvailableUbxtToDeposit.value + getVirtualCreditAmount.value
      return isSmallThanMax
    })

    const isDepositable = computed(() => {
      if (allocationMethodValue.value === allocationMethodData[0].value) {
        return isDepositableAmountAtAutoRefill.value
      } else if (allocationMethodValue.value === allocationMethodData[1].value) {
        return isDepositableAmount.value
      }
      return false
    })

    const getTotalBalance = computed((): number => {
      const creditAmount = getPerfeesBotWalletsById.value?.creditAmount || 0

      return getPerfeesUserWalletAvailableAmount.value + creditAmount + getVirtualCreditAmount.value
    })

    function allocateUbxtToDeposit () {
      if (!advancedAllocation.value) {
        return isDepositableAmountAtAutoRefill.value
      } else if (isDepositableAmount.value) {
        const availableAmount = getAvailableUbxtToDeposit.value + getVirtualCreditAmount.value
        ubxtToDeposit.value = Math.min(ubxtToAllocate.value, availableAmount)
        return true
      } else {
        ubxtToDeposit.value = 0
        return false
      }
    }

    const isConfirmActivationBotOpened = ref<boolean>(false)
    function showConfirmActivationBotModal () {
      if (allocateUbxtToDeposit() || isFreeStakers.value) {
        isConfirmActivationBotOpened.value = true
      } else {
        appNotify({ type: 'warning', message: 'Not enough ubxt. (min 100 UBXT)' })
      }
    }

    async function depositUbxt () {
      const payload = {
        botId: route.params.id as string,
        amount: Number(ubxtToDeposit.value)
      }

      try {
        await algoBotsService.botWalletTransfer(payload)
        appNotify({ type: 'success', message: 'UBXT successfully allocated to bot.' })
      } catch (error) {
        appNotify({ type: 'error', message: 'UBXT allocation faile' })
      }
    }

    // COMMUNITY BOT //
    const isCommunityBot = computed(() => {
      if (getPerfBotCyclesDataById.value && (getPerfBotCyclesDataById.value.botRef === 'AVAXUSDT1' || getPerfBotCyclesDataById.value.botRef === 'TOMOLO1')) {
        return true
      }
      return false
    })

    // GET STAKING AMOUNT DATA //
    const getStakingAmount = computed(() => vuex.staking.stakingAmountData)

    const getConfigAccess = computed(() => {
      if (isCommunityBot.value) {
        return hasCouponsWithCorrectPromo.value || getStakingAmount.value.botsAccess
      } else {
        return true
      }
    })

    // FOLLOW BOT //
    const agreeTermsConditions = ref<boolean>(false)
    async function followBot () {
      loading.value = true
      const contractSize = selectedPair.state.contractSize ? selectedPair.state.contractSize : 1
      let baseAmount = 0
      let positionType = ''
      let positionAmount = 0

      if (selectedPair.state.contractSize && selectedPair.state.contractSize > 0 && marketPrice.value > 0) {
        baseAmount = (baseAvailable.value * percentageValue.value[0] / 100.0) / marketPrice.value
        if (exchange.state.exchange === 'kucoin-future') {
          baseAmount = Math.trunc(baseAmount * accountLeverageValue.value / contractSize) * contractSize
        } else if (exchange.state.exchange === 'binance-future') {
          baseAmount = baseAmount * accountLeverageValue.value
        }
      }

      if (positionSizeTypeValue.value.value === 'fixed') {
        positionType = 'fixed'
        positionAmount = baseAvailable.value
      } else if (positionSizeTypeValue.value.value === 'percentage') {
        positionType = 'percent'
        positionAmount = percentageValue.value[0] / 100
      }

      const payload: any = {
        botId: route.params.id,
        apiKeyRef: exchange.state.id,
        accountType: exchange.state.type || 'spot',
        stratType: tradingStrategyValue.value.toUpperCase(),
        accountPercentage: percentageValue.value[0] / 100,
        accountLeverage: accountLeverageValue.value,
        contractSize,
        quote: selectedPair.state.quoteCurrency,
        positionType,
        positionAmount,
        baseAmount
      }

      try {
        await setAutoRefill(route.params.id as string, !advancedAllocation.value)
        await algoBotsService.startActivation(payload)
        await depositUbxt()
        await fetchAllAndSubscriptedBots()

        appNotify({ type: 'success', message: 'Bot successfully activated.' })
      } catch (error) {
        appNotify({ type: 'error', message: error?.response?.data?.message || 'Bot activation failed' })
      } finally {
        percentageValue.value[0] = 100
        isConfirmActivationBotOpened.value = false
        loading.value = false
      }
    }

    // INIT DATA START //
    async function iniData () {
      await vuex.staking.fetchStakingAmount()

      if (getAvailableExchangesFiltered.value.length) {
        getDefaultExchange()
        setSelectedPair()

        try {
          loading.value = true
          await fetchBaseAvailable()
          await validateTradeCost()

          await vuex.algobots.fetchUserWallet()
          await vuex.algobots.fetchBotWallets()
          await fetchCryptoPriceCoinGecko()
        } finally {
          loading.value = false
        }
      } else {
        costLimitError.value = 'Add a wallet to start using the bot.'
        allowSubmit.value = false
      }
    }
    iniData()
    // INIT DATA END //

    return {
      routeNames,
      isMD,
      formatNumber,

      filteredQuotes,
      selectedQuote,

      getPerfBotCyclesDataById,
      getUserWalletData,
      loading,
      exchange,
      tradingStrategyValue,
      tradingStrategyData,
      positionSizeTypeValue,
      positionSizeTypeData,
      accountLeverageValue,
      accountLeverageData,
      accountLeverageDataFiltered,
      getTotalBalance,
      balanceDropdown,
      allocationMethodValue,
      allocationMethodData,
      getAvailableExchangesFiltered,
      handleAccountSelection,
      handleQuoteSelection,
      percentageValue,
      handlePositionSizeTypeValue,
      handlePercentageValue,
      handleFixedValue,
      isBaseAvailableLimit,
      baseAvailable,
      baseInitialAvailable,
      getAvailablePairs,
      costLimitError,
      orderCostCurrency,
      selectedPair,
      getMiniumUbxtToDeposit,
      getAvailableUbxtToDeposit,
      getVirtualCreditAmount,
      ubxtToAllocate,
      isDepositableAmount,
      isDepositable,
      advancedAllocation,
      getPerfeesBotWalletsById,
      allowSubmit,
      isConfirmActivationBotOpened,
      agreeTermsConditions,
      followBot,
      showConfirmActivationBotModal,
      isFreeStakers,
      getConfigAccess,
      getPerfeesUserWalletAvailableAmount,

      isModalTopUpOpen
    }
  }
})
</script>

<style lang="scss" scoped>
.algobot-detailed-config {
  min-height: 254px;

  &__step {
    @apply
    flex
    items-center
    justify-center
    w-28
    h-28
    bg-azureish-white
    bg-opacity-50
    dark:bg-blue-party-parrot
    dark:bg-opacity-30
    rounded-full
    text-nile-blue
    dark:text-white
    font-bold;
  }

  @media(min-width: 768px) {
    &__action-btn {
      min-width: 140px;
    }

    &__topup-btn {
      min-width: 90px;
    }
  }

  @media(min-width: 768px) and (max-width: 1023px) {
    min-height: 556px;
  }

  @media(min-width: 1024px) and (max-width: 1439px) {
    min-height: 566px;
  }

  @media(min-width: 1440px) {
    &__item-1,
    &__item-2 {
      border-bottom: none;
    }
  }

  @media(min-width: 1440px) and (max-width: 1919px) {
    min-height: 240px;
  }

  @media(min-width: 1920px) {
    min-height: 244px;
  }
}
</style>
