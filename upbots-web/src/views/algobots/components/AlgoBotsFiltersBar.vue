<template>
  <!-- DESKTOP -->
  <mq-layout mq="lg+" class="flex flex-col w-full">
    <div class="flex items-center justify-between space-x-20 cursor-pointer">
      <!-- TITLE -->
      <h2 class="text-heavy-metal-armor dark:text-blair text-md 4xl:text-2xl font-medium">
        All The Bots
      </h2>

      <!-- FILTER PREVIEW -->
      <div
        v-if="!loading"
        class="flex items-center text-nile-blue dark:text-tradewind space-x-10"
        @click="displayFilterBar = !displayFilterBar"
      >
        <AppIcon name="filter" size="24" />

        <span class="text-base font-medium">Filters ({{ getSelectedFilters }})</span>
      </div>
    </div>

    <!-- FILTER BAR -->
    <transition
      enter-active-class="transition transform"
      enter-from-class="w-0 -translate-x-10 opacity-0"
      enter-to-class="translate-x-0 opacity-100 w-auto"
      leave-active-class="transform duration-100 transition"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-10"
    >
      <div v-if="displayFilterBar" class="flex flex-col 2xl:flex-row items-start space-x-20 w-full mt-10">
        <div class="flex flex-col items-center 2xl:flex-row w-full mb-20 2xl:mb-0">
          <!-- INPUT AUTOCOMPLETE -->
          <AppInputAutocomplete
            v-model="searchBot"
            placeholder="Search"
            input-rounded="rounded-full"
            size="xlg"
            :disabled="loading"
            class="algobots-rental-filters__search w-full mb-20 2xl:mb-0 mr-0 2xl:mr-20"
          />

          <div class="flex items-center space-x-12 4xl:space-x-20 w-full">
            <!-- DROPDOWN ALGOBOT STATUS-->
            <div class="algobots-rental-filters__status">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">Bot Status</p>
              <AppSelect
                v-model="statusValue"
                :options="statusData"
                :disabled="loading"
                size="md"
                class="w-full"
                @change="(value) => onFilterChange(value, 'onStatusChange')"
              />
            </div>

            <!-- DROPDOWN STRATEGY -->
            <div class="algobots-rental-filters__strategy">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">Strategy</p>
              <AppSelect
                v-model="strategyValue"
                :options="strategyData"
                :disabled="loading"
                size="md"
                class="w-full"
                @change="(value) => onFilterChange(value, 'onStrategyChange')"
              />
            </div>

            <!-- DROPDOWN EXCHANGES -->
            <div class="algobots-rental-filters__exchanges">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">Exchanges</p>
              <AppSelect
                v-model="exchangesValue"
                :options="exchangesData"
                multiple
                :disabled="loading"
                size="md"
                class="w-full"
                @change="(value) => onFilterChange(value, 'onExchangesChange')"
              />
            </div>

            <!-- DROPDOWN PAIRS -->
            <div class="algobots-rental-filters__pairs">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">Pairs</p>
              <AppSelect
                v-model="pairsValue"
                :options="pairsData"
                multiple
                :disabled="loading"
                size="md"
                class="w-full"
                @change="(value) => onFilterChange(value, 'onPairsChange')"
              />
            </div>

            <!-- DROPDOWN SORTED BY -->
            <div class="algobots-rental-filters__sortedBy">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">Sorted by</p>
              <AppSelect
                v-model="sortedByValue"
                :options="sortedByData"
                :disabled="loading"
                size="md"
                class="w-full"
                @change="(value) => onFilterChange(value, 'onSortedByChange')"
              />
            </div>

            <!-- IS MY BOTS -->
            <div class="algobots-rental-filters__my-bots">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">My Bots</p>

              <AppCheckbox
                v-model="isMyBots"
                type="secondary"
                @change="(value) => onFilterChange(value, 'onMyBots')"
              />
            </div>
          </div>
        </div>

        <!-- RESET FILTERS -->
        <div
          class="flex items-center self-end 2xl:self-center flex-shrink-0 2xl:ml-auto"
          :class="loading ? 'pointer-events-none opacity-50' : 'cursor-pointer'"
          @click="$emit('onResetFilter')"
        >
          <span class="text-nile-blue dark:text-hidden-sea-glass leading-1 ml-4">Clear Filters</span>
        </div>
      </div>
    </transition>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md" class="flex flex-col w-full mb-20">
    <!-- INPUT AUTOCOMPLETE -->
    <div class="relative w-full mb-20">
      <AppInputAutocomplete
        v-model="searchBot"
        placeholder="Search"
        :disabled="loading"
        input-rounded="rounded-full"
        size="xlg"
      />
    </div>

    <AppExpand v-model="expandValue" class="relative" content-classes="flex flex-col">
      <template #preview>
        <!-- LOADER -->
        <AppLoader v-if="loading" size="xs" class="rounded-xlg" />

        <div class="flex items-center w-full text-nile-blue dark:text-tradewind">
          <AppIcon name="filter" size="24" />
          <span class="text-base font-medium ml-5">
            Filters ({{ getSelectedFilters }})
          </span>
        </div>
      </template>

      <template #content>
        <div class="grid grid-cols-2 gap-12 w-full">
          <!-- DROPDOWN ALGOBOT STATUS-->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Bot Status</p>
            <AppSelect
              v-model="statusValue"
              :options="statusData"
              :disabled="loading"
              @change="(value) => onFilterChange(value, 'onStatusChange')"
            />
          </div>

          <!-- DROPDOWN STRATEGY -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Strategy:</p>
            <AppSelect
              v-model="strategyValue"
              :options="strategyData"
              :disabled="loading"
              @change="(value) => onFilterChange(value, 'onStrategyChange')"
            />
          </div>

          <!-- DROPDOWN EXCHANGES -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Exchanges:</p>
            <AppSelect
              v-model="exchangesValue"
              :options="exchangesData"
              :disabled="loading"
              multiple
              @change="(value) => onFilterChange(value, 'onExchangesChange')"
            />
          </div>

          <!-- DROPDOWN PAIRS -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Pairs:</p>
            <AppSelect
              v-model="pairsValue"
              :options="pairsData"
              :disabled="loading"
              multiple
              @change="(value) => onFilterChange(value, 'onPairsChange')"
            />
          </div>

          <!-- DROPDOWN SORTED BY -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Sorted by:</p>
            <AppSelect
              v-model="sortedByValue"
              :options="sortedByData"
              :disabled="loading"
              @change="(value) => onFilterChange(value, 'onSortedByChange')"
            />
          </div>

          <!-- IS MY BOTS -->
          <div class="flex flex-col">
            <p class="text-chicory-flower dark:text-blair mb-5">My Bots:</p>

            <AppCheckbox
              v-model="isMyBots"
              type="secondary"
              class="my-auto"
              @change="(value) => onFilterChange(value, 'onMyBots')"
            />
          </div>
        </div>

        <!-- RESET FILTERS -->
        <div
          class="flex items-center justify-center flex-shrink-0 mt-20"
          :class="loading && 'pointer-events-none opacity-50'"
          @click="$emit('onResetFilter')"
        >
          <AppIcon
            name="cross-medium"
            size="10"
            class="text-nile-blue dark:text-hidden-sea-glass"
          />
          <span class="text-nile-blue dark:text-hidden-sea-glass leading-1 ml-4">
            Reset All Filters
          </span>
        </div>
      </template>
    </AppExpand>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, watch, PropType, computed, reactive, toRefs } from 'vue'

import { TDropdownOption } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'

import { botTags } from '@/components/algobots/data'

type TFilterChange = 'onSearchChange' | 'onStatusChange' | 'onStrategyChange' | 'onExchangesChange' | 'onPairsChange' | 'onSortedByChange' | 'onMyBots'

export default defineComponent({
  name: 'AlgoBotsFiltersBar',

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: [
    'onSearchChange',
    'onStatusChange',
    'onStrategyChange',
    'onExchangesChange',
    'onPairsChange',
    'onSortedByChange',
    'onResetFilter',
    'onMyBots'
  ],

  setup (_, { emit }) {
    /* USE GLOBAL | USE BOTS SETUP */
    const { userSettings } = useGlobal()
    const { bots } = useBots()

    const state = reactive({
      searchBot: '' as string,
      displayFilterBar: false as boolean,
      expandValue: false as boolean
    })

    const filtersCount: string[] = ['strategy', 'exchanges', 'limit', 'sortedBy', 'status', 'myBots']

    const statusData: TDropdownOption[] = [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Paused', value: 'paused' }
    ]

    const strategyData: TDropdownOption[] = [
      { label: 'All', value: 'all' },
      { label: 'Long', value: 'long' },
      { label: 'Short', value: 'short' },
      { label: 'Long & Short', value: 'long_short' }
    ]

    const pairsData = computed((): TDropdownOption[] => {
      return bots.value.map(bot => {
        return { label: `${bot.base}/${bot.quote}`, value: `${bot.base}${bot.quote}` }
      })
    })

    const sortedByData: TDropdownOption[] = [
      { label: 'Total perf %', value: 'performance' },
      { label: '6m perf %', value: 'performance_6m' },
      { label: '3m perf %', value: 'performance_3m' },
      { label: 'Creation date', value: 'date' }
    ]

    const exchangesData = computed((): TDropdownOption[] => {
      const exchanges: string[] = []

      botTags.forEach((tag) => tag.exchangesType.forEach((type) => {
        if (!exchanges.includes(type)) { exchanges.push(type) }
      }))

      return exchanges.map((exchange) => { return { label: exchange, value: exchange } })
    })

    const statusValue = computed({
      get () { return userSettings.value.algobotFilters.status },
      set (value: TDropdownOption) { return value }
    })
    const strategyValue = computed({
      get () { return userSettings.value.algobotFilters.strategy },
      set (value: TDropdownOption) { return value }
    })
    const exchangesValue = computed({
      get () { return userSettings.value.algobotFilters.exchanges },
      set (value: string[]) { return value }
    })
    const pairsValue = computed({
      get () { return userSettings.value.algobotFilters.pairs },
      set (value: string[]) { return value }
    })
    const sortedByValue = computed({
      get () { return userSettings.value.algobotFilters.sortedByValue },
      set (value: TDropdownOption) { return value }
    })
    const isMyBots = computed({
      get () { return userSettings.value.algobotFilters.isMyBots },
      set (value: boolean) { return value }
    })

    const getSelectedFilters = computed((): number => {
      let countSelected = 0

      const filtersData = {
        status: statusValue.value,
        strategy: strategyValue.value,
        exchanges: exchangesValue.value,
        pairs: pairsValue.value,
        sorted: sortedByValue.value,
        isMyBots: { label: `${isMyBots.value ? 'my-bots' : 'all'}`, value: `${isMyBots.value ? 'my-bots' : 'all'}` }
      }

      Object.entries(filtersData).map(([, value]) => {
        if (Array.isArray(value)) {
          if (value.length) countSelected += 1
        } else {
          if (value.value !== 'all') countSelected += 1
        }
      })

      return countSelected
    })

    function onFilterChange (val: TDropdownOption | boolean, emitName: TFilterChange): void {
      emit(emitName, val)
    }

    watch(() => state.searchBot, () => {
      emit('onSearchChange', state.searchBot)
    }, { immediate: true, deep: true })

    return {
      ...toRefs(state),
      isMyBots,
      filtersCount,
      statusValue,
      statusData,
      strategyValue,
      strategyData,
      exchangesValue,
      exchangesData,
      pairsValue,
      pairsData,
      sortedByValue,
      sortedByData,
      getSelectedFilters,
      onFilterChange
    }
  }
})
</script>

<style lang="scss" scoped>
.algobots-rental-filters {
  @media(min-width: 2500px) {
    &__status,
    &__strategy,
    &__pairs,
    &__exchanges,
    &__sortedBy,
    &__my-bots {
      @apply grid gap-x-10 items-center;
      grid-template-columns: 1fr 2.4fr;
      width: 280px;
    }

    &__search {
      max-width: 340px;
    }
  }

  @media(min-width: 1600px) and (max-width: 2499px) {
    &__status,
    &__strategy,
    &__exchanges,
    &__pairs,
    &__sortedBy,
    &__my-bots {
      @apply flex items-center space-x-12;
    }

    &__status {
      min-width: 180px;
    }

    &__strategy {
      min-width: 180px;
    }

    &__exchanges {
      min-width: 240px;
    }

    &__pairs {
      min-width: 180px;
    }

    &__sortedBy {
      min-width: 220px;
    }

    &__search {
      min-width: 200px;
      max-width: 200px;
    }

    &__my-bots {
      min-width: 105px;
      max-width: 105px;
    }
  }

  @media(max-width: 1599px) {
    &__status,
    &__strategy,
    &__exchanges,
    &__pairs,
    &__sortedBy,
    &__my-bots {
      @apply flex flex-col w-full space-x-0 space-y-5;
    }

    &__search {
      max-width: 200px;
    }

    &__my-bots {
      min-width: 65px;
      max-width: 65px;
    }
  }

  @media(max-width: 767px) {
    @apply -mt-40;
  }
}
</style>
