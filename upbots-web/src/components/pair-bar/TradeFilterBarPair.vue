<template>
  <!-- PAIR -->
  <div class="flex flex-col md:flex-row md:items-center mb-10 md:mb-0 md:mr-20">
    <!-- (TABLET - DESKTOP VIEW) -->
    <mq-layout mq="lg+" class="flex">
      <p v-if="displayLabel" class="text-nile-blue dark:text-blair font-medium md:font-base 4xl:text-md mr-10">Pair:</p>

      <AppFlyout
        ref="appFlyoutFilters"
        placement="bottom-start"
        :offset="16"
        :open-delay="0"
        :close-delay="0"
        :disabled="!Object.keys(defaultPair).length || priceSettingsLoading"
        class="flex"
        popper-classes="bg-white dark:bg-primary-dark-radial shadow dark:shadow-100 rounded-xl"
      >
        <!-- PREVIEW -->
        <template #activator="{ isVisible }">
          <slot>
            <div class="flex items-center space-x-10 cursor-pointer">
              <AppTextLoader
                v-if="priceSettingsLoading"
                text=""
                class="text-beguiling-blue dark:text-cotton-ball-second"
              />
              <span v-else class="text-beguiling-blue dark:text-cotton-ball-second font-semibold">
                {{ defaultPair.name ? defaultPair.name : binanceBtcUsdt.name }}
              </span>

              <AppIcon
                v-if="defaultPair.name"
                name="chevron-thin"
                size="14"
                class="transform text-beguiling-blue dark:text-cotton-ball-second transition duration-300"
                :class="isVisible && 'rotate-180'"
              />
            </div>
          </slot>
        </template>

        <!-- CONTENT -->
        <template #popper>
          <slot name="content">
            <div
              class="flex flex-col items-center space-y-20 p-20 overflow-y-auto custom-scrollbar"
              style="width: 500px"
            >
              <TradeFilterBarPairFilters
                :is-favourite="isFavourite"
                @favourite-pair="favouritePair"
                @change="handlePairFilters"
                @input="handleInputFilter"
              />

              <div
                v-if="toDisplay.length"
                class="flex flex-col w-full overflow-y-auto custom-scrollbar"
                style="max-height: 200px"
              >
                <!-- LABELS -->
                <TradeFilterBarPairLabels />

                <!-- ITEMS -->
                <TradeFilterBarPairItems :data="toDisplay" @on-change="handlePairChange" />
              </div>

              <!-- NO DATA STATE -->
              <div v-else class="py-40">
                <AppNoData
                  title="No data available"
                  class="text-xl font-semibold text-chicory-flower dark:text-blair"
                />
              </div>
            </div>
          </slot>
        </template>
      </AppFlyout>
    </mq-layout>

    <!-- (MOBILE VIEW) -->
    <mq-layout mq="sm-md" class="flex flex-col w-full">
      <p v-if="displayLabel" class="text-nile-blue dark:text-blair font-medium mb-8">Pair</p>

      <AppExpand
        v-model="expandValue"
        class="relative w-full"
        wrapper-padding="px-20 py-8"
        content-classes="flex flex-col"
        background="bg-emptiness dark:bg-black dark:bg-opacity-20"
        rounded="rounded-sm"
        :disabled="!Object.keys(defaultPair).length || priceSettingsLoading"
      >
        <template #preview>
          <div class="flex items-center w-full">
            <AppTextLoader
              v-if="priceSettingsLoading"
              text=""
              class="text-sm text-beguiling-blue dark:text-cotton-ball-second"
            />
            <span v-else class="text-beguiling-blue dark:text-cotton-ball-second font-semibold">
              {{ defaultPair.name ? defaultPair.name : binanceBtcUsdt.name }}
            </span>
          </div>
        </template>

        <template v-if="Object.keys(defaultPair).length || priceSettingsLoading" #content>
          <div class="flex flex-col items-center space-y-20 overflow-y-auto w-full custom-scrollbar">
            <TradeFilterBarPairFilters
              :is-favourite="isFavourite"
              @favourite-pair="favouritePair"
              @change="handlePairFilters"
              @input="handleInputFilter"
            />

            <div
              v-if="toDisplay.length"
              class="flex flex-col w-full overflow-y-auto custom-scrollbar"
              style="max-height: 200px"
            >
              <!-- LABELS -->
              <TradeFilterBarPairLabels />

              <!-- ITEMS -->
              <TradeFilterBarPairItems :data="toDisplay" @on-hide="expandValue = false" />
            </div>

            <!-- NO DATA STATE -->
            <div v-else class="py-40">
              <AppNoData
                title="No data available"
                class="text-xl font-semibold text-chicory-flower dark:text-blair"
              />
            </div>
          </div>
        </template>
      </AppExpand>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, PropType, provide, toRefs } from 'vue'
import { localStorageService } from '@/services'

import { IPairFilter, ITradingSettingsPair, IPairItem } from '@/views/trade/trade-types'

import { useTrade } from '@/views/trade/trade-composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

import TradeFilterBarPairFilters from './TradeFilterBarPairFilters.vue'
import TradeFilterBarPairLabels from './TradeFilterBarPairLabels.vue'
import TradeFilterBarPairItems from './TradeFilterBarPairItems.vue'

export default defineComponent({
  name: 'TradeFilterBarPair',

  components: { TradeFilterBarPairFilters, TradeFilterBarPairLabels, TradeFilterBarPairItems },

  props: {
    displayLabel: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    showLastPrice: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    showChange: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },

  emits: ['on-change'],

  setup (props, { emit }) {
    /* GET PROPS */
    const { showLastPrice, showChange } = toRefs(props)

    /* PROVIDE VALUES */
    provide('showLastPrice', showLastPrice)
    provide('showChange', showChange)

    /* USE GLOBAL SETUP */
    const { priceSettingsLoading, defaultPair, availablePairs } = useGlobal()

    /* USE TRADE SETUP */
    const { priceSummary, binanceBtcUsdt } = useTrade()

    /* DOM ELEMENTS */
    const appFlyoutFilters = ref()

    const expandValue = ref<boolean>(false)

    /* FILTERS START */
    const isFavourite = ref<boolean>(false)
    const currentFilter = reactive({
      data: {} as IPairFilter
    })
    const inputFilter = ref<string>('')

    function handlePairFilters (obj: IPairItem): void {
      currentFilter.data = obj
      isFavourite.value = false
      inputFilter.value = ''
    }
    function handleInputFilter (value: string): void {
      currentFilter.data = {}
      isFavourite.value = false
      inputFilter.value = value
    }
    function favouritePair (value: boolean): void {
      currentFilter.data = {}
      isFavourite.value = value
      inputFilter.value = ''
      localStorageService.setItem('isFavouritePairs', value.toString())
    }

    const favouriteFiltered = computed((): ITradingSettingsPair[] => {
      if (isFavourite.value) return availablePairs.value && availablePairs.value.filter((i) => i.isFavourite)
      return availablePairs.value
    })

    const dropdownFiltered = computed((): ITradingSettingsPair[] => {
      if (currentFilter.data && currentFilter.data.headerLabel) {
        return favouriteFiltered.value
      } else if (currentFilter.data && currentFilter.data.value) {
        return availablePairs.value && availablePairs.value.filter((i) =>
          i.quoteCurrency === currentFilter.data.value)
      } else {
        return favouriteFiltered.value
      }
    })

    const toDisplay = computed((): ITradingSettingsPair[] => {
      const filterValue = inputFilter.value.trim().toLowerCase()

      if (!filterValue.length) return dropdownFiltered.value

      return dropdownFiltered.value && dropdownFiltered.value.filter((i) => {
        return i.name ? i.name.toLowerCase().indexOf(filterValue) > -1 : ''
      })
    })
    // FILTERS END //

    function setDefaultFavouritesPairs (): void {
      const isFavouritePairs = localStorageService.getItem('isFavouritePairs') as string

      if (isFavouritePairs?.toString() === 'true') {
        isFavourite.value = true
      } else {
        isFavourite.value = false
      }
    }

    function handlePairChange (): void {
      appFlyoutFilters.value.handleHidePopper(null, false)
      emit('on-change')
    }

    function initData (): void {
      setDefaultFavouritesPairs()
    }
    initData()

    return {
      priceSettingsLoading,
      defaultPair,
      priceSummary,
      toDisplay,
      appFlyoutFilters,
      isFavourite,
      currentFilter,
      binanceBtcUsdt,
      expandValue,

      handlePairFilters,
      handleInputFilter,
      favouritePair,
      setDefaultFavouritesPairs,
      handlePairChange
    }
  }
})
</script>
