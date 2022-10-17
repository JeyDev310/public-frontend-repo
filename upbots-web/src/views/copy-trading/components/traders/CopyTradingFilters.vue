<template>
  <!-- DESKTOP -->
  <mq-layout mq="lg+" class="flex flex-col w-full mb-30">
    <div class="flex items-center justify-between space-x-20 cursor-pointer">
      <!-- TITLE -->
      <h2 class="text-heavy-metal-armor dark:text-blair text-md 4xl:text-2xl font-medium mb-20">
        Our Certified Copy Traders
      </h2>

      <!-- TOGGLE OPEN FILTERS BAR -->
      <div
        v-if="!loading"
        class="flex items-center text-nile-blue dark:text-tradewind space-x-10"
        @click="displayFilterBar = !displayFilterBar"
      >
        <AppIcon name="filter" size="24" />
        <span class="text-base font-medium">Filters ({{ getSelectedFilters }})</span>
      </div>
    </div>

    <!-- FILTERS -->
    <transition
      enter-active-class="transition transform"
      enter-from-class="w-0 -translate-x-10 opacity-0"
      enter-to-class="translate-x-0 opacity-100 w-auto"
      leave-active-class="transform duration-100 transition"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-10"
    >
      <div v-if="displayFilterBar" class="flex flex-col 2xl:flex-row items-start space-x-20 w-full">
        <div class="flex flex-col items-center 2xl:flex-row w-full mb-20 2xl:mb-0">
          <!-- INPUT -->
          <AppInputAutocomplete
            v-model="search"
            placeholder="Search"
            input-rounded="rounded-full"
            size="xlg"
            :disabled="loading"
            class="copybot-traders-filters__search w-full mb-20 2xl:mb-0 mr-0 2xl:mr-20"
            @input="(e: any) => onFilterChange(e.target.value, 'search')"
          />

          <div class="flex items-center space-x-12 4xl:space-x-20 w-full">
            <!-- STATUS -->
            <div class="copybot-traders-filters__status">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">Bot Status</p>
              <AppSelect
                v-model="status"
                :options="statusOptions"
                :disabled="loading"
                size="md"
                class="w-full"
                @change="(value: TDropdownOption) => onFilterChange(value, 'status')"
              />
            </div>

            <!-- STRATEGY -->
            <div class="copybot-traders-filters__strategy">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">Strategy</p>
              <AppSelect
                v-model="strategy"
                :options="strategyOptions"
                :disabled="loading"
                size="md"
                class="w-full"
                @change="(value: TDropdownOption) => onFilterChange(value, 'strategy')"
              />
            </div>

            <!-- EXCHANGES -->
            <div class="copybot-traders-filters__exchanges">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">Exchanges</p>
              <AppSelect
                v-model="exchanges"
                :options="exchangesOptions"
                multiple
                :disabled="loading"
                size="md"
                class="w-full"
                @change="(value: TDropdownOption) => onFilterChange(value, 'exchanges')"
              />
            </div>

            <!-- PAIRS -->
            <div class="copybot-traders-filters__pairs">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">Pairs</p>
              <AppSelect
                v-model="pairs"
                :options="pairsOptions"
                multiple
                :disabled="loading"
                size="md"
                class="w-full"
                @change="(value: TDropdownOption) => onFilterChange(value, 'pairs')"
              />
            </div>

            <!-- SORTED BY -->
            <div class="copybot-traders-filters__sortedby">
              <p class="flex flex-shrink-0 text-chicory-flower dark:text-blair">Sorted by</p>
              <AppSelect
                v-model="sortedBy"
                :options="sortedByOptions"
                :disabled="loading"
                size="md"
                class="w-full"
                @change="(value: TDropdownOption) => onFilterChange(value, 'sortedBy')"
              />
            </div>
          </div>
        </div>

        <!-- RESET FILTERS -->
        <div
          class="flex items-center self-end 2xl:self-center flex-shrink-0 2xl:ml-auto"
          :class="loading ? 'pointer-events-none opacity-50' : 'cursor-pointer'"
          @click="clearTradersFilters"
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
        v-model="search"
        placeholder="Search"
        :disabled="loading"
        input-rounded="rounded-full"
        size="xlg"
        @input="(e: any) => onFilterChange(e.target.value, 'search')"
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
          <!-- STATUS-->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Bot Status</p>
            <AppSelect
              v-model="status"
              :options="statusOptions"
              :disabled="loading"
              @change="(value: TDropdownOption) => onFilterChange(value, 'status')"
            />
          </div>

          <!-- STRATEGY -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Strategy:</p>
            <AppSelect
              v-model="strategy"
              :options="strategyOptions"
              :disabled="loading"
              @change="(value: TDropdownOption) => onFilterChange(value, 'strategy')"
            />
          </div>

          <!-- EXCHANGES -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Exchanges:</p>
            <AppSelect
              v-model="exchanges"
              :options="exchangesOptions"
              :disabled="loading"
              multiple
              @change="(value: TDropdownOption) => onFilterChange(value, 'exchanges')"
            />
          </div>

          <!-- PAIRS -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Pairs:</p>
            <AppSelect
              v-model="pairs"
              :options="pairsOptions"
              :disabled="loading"
              multiple
              @change="(value: TDropdownOption) => onFilterChange(value, 'pairs')"
            />
          </div>

          <!-- SORTED BY -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Sorted by:</p>
            <AppSelect
              v-model="sortedBy"
              :options="sortedByOptions"
              :disabled="loading"
              @change="(value: TDropdownOption) => onFilterChange(value, 'sortedBy')"
            />
          </div>
        </div>

        <!-- RESET FILTERS -->
        <div
          class="flex items-center justify-center flex-shrink-0 mt-20"
          :class="loading && 'pointer-events-none opacity-50'"
          @click="clearTradersFilters"
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
import { defineComponent, PropType, computed, reactive, toRefs } from 'vue'

import { TDropdownOption } from '@/types'
import { ITradersFilters, TTradersFiltersKey } from '../../copy-trading.types'

import { useCopyTrading } from '../../copy-trading.composition.setup'

export default defineComponent({
  name: 'CopyTradingFilters',

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup () {
    /* USE COPY TRADING SETUP */
    const {
      tradersFilters,
      getCopyBots,
      setTradersFilters,
      clearTradersFilters
    } = useCopyTrading()

    /* STATE */
    const state = reactive({
      displayFilterBar: false as boolean,
      expandValue: false as boolean
    })

    const filtersCount: string[] = [
      'search',
      'strategy',
      'exchanges',
      'limit',
      'sortedBy',
      'status'
    ]

    const statusOptions: TDropdownOption[] = [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Paused', value: 'paused' }
    ]

    const strategyOptions: TDropdownOption[] = [
      { label: 'All', value: 'all' },
      { label: 'Long', value: 'long' },
      { label: 'Short', value: 'short' },
      { label: 'Long & Short', value: 'long_short' }
    ]

    const pairsOptions = computed((): TDropdownOption[] => {
      return getCopyBots.value.map(bot => {
        return { label: `${bot.base}/${bot.quote}`, value: `${bot.base}${bot.quote}` }
      })
    })

    const sortedByOptions: TDropdownOption[] = [
      { label: 'Total perf %', value: 'performance' },
      { label: '6m perf %', value: 'performance_6m' },
      { label: '3m perf %', value: 'performance_3m' },
      { label: 'Creation date', value: 'date' }
    ]

    const exchangesOptions = computed((): TDropdownOption[] => {
      const exchanges: string[] = []

      getCopyBots.value.forEach((tag) => tag.exchangesType.forEach((type) => {
        if (!exchanges.includes(type)) { exchanges.push(type) }
      }))

      return exchanges.map((exchange) => { return { label: exchange, value: exchange } })
    })

    const search = computed({
      get () { return tradersFilters.value.search },
      set (value: string) { return value }
    })
    const status = computed({
      get () { return tradersFilters.value.status },
      set (value: TDropdownOption) { return value }
    })
    const strategy = computed({
      get () { return tradersFilters.value.strategy },
      set (value: TDropdownOption) { return value }
    })
    const exchanges = computed({
      get () { return tradersFilters.value.exchanges },
      set (value: string[]) { return value }
    })
    const pairs = computed({
      get () { return tradersFilters.value.pairs },
      set (value: string[]) { return value }
    })
    const sortedBy = computed({
      get () { return tradersFilters.value.sortedBy },
      set (value: TDropdownOption) { return value }
    })

    const getSelectedFilters = computed((): number => {
      let countSelected = 0

      const filtersData: ITradersFilters = {
        search: search.value,
        status: status.value,
        strategy: strategy.value,
        exchanges: exchanges.value,
        pairs: pairs.value,
        sortedBy: sortedBy.value
      }

      Object.entries(filtersData).map(([, value]) => {
        if (Array.isArray(value)) {
          if (value.length) countSelected += 1
        } else {
          if (value.value) {
            if (value.value !== 'all') countSelected += 1
          } else {
            if (value) countSelected += 1
          }
        }
      })

      return countSelected
    })

    function onFilterChange (value: TDropdownOption, type: TTradersFiltersKey): void {
      if (type === 'exchanges' || type === 'pairs') {
        const pairs = tradersFilters.value[type]
        const indexOfVal = pairs.indexOf(value.value.toString())
        if (indexOfVal > -1) {
          pairs.splice(indexOfVal, 1)
          setTradersFilters(pairs, type)
        } else {
          setTradersFilters([...pairs, value.value.toString()], type)
        }
      } else {
        setTradersFilters(value, type)
      }
    }

    return {
      ...toRefs(state),
      search,
      filtersCount,
      status,
      statusOptions,
      strategy,
      strategyOptions,
      exchanges,
      exchangesOptions,
      pairs,
      pairsOptions,
      sortedBy,
      sortedByOptions,
      getSelectedFilters,
      onFilterChange,
      clearTradersFilters
    }
  }
})
</script>

<style lang="scss" scoped>
.copybot-traders-filters {
  @media(min-width: 2500px) {
    &__status,
    &__strategy,
    &__pairs,
    &__exchanges,
    &__sortedby {
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
    &__sortedby {
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

    &__sortedby {
      min-width: 220px;
    }

    &__search {
      min-width: 200px;
      max-width: 200px;
    }
  }

  @media(max-width: 1599px) {
    &__status,
    &__strategy,
    &__exchanges,
    &__pairs,
    &__sortedby {
      @apply flex flex-col w-full space-x-0 space-y-5;
    }

    &__search {
      max-width: 200px;
    }
  }

  @media(max-width: 767px) {
    @apply -mt-40;
  }
}
</style>
