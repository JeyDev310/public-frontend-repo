<template>
  <div class="flex flex-col flex-grow w-full">
    <!--  LOADER -->
    <AppLoader v-if="pending" class="rounded-xlg" />

    <!-- CONTENT -->
    <SwapTableLabel :labels="tableLabels" class="mb-12 4xl:mb-20" />

    <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      <template v-if="tableData.length">
        <SwapTableItem
          v-for="(item, index) in tableData"
          :key="index"
          :table-data="tableData"
          :table-item="item"
          :table-index="index"
        />
      </template>

      <!-- NO DATA STATE -->
      <template v-else>
        <div class="flex flex-col flex-grow items-center justify-center w-full p-20">
          <span class="text-nile-blue dark:text-let-it-snow">No data</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSwap } from '@/views/swap/swap.setup'
import { tableLabelsData, exchangeImagesData } from '@/views/swap/swap.data'

import SwapTableLabel from '@/views/swap/components/table/SwapTableLabel.vue'
import SwapTableItem from '@/views/swap/components/table/SwapTableItem.vue'

export default defineComponent({
  name: 'SwapTable',

  components: { SwapTableLabel, SwapTableItem },

  setup () {
    // SWAP SETUP //
    const { pending, tableData } = useSwap()

    const tableLabels = tableLabelsData

    const exchangeImages = exchangeImagesData

    return { tableData, tableLabels, exchangeImages, pending }
  }
})
</script>

<style lang="scss" scoped>
/*! purgecss start ignore */
:deep(.swap-table__col-1) {
  width: 26%;

  @media (max-width: 1279px) {
    width: 24%;
  }

  @media (max-width: 767px) {
    width: 23%;
  }
}

:deep(.swap-table__col-2) {
  width: 20%;

  @media (max-width: 1279px) {
    width: 21%;
  }

  @media (max-width: 767px) {
    width: 23%;
  }
}

:deep(.swap-table__col-3) {
  width: 20%;

  @media (max-width: 1279px) {
    width: 21%;
  }

  @media (max-width: 767px) {
    width: 23%;
  }
}

:deep(.swap-table__col-4) {
  width: 15%;

  @media (max-width: 1279px) {
    width: 22%;
  }

  @media (max-width: 767px) {
    width: 23%;
  }
}

:deep(.swap-table__col-5) {
  width: 21%;

  @media (min-width: 1280px) {
    min-width: 89px;
  }

  @media (max-width: 1279px) {
    width: 20%;
  }

  @media (max-width: 767px) {
    width: 8%;
  }
}
/*! purgecss end ignore */
</style>
