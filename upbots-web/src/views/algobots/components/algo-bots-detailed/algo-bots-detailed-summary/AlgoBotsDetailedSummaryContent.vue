<template>
  <!-- DESKTOP VIEW -->
  <mq-layout mq="lg+" class="flex flex-col w-full">
    <div class="flex flex-col space-y-12">
      <!-- TRADE / MONTH -->
      <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
        <div class="text-nile-blue dark:text-white 4xl:text-md">Trade / month:</div>
        <div class="text-nile-blue dark:text-tradewind text-md2 4xl:text-lg font-medium">
          {{ bot.lastMonthTrades }}
        </div>
      </div>

      <!-- RUNNING DAYS (ONLY FOR SUBSCRIPTED BOT) -->
      <div
        v-if="Object.keys(subscriptionBot).length"
        class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center"
      >
        <div class="text-nile-blue dark:text-white 4xl:text-md">Running Days:</div>
        <div class="text-nile-blue dark:text-tradewind text-md2 4xl:text-lg font-medium">
          {{ getDaysRunning }}
        </div>
      </div>

      <!-- POSITION SIZE (ONLY FOR SUBSCRIPTED BOT) -->
      <div
        v-if="Object.keys(subscriptionBot).length"
        class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center"
      >
        <div class="text-nile-blue dark:text-white 4xl:text-md">Position Size:</div>
        <div class="flex items-center">
          <span
            v-if="!subscriptionBot.positionType || subscriptionBot.positionType === EPositionType.PERCENT"
            class="text-nile-blue dark:text-tradewind text-md2 4xl:text-lg font-medium mr-5"
          >
            <template v-if="!subscriptionBot.positionType">
              {{ Math.trunc(subscriptionBot.accountPercent * 100) + "%" }}
            </template>
            <template v-if="subscriptionBot.positionType === EPositionType.PERCENT">
              {{ Math.trunc((subscriptionBot.positionAmount ?? subscriptionBot.accountPercent) * 100) + "%" }}
            </template>
          </span>

          <AppTextLoader
            v-if="baseAvailableLoading"
            text=""
            class="text-tradewind dark:text-white text-md2 4xl:text-lg font-medium"
          />
          <template v-else>
            <span class="flex self-end text-md2 text-tradewind dark:text-white">
              <template v-if="subscriptionBot.positionType === EPositionType.FIXED">
                {{ positionSize.toFixed(2) }} $
              </template>

              <template v-if="!subscriptionBot.positionType || subscriptionBot.positionType === EPositionType.PERCENT">
                ({{ positionSize.toFixed(2) }} $)
              </template>
            </span>

            <AppTooltip
              content="Not enought USDT"
              :disabled="!!baseUSDTAvailable"
              placement="top"
              class="flex"
            >
              <AppIcon
                name="edit"
                :size="!is4XL ? '20' : '18'"
                class="text-nile-blue dark:text-tradewind ml-10"
                :class="(
                  !subscriptionBot.botRunning && !!baseUSDTAvailable ?
                    'cursor-pointer' :
                    'opacity-50 cursor-not-allowed'
                )"
                @click="(!subscriptionBot.botRunning && !!baseUSDTAvailable) && openEditPositionSizeModal()"
              />
            </AppTooltip>
          </template>
        </div>
      </div>

      <!-- ACCOUNT (ONLY FOR SUBSCRIPTED BOT) -->
      <div
        v-if="Object.keys(subscriptionBot).length"
        class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center"
      >
        <div class="text-nile-blue dark:text-white 4xl:text-md">Account:</div>
        <div class="text-nile-blue dark:text-tradewind text-md2 4xl:text-lg font-medium">
          <div class="flex items-center space-x-4">
            <img
              class="w-20 h-20 max-w-20"
              :src="`/img/cryptocoins/${getAccount.exchange.toLowerCase()}.svg`"
              :alt="getAccount?.name"
            >
            <AppTruncatedTooltip
              :content="getAccount?.name"
              class="text-nile-blue dark:text-tradewind text-md2 4xl:text-lg leading-xs font-medium"
            />
            <AppIcon
              v-if="!subscriptionBot.botRunning"
              name="edit"
              :size="!is4XL ? '20' : '18'"
              class="text-nile-blue dark:text-tradewind cursor-pointer"
              @click="openEditAccountModal()"
            />
          </div>
        </div>
      </div>

      <!-- MAX DRAWDOWN (ONLY FOR NOT SUBSCRIPTED BOT) -->
      <div
        v-if="!Object.keys(subscriptionBot).length"
        class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center"
      >
        <div class="text-nile-blue dark:text-white 4xl:text-md">Max Drawdown:</div>
        <div class="text-nile-blue dark:text-tradewind text-md2 4xl:text-lg font-medium">
          {{ bot.perfSnapshots?.maxDrawdown }}
        </div>
      </div>

      <!-- LEVERAGE (ONLY FOR NOT SUBSCRIPTED FUTURE BOT) -->
      <div
        v-if="Object.keys(subscriptionBot).length && getLeverage"
        class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center"
      >
        <div class="text-nile-blue dark:text-white 4xl:text-md">Leverage:</div>
        <div class="text-nile-blue dark:text-tradewind text-md2 4xl:text-lg font-medium">
          {{ subscriptionBot.accountLeverage }}
        </div>
      </div>

      <!-- PERF FEES -->
      <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
        <div class="text-nile-blue dark:text-white 4xl:text-md">Perf fees:</div>
        <div class="text-nile-blue dark:text-tradewind text-md2 4xl:text-lg font-medium">
          <AppTextLoader v-if="stakingBenefitLoading" text="" />
          <template v-else>{{ `From ${getMinFeePercent(bot.perfFees?.percent).toFixed(1)}%` }}</template>
        </div>
      </div>

      <!-- MY FEES -->
      <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
        <div class="text-nile-blue dark:text-white 4xl:text-md">My fees:</div>
        <div class="flex-col">
          <div class="text-nile-blue dark:text-tradewind text-md2 4xl:text-lg font-medium">
            {{ `${bot.perfFees?.percent}%` }}
          </div>

          <!-- STAKING REWARD INFO -->
          <router-link :to="{ name: routeNames.ubxtStakingReward }" target="_blank">
            <div
              class="text-nile-blue dark:text-white text-xs underline cursor-pointer"
            >
              How to get lower fee?
            </div>
          </router-link>
        </div>
      </div>

      <!-- STRAT TYPE (ONLY FOR SUBSCRIPTED FUTURE BOT) -->
      <div
        v-if="Object.keys(subscriptionBot).length && stratType"
        class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center"
      >
        <div class="text-nile-blue dark:text-white 4xl:text-md">Strat Type:</div>
        <div class="text-nile-blue dark:text-tradewind text-md2 4xl:text-lg font-medium">
          {{ stratType }}
        </div>
      </div>
    </div>

    <!-- PERF DATA (ONLY FOR NOT SUBSCRIPTED BOT) -->
    <div v-if="!Object.keys(subscriptionBot).length" class="flex flex-col space-y-12 mt-20 4xl:mt-24">
      <!-- PERF 3M -->
      <div class="algobot-detailed-desc__perfs">
        <div>
          <AppFormatNumber
            :data="bot.perfSnapshots?.month3"
            percent
            :is-show-zero="false"
            text-size="text-lg"
            class="algobot-detailed-desc__perfs-value"
          />
        </div>
        <p class="algobot-detailed-desc__perfs-title">Perf 3M</p>
      </div>

      <!-- PERF 6M -->
      <div class="algobot-detailed-desc__perfs">
        <div>
          <AppFormatNumber
            :data="bot.perfSnapshots?.month6"
            percent
            text-size="text-lg"
            :is-show-zero="false"
            class="algobot-detailed-desc__perfs-value"
          />
        </div>
        <p class="algobot-detailed-desc__perfs-title">Perf 6M</p>
      </div>

      <!-- PERF TOTAL -->
      <div class="algobot-detailed-desc__perfs">
        <div>
          <AppFormatNumber
            :data="bot.perfSnapshots?.allmonths"
            percent
            text-size="text-lg"
            :is-show-zero="false"
            class="algobot-detailed-desc__perfs-value"
          />
        </div>
        <p class="algobot-detailed-desc__perfs-title">Perf Total</p>
      </div>
    </div>
  </mq-layout>

  <!-- MOBILE VIEW -->
  <mq-layout mq="sm-md" class="grid grid-cols-2 gap-10 mb-20">
    <!-- BOT STATUS (ONLY FOR SUBSCRIPTED BOT) -->
    <div v-if="Object.keys(subscriptionBot).length" class="flex flex-col items-center space-y-4">
      <div class="text-nile-blue dark:text-white">Status:</div>
      <div class="text-nile-blue dark:text-tradewind font-medium">
        {{ subscriptionBot.enabled ? 'ACTIVE' : 'PAUSED' }}
      </div>
    </div>

    <!-- TRADE / MONTH -->
    <div class="flex flex-col items-center space-y-4">
      <div class="text-nile-blue dark:text-white text-center">Trade / month:</div>
      <div class="text-nile-blue dark:text-tradewind font-medium">{{ bot.lastMonthTrades }}</div>
    </div>

    <!-- RUNNING DAYS (ONLY FOR SUBSCRIPTED BOT) -->
    <div v-if="Object.keys(subscriptionBot).length" class="flex flex-col items-center space-y-4">
      <div class="text-nile-blue dark:text-white text-center">Running Days:</div>
      <div class="text-nile-blue dark:text-tradewind font-medium">{{ getDaysRunning }}</div>
    </div>

    <!-- POSITION SIZE (ONLY FOR SUBSCRIPTED BOT) -->
    <div v-if="Object.keys(subscriptionBot).length" class="flex flex-col items-center space-y-4">
      <div class="text-nile-blue dark:text-white">Position Size:</div>
      <div class="flex items-center">
        <span class="text-nile-blue dark:text-tradewind font-medium mr-5">
          <template v-if="!subscriptionBot.positionType">
            {{ Math.trunc(subscriptionBot.accountPercent * 100) + "%" }}
          </template>
          <template v-if="subscriptionBot.positionType === EPositionType.PERCENT">
            {{ Math.trunc((subscriptionBot.positionAmount ?? subscriptionBot.accountPercent) * 100) + "%" }}
          </template>
        </span>

        <AppTextLoader
          v-if="baseAvailableLoading"
          text=""
          class="text-nile-blue dark:text-tradewind"
        />
        <template v-else>
          <span class="flex self-end text-nile-blue dark:text-tradewind font-medium text-sm mb-1">
            <template v-if="subscriptionBot.positionType === EPositionType.FIXED">
              {{ positionSize.toFixed(2) }} $
            </template>

            <template v-if="!subscriptionBot.positionType || subscriptionBot.positionType === EPositionType.PERCENT">
              ({{ positionSize.toFixed(2) }}$)
            </template>
          </span>

          <AppTooltip
            content="Not enought USDT"
            :disabled="!!baseUSDTAvailable"
            placement="top"
            class="flex"
          >
            <AppIcon
              name="edit"
              size="16"
              class="text-nile-blue dark:text-tradewind ml-10"
              :class="(
                !subscriptionBot.botRunning && !!baseUSDTAvailable ?
                  'cursor-pointer' :
                  'opacity-50 cursor-not-allowed'
              )"
              @click="(!subscriptionBot.botRunning && !!baseUSDTAvailable) && openEditPositionSizeModal()"
            />
          </AppTooltip>
        </template>
      </div>
    </div>

    <!-- ACCOUNT (ONLY FOR SUBSCRIPTED BOT) -->
    <div v-if="Object.keys(subscriptionBot).length" class="flex flex-col items-center space-y-4">
      <div class="text-nile-blue dark:text-white">Account:</div>
      <div class="text-nile-blue dark:text-tradewind font-medium">
        <div class="flex items-center space-x-4">
          <img
            class="w-18 h-18 max-w-18"
            :src="`/img/cryptocoins/${getAccount.exchange.toLowerCase()}.svg`"
            :alt="getAccount?.name"
          >
          <AppTruncatedTooltip :content="getAccount?.name" class="text-nile-blue dark:text-tradewind font-medium" />
          <AppIcon
            v-if="!subscriptionBot.botRunning"
            name="edit"
            size="16"
            class="text-nile-blue dark:text-tradewind"
            @click="openEditAccountModal()"
          />
        </div>
      </div>
    </div>

    <!-- MAX DRAWDOWN (ONLY FOR NOT SUBSCRIPTED BOT) -->
    <div v-if="!Object.keys(subscriptionBot).length" class="flex flex-col items-center space-y-4">
      <div class="text-nile-blue dark:text-white text-center">Max Drawdown:</div>
      <div class="text-nile-blue dark:text-tradewind font-medium">{{ bot.perfSnapshots?.maxDrawdown }}</div>
    </div>

    <!-- LEVERAGE (ONLY FOR NOT SUBSCRIPTED FUTURE BOT) -->
    <div v-if="Object.keys(subscriptionBot).length && getLeverage" class="flex flex-col items-center space-y-4">
      <div class="text-nile-blue dark:text-white">Leverage:</div>
      <div class="text-nile-blue dark:text-tradewind font-medium">{{ subscriptionBot.accountLeverage }}</div>
    </div>

    <!-- PERFS FEES -->
    <div class="flex flex-col items-center space-y-4">
      <div class="text-nile-blue dark:text-white text-center">Perf fees:</div>
      <div class="text-nile-blue dark:text-tradewind font-medium">
        <AppTextLoader v-if="stakingBenefitLoading" text="" />
        <template v-else>{{ `From ${getMinFeePercent(bot.perfFees.percent).toFixed(1)}%` }}</template>
      </div>
    </div>

    <!-- MY FEES -->
    <div class="flex flex-col items-center space-y-4">
      <div class="text-nile-blue dark:text-white text-center">My fees:</div>
      <div class="flex items-center text-nile-blue dark:text-tradewind font-medium">
        <span class="mr-5">{{ `${bot.perfFees.percent}%` }}</span>

        <!-- STAKING REWARD INFO How to get lower fee ? -->
        <router-link :to="{ name: routeNames.ubxtStakingReward }" target="_blank" class="flex">
          <AppIcon name="info-circle" size="20" />
        </router-link>
      </div>
    </div>

    <!-- STRAT TYPE (ONLY FOR SUBSCRIPTED FUTURE BOT) -->
    <div v-if="Object.keys(subscriptionBot).length && stratType" class="flex flex-col items-center space-y-4">
      <div class="text-nile-blue dark:text-white text-center">Strat Type:</div>
      <div class="text-nile-blue dark:text-tradewind font-medium">{{ stratType }}</div>
    </div>

    <!-- PERF DATA (ONLY FOR NOT SUBSCRIPTED BOT) -->
    <template v-if="!Object.keys(subscriptionBot).length">
      <!-- PERF 3M -->
      <div class="flex flex-col items-center space-y-4">
        <div class="text-nile-blue dark:text-white">Perf 3M:</div>
        <AppFormatNumber :data="bot.perfSnapshots?.month3" percent :is-show-zero="false" />
      </div>

      <!-- PERF 6M -->
      <div class="flex flex-col items-center space-y-4">
        <div class="text-nile-blue dark:text-white">Perf 6M:</div>
        <AppFormatNumber :data="bot.perfSnapshots?.month6" percent :is-show-zero="false" />
      </div>

      <!-- PERF TOTAL -->
      <div class="flex flex-col items-center space-y-4">
        <div class="text-nile-blue dark:text-white">Perf Total:</div>
        <AppFormatNumber :data="bot.perfSnapshots?.allmonths" percent :is-show-zero="false" />
      </div>
    </template>
  </mq-layout>

  <!-- EDIT POSITION SIZE MODAL -->
  <AppModal v-model="isEditPositionSizeModalOpened" @closed="closeEditPositionSizeModal()">
    <div class="flex flex-col relative">
      <h2 class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-40">
        Edit Position Size
      </h2>

      <div class="mx-auto mb-30" style="min-width: 250px;">
        <AppButtonsGroup
          v-model="positionSizeButtonsGroupValue"
          :options="positionSizeButtonsGroupOptions"
          size="sm"
          width="100%"
          class="w-full"
        />
      </div>

      <template v-if="positionSizeButtonsGroupValue === positionSizeButtonsGroupOptions[0].value">
        <div class="flex flex-col w-full relative">
          <AppSlider
            v-model="positionSizeSliderValue"
            min="0"
            max="100"
            class="w-full"
            @changed="onModalSliderChanged()"
            @input="onModalSliderChanged()"
          />

          <div class="flex items-center space-x-5 mt-20">
            <p class="text-seal-blue dark:text-white-lilac">Next theorical order:</p>
            <p
              :class="!baseUSDTAvailable ? 'text-alexandria' : 'text-seal-blue dark:text-white-lilac'"
            >
              {{ positionSize.toFixed(2) }} $
            </p>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex flex-col w-full my-10">
          <AppInputNumber
            v-model="positionSize"
            :disabled="!getAvailableExchangesFiltered.length"
            class="w-full"
            size="md"
            @change="onModalPositionSizeInputChanged"
          />
          <p
            v-if="getAvailableExchangesFiltered.length"
            class="flex text-tradewind dark:text-blair text-sm font-semibold mt-6 cursor-pointer"
            @click="onModalMaxClicked()"
          >
            Max
          </p>
        </div>
      </template>

      <div class="flex items-center justify-center w-full mt-20 space-x-20">
        <AppButton type="primary-border-filled" @click="closeEditPositionSizeModal()">
          Cancel
        </AppButton>
        <AppButton :disabled="!isConfirmEditPositionSize" @click="updatePositionSize()">
          Confirm
        </AppButton>
      </div>
    </div>
  </AppModal>

  <!-- EDIT ACCOUNT MODAL -->
  <AppModal v-model="isEditAccountModalOpened">
    <div class="flex flex-col relative">
      <h2 class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-40">
        Select your wallet
      </h2>

      <h3 class="md:text-md text-nile-blue dark:text-let-it-snow text-center font-medium mb-10">
        Select the API key that the bot will use to trade
      </h3>

      <AppSelect
        :model-value="account"
        :options="getAvailableExchangesFiltered"
        item-label="name"
        item-key="id"
        size="md"
        style="min-width: 220px;"
        :disabled="!getAvailableExchangesFiltered.length"
        @change="handleAccountSelection"
      >
        <template #selection="{ value, hasInitialValue }">
          <template v-if="hasInitialValue">
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

      <div class="flex items-center justify-center w-full mt-20 space-x-20">
        <AppButton type="primary-border-filled" @click="isEditAccountModalOpened = false">
          Cancel
        </AppButton>
        <AppButton @click="updateAccount()">Confirm</AppButton>
      </div>
    </div>
  </AppModal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import { routeNames } from '@/router'

import dayjs from 'dayjs'

import { vuex } from '@/store'
import { algoBotsService } from '@/services'
import { EBotStratType, IKey, EPositionType, EErrorsMessage } from '@/types'
import { EAccount, ECryptoCurrency } from '@/types/crypto.types'
import { appNotify } from '@/components/stateless/notifications'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useAlgoBotsDetailed } from '../algo-bots-detailed.composition.setup'

export default defineComponent({
  name: 'AlgoBotsDetailedSummaryContent',

  setup () {
    const { availableAccounts } = useGlobal()
    const { is4XL } = useCustomBreakpoints()
    const {
      bot,
      subscriptionBot,
      botSubscriptionAudits,
      baseUSDTAvailable,
      baseAvailableLoading,
      subscriptionAuditsLoading,
      getAccount,
      fetchBotSnapshotById,
      fetchBotSubscriptionById,
      fetchSubscriptionAuditsById,
      fetchBaseAvailable
    } = useAlgoBotsDetailed()

    /* STATE */
    const state = reactive({
      account: {} as IKey,
      positionSizeButtonsGroupValue: 'percentage' as string,
      isEditPositionSizeModalOpened: false as boolean,
      positionSize: 0 as number,
      positionSizeSliderValue: [100] as number[],
      isEditAccountModalOpened: false as boolean,
      stakingBenefitLoading: false as boolean
    })

    const positionSizeButtonsGroupOptions: {value: string; label: string;}[] = [
      { value: 'percentage', label: '% available' },
      { value: 'fixed', label: 'Fixed amount' }
    ]

    const getDaysRunning = computed((): string => {
      if (subscriptionBot.value.createdAt) {
        const exDay = dayjs(new Date()).diff(subscriptionBot.value.createdAt, 'day')

        return exDay >= 2 ? `${exDay} days` : `${exDay} day`
      }

      return '-'
    })

    const stratType = computed((): 'Long' | 'Short' | 'Long & Short' | '' => {
      const isFutureTrading = (
        getAccount.value?.exchange.toLowerCase() === EAccount.KucoinFuture ||
        getAccount.value?.exchange.toLowerCase() === EAccount.BinanceFuture ||
        (getAccount.value?.exchange.toLowerCase() === EAccount.FTX && bot.value.stratType === EBotStratType.LongShort)
      )

      if (!isFutureTrading) return ''

      if (subscriptionBot.value.stratType === EBotStratType.LONG) {
        return 'Long'
      } else if (subscriptionBot.value.stratType === EBotStratType.SHORT) {
        return 'Short'
      } else if (subscriptionBot.value.stratType === EBotStratType.LongShort) {
        return 'Long & Short'
      } else {
        return ''
      }
    })

    const getCurrentFeeOff = computed((): number => vuex.staking.benefit.currentFeeOff)

    const tradeAmount = computed((): number => {
      if (!Object.keys(subscriptionBot.value).length) return 0

      if (subscriptionBot.value.botRunning && botSubscriptionAudits.value.length > 0) {
        if (botSubscriptionAudits.value[0].oTrackId?.completed) {
          return botSubscriptionAudits.value[0].oTrackId?.completion.cumulQuoteCost
        } else {
          return 0
        }
      } else {
        return ((baseUSDTAvailable.value * state.positionSizeSliderValue[0]) / 100)
      }
    })

    const getAvailableExchangesFiltered = computed((): IKey[] => {
      if (bot.value.base === ECryptoCurrency.AVAX) {
        return availableAccounts.value
      } else {
        if (bot.value.base === ECryptoCurrency.FTT) {
          return availableAccounts.value.filter((x) => x.exchange !== EAccount.KUCOIN)
        } else if (bot.value.base === ECryptoCurrency.BAT || bot.value.base === ECryptoCurrency.ETC) {
          return availableAccounts.value.filter((x) => x.exchange !== EAccount.FTX)
        } else {
          return availableAccounts.value
        }
      }
    })

    const isConfirmEditPositionSize = computed((): boolean => {
      if (!baseUSDTAvailable.value) return false
      if (state.positionSize > Number(baseUSDTAvailable.value.toFixed(2))) return false
      return true
    })

    const getLeverage = computed((): boolean => {
      const isFutureTrading = (
        getAccount.value?.exchange.toLowerCase() === EAccount.KucoinFuture ||
        getAccount.value?.exchange.toLowerCase() === EAccount.BinanceFuture ||
        (getAccount.value?.exchange.toLowerCase() === EAccount.FTX && bot.value.stratType !== EBotStratType.LONG)
      )
      return !!subscriptionBot.value.accountLeverage && isFutureTrading
    })

    function getMinFeePercent (currentFee: number): number {
      const maxDiscountPercent = 65

      if (currentFee === 0) return 0
      return (currentFee * (100 - maxDiscountPercent) / (100 - getCurrentFeeOff.value))
    }

    function setInitialDataDisplay (): void {
      if (subscriptionBot.value.positionType === EPositionType.PERCENT) {
        state.positionSizeSliderValue[0] = (subscriptionBot.value.positionAmount ?? 0) * 100
        state.positionSize = Number(((baseUSDTAvailable.value * state.positionSizeSliderValue[0]) / 100).toFixed(2))
        state.positionSizeButtonsGroupValue = positionSizeButtonsGroupOptions[0].value
      } else if (subscriptionBot.value.positionType === EPositionType.FIXED) {
        state.positionSize = subscriptionBot.value.positionAmount ?? 0
        state.positionSizeSliderValue[0] = baseUSDTAvailable.value > 0
          ? 100 * state.positionSize / baseUSDTAvailable.value
          : 0
        state.positionSizeButtonsGroupValue = positionSizeButtonsGroupOptions[1].value
      } else if (!subscriptionBot.value.positionType) { // for old data
        state.positionSizeSliderValue[0] = subscriptionBot.value.accountPercent * 100
        state.positionSize = Number(((baseUSDTAvailable.value * state.positionSizeSliderValue[0]) / 100).toFixed(2))
        state.positionSizeButtonsGroupValue = positionSizeButtonsGroupOptions[0].value
      }
    }

    function openEditPositionSizeModal (): void {
      if (subscriptionBot.value.positionType === EPositionType.PERCENT) {
        state.positionSizeButtonsGroupValue = positionSizeButtonsGroupOptions[0].value
      } else if (subscriptionBot.value.positionType === EPositionType.FIXED) {
        state.positionSizeButtonsGroupValue = positionSizeButtonsGroupOptions[1].value
      } else {
        state.positionSizeButtonsGroupValue = positionSizeButtonsGroupOptions[0].value
      }
      // state.positionSize = Number(((baseUSDTAvailable.value * state.positionSizeSliderValue[0]) / 100).toFixed(2))
      state.isEditPositionSizeModalOpened = true
    }
    function closeEditPositionSizeModal (): void {
      setInitialDataDisplay()
      state.isEditPositionSizeModalOpened = false
    }

    function onModalSliderChanged (): void {
      state.positionSize = Number(((baseUSDTAvailable.value * state.positionSizeSliderValue[0]) / 100).toFixed(2))
    }
    function onModalMaxClicked (): void {
      state.positionSizeSliderValue[0] = 100
      state.positionSize = Number(baseUSDTAvailable.value.toFixed(2))
    }
    function onModalPositionSizeInputChanged (value: number): void {
      if (value > baseUSDTAvailable.value) {
        state.positionSize = Number(baseUSDTAvailable.value.toFixed(2))
      }
      state.positionSizeSliderValue[0] = Math.floor(
        (state.positionSize / Number(baseUSDTAvailable.value.toFixed(2))) * 100
      )
    }
    async function updatePositionSize (): Promise<void> {
      const payload: {
        subscriptionId: string;
        percentage: number;
        positionType: string;
        positionAmount: number;
      } = {
        subscriptionId: subscriptionBot.value?.id || '',
        percentage: state.positionSizeSliderValue[0] / 100,
        positionType: state.positionSizeButtonsGroupValue === positionSizeButtonsGroupOptions[1].value ? 'fixed' : 'percent',
        positionAmount: state.positionSizeButtonsGroupValue === positionSizeButtonsGroupOptions[1].value
          ? state.positionSize
          : state.positionSizeSliderValue[0] / 100
      }

      try {
        await algoBotsService.updateAccountPositionSize(payload)
        await Promise.all([
          fetchBotSnapshotById(bot.value.id),
          fetchBotSubscriptionById(bot.value.id)
        ])
        state.positionSizeSliderValue[0] = subscriptionBot.value.positionType === EPositionType.PERCENT
          ? (subscriptionBot.value.positionAmount ?? 0) * 100
          : subscriptionBot.value.accountPercent * 100
        appNotify({ type: 'success', message: 'Position size successfully changed' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        state.isEditPositionSizeModalOpened = false
      }
    }

    function openEditAccountModal (): void {
      state.isEditAccountModalOpened = true
      state.account = getAccount.value as IKey
    }
    function handleAccountSelection (item: IKey): void {
      state.account = item
    }
    async function updateAccount (): Promise<void> {
      const payload: {subscriptionId: string; keyId: string; accountType: string;} = {
        subscriptionId: subscriptionBot?.value.id || '',
        keyId: state.account.id,
        accountType: state.account.type || 'spot'
      }

      try {
        await algoBotsService.updateAccountKey(payload)
        await Promise.all([
          fetchBotSnapshotById(bot.value.id),
          fetchBotSubscriptionById(bot.value.id),
          vuex.staking.fetchStakingBenefit(),
          fetchSubscriptionAuditsById(subscriptionBot.value.botId),
          fetchBaseAvailable(state.account.id || '', subscriptionBot.value.quote ?? 'USDT') // subscriptionBot.value.quote or userSettings.favoriteCurrency.value
        ])
        setInitialDataDisplay()
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    async function fetchStakingBenefit (): Promise<void> {
      state.stakingBenefitLoading = true
      try {
        await vuex.staking.fetchStakingBenefit()
      } finally {
        state.stakingBenefitLoading = false
      }
    }

    watch(() => baseAvailableLoading.value, (val) => {
      if (!val) {
        if (Object.keys(subscriptionBot.value).length) {
          setInitialDataDisplay()
        }
      }
    })

    function initData (): void {
      fetchStakingBenefit()
      setInitialDataDisplay()
    }

    initData()

    return {
      ...toRefs(state),
      EPositionType,
      routeNames,
      is4XL,
      bot,
      subscriptionBot,
      getDaysRunning,
      getAccount,
      stratType,
      positionSizeButtonsGroupOptions,
      getAvailableExchangesFiltered,
      isConfirmEditPositionSize,
      tradeAmount,
      baseAvailableLoading,
      baseUSDTAvailable,
      subscriptionAuditsLoading,
      getLeverage,
      getMinFeePercent,
      openEditPositionSizeModal,
      openEditAccountModal,
      closeEditPositionSizeModal,
      onModalSliderChanged,
      onModalMaxClicked,
      onModalPositionSizeInputChanged,
      updatePositionSize,
      updateAccount,
      handleAccountSelection
    }
  }
})
</script>

<style lang="scss" scoped>
.algobot-detailed-desc {
  &__perfs {
    @apply
      grid
      grid-cols-2
      gap-x-20
      items-center
      h-50
      py-10
      px-10
      bg-azureish-white
      bg-opacity-60
      dark:bg-opacity-100
      dark:bg-into-the-stratosphere;
  }

  &__perfs-value {
    @apply font-medium;
  }

  &__perfs-title {
    @apply flex justify-end text-beguiling-blue dark:text-blue-thistle;
  }
}
</style>
