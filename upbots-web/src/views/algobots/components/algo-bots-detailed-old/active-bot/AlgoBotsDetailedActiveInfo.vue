<template>
  <AppCard class="flex flex-col relative pb-20 px-20 md:px-14 md:py-14 lg:p-20 4xl:p-30 mt-20 md:mt-0">
    <!-- LOADER -->
    <AppLoader v-if="algoBotsDetailedLoading" class="rounded-xlg" />

    <!-- CONTENT -->
    <mq-layout mq="lg+" class="flex flex-col w-full space-y-24 lg:space-y-30 4xl:space-y-40">
      <div class="flex items-center w-full">
        <!-- BOT LOGO -->
        <div
          class="algobot-detailed-info__img flex flex-shrink-0 rounded-full mr-14 lg:mr-24 overflow-hidden"
        >
          <img
            v-if="getPerfBotCyclesDataById"
            :src="getBotLogoImg(getPerfBotCyclesDataById)"
            :alt="getPerfBotCyclesDataById.name"
            class="w-full h-full object-cover"
          >
        </div>

        <div class="flex flex-col w-full">
          <!-- BOT NAME -->
          <AppTruncatedTooltip
            class="text-nile-blue dark:text-white font-bold text-md2 4xl:text-lg mb-2"
            :content="getPerfBotCyclesDataById?.name"
          />

          <!-- BOT CREATOR -->
          <AppTruncatedTooltip
            class="text-nile-blue dark:text-let-it-snow text-md2 4xl:text-lg"
            :content="getPerfBotCyclesDataById?.creator"
          />

          <!-- BOT STATUS -->
          <div
            class="flex font-bold text-sm 4xl:text-base"
            :class="getAlgobotsSubscriptionById?.enabled ? 'text-spring-bouquet' : 'text-alexandria'"
          >
            {{ getAlgobotsSubscriptionById?.enabled ? 'ACTIVE' : 'PAUSED' }}
          </div>
        </div>
      </div>

      <!-- BOT DESCRIPTION -->
      <div class="text-base font-medium text-nile-blue dark:text-white 4xl:text-lg">
        {{ getPerfBotCyclesDataById?.description }}
      </div>

      <!-- BOT TAGS -->
      <div class="grid grid-cols-3 gap-10 xl:gap-20 4xl:gap-30">
        <AppTag
          v-for="(item, index) in getFilteredTags"
          :key="index"
          :data="item"
          :size="!is4XL ? 'lg' : 'md'"
        />
      </div>

      <div class="flex flex-col space-y-12 4xl:space-y-20">
        <!-- TOTAL TRADES -->
        <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
          <div class="text-nile-blue dark:text-white 4xl:text-md">Trade / month:</div>
          <div class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium">
            <span v-if="getPerfBotCyclesDataById">
              {{ getPerfBotCyclesDataById.lastMonthTrades }}
            </span>
            <span v-else>-</span>
          </div>
        </div>

        <!-- RUNNING DAYS -->
        <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
          <div class="text-nile-blue dark:text-white 4xl:text-md">Running Days:</div>
          <div class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium">
            {{ getDaysRunning }}
          </div>
        </div>

        <!-- POSITION SIZE -->
        <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
          <div class="text-nile-blue dark:text-white 4xl:text-md">Position Size:</div>
          <div class="flex items-center space-x-10">
            <template v-if="getAlgobotsSubscriptionByBotId?.accountPercent">
              <span class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium">
                {{ (getAlgobotsSubscriptionByBotId.accountPercent * 100).toFixed(0) + "%" }}
              </span>
              <AppIcon
                v-if="!getAlgobotsSubscriptionByBotId.botRunning && !isBaseAvailable"
                name="edit"
                :size="!is4XL ? '20' : '18'"
                class="text-nile-blue dark:text-tradewind cursor-pointer"
                @click="openEditPositionSizeModal()"
              />
            </template>
            <template v-else>
              <span class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium">-</span>
            </template>
          </div>
        </div>

        <!-- POSITION SIZE -->
        <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center" title="This is a theoretical value.">
          <div class="text-nile-blue dark:text-white 4xl:text-md">
            Trade amount:
          </div>
          <div class="flex items-center space-x-10">
            <template v-if="getAlgobotsSubscriptionByBotId?.accountPercent">
              <span class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium">
                {{ loading ? "..." : tradeAmount.toFixed(2) }} $
              </span>
            </template>
            <template v-else>
              <span class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium">-</span>
            </template>
          </div>
        </div>

        <!-- ACCOUNT -->
        <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
          <div class="text-nile-blue dark:text-white 4xl:text-md">Account:</div>
          <div class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium">
            <div v-if="getAccount?.img || getAccount?.name" class="flex items-center space-x-4">
              <img class="w-20 h-20 max-w-20" :src="getAccount.img" :alt="getAccount?.name">
              <AppTruncatedTooltip
                :content="getAccount?.name"
                class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg leading-xs font-medium"
              />
              <AppIcon
                v-if="!getAlgobotsSubscriptionByBotId.botRunning"
                name="edit"
                :size="!is4XL ? '20' : '18'"
                class="text-nile-blue dark:text-tradewind cursor-pointer"
                @click="openEditAccountModal()"
              />
            </div>
            <span v-else>-</span>
          </div>
        </div>

        <!-- LEVERAGE -->
        <div
          v-if="displayLeverage"
          class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center"
        >
          <div class="text-nile-blue dark:text-white 4xl:text-md">Leverage:</div>
          <div class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium">
            {{ getAlgobotsSubscriptionByBotId?.accountLeverage ?
              getAlgobotsSubscriptionByBotId.accountLeverage : '-' }}
          </div>
        </div>

        <!-- PERFS FEES -->
        <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
          <div class="text-nile-blue dark:text-white 4xl:text-md">Perf fees:</div>
          <div
            v-if="getPerfBotCyclesDataById"
            class="flex items-center space-x-6 text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium"
          >
            {{ `From ${( getMinFeePercent(getPerfBotCyclesDataById?.perfFees?.percent || 0))}%` }}
          </div>
        </div>

        <!-- MY FEES -->
        <div class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center">
          <div class="text-nile-blue dark:text-white 4xl:text-md">My fees:</div>
          <div class="flex-col">
            <div
              v-if="getPerfBotCyclesDataById"
              class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium"
            >
              {{ `${( getPerfBotCyclesDataById?.perfFees?.percent) || '0'}%` }}
            </div>

            <!-- STAKING REWARD INFO -->
            <router-link #default="{ navigate }" :to="{ name: routeNames.ubxtStakingReward }" custom>
              <div
                class="text-nile-blue dark:text-white text-xs underline cursor-pointer"
                @click="navigate()"
              >
                How to get lower fee ?
              </div>
            </router-link>
          </div>
        </div>

        <!-- STRAT TYPE -->
        <div
          v-if="stratType"
          class="grid grid-cols-2 gap-x-10 lg:gap-x-20 items-center"
        >
          <div class="text-nile-blue dark:text-white 4xl:text-md">Strat Type:</div>
          <div class="text-nile-blue dark:text-tradewind text-md 4xl:text-lg font-medium">
            {{ stratType }}
          </div>
        </div>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="grid grid-cols-2 flex-shrink-0 w-full gap-x-10 lg:gap-x-20 mt-auto">
        <template v-if="getAccount?.valid && getAlgobotsSubscriptionById?.enabled">
          <AppButton
            size="md"
            type="primary-border-filled"
            class="w-full"
            @click="deleteActivation()"
          >
            Delete
          </AppButton>
          <AppButton
            size="md"
            class="w-full"
            @click="pauseActivation()"
          >
            Pause
          </AppButton>
        </template>

        <template v-if="getAccount?.valid && !getAlgobotsSubscriptionById?.enabled">
          <AppButton
            size="md"
            type="primary-border-filled"
            class="w-full"
            @click="deleteActivation()"
          >
            Delete
          </AppButton>
          <AppButton
            size="md"
            class="w-full"
            @click="reactivateActivation()"
          >
            Reactivate
          </AppButton>
        </template>
      </div>
    </mq-layout>

    <!-- MOBILE VIEW -->
    <mq-layout mq="sm-md" class="flex flex-col w-full -mt-20">
      <div
        class="algobot-detailed-desc__img flex flex-shrink-0 rounded-full mx-auto mb-16 overflow-hidden"
      >
        <img
          v-if="getPerfBotCyclesDataById"
          :src="getBotLogoImg(getPerfBotCyclesDataById)"
          :alt="getPerfBotCyclesDataById.name"
          class="w-full h-full object-cover"
        >
      </div>

      <div class="flex flex-col w-full mb-20">
        <!-- BOT NAME -->
        <AppTruncatedTooltip
          class="text-nile-blue dark:text-white font-medium text-md text-center mb-5"
          :content="getPerfBotCyclesDataById?.name"
        />

        <!-- BOT CREATOR -->
        <AppTruncatedTooltip
          class="text-nile-blue dark:text-let-it-snow text-center mb-5"
          :content="getPerfBotCyclesDataById?.creator"
        />

        <!-- BOT DESCRIPTION -->
        <div
          class="text-base font-medium text-nile-blue dark:text-white text-center cursor-pointer"
          @click="toggleDescription =! toggleDescription"
        >
          {{ expandText({ isOpen: toggleDescription, value: getPerfBotCyclesDataById?.description }) }}
        </div>
      </div>

      <!-- BOT TAGS -->
      <div class="grid grid-cols-3 gap-10 xl:gap-20 mb-20">
        <AppTag
          v-for="(item, index) in getFilteredTags"
          :key="index"
          :data="item"
          size="md"
        />
      </div>

      <div class="grid grid-cols-2 gap-10 mb-20">
        <!-- STATUS -->
        <div class="flex flex-col items-center space-y-4">
          <div class="text-nile-blue dark:text-white">Status:</div>
          <div class="text-nile-blue dark:text-tradewind font-medium">
            {{ getAlgobotsSubscriptionById?.enabled ? 'ACTIVE' : 'PAUSED' }}
          </div>
        </div>

        <!-- TRADE / MONTH -->
        <div class="flex flex-col items-center space-y-4">
          <div class="text-nile-blue dark:text-white">Trade / month:</div>
          <div class="text-nile-blue dark:text-tradewind font-medium">
            <span v-if="getPerfBotCyclesDataById">
              {{ getPerfBotCyclesDataById.lastMonthTrades }}
            </span>
            <span v-else>-</span>
          </div>
        </div>

        <!-- RUNNING DAYS -->
        <div class="flex flex-col items-center space-y-4">
          <span class="text-nile-blue dark:text-white">Running Days:</span>
          <span class="text-nile-blue dark:text-tradewind font-medium">
            {{ getDaysRunning }}
          </span>
        </div>

        <!-- POSITION SIZE -->
        <div class="flex flex-col items-center space-y-4">
          <div class="text-nile-blue dark:text-white">Position Size:</div>
          <div class="flex items-center space-x-10">
            <template v-if="getAlgobotsSubscriptionByBotId?.accountPercent">
              <span class="text-nile-blue dark:text-tradewind font-medium">
                {{ (getAlgobotsSubscriptionByBotId.accountPercent * 100).toFixed(0) + "%" }}
              </span>
              <AppIcon
                v-if="!getAlgobotsSubscriptionByBotId.botRunning || !isBaseAvailable"
                name="edit"
                size="16"
                class="text-nile-blue dark:text-tradewind cursor-pointer"
                @click="openEditPositionSizeModal()"
              />
              <span class="text-nile-blue dark:text-tradewind font-medium" title="This is a theoretical value.">
                {{ loading ? "..." : positionSize.toFixed(2) }}$
              </span>
            </template>
            <template v-else>
              <span class="text-nile-blue dark:text-tradewind font-medium">-</span>
            </template>
          </div>
        </div>

        <!-- ACCOUNT -->
        <div class="flex flex-col items-center space-y-4">
          <div class="text-nile-blue dark:text-white">Account:</div>
          <div class="text-nile-blue dark:text-tradewind font-medium">
            <div v-if="getAccount?.img || getAccount?.name" class="flex items-center space-x-4">
              <img class="w-20 h-20 max-w-20" :src="getAccount.img" :alt="getAccount?.name">
              <AppTruncatedTooltip
                :content="getAccount?.name"
                class="text-nile-blue dark:text-tradewind leading-xs font-medium"
              />
              <AppIcon
                v-if="!getAlgobotsSubscriptionByBotId.botRunning"
                name="edit"
                :size="!is4XL ? '20' : '18'"
                class="text-nile-blue dark:text-tradewind cursor-pointer"
                @click="openEditAccountModal()"
              />
            </div>
            <span v-else>-</span>
          </div>
        </div>

        <!-- PERFS FEES -->
        <div class="flex flex-col items-center space-y-4">
          <div class="text-nile-blue dark:text-white">Perf fees:</div>
          <div v-if="getPerfBotCyclesDataById" class="text-nile-blue dark:text-tradewind font-medium">
            {{ `From ${( getMinFeePercent(getPerfBotCyclesDataById?.perfFees?.percent || 0))}%` }}
          </div>
        </div>

        <!-- MY FEES -->
        <div class="flex flex-col items-center space-y-4">
          <div class="text-nile-blue dark:text-white text-center">My Fees:</div>
          <div class="flex space-x-4 items-center text-nile-blue dark:text-tradewind font-medium">
            <div v-if="getPerfBotCyclesDataById">
              {{ `${(getPerfBotCyclesDataById?.perfFees?.percent) || '0'}%` }}
            </div>

            <!-- STAKING REWARD INFO -->
            <router-link #default="{ navigate }" :to="{ name: routeNames.ubxtStakingReward }" custom>
              <AppIcon
                name="info-circle"
                size="18"
                class="text-lg text-nile-blue dark:text-tradewind"
                @click="navigate()"
              />
            </router-link>
          </div>
        </div>

        <!-- STRAT TYPE -->
        <div v-if="stratType" class="flex flex-col items-center space-y-4">
          <span class="text-nile-blue dark:text-white">Strat Type:</span>
          <span class="text-nile-blue dark:text-tradewind font-medium">
            {{ stratType }}
          </span>
        </div>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="grid grid-cols-2 gap-x-20 flex-shrink-0 w-full">
        <template v-if="getAccount?.valid && getAlgobotsSubscriptionById?.enabled">
          <AppButton size="xlg" type="primary-border-filled" class="w-full" @click="deleteActivation()">
            Delete
          </AppButton>
          <AppButton size="xlg" class="w-full" @click="pauseActivation()">Pause</AppButton>
        </template>

        <template v-if="getAccount?.valid && !getAlgobotsSubscriptionById?.enabled">
          <AppButton size="xlg" type="primary-border-filled" class="w-full" @click="deleteActivation()">
            Delete
          </AppButton>
          <AppButton size="xlg" class="w-full" @click="reactivateActivation()">Reactivate</AppButton>
        </template>
      </div>
    </mq-layout>

    <!-- EDIT POSITION SIZE MODAL -->
    <AppModal v-model="isEditPositionSizeModalOpened" @closed="closeEditPositionSizeModal()">
      <!-- MODAL LOADER -->
      <AppLoader v-if="loading" class="rounded-xlg" />

      <div class="flex flex-col relative">
        <h2 class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-40">
          {{ getPerfBotCyclesDataById?.name }}
        </h2>

        <div class="flex justify-center items-center">
          <h3 class="mr-10 md:text-md text-nile-blue dark:text-let-it-snow text-center font-medium my-10">
            Edit Position Size
          </h3>

          <AppSelect
            :model-value="positionSizeTypeValue"
            :options="positionSizeTypeData"
            :disabled="!positionSizeTypeData.length"
            size="lg"
            style="min-width: 160px;"
            @change="handlePositionSizeTypeValue"
          />
        </div>

        <template v-if="positionSizeTypeValue.value === 'fixed'">
          <div class="flex items-center w-full my-10">
            <AppInputNumber
              v-model="positionSize"
              :disabled="!getAvailableExchangesFiltered.length || isFreeStakers"
              class="w-full"
              size="md"
              toFixed="2"
              :min="0"
              :max="baseAvailable ?? 0"
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
                  @click="positionSize = baseAvailable"
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
              $
            </span>
          </div>
        </template>

        <template v-if="positionSizeTypeValue.value === 'percentage'">
          <div class="flex flex-col w-full relative">
            <AppSlider
              v-if="getAlgobotsSubscriptionByBotId && !getAlgobotsSubscriptionByBotId.botRunning"
              v-model="positionSizeSliderValue"
              min="0"
              max="100"
              class="w-full"
              :disabled="loading || isBaseAvailable"
              @changed="handlePositionSize"
              @input="handlePositionSize"
            />

            <div class="flex items-center space-x-5 mt-20">
              <p class="text-seal-blue dark:text-white-lilac">Next theorical order:</p>
              <p
                :class="isBaseAvailable ? 'text-alexandria' : 'text-seal-blue dark:text-white-lilac'"
              >
                {{ positionSize.toFixed(2) }} $
              </p>
            </div>
          </div>
        </template>

        <div class="flex items-center justify-center w-full mt-20 space-x-20">
          <AppButton
            type="primary-border-filled"
            :disabled="loading"
            @click="closeEditPositionSizeModal()"
          >
            Cancel
          </AppButton>
          <AppButton
            :disabled="loading || isBaseAvailable"
            @click="updatePositionSize()"
          >
            Confirm
          </AppButton>
        </div>
      </div>
    </AppModal>
    <!-- EDIT ACCOUNT MODAL -->
    <AppModal v-model="isEditAccountModalOpened">
      <!-- MODAL LOADER -->
      <AppLoader v-if="loading" class="rounded-xlg" />

      <div class="flex flex-col relative">
        <h2 class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-40">
          Select your wallet
        </h2>

        <h3 class="md:text-md text-nile-blue dark:text-let-it-snow text-center font-medium mb-10">
          Select the API key that the bot will use to trade
        </h3>

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

        <div class="flex items-center justify-center w-full mt-20 space-x-20">
          <AppButton
            type="primary-border-filled"
            :disabled="loading"
            @click="isEditAccountModalOpened = false"
          >
            Cancel
          </AppButton>
          <AppButton
            :disabled="loading"
            @click="updateAccount()"
          >
            Confirm
          </AppButton>
        </div>
      </div>
    </AppModal>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, watch, PropType } from 'vue'
import { routeNames } from '@/router'

import dayjs from 'dayjs'

import { algoBotsService } from '@/services'
import { IExchangeKey } from '@/types'
import { appNotify } from '@/components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'

import { useBots } from '@/global-setup/bots.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useAlgoBotsDetailed } from '@/views/algobots/components/algo-bots-detailed/algo-bots-detailed.setup'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

export default defineComponent({
  name: 'AlgoBotsDetailedActiveInfo',

  props: {
    baseAvailableLoading: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    baseAvailable: {
      type: Number as PropType<number>,
      default: 0
    }
  },

  setup (props) {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL } = useCustomBreakpoints()

    /* USE BOTS SETUP */
    const { getMinFeePercent, fetchAllAndSubscriptedBots } = useBots()

    /* USE ALGO BOTS SETUP */
    const { getAlgobotsSubscriptionById, getPerfBotCyclesDataById, getBotLogoImg } = useAlgoBots()

    /* USE ALGO BOTS DETAILED SETUP */
    const {
      algoBotsDetailedLoading,
      setAlgoBotsDetailedLoading,
      getAvailableExchanges,
      getFilteredTags,
      getAlgobotsSubscriptionByBotId,
      getSubscriptionAuditsData,
      getAccount,
      expandText
    } = useAlgoBotsDetailed()

    // LOADING //
    const loading = ref<boolean>(false)

    const positionSizeTypeData: {value: string; label: string;}[] = [
      { value: 'percentage', label: '% available' },
      { value: 'fixed', label: 'Fixed amount' }
    ]
    const positionSizeTypeValue = ref<{value: string; label: string;}>(positionSizeTypeData[0])

    // GET DAYS RUNNING //
    const getDaysRunning = computed(() => {
      if (getAlgobotsSubscriptionByBotId.value?.createdAt) {
        const exDay = dayjs(new Date()).diff(getAlgobotsSubscriptionByBotId.value.createdAt, 'day')

        return exDay >= 2 ? `${exDay} days` : `${exDay} day`
      } else {
        return '-'
      }
    })

    const isEditPositionSizeModalOpened = ref<boolean>(false)

    const positionSizeSliderValue = ref<number[]>([100])

    const positionSize = ref<number>(0)

    const isEditAccountModalOpened = ref<boolean>(false)

    const exchange: any = reactive({ state: {} })

    const toggleDescription = ref<boolean>(false)

    const isBaseAvailable = computed(() => !props.baseAvailable)

    const tradeAmount = computed(() => {
      if (!getAlgobotsSubscriptionByBotId) return 0

      if (getAlgobotsSubscriptionByBotId.value?.botRunning && getSubscriptionAuditsData.value?.length > 0) {
        if (getSubscriptionAuditsData.value[0].oTrackId?.completed) {
          return getSubscriptionAuditsData.value[0].oTrackId?.completion.cumulQuoteCost
        } else {
          return 0
        }
      } else {
        return (props.baseAvailable * positionSizeSliderValue.value[0]) / 100.0
      }
    })
    // FETCH BASE AVAILABLE  END //

    // HANDLE POSITION SIZE //
    function handlePositionSize () {
      positionSize.value = (props.baseAvailable * positionSizeSliderValue.value[0]) / 100.0
    }

    async function loadData () {
      try {
        loading.value = true

        positionSizeSliderValue.value[0] = getAlgobotsSubscriptionById.value
          ? getAlgobotsSubscriptionById.value.accountPercent * 100
          : 0
      } finally {
        loading.value = false
      }
      // SET MODAL SLIDER AND RESULT VALUES //
      handlePositionSize()
    }

    loadData()

    // OPEN POSITION SIZE MODAL (FETCH BASE AVAILABLE, HANDLE MODAL VALUES) START //
    async function openEditPositionSizeModal () {
      isEditPositionSizeModalOpened.value = true

      // FETCH DATA FOR MODAL //
      await loadData()
    }
    // OPEN POSITION SIZE MODAL (FETCH BASE AVAILABLE, HANDLE MODAL VALUES) END //

    // OPEN POSITION SIZE MODAL (FETCH BASE AVAILABLE, HANDLE MODAL VALUES) START //
    async function closeEditPositionSizeModal () {
      isEditPositionSizeModalOpened.value = false

      loadData()
    }
    // OPEN POSITION SIZE MODAL (FETCH BASE AVAILABLE, HANDLE MODAL VALUES) END //

    // UPDATE POSITION SIZE START //
    async function updatePositionSize () {
      loading.value = true

      const payload: {subscriptionId: string; percentage: number;} = {
        subscriptionId: getAlgobotsSubscriptionByBotId.value ? getAlgobotsSubscriptionByBotId.value.id : '',
        percentage: positionSizeSliderValue.value[0] / 100.0
      }

      try {
        await algoBotsService.updateAccountPercent(payload)
        await fetchAllAndSubscriptedBots()
      } catch (error) {
        appNotify({ type: 'error', message: error?.response?.data?.message || 'Something went wrong' })
      } finally {
        loading.value = false
        isEditPositionSizeModalOpened.value = false
      }
    }
    // UPDATE POSITION SIZE END //

    // GET DEFAULT EXCHANGE //
    function getDefaultExchange () {
      exchange.state = getAccount.value
    }

    // OPEN ACOUNT MODAL () START //
    async function openEditAccountModal () {
      getDefaultExchange()
      isEditAccountModalOpened.value = true
    }
    // OPEN ACOUNT SIZE MODAL () END //

    const getAvailableExchangesFiltered = computed(() => {
      if (getPerfBotCyclesDataById.value?.base === 'AVAX') {
        return getAvailableExchanges.value
      } else {
        const accounts = getAvailableExchanges.value.filter((x) => x.tradingAllowed)
        if (getPerfBotCyclesDataById.value?.base === 'FTT') {
          return accounts.filter((x) => x.exchange !== 'kucoin')
        } else if (getPerfBotCyclesDataById.value?.base === 'BAT' || getPerfBotCyclesDataById.value?.base === 'ETC') {
          return accounts.filter((x) => x.exchange !== 'ftx')
        } else {
          return accounts
        }
      }
    })

    function handlePositionSizeTypeValue (item: {value: string; label: string;}) {
      positionSizeTypeValue.value = item
    }

    // HANDLE ACCOUNT SELECTION //
    async function handleAccountSelection (item: IExchangeKey) {
      loading.value = true
      exchange.state = item

      try {
      } finally {
        loading.value = false
      }
    }

    // UPDATE ACCOUNT START //
    async function updateAccount () {
      loading.value = true

      const payload: {subscriptionId: string; keyId: string;} = {
        subscriptionId: getAlgobotsSubscriptionByBotId.value ? getAlgobotsSubscriptionByBotId.value.id : '',
        keyId: exchange.state.id
      }

      try {
        await algoBotsService.updateAccountKey(payload)
        await fetchAllAndSubscriptedBots()
        await loadData()
      } catch (error) {
        appNotify({ type: 'error', message: error?.response?.data?.message || 'Something went wrong' })
      } finally {
        loading.value = false
        isEditAccountModalOpened.value = false
      }
    }
    // UPDATE POSITION SIZE END //

    // PAUSE BOT //
    async function pauseActivation () {
      const isAllow = await appConfirm({
        title: 'Put The Bot On Hold?',
        body: 'Are you sure you want to pause the bot ? If you have an open position, we will leave it open so you can manage it manually',
        actionsName: ['Cancel', 'Pause']
      })

      if (isAllow && getAlgobotsSubscriptionById.value) {
        setAlgoBotsDetailedLoading(true)
        loading.value = true
        try {
          await algoBotsService.pauseActivation(getAlgobotsSubscriptionById.value.id)
          await fetchAllAndSubscriptedBots()

          appNotify({ type: 'success', message: 'Bot successfully paused' })
        } catch (error) {
          appNotify({ type: 'error', message: error?.response?.data?.message || 'Something went wrong' })
        } finally {
          setAlgoBotsDetailedLoading(false)
          loading.value = false
        }
      } else {
        return false
      }
    }

    // REACTIVATE BOT //
    async function reactivateActivation () {
      const isAllow = await appConfirm({
        title: 'Are you sure you want to activate this bot?',
        actionsName: ['Cancel', 'Activate']
      })

      if (isAllow && getAlgobotsSubscriptionById.value) {
        setAlgoBotsDetailedLoading(true)
        loading.value = true
        try {
          await algoBotsService.resumeActivation({
            botId: getAlgobotsSubscriptionById.value.botId, subId: getAlgobotsSubscriptionById.value.id
          })
          await fetchAllAndSubscriptedBots()

          appNotify({ type: 'success', message: 'Bot successfully activated' })
        } catch (error) {
          appNotify({ type: 'error', message: error?.response?.data?.message || 'Something went wrong' })
        } finally {
          setAlgoBotsDetailedLoading(false)
          loading.value = false
        }
      }
    }

    // DELETE BOT //
    async function deleteActivation () {
      let isAllow = await appConfirm({
        title: 'Delete Your Bot?',
        body: 'Are you sure you want to delete this bot?',
        actionsName: ['Cancel', 'Delete']
      })

      if (isAllow && getPerfBotCyclesDataById.value && getAlgobotsSubscriptionById.value?.botRunning) {
        const perfeeRes: any = await algoBotsService.getCurrentPerformanceFee({ botId: getPerfBotCyclesDataById.value?.id || '', botSubId: getAlgobotsSubscriptionById.value?.id || '' })
        const currentPerfee = perfeeRes?.data?.result || 0
        const perfeesBotDeletionText = `Hey it seems that you have an open position on this bot,
                                        if you delete it now we will leave it open and ${currentPerfee.toFixed(4)}
                                        UBXT will be deducted from your balance to pay for the performance fees
                                        so you can manage it manually`
        const communityBotDeletionText = `Hey it seems that you have an open position on this bot,
                                          if you delete it now we will leave it open so you can manage it manually`
        const confirmText =
        getPerfBotCyclesDataById?.value?.perfFees?.percent ? perfeesBotDeletionText : communityBotDeletionText
        isAllow = await appConfirm({
          title: 'Are you sure?',
          body: confirmText,
          actionsName: ['Cancel', 'Delete']
        })
      }

      if (isAllow && getAlgobotsSubscriptionById.value) {
        setAlgoBotsDetailedLoading(true)
        loading.value = true
        try {
          await algoBotsService.closePerformanceCycle({ botId: getPerfBotCyclesDataById.value?.id || '', botSubId: getAlgobotsSubscriptionById.value?.id || '' })
          await algoBotsService.deleteSubscription({ botId: getPerfBotCyclesDataById.value?.id || '', subId: getAlgobotsSubscriptionById.value?.id || '' })
          await fetchAllAndSubscriptedBots()

          appNotify({ type: 'success', message: 'Bot successfully deleted' })
        } catch (error) {
          appNotify({ type: 'error', message: error?.response?.data?.message || 'Something went wrong' })
        } finally {
          setAlgoBotsDetailedLoading(false)
          loading.value = false
        }
      }
    }

    // WATCH GET ACCOUNT //
    watch(() => getAccount.value, (val) => {
      if (!val) return
      if (!val.valid) {
        appNotify({ type: 'error', message: `API key for ${val.name} account is not valid. Trading is blocked` })
      }
    })

    const displayLeverage = computed(() => {
      // Hide leverage for non future accounts
      const isFutureTrading = getAccount.value?.exchange.toLowerCase() === 'kucoin-future' || getAccount.value?.exchange.toLowerCase() === 'binance-future'
      return getAlgobotsSubscriptionByBotId.value?.accountLeverage && isFutureTrading
    })

    const stratType = computed(() => {
      const isFutureTrading = getAccount.value?.exchange.toLowerCase() === 'kucoin-future' || getAccount.value?.exchange.toLowerCase() === 'binance-future'
      if (!isFutureTrading) {
        return null
      }
      if (getAlgobotsSubscriptionByBotId.value?.stratType === 'LONG') {
        return 'Long'
      } else if (getAlgobotsSubscriptionByBotId.value?.stratType === 'SHORT') {
        return 'Short'
      } else if (getAlgobotsSubscriptionByBotId.value?.stratType === 'LONG_SHORT') {
        return 'Long & Short'
      }
      return null
    })

    return {
      is4XL,
      routeNames,

      getBotLogoImg,
      algoBotsDetailedLoading,
      getPerfBotCyclesDataById,
      getFilteredTags,
      getAlgobotsSubscriptionById,
      getAlgobotsSubscriptionByBotId,
      getMinFeePercent,

      loading,
      positionSizeTypeValue,
      positionSizeTypeData,
      getDaysRunning,
      getAccount,
      getAvailableExchangesFiltered,
      openEditPositionSizeModal,
      closeEditPositionSizeModal,
      isEditPositionSizeModalOpened,
      positionSize,
      tradeAmount,
      isBaseAvailable,
      handlePositionSize,
      updatePositionSize,
      handlePositionSizeTypeValue,
      openEditAccountModal,
      positionSizeSliderValue,
      isEditAccountModalOpened,
      exchange,
      handleAccountSelection,
      updateAccount,
      reactivateActivation,
      pauseActivation,
      deleteActivation,
      expandText,
      toggleDescription,
      displayLeverage,
      stratType
    }
  }
})
</script>

<style lang="scss" scoped>
.algobot-detailed-info {
  @media(min-width: 768px) {
    &__img {
      height: 70px;
      width: 70px;
    }
  }

  @media(min-width: 2500px) {
    &__img {
      height: 100px;
      width: 100px;
    }
  }

  @media(max-width: 767px) {
    &__img {
      height: 40px;
      width: 40px;
    }
  }
}
</style>
