<template>
  <AppCard class="algobot-detailed-config relative flex flex-shrink-0 w-full p-20 md:p-14 lg:p-20">
    <!-- LOADING -->
    <AppLoader v-if="stakingAmountLoading" class="rounded-xlg" />

    <!-- CONTENT -->
    <template v-else>
      <!-- IS CONFIGURATION ACCESS -->
      <template v-if="getConfigAccess">
        <div class="flex flex-col w-full">
          <div class="flex flex-col 2xl:grid 2xl:grid-cols-3 2xl:gap-x-20 w-full space-y-14 2xl:space-y-0">
            <!-- STEP 1 -->
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
                v-model="account"
                :options="accounts"
                item-label="name"
                item-key="id"
                size="md"
                style="min-width: 220px;"
                :disabled="!accounts.length || loading"
                @change="onAccountChange"
              >
                <template #selection="{ value, hasInitialValue }">
                  <template v-if="hasInitialValue && !value?.isDefaultPair">
                    <div class="flex items-center">
                      <img
                        :src="`/img/cryptocoins/${value.exchange.toLowerCase()}.svg`"
                        :alt="value.value"
                        class="w-16 h-16 mr-5"
                      >
                      <p>{{ value.name }}</p>
                    </div>
                  </template>

                  <template v-else>Select your account</template>
                </template>

                <template #options="{ item }">
                  <div class="flex items-center">
                    <img
                      :src="`/img/cryptocoins/${item.exchange.toLowerCase()}.svg`"
                      :alt="item.value"
                      class="w-16 h-16 mr-5"
                    >
                    <p>{{ item.name }}</p>
                  </div>
                </template>
              </AppSelect>

              <!-- ONLY FOR FUTURE ACCOUNT -->
              <div v-if="isStrategyShowable" class="mt-14">
                <!-- TRADING STRATEGY GROUP -->
                <div class="flex flex-col mb-10">
                  <p class="text-nile-blue dark:text-blair italic text-sm mb-8">
                    Select the trading strategy you want to follow
                  </p>
                  <div class="mr-auto">
                    <AppButtonsGroup
                      v-model="tradingStrategy"
                      :options="tradingStrategyOptions"
                      size="xs"
                      @change="onTradingStrategyChange"
                    />
                  </div>
                </div>

                <!-- ACCOUNT LEVERAGE GROUP -->
                <div class="flex flex-col mb-10">
                  <p class="text-nile-blue dark:text-blair italic text-sm mb-8">
                    Define the leverage for the orders
                  </p>
                  <div class="mr-auto">
                    <AppButtonsGroup
                      v-model="accountLeverage"
                      :options="accountLeverageOptionsFiltered"
                      size="xs"
                    />
                  </div>
                </div>
              </div>

              <!-- STABLE COIN -->
              <div class="flex items-center mt-10">
                <span class="pr-10 text-nile-blue dark:text-blair">Stable coin:</span>
                <AppSelect
                  v-model="selectedQuote"
                  :options="quotes"
                  size="md"
                  style="min-width: 120px;"
                  :disabled="!accounts.length || loading"
                  @change="handleQuoteSelection"
                />
              </div>
            </div>

            <!-- STEP 2 -->
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
              </div>

              <div class="w-full mb-10" style="max-width: 220px">
                <AppButtonsGroup
                  v-model="positionSizeType"
                  :options="positionSizeTypeOptions"
                  :disabled="!positionSizeTypeOptions.length || baseAvailableLoading"
                  width="100%"
                  size="xs"
                />
              </div>

              <!-- POSITION SIZE PERCENTAGE -->
              <template v-if="positionSizeType === positionSizeTypeOptions[0].value">
                <p class="text-nile-blue dark:text-blair italic text-sm mb-14">
                  % of your {{ selectedQuote.label }} balance that the bot will trade
                </p>

                <div class="flex items-center w-full mb-14">
                  <AppSlider
                    v-model="percentageValue"
                    min="0"
                    max="100"
                    class="w-full"
                    label-classes="text-sm 3xl:text-base"
                    :disabled="!accounts.length || baseAvailableLoading || loading"
                    @changed="handlePercentageValue"
                    @input="handlePercentageValue"
                  />
                </div>

                <div class="flex items-center">
                  <span class="text-nile-blue dark:text-blair text-base mr-10">Initial cap:</span>
                  <span class="text-nile-blue dark:text-let-it-snow">
                    <template v-if="isBaseAvailableLimit">{{ bot.allocatedMaxAmount.toFixed(2) }}</template>
                    <template v-else>
                      <AppTextLoader v-if="baseAvailableLoading" text="" />
                      <template v-else>{{ `${fixedAmount} ${selectedQuote.label}` }}</template>
                    </template>
                  </span>
                </div>
              </template>

              <!-- POSITION SIZE FIXED -->
              <template v-if="positionSizeType === positionSizeTypeOptions[1].value">
                <p class="text-nile-blue dark:text-blair italic text-sm mb-14">
                  Select the amount that would like to trade, your profits wont be reinvested
                </p>

                <div class="flex items-start w-full mb-14">
                  <div class="flex flex-col w-full">
                    <AppInputNumber
                      v-model="fixedAmount"
                      :disabled="!accounts.length || isFreeStakers || baseAvailableLoading || loading"
                      size="md"
                      class="w-full"
                      :is-arrow="!baseAvailableLoading"
                      @change="handleFixedValue"
                    />
                    <!-- SET MAX FIXED VALUE -->
                    <p
                      v-if="!(!accounts.length || isFreeStakers)"
                      class="flex text-tradewind dark:text-blair text-sm font-semibold mt-6 cursor-pointer"
                      @click="!baseAvailableLoading || !loading ? setMaxFixedValue() : null"
                    >
                      Max
                    </p>
                  </div>

                  <span
                    class="
                      text-nile-blue
                      dark:text-let-it-snow
                      py-6
                      px-10
                      font-medium
                      rounded-sm
                    "
                  >
                    {{ selectedQuote.label }}
                  </span>
                </div>
              </template>

              <div v-if="costLimitError" class="flex mt-10">
                <span class="text-sm text-alexandria">{{ costLimitError }}</span>
              </div>
            </div>

            <!-- STEP 3 -->
            <!-- ALLOCATE UBXT -->
            <div class="algobot-detailed-config__item-3 flex flex-col">
              <div class="flex items-center mb-20">
                <!-- ALLOCATE UBXT TITLE -->
                <div class="algobot-detailed-config__step">3</div>
                <div class="flex font-bold ml-10">
                  <span class="mr-2" :class="isFreeStakers ? 'text-gull-gray' : 'text-nile-blue dark:text-white'">
                    Allocate UBXT
                  </span>
                </div>

                <!-- ALLOCATE UBXT BUTTONS GROUP -->
                <div class="ml-auto">
                  <AppButtonsGroup v-model="allocateMethod" :options="allocateMethodOptions" size="xs" />
                </div>
              </div>

              <!-- AUTO METHOD -->
              <template v-if="allocateMethod === allocateMethodOptions[0].value">
                <!-- UBXT BALANCE -->
                <div class="flex-col flex-grow w-full mb-14 space-y-10">
                  <div class="flex items-center">
                    <p class="text-nile-blue dark:text-blair mr-4">UBXT Balance:</p>

                    <AppFormatNumber
                      :data="perfeesUserWallet.availableAmount"
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
                      :data="perfeesBotWallet.creditAmount"
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
                      :data="perfeesUserWallet.creditAmount"
                      :to-fixed="2"
                      :is-math-symbols="false"
                      text-size="font-medium"
                      class="text-bluster-blue dark:text-skylar"
                    />
                  </div>
                </div>
              </template>

              <!-- MENUAL METHOD -->
              <template v-if="allocateMethod === allocateMethodOptions[1].value">
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
                            :data="perfeesUserWallet.availableAmount"
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
                            :data="perfeesBotWallet.creditAmount"
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
                            :data="perfeesUserWallet.creditAmount"
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
                    :disabled="!accounts.length || isFreeStakers"
                    class="w-full"
                    size="md"
                    :is-arrow="false"
                  >
                    <template v-if="!(!accounts.length || isFreeStakers)" #append>
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
                <div v-if="accounts.length" class="flex flex-col w-full space-y-4">
                  <AppButton
                    size="md"
                    class="algobot-detailed-config__action-btn self-center 2xl:self-end w-full md:w-auto uppercase"
                    :disabled="!allowFollowBot || !isDepositable || loading"
                    @click="openFollowBotModal()"
                  >
                    Start
                  </AppButton>

                  <p v-if="isFreeStakers" class="text-sm dark:text-white text-chicory-flower italic">
                    Free for Stakers
                  </p>
                </div>

                <div v-else class="flex flex-col w-full items-center">
                  <router-link #default="{ navigate }" :to="{ name: routeNames.keys }" custom>
                    <AppButton
                      size="md"
                      class="algobot-detailed-config__action-btn self-center 2xl:self-end w-full md:w-auto"
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
      </template>

      <!-- STAKING OVERLAY -->
      <template v-else>
        <AlgoBotsDetailedInactiveConfigOverlay />
      </template>
    </template>
  </AppCard>

  <!-- FOLLOW BOT MODAL -->
  <AppModal v-model="isFollowBotModalOpen">
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-20">
        Do you confirm that you want to activate this bot?
      </h2>

      <AppCheckbox v-model="agreeTermsConditions" type="secondary">
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
        <AppButton type="primary-border-filled" @click="agreeTermsConditions = false">
          Cancel
        </AppButton>
        <AppButton :disabled="!agreeTermsConditions" @click="followBot()">
          Confirm
        </AppButton>
      </div>
    </div>
  </AppModal>

  <!-- TOT UP MODAL -->
  <AppModal v-model="isModalTopUpOpen" modal-width="700">
    <UBXTTopUpModal />
  </AppModal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { routeNames } from '@/router'
import { useRouter } from 'vue-router'

import { useDebounceFn } from '@vueuse/core'

import { algoBotsService, globalService, tradesService } from '@/services'
import { EAccount, ECryptoCurrency } from '@/types/crypto.types'
import { EBotSnapshotRef, EBotStratType, EErrorsMessage, EStrategy, IKey } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useAlgoBotsDetailed } from '../algo-bots-detailed.composition.setup'
import { usePerfees } from '@/global-setup/perfees.composition.setup'
import { stableCoinsPerExchangeAndPair } from '@/components/algobots/data'

import UBXTTopUpModal from '@/views/ubxt-wallet/components/ubxt-balance/UBXTTopUpModal.vue'
import AlgoBotsDetailedInactiveConfigOverlay from './AlgoBotsDetailedInactiveConfigOverlay.vue'

export default defineComponent({
  name: 'AlgoBotsDetailedInactiveConfiguration',

  components: { UBXTTopUpModal, AlgoBotsDetailedInactiveConfigOverlay },

  setup () {
    /* USE ROUTER */
    const router = useRouter()

    const { availableAccounts, hasCouponsWithCorrectPromo } = useGlobal()
    const {
      bot,
      baseUSDTAvailable,
      baseAvailableLoading,
      fetchBaseAvailable,
      setBotGlobalLoading
    } = useAlgoBotsDetailed()
    const {
      perfeesUserWallet,
      perfeesBotWallet,
      fetchPerfeesWallet,
      fetchPerfeesBotWalletById
    } = usePerfees()

    const state = reactive({
      loading: true as boolean,
      accounts: [] as IKey[],
      account: {} as IKey,
      isModalTopUpOpen: false as boolean,
      tradingStrategy: 'long' as string,
      accountLeverage: 1 as number,
      positionSizeType: 'percentage' as string,
      percentageValue: [100] as number[],
      fixedAmount: 0 as number,
      costLimitError: '' as string,
      marketPrice: 0 as number,
      allowFollowBot: true as boolean,
      allocateMethod: 'automatic' as string,
      ubxtToAllocate: 0 as number,
      ubxtPrice: 0 as number,
      isFollowBotModalOpen: false as boolean,
      advancedAllocation: false as boolean,
      ubxtToDeposit: 0 as number,
      agreeTermsConditions: false as boolean,
      contractSize: 0 as number,
      stakingAmount: {} as {botsAccess: boolean; ubxtStakingAmount: number;},
      stakingAmountLoading: false as boolean,
      selectedQuote: { label: 'USDT', value: 'USDT' } as { label: string; value: string; }, // USDT BY DEFAULT
      quotes: [{ label: 'USDT', value: 'USDT' }] as { label: string; value: string; }[] // USDT BY DEFAULT
    })

    const balanceDropdown: {label: string;}[] = [{ label: 'Balance' }]

    const positionSizeTypeOptions: {value: string; label: string;}[] = [
      { value: 'percentage', label: '% available' },
      { value: 'fixed', label: 'Fixed amount' }
    ]

    const tradingStrategyOptions: {value: string; label: string;}[] = [
      { value: 'long', label: 'Long' },
      { value: 'short', label: 'Short' },
      { value: 'long_short', label: 'Long & Short' }
    ]

    const accountLeverageOptions: {value: number; label: string;}[] = [
      { value: 1, label: 'x1' },
      { value: 2, label: 'x2' },
      { value: 3, label: 'x3' },
      { value: 5, label: 'x5' }
    ]

    const allocateMethodOptions: {value: string; label: string;}[] = [
      { value: 'automatic', label: 'Auto' },
      { value: 'manual', label: 'Manual' }
    ]

    const isBaseAvailableLimit = computed((): boolean => baseUSDTAvailable.value >= bot.value.allocatedMaxAmount)

    const isFreeStakers = computed((): boolean => {
      const freeStakersBots: string[] = ['Community bot TOMO LO1', 'Community Bot AVAX']
      return freeStakersBots.indexOf(bot.value.name) > -1
    })

    const getTotalBalance = computed((): number => {
      const availableAmount = perfeesUserWallet.value.availableAmount
      const botCreditAmount = perfeesBotWallet.value.creditAmount
      const userCreditAmount = perfeesUserWallet.value.creditAmount

      return availableAmount + botCreditAmount + userCreditAmount
    })

    const getAvailableUbxtToDeposit = computed((): number => {
      return perfeesUserWallet.value.availableAmount + perfeesBotWallet.value.creditAmount
    })

    const getMiniumUbxtToDeposit = computed((): number => {
      if (state.ubxtPrice === 0) return 0
      return Math.ceil(baseUSDTAvailable.value * 0.003 / state.ubxtPrice)
    })

    const isDepositableAmount = computed((): boolean => {
      const depositAmount = state.ubxtToAllocate
      const isBigThanMin = depositAmount >= getMiniumUbxtToDeposit.value
      const isSmallThanMax = depositAmount <= getAvailableUbxtToDeposit.value + perfeesUserWallet.value.creditAmount
      return isBigThanMin && isSmallThanMax
    })
    const isDepositableAmountAtAutoRefill = computed((): boolean => {
      const minAmount = 100
      const isSmallThanMax = minAmount <= getAvailableUbxtToDeposit.value + perfeesUserWallet.value.creditAmount
      return isSmallThanMax
    })

    const isDepositable = computed(() => {
      if (state.allocateMethod === allocateMethodOptions[0].value) {
        return isDepositableAmountAtAutoRefill.value
      } else if (state.allocateMethod === allocateMethodOptions[1].value) {
        return isDepositableAmount.value
      }
      return false
    })

    const accountLeverageOptionsFiltered = computed((): { value: number; label: string; }[] => {
      const cond = bot.value.stratType === EBotStratType.SHORT || bot.value.stratType === EBotStratType.LongShort
      if (!cond) return [accountLeverageOptions[0]]

      if (bot.value.botRef === EBotSnapshotRef.SUPERTRADERLINK || bot.value.botRef === EBotSnapshotRef.HARSIBTC) {
        return [accountLeverageOptions[0]]
      }

      if (bot.value.botRef === EBotSnapshotRef.SUPERTRADERBNB) {
        return [accountLeverageOptions[0], accountLeverageOptions[1]]
      }
      return accountLeverageOptions
    })

    const isCommunityBot = computed((): boolean => {
      return bot.value.botRef === EBotSnapshotRef.AVAXUSDT1 || bot.value.botRef === EBotSnapshotRef.TOMOLO1
    })

    const getConfigAccess = computed((): boolean => {
      if (isCommunityBot.value) {
        return hasCouponsWithCorrectPromo.value || state.stakingAmount.botsAccess
      }
      return true
    })

    function setSelectedQuote (): void {
      const quote = {
        value: state.account.quoteCurrency?.toUpperCase() || (state.quotes[0].value ?? ECryptoCurrency.USDT),
        label: state.account.quoteCurrency?.toUpperCase() || (state.quotes[0].label ?? ECryptoCurrency.USDT)
      }
      state.selectedQuote = quote
    }

    function getStableQuotes (): void {
      const line = stableCoinsPerExchangeAndPair[state.account.exchange.toLowerCase()]
      state.quotes = line[bot.value.base.toLowerCase()].map((el) => {
        return { value: el, label: el }
      })
    } // ['USDT', 'USD', 'TUSD', 'BUSD', 'USDC']

    function allocateUbxtToDeposit (): boolean {
      if (state.allocateMethod === allocateMethodOptions[0].value) {
        return isDepositableAmountAtAutoRefill.value
      } else if (isDepositableAmount.value) {
        const availableAmount = getAvailableUbxtToDeposit.value + perfeesUserWallet.value.creditAmount
        state.ubxtToDeposit = Math.min(state.ubxtToAllocate, availableAmount)
        return true
      } else {
        state.ubxtToDeposit = 0
        return false
      }
    }

    function openFollowBotModal (): void {
      if (allocateUbxtToDeposit() || isFreeStakers.value) {
        state.isFollowBotModalOpen = true
      } else {
        appNotify({ type: 'warning', message: 'Not enough ubxt. (min 100 UBXT)' })
      }
    }

    async function fetchCryptoPriceCoinGecko (): Promise<void> {
      try {
        const { data } = await globalService.getMarketValueHistory({ cryptoSymbol: 'upbots', fiatSymbol: 'usd' })
        if (data.prices.length) {
          const lastPrice = data.prices.pop()
          state.ubxtPrice = lastPrice?.length ? lastPrice[1] : 0
        }
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    async function fetchCurrentPrice (): Promise<void> {
      try {
        const { data } = await globalService.getCryptoPrice(
          { accExchange: state.account.exchange, base: bot.value.base, quote: state.selectedQuote.value }
        )
        state.marketPrice = data.Latest.close
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    async function validateTradeCost (): Promise<void> {
      await fetchCurrentPrice()

      const quantity = state.fixedAmount / state.marketPrice
      const quote = state.selectedQuote.value

      try {
        let sym = ''
        if (state.account.exchange === EAccount.FTX) {
          sym = `${bot.value.base}/${quote}`
        } else if (state.account.exchange === EAccount.KUCOIN) {
          sym = `${bot.value.base}-${quote}`
        } else {
          sym = `${bot.value.base}${quote}`
        }
        const exch = state.account.exchange

        const res = await tradesService.getTradeFormatValidity({
          accExchange: exch,
          symbol: sym,
          baseCurrency: bot.value.base,
          quoteCurrency: quote,
          quantity: quantity,
          price: state.marketPrice
        })

        if (res.data.checkList && res.data.checkList.costLimit === false) {
          state.costLimitError = res.data.comments
          state.allowFollowBot = false
        } else {
          state.costLimitError = ''
          if (state.fixedAmount <= Number(baseUSDTAvailable.value.toFixed(2))) {
            state.allowFollowBot = true
          }

          if (state.fixedAmount === 0) {
            state.costLimitError = 'Min amount 0.01'
            state.allowFollowBot = false
          }
        }
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    const validateTradeCostDebounce = useDebounceFn(async () => {
      try {
        state.loading = true
        await validateTradeCost()
      } finally {
        state.loading = false
      }
    }, 500)

    function handlePercentageValue (item: number): void {
      state.fixedAmount = Number(((baseUSDTAvailable.value / 100) * item).toFixed(2))
      validateTradeCostDebounce()
    }

    function handleFixedValue (value: number): void {
      if (value > baseUSDTAvailable.value) {
        state.fixedAmount = Number(baseUSDTAvailable.value.toFixed(2))
      }

      state.percentageValue[0] = Math.floor((state.fixedAmount / Number(baseUSDTAvailable.value.toFixed(2))) * 100)

      validateTradeCostDebounce()
    }

    function setMaxFixedValue (): void {
      state.fixedAmount = Number(baseUSDTAvailable.value.toFixed(2))
      state.percentageValue[0] = Math.floor(((state.fixedAmount / baseUSDTAvailable.value) * 100))
      validateTradeCostDebounce()
    }

    const getFilteredTagsByBotRef = computed(() => {
      if (bot.value.botRef) {
        return bot.value.exchangesType.map((el) => el.toLowerCase())
      }
      return []
    })

    function getAvailableExchangesFiltered (): void {
      state.accounts = availableAccounts.value.filter(item => getFilteredTagsByBotRef.value.includes(item.exchange))
    }

    function getDefaultExchange (): void {
      if (state.accounts.length) {
        const isBinance = state.accounts.filter((el) => el.exchange.toLowerCase() === EAccount.BINANCE)

        if (isBinance.length) {
          state.account = isBinance[0]
        } else {
          state.account = state.accounts[0]
        }
      } else {
        state.account = {} as IKey
      }
    }

    async function fetchFixedAmount (): Promise<void> {
      await fetchBaseAvailable(state.account.id || '', state.selectedQuote.value)
      state.fixedAmount = Number(baseUSDTAvailable.value.toFixed(2))
    }

    async function depositUbxt (): Promise<void> {
      try {
        await algoBotsService.botWalletTransfer({ botId: bot.value.id, amount: state.ubxtToDeposit })
        appNotify({ type: 'success', message: 'UBXT successfully allocated to bot.' })
      } catch (error) {
        appNotify({ type: 'error', message: 'UBXT allocation faile' })
      }
    }

    async function followBot (): Promise<void> {
      setBotGlobalLoading(true)

      let baseAmount = 0
      let positionType = ''
      let positionAmount = 0

      if (state.contractSize > 0 && state.marketPrice > 0) {
        baseAmount = (baseUSDTAvailable.value * state.percentageValue[0] / 100.0) / state.marketPrice
        if (state.account.exchange === EAccount.KucoinFuture) {
          baseAmount = Math.trunc(baseAmount * state.accountLeverage / state.contractSize) * state.contractSize
        } else if (state.account.exchange === EAccount.BinanceFuture) {
          baseAmount = baseAmount * state.accountLeverage
        }
      }

      if (state.positionSizeType === positionSizeTypeOptions[1].value) {
        positionType = 'fixed'
        positionAmount = state.fixedAmount
      } else {
        positionType = 'percent'
        positionAmount = state.percentageValue[0] / 100
      }

      let accountType = state.account.type || 'spot'
      if (
        state.account.exchange === 'ftx' &&
        (
          state.tradingStrategy.toUpperCase() === EBotStratType.SHORT ||
          state.tradingStrategy.toUpperCase() === EBotStratType.LongShort
        )
      ) {
        accountType = 'future'
      }

      const payload: {
        botId: string;
        apiKeyRef: string;
        accountType: string;
        stratType: string;
        accountPercentage: number;
        accountLeverage: number;
        contractSize: number;
        positionType: string;
        positionAmount: number;
        baseAmount: number;
        quote: string;
      } = {
        botId: bot.value.id,
        apiKeyRef: state.account.id,
        accountType: accountType,
        stratType: state.tradingStrategy.toUpperCase(),
        accountPercentage: state.percentageValue[0] / 100,
        accountLeverage: state.accountLeverage,
        contractSize: state.contractSize,
        positionType,
        positionAmount,
        baseAmount,
        quote: state.selectedQuote.value
      }

      try {
        await algoBotsService.botWalletAutoRefill({
          botId: bot.value.id,
          autoRefill: state.allocateMethod === allocateMethodOptions[0].value
        })
        await algoBotsService.startActivation(payload)
        await depositUbxt()
        await Promise.all([fetchPerfeesWallet(), fetchPerfeesBotWalletById(bot.value.id)])

        appNotify({ type: 'success', message: 'Bot successfully activated.' })
        router.push({ name: routeNames.myActiveBots })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || 'Bot activation failed' })
      } finally {
        state.isFollowBotModalOpen = false
        setBotGlobalLoading(false)
      }
    }

    async function handleQuoteSelection (item: { value: string; label: string; }): Promise<void> {
      state.loading = true
      state.selectedQuote = item

      fetchCryptoPriceCoinGecko()
      await fetchFixedAmount()
      validateTradeCostDebounce()
    }

    async function onTradingStrategyChange (): Promise<void> {
      getStableQuotes()
      if (state.account.exchange === EAccount.FTX && (
        state.tradingStrategy === EStrategy.SHORT || state.tradingStrategy === EStrategy.LongShort)
      ) {
        state.quotes = state.quotes.filter(quote => quote.value === 'USD')
        state.selectedQuote = { value: 'USD', label: 'USD' }
      } else {
        state.selectedQuote = { value: 'USDT', label: 'USDT' }
        setSelectedQuote()
      }
      handleQuoteSelection(state.selectedQuote)
    }

    async function onAccountChange (): Promise<void> {
      state.loading = true

      setSelectedQuote()
      getStableQuotes()
      fetchCryptoPriceCoinGecko()
      state.tradingStrategy = tradingStrategyOptions[0].value
      onTradingStrategyChange()
      await fetchFixedAmount()
      validateTradeCostDebounce()
    }

    const isStrategyShowable = computed(() => {
      const isFutureTradingBot = (
        bot.value.stratType === EBotStratType.SHORT || bot.value.stratType === EBotStratType.LongShort
      )
      const isFutureAccount = (
        state.account.exchange === EAccount.FTX ||
        state.account.exchange === EAccount.KucoinFuture ||
        state.account.exchange === EAccount.BinanceFuture
      )
      return isFutureTradingBot && isFutureAccount
    })

    function resetStateData (): void {
      state.percentageValue[0] = 0
      state.fixedAmount = 0
      state.costLimitError = 'Add a wallet to start using the bot.'
      state.marketPrice = 0
      state.allowFollowBot = false
      state.ubxtToAllocate = 0
      state.ubxtPrice = 0
    }

    async function fetchContractSize (): Promise<void> {
      try {
        const { data } = await algoBotsService.getContractSize({
          exchange: state.account.exchange,
          base: bot.value.base,
          quote: state.selectedQuote.value
        })
        state.contractSize = data
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    async function fetchStakingAmount (): Promise<void> {
      state.stakingAmountLoading = true
      try {
        const { data } = await globalService.getStakingAmount()

        state.stakingAmount = data
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        state.stakingAmountLoading = false
      }
    }

    async function initData (): Promise<void> {
      fetchStakingAmount()
      fetchPerfeesWallet()
      getAvailableExchangesFiltered()
      getDefaultExchange()

      if (availableAccounts.value.length) {
        setSelectedQuote()
        getStableQuotes()
        fetchContractSize()
        fetchPerfeesBotWalletById(bot.value.id)
        fetchCryptoPriceCoinGecko()
        await fetchFixedAmount()
        validateTradeCostDebounce()
      } else {
        resetStateData()
      }
    }

    initData()

    return {
      ...toRefs(state),
      routeNames,
      tradingStrategyOptions,
      positionSizeTypeOptions,
      allocateMethodOptions,
      bot,
      baseUSDTAvailable,
      baseAvailableLoading,
      isBaseAvailableLimit,
      isFreeStakers,
      perfeesUserWallet,
      perfeesBotWallet,
      balanceDropdown,
      getTotalBalance,
      getAvailableUbxtToDeposit,
      getMiniumUbxtToDeposit,
      isDepositable,
      accountLeverageOptionsFiltered,
      getConfigAccess,
      getAvailableExchangesFiltered,
      handleFixedValue,
      handleQuoteSelection,
      validateTradeCost,
      handlePercentageValue,
      setMaxFixedValue,
      openFollowBotModal,
      followBot,
      onAccountChange,
      onTradingStrategyChange,
      isStrategyShowable
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

  &__action-btn {
    max-width: 200px;
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
    min-height: 250px;
  }

  @media(min-width: 1920px) {
    min-height: 250px;
  }
}
</style>
