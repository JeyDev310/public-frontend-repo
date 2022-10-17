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
        :disabled="!Object.keys(myBotPair).length || myBotGlobalLoading"
        class="flex"
        popper-classes="bg-white dark:bg-primary-dark-radial shadow dark:shadow-100 rounded-xl"
      >
        <!-- PREVIEW -->
        <template #activator="{ isVisible }">
          <slot>
            <div class="flex items-center space-x-10 cursor-pointer">
              <AppTextLoader
                v-if="myBotGlobalLoading"
                text=""
                class="text-beguiling-blue dark:text-cotton-ball-second"
              />
              <span v-else class="text-beguiling-blue dark:text-cotton-ball-second font-semibold">
                {{ myBotPair?.name || 'N/A' }}
              </span>

              <AppIcon
                v-if="Object.keys(myBotPair).length && !myBotGlobalLoading"
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
              <MyBotPairFilters
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
                <MyBotPairLabels />

                <!-- ITEMS -->
                <MyBotPairItems :data="toDisplay" @on-change="handlePairChange" />
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
        :disabled="!Object.keys(myBotPair).length || myBotGlobalLoading"
      >
        <template #preview>
          <div class="flex items-center w-full">
            <AppTextLoader
              v-if="myBotGlobalLoading"
              text=""
              class="text-sm text-beguiling-blue dark:text-cotton-ball-second"
            />
            <span v-else class="text-beguiling-blue dark:text-cotton-ball-second font-semibold">
              {{ myBotPair?.name || 'N/A' }}
            </span>
          </div>
        </template>

        <template v-if="Object.keys(myBotPair).length || myBotGlobalLoading" #content>
          <div class="flex flex-col items-center space-y-20 overflow-y-auto w-full custom-scrollbar">
            <MyBotPairFilters
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
              <MyBotPairLabels />

              <!-- ITEMS -->
              <MyBotPairItems :data="toDisplay" @on-hide="expandValue = false" />
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
import { computed, defineComponent, reactive, ref, PropType, onMounted } from 'vue'

import { localStorageService } from '@/services'
import { IPairFilter, ITradingSettingsPair, IPairItem } from '@/views/trade/trade-types'

import { useCreateMyBot } from '@/views/create-my-bot/create-my-bot.setup'

import MyBotPairFilters from './MyBotPairFilters.vue'
import MyBotPairLabels from './MyBotPairLabels.vue'
import MyBotPairItems from './MyBoPairItems.vue'

export default defineComponent({
  name: 'MyBotPair',

  components: { MyBotPairFilters, MyBotPairLabels, MyBotPairItems },

  props: {
    displayLabel: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },

  emits: ['on-change'],

  setup (_, { emit }) {
    const { myBotPair, myBotPriceSummary, myBotAvailablePairs, myBotGlobalLoading } = useCreateMyBot()

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
      if (!myBotAvailablePairs.value.length) return []

      if (isFavourite.value) return myBotAvailablePairs.value.filter((i) => i.isFavourite)
      return myBotAvailablePairs.value
    })

    const dropdownFiltered = computed((): ITradingSettingsPair[] => {
      if (currentFilter.data && currentFilter.data.headerLabel) {
        return favouriteFiltered.value
      } else if (currentFilter.data && currentFilter.data.value) {
        if (!myBotAvailablePairs.value.length) return []

        return myBotAvailablePairs.value.filter((i) => i.quoteCurrency === currentFilter.data.value)
      } else {
        return favouriteFiltered.value
      }
    })

    const toDisplay = computed((): ITradingSettingsPair[] => {
      if (!Object.keys(myBotPair).length || !Object.keys(myBotPriceSummary).length) return []

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

    onMounted(() => { initData() })

    return {
      myBotPair,
      toDisplay,
      appFlyoutFilters,
      isFavourite,
      currentFilter,
      expandValue,
      myBotGlobalLoading,
      handlePairFilters,
      handleInputFilter,
      favouritePair,
      setDefaultFavouritesPairs,
      handlePairChange
    }
  }
})
</script>
