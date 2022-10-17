<template>
  <div class="w-full">
    <div class="flex flex-col w-full space-y-10">
      <div class="flex items-center justify-between w-full space-x-20">
        <!-- FAVOURITE -->
        <div class="relative cursor-pointer" @click="toggleFavouritePair()">
          <AppIcon
            name="star"
            size="14"
            :class="isFavourite ? 'text-deep-aquamarine' : 'text-beguiling-blue dark:text-blair'"
          />
        </div>

        <!-- BTC -->
        <div class="flex cursor-pointer" @click="handleBTCFilter()">
          <span
            class="font-semibold uppercase"
            :class="toggleBTCValue ? 'text-deep-aquamarine' : 'text-beguiling-blue dark:text-blair'"
          >
            BTC
          </span>
        </div>

        <!-- SEARCH (MOBILE) -->
        <mq-layout mq="sm-md" class="w-full">
          <AppInputAutocomplete
            v-model="search"
            placeholder="Search"
            input-rounded="rounded-full"
            size="lg"
            class=" w-full"
            @input="(e) => handleInputFilter(e.target.value)"
          />
        </mq-layout>

        <!-- ALTS & STABLE COINS (TABLET - DESKTOP) -->
        <mq-layout mq="lg+" class="flex items-center space-x-20">
          <!-- ALTS -->
          <AppSelect
            :model-value="alts"
            :options="filtersDefault.alts"
            size="xs"
            style="min-width: 40px;"
            @change="(value) => handlePairFilters(value, 'alts')"
          >
            <template #selection="{ value, hasInitialValue }">
              <template v-if="hasInitialValue"> <p>{{ value.label }}</p> </template>
              <template v-else>Select your account</template>
            </template>

            <template #options="{ item }"> <p>{{ item.label }}</p> </template>
          </AppSelect>

          <!-- STABLE COINS -->
          <AppSelect
            :model-value="stableCoins"
            :options="filtersDefault.stableCoins"
            size="xs"
            style="min-width: 40px;"
            @change="(value) => handlePairFilters(value, 'stableCoins')"
          >
            <template #selection="{ value, hasInitialValue }">
              <template v-if="hasInitialValue"> <p>{{ value.label }}</p> </template>
              <template v-else>Select your account</template>
            </template>

            <template #options="{ item }"> <p>{{ item.label }}</p> </template>
          </AppSelect>
        </mq-layout>
      </div>

      <!-- SEARCH (TABLET - DESKTOP) -->
      <mq-layout mq="lg+" class="w-full">
        <AppInputAutocomplete
          v-model="search"
          placeholder="Search"
          input-rounded="rounded-full"
          size="lg"
          class=" w-full"
          @input="(e) => handleInputFilter(e.target.value)"
        />
      </mq-layout>

      <!-- ALTS & STABLE COINS (MOBILE) -->
      <mq-layout mq="sm-md" class="grid grid-cols-2 gap-x-20">
        <!-- ALTS -->
        <AppSelect
          :model-value="alts"
          :options="filtersDefault.alts"
          size="md"
          style="min-width: 40px;"
          @change="(value) => handlePairFilters(value, 'alts')"
        >
          <template #selection="{ value, hasInitialValue }">
            <template v-if="hasInitialValue"> <p>{{ value.label }}</p> </template>
            <template v-else>Select your account</template>
          </template>

          <template #options="{ item }"> <p>{{ item.label }}</p> </template>
        </AppSelect>

        <!-- STABLE COINS -->
        <AppSelect
          :model-value="stableCoins"
          :options="filtersDefault.stableCoins"
          size="md"
          style="min-width: 40px;"
          @change="(value) => handlePairFilters(value, 'stableCoins')"
        >
          <template #selection="{ value, hasInitialValue }">
            <template v-if="hasInitialValue"> <p>{{ value.label }}</p> </template>
            <template v-else>Select your account</template>
          </template>

          <template #options="{ item }"> <p>{{ item.label }}</p> </template>
        </AppSelect>
      </mq-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs } from 'vue'

import { IPairSelectionCoins, IPairItem } from '@/views/trade/trade-types'

export default defineComponent({
  name: 'MyBotPairFilters',

  props: {
    isFavourite: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  emits: ['favouritePair', 'change', 'input'],

  setup (props, { emit }) {
    const stableCoinsDefault: IPairItem = { value: 'STABLECOINS', label: 'STABLE COINS', headerLabel: true }
    const altsDefault: IPairItem = { value: 'ALTS', label: 'ALTS', headerLabel: true }
    const filtersDefault: IPairSelectionCoins = {
      stableCoins: [
        { value: 'STABLECOINS', label: 'STABLE COINS', headerLabel: true },
        { value: 'USDT', label: 'USDT' },
        { value: 'TUSD', label: 'TUSD' },
        { value: 'BUSD', label: 'BUSD' },
        { value: 'USDC', label: 'USDC' }
      ],

      alts: [
        { value: 'ALTS', label: 'ALTS', headerLabel: true },
        { value: 'ETH', label: 'ETH' },
        { value: 'TRX', label: 'TRX' }
      ]
    }

    const state = reactive({
      alts: altsDefault as IPairItem,
      stableCoins: stableCoinsDefault as IPairItem,
      search: '' as string,
      toggleBTCValue: false as boolean
    })

    function toggleFavouritePair (): void {
      state.stableCoins = stableCoinsDefault
      state.alts = altsDefault

      state.toggleBTCValue = false

      emit('favouritePair', !props.isFavourite)
    }

    function handlePairFilters (pair: IPairItem, type: string): void {
      if (type === 'alts') {
        state.stableCoins = stableCoinsDefault
        state.alts = pair
        state.toggleBTCValue = false
      }

      if (type === 'stableCoins') {
        state.alts = altsDefault
        state.stableCoins = pair
        state.toggleBTCValue = false
      }

      if (type === 'btc') {
        state.stableCoins = stableCoinsDefault
        state.alts = altsDefault
      }

      emit('favouritePair', false)
      emit('change', pair)
    }

    function handleBTCFilter (): void {
      state.toggleBTCValue = !state.toggleBTCValue
      const btcValue = state.toggleBTCValue ? { value: 'BTC', label: 'BTC' } : { value: '', label: '' }
      handlePairFilters(btcValue, 'btc')
    }

    function handleInputFilter (value: string): void {
      const filterValue = value.trim().toLowerCase()
      state.stableCoins = stableCoinsDefault
      state.alts = altsDefault

      emit('input', filterValue)
    }

    return {
      ...toRefs(state),
      filtersDefault,
      toggleFavouritePair,
      handlePairFilters,
      handleInputFilter,
      handleBTCFilter
    }
  }
})
</script>
