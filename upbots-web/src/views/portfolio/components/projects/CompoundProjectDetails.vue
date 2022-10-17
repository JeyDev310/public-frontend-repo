<template>
  <!-- DESKTOP -->
  <mq-layout
    mq="lg+"
    class="flex flex-col w-full space-y-12 md:space-y-24 xl:space-y-28 overflow-y-auto custom-scrollbar"
  >
    <AppTable
      v-if="projectData"
      v-model:dataset="projectData"
      :headers="projectHeaders"
      class="portfolio-projects-table"
    >
      <template #tableTitle>
        <div
          class="flex items-center border-b border-solid border-ice-berge dark:border-biscay
          px-10 md:px-30 pb-14 md:mb-20"
        >
          <img
            :src="`/img/trade-images/${img}`"
            :alt="title"
            class="w-28 h-28 mr-14"
          >
          <p class="md:text-lg font-medium text-chicory-flower dark:text-blair">{{ title }}</p>
        </div>
      </template>

      <template #subtitle="{ row }">
        <div class="flex items-center capitalize">
          {{ row.subtitle }}
        </div>
      </template>

      <template #coin="{ row }">
        <div class="flex items-center">
          <AppCryptoCoinChecker
            :icon-name="row.tickerSymbol"
            :icon-size="1.2"
            :img-size="18"
            class="mr-5"
          />
          <p class="text-md text-chicory-flower dark:text-let-it-snow">{{ row.tickerSymbol }}</p>
        </div>
      </template>

      <template #balance="{ row }">
        <div class="flex items-center">
          <p class="text-md text-chicory-flower dark:text-let-it-snow">
            {{ formatNumber(row.balance) }}
          </p>
        </div>
      </template>

      <template #usdValue="{ row }">
        <div class="flex items-center">
          <p class="text-md text-chicory-flower dark:text-let-it-snow">
            {{ formatNumber(row.usdValue) }}
          </p>
        </div>
      </template>

      <template #apr="{ row }">
        <div class="flex items-center">
          <p class="text-md text-chicory-flower dark:text-let-it-snow">
            {{ formatNumber(row.apr) }}
          </p>
        </div>
      </template>
    </AppTable>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout
    mq="sm-md"
    class="flex overflow-y-auto custom-scrollbar"
  >
    <AppCard class="flex flex-col w-full px-14 py-14">
      <div
        class="flex w-full items-center border-b border-solid border-ice-berge dark:border-biscay
        px-10 md:px-30 pb-14 md:mb-20"
      >
        <img :src="`/img/trade-images/${img}`" :alt="title" class="w-28 h-28 mr-14">
        <p class="md:text-lg font-medium text-chicory-flower dark:text-blair">{{ title }}</p>
      </div>
      <div class="flex flex-col w-full overflow-y-auto custom-scrollbar">
        <AppCollapse v-if="projectData" v-model="openedItems" :data="projectData">
          <AppCollapseItem
            v-for="(item, id) of projectData"
            :key="id"
            :name="id.toString()"
            collapse-button-position="top-4"
            class="border-b border-solid border-tugce-silver dark:border-rushing-river-second last:border-none mx-12"
          >
            <!-- PREVIEW -->
            <template #header="{ collapsed }">
              <div
                class="grid grid-cols-3 gap-x-12 py-10 px-10 -mx-12"
                :class="getColor(collapsed)"
              >
                <!-- COIN -->
                <div class="flex flex-wrap items-center text-chicory-flower dark:text-blair font-medium">
                  <div class="flex items-center mr-10 last:mr-0">
                    {{ item.subtitle }}
                  </div>
                </div>
                <!-- COIN -->
                <div class="flex flex-wrap items-center text-chicory-flower dark:text-blair font-medium">
                  <div class="capitalize w-full mb-10">Coin</div>
                  <div class="flex items-center mr-10 last:mr-0">
                    <AppCryptoCoinChecker
                      :icon-name="item.tickerSymbol"
                      :icon-size="1.07"
                      :img-size="16"
                      class="mr-5"
                    />
                    <p class="text-sm text-chicory-flower dark:text-let-it-snow">{{ item.tickerSymbol }}</p>
                  </div>
                </div>

                <!-- BALANCE -->
                <div class="flex flex-wrap items-center text-chicory-flower dark:text-blair font-medium">
                  <div class="capitalize w-full mb-10">Balance</div>
                  <div class="flex items-center mr-10 last:mr-0">
                    <p class="text-sm text-chicory-flower dark:text-let-it-snow">
                      {{ formatNumber(item.balance) }}
                    </p>
                        &nbsp;
                    <p class="text-sm text-chicory-flower dark:text-let-it-snow">{{ `${item.tickerSymbol}` }}</p>
                  </div>
                </div>
              </div>
            </template>

            <!-- CONTENT -->
            <template #content="{ collapsed }">
              <div
                class="grid grid-cols-3 gap-x-12 py-10 px-10 -mx-12"
                :class="getColor(collapsed)"
              >
                <div />
                <div class="flex flex-col">
                  <div class="capitalize w-full text-chicory-flower dark:text-let-it-snow font-medium">USD Value</div>
                  <div class="text-sm text-chicory-flower dark:text-let-it-snow">
                    {{ formatNumber(item.usdValue) }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <div class="capitalize w-full text-chicory-flower dark:text-let-it-snow font-medium">APR</div>
                  <div class="text-sm text-chicory-flower dark:text-let-it-snow">
                    {{ formatNumber(item.apr) }}
                  </div>
                </div>
              </div>
            </template>
          </AppCollapseItem>
        </AppCollapse>
      </div>
    </AppCard>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, reactive, toRefs } from 'vue'

import { collapsedItemColor, formatNumber } from '@/core/helpers'

import { ICompoundData } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'CompoundProjectDetails',

  props: {
    project: {
      type: Object as PropType<ICompoundData>,
      require: true
    },

    title: {
      type: String,
      require: true
    },

    img: {
      type: String,
      require: true
    }
  },

  setup (props) {
    const { isDarkMode } = useGlobal()

    const state = reactive({
      openedItems: [] as string[]
    })

    const { openedItems } = toRefs(state)

    function getColor (collapsed: boolean) {
      return collapsedItemColor(collapsed, isDarkMode.value)
    }

    const projectHeaders = [
      { property: 'subtitle', label: '', width: 100 },
      { property: 'coin', label: 'Coin', width: 200 },
      { property: 'balance', label: 'Balance', width: 200 },
      { property: 'usdValue', label: 'USD Value', width: 200 },
      { property: 'apr', label: 'APR', width: 200 }
    ]

    const projectData = computed(() => {
      if (!props.project) return []
      const data: any = []
      Object.keys(props.project).map((key) => {
        if (!props.project) return null
        props.project[key].map((item: any) => {
          item.map((subItem: any) => {
            data.push({
              subtitle: key,
              apr: subItem.apr * 100,
              ...subItem
            })
          })
        })
      })
      return data
    })

    return {
      projectHeaders,
      projectData,
      openedItems,
      getColor,
      formatNumber
    }
  }
})
</script>

<style lang="scss" scoped>
.portfolio-projects-table {
  height: 200px;
}
</style>
