<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppSelect:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>size sm</p>
          <AppSelect v-model="selectValue1" :options="fruits" :disabled-options="disabledFruits" size="sm" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size md</p>
          <AppSelect v-model="selectValue1" :options="fruits" :disabled-options="disabledFruits" size="md" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size lg</p>
          <AppSelect v-model="selectValue1" :options="fruits" :disabled-options="disabledFruits" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>single</p>
          <AppSelect v-model="selectValue1" :options="fruits" :disabled-options="disabledFruits" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>multiple</p>
          <AppSelect v-model="selectedCars" :options="cars" multiple />
        </div>

        <div class="flex flex-col space-y-10">
          <p>multiple disabled items</p>
          <AppSelect v-model="selectValue2" :options="coins" multiple :disabled-options="disabledCoins" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom options and selection</p>
          <AppSelect v-model="selectValue1" :options="fruits" :disabled-options="disabledFruits">
            <template #selection="{ value, hasInitialValue }">
              {{ hasInitialValue ? value.emoji : 'Custom placeholder' }}
            </template>
            <template #options="{ item }">
              <span class="mr-5">{{ item.emoji }}</span>{{ item.label }}
            </template>
          </AppSelect>
        </div>

        <div class="flex flex-col space-y-10">
          <p>disabled</p>
          <AppSelect v-model="selectValue1" :options="fruits" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'

import AppSelect from '@/components/stateless/AppSelect.vue'

export default defineComponent({
  name: 'PgSelect',

  components: { AppSelect },

  setup () {
    const state = reactive({
      selectValue1: {},
      selectValue2: ['UBXT', 'USDT'],
      selectedCars: [1, 2]
    })

    const fruits = ref([
      { label: 'Orange', value: 'orange', emoji: '🍊' },
      { label: 'Apple', value: 'apple', emoji: '🍏' },
      { label: 'Lemon', value: 'lemon', emoji: '🍋' }
    ])
    const disabledFruits = ref(['apple'])

    const coins = ref([
      { label: 'UBXT', value: 'UBXT' },
      { label: 'BTC', value: 'BTC' },
      { label: 'USDT', value: 'USDT' },
      { label: 'ETH', value: 'ETH' },
      { label: 'CRO', value: 'CRO' },
      { label: 'BNB', value: 'BNB' },
      { label: 'FTX', value: 'FTX' },
      { label: 'ADA', value: 'ADA' },
      { label: 'PAX', value: 'PAX' },
      { label: 'DAI', value: 'DAI' }
    ])

    const cars = ref([
      { label: 'BMW', value: 1 },
      { label: 'Volvo', value: 2 },
      { label: 'Fiat', value: 3 }
    ])
    const disabledCoins = ref(['CRO'])

    const { selectValue1, selectValue2, selectedCars } = toRefs(state)

    return {
      selectValue1,
      selectValue2,
      selectedCars,
      fruits,
      coins,
      cars,
      disabledFruits,
      disabledCoins
    }
  }
})
</script>
