<template>
  <div class="flex flex-col">
    <div class="flex items-center w-full space-x-10" @click="isFilterOpen = !isFilterOpen">
      <div class="flex items-center w-full space-x-14">
        <AppIcon name="filter" size="24" class="text-nile-blue dark:text-tradewind" />
        <span class="text-base font-medium text-nile-blue dark:text-tradewind">
          Filters ({{ getSelectedFilters }})
        </span>
      </div>

      <AppIcon
        name="chevron-thin"
        size="15"
        class="text-nile-blue dark:text-blair transition duration-300"
        :class="isFilterOpen && 'transform rotate-180'"
      />
    </div>

    <div v-if="isFilterOpen" class="flex flex-col mt-14">
      <div class="flex items-center space-x-10 w-full">
        <p class="flex flex-shrink-0 text-nile-blue dark:text-blair">Exchanges:</p>
        <AppSelect
          v-model="exchangesValue"
          :options="exchangeImages"
          item-key="id"
          multiple
          class="w-full"
          @change="handleToggleExchange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useSwap } from '@/views/swap/swap.setup'
import { exchangeImagesData } from '@/views/swap/swap.data'

export default defineComponent({
  name: 'SwapFilters',

  setup () {
    // SWAP SETUP //
    const { getExchangesData, toggleExchange } = useSwap()

    const exchangeImages = exchangeImagesData

    const isFilterOpen = ref<boolean>(false)

    const exchangesValue = ref<string[]>([])

    const getSelectedFilters = computed(() => !exchangesValue.value.length ? 0 : 1)

    async function handleToggleExchange (payload: any) {
      await toggleExchange(payload.id)
    }

    onMounted(() => {
      exchangesValue.value = getExchangesData.value.filter((exchange) => exchange.checked).map(e => e.id)
    })

    return {
      isFilterOpen,
      getSelectedFilters,
      exchangesValue,
      exchangeImages,
      handleToggleExchange
    }
  }

})
</script>
