<template>
  <AppCard
    class="exchanges-card flex flex-col w-full p-20 3xl:p-30 overflow-y-hidden custom-scrollbar"
  >
    <div class="flex items-center justify-between mb-20 4xl:mb-40">
      <p class="text-md 2xl:text-lg 4xl:text-3xl text-nile-blue dark:text-blair">Exchanges</p>
      <p
        class="text-nile-blue dark:text-hidden-sea-glass md:text-sm 4xl:text-base uppercase cursor-pointer"
        @click="toggleselectAll"
      >
        {{ isSelectedAll ? "Unselect All" : "Select all" }}
      </p>
    </div>

    <div class="flex flex-col flex-grow space-y-10 4xl:space-y-14 overflow-y-auto custom-scrollbar">
      <div
        v-for="(item, index) in exchangeImages"
        :key="index"
        class="flex items-center flex-shrink-0 w-1/3 lg:w-full space-x-16"
      >
        <AppMultipleCheckbox
          v-model:items="selectedExchanged"
          :value="item.id"
          :field-id="item.id"
          @toggle-exchange="handleToggleExchange"
        />

        <div class="flex-shrink-0 w-30 h-30 4xl:w-40 4xl:h-40 bg-catskill-white dark:bg-blue-bayberry p-5 rounded-full">
          <img :src="item.img" :alt="item.label" class="w-full h-full object-cover">
        </div>

        <p class="text-nile-blue dark:text-blair 4xl:text-lg">{{ item.label }}</p>
      </div>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { exchangeImagesData } from '@/views/swap/swap.data'
import { useSwap } from '@/views/swap/swap.setup'

export default defineComponent({
  name: 'SwapExchanges',

  setup () {
    // SWAP SETUP //
    const { getExchangesData, toggleAllExchanges, toggleExchange } = useSwap()

    const exchangeImages = exchangeImagesData
    const selectedExchanged = ref<string[]>([])

    const isSelectedAll = ref<boolean>(true)

    async function handleToggleExchange (payload: any) {
      await toggleExchange(payload)
    }

    async function toggleselectAll () {
      if (isSelectedAll.value) {
        await toggleAllExchanges(false)
        selectedExchanged.value = []
      } else {
        await toggleAllExchanges(true)
        selectedExchanged.value = getExchangesData.value.map(e => e.id)
      }
      isSelectedAll.value = !isSelectedAll.value
    }

    onMounted(() => {
      selectedExchanged.value = getExchangesData.value.filter((exchange) => exchange.checked).map(e => e.id)
    })

    return {
      selectedExchanged,
      exchangeImages,
      getExchangesData,
      handleToggleExchange,
      toggleselectAll,
      isSelectedAll
    }
  }
})
</script>

<style lang="scss" scoped>
.exchanges-card {
  @media(min-width: 2500px) {
    max-width: 500px;
  }

  @media(max-width: 2499px) {
    max-width: 300px;
  }

  @media(max-width: 1280px) {
    max-width: 300px;
  }

  @media(max-width: 1023px) {
    @apply max-w-full;
    height: 360px;
  }

  @media(max-width: 768px) {
    max-width: 680px;
  }
}
</style>
