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
          class="
          flex
          items-center
          border-b
          border-solid
          border-ice-berge
          dark:border-biscay
          px-10
          md:px-20
          4xl:px-30
          pb-14
          md:mb-20
          "
        >
          <img
            :src="`/img/trade-images/${img}`"
            :alt="title"
            class="w-24 h-24 4xl:w-28 4xl:h-28 mr-14"
          >
          <p class="md:text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair">{{ title }}</p>
        </div>
      </template>

      <template #subtitle="{ row }">
        <div class="flex items-center capitalize">
          {{ row.subtitle }}
        </div>
      </template>

      <template #coin="{ row }">
        <div class="flex items-center">
          <div
            v-for="(item, index) in row.tokens"
            :key="index"
            class="flex items-center mr-10 last:mr-0"
          >
            <AppCryptoCoinChecker
              :icon-name="item.tickerSymbol"
              :icon-size="1.2"
              :img-size="18"
              class="mr-5"
            />
            <p class="text-md text-chicory-flower dark:text-let-it-snow">{{ item.tickerSymbol }}</p>
          </div>
        </div>
      </template>

      <template #balance="{ row }">
        <div class="flex items-center">
          <div
            v-for="(item, index) in row.tokens"
            :key="index"
            class="flex items-center mr-10 last:mr-0"
          >
            <p class="text-md text-chicory-flower dark:text-let-it-snow">
              {{ formatNumber(item.balance) }}
            </p>
            &nbsp;
            <p class="text-md text-chicory-flower dark:text-let-it-snow">{{ `${item.tickerSymbol}` }}</p>
          </div>
        </div>
      </template>

      <template #usdValue="{ row }">
        <div class="text-md text-chicory-flower dark:text-let-it-snow">
          {{ row.usdValue ? formatNumber(row.usdValue) : '' }}
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
            collapse-button-position="top-50"
            class="border-b border-solid border-tugce-silver dark:border-rushing-river-second last:border-none mx-12"
          >
            <!-- PREVIEW -->
            <template #header="{ collapsed }">
              <div class="flex flex-col text-chicory-flower dark:text-blair font-medium">
                <div class="capitalize text-md font-semibold mt-16 mb-4">{{ item.subtitle }}</div>
                <div
                  class="grid grid-cols-2 gap-x-12 px-12 -mx-12 py-10"
                  :class="getColor(collapsed)"
                >
                  <!-- COIN -->
                  <div class="flex flex-wrap items-center text-chicory-flower dark:text-blair font-medium">
                    <div class="capitalize w-full mb-10">Coin</div>
                    <div
                      v-for="(c) in item.tokens"
                      :key="c.tickerSymbol"
                      class="flex items-center mr-10 last:mr-0"
                    >
                      <AppCryptoCoinChecker
                        :icon-name="c.tickerSymbol"
                        :icon-size="1.07"
                        :img-size="16"
                        class="mr-5"
                      />
                      <p class="text-sm text-chicory-flower dark:text-let-it-snow">{{ c.tickerSymbol }}</p>
                    </div>
                  </div>

                  <!-- BALANCE -->
                  <div class="flex flex-wrap items-center text-chicory-flower dark:text-blair font-medium">
                    <div class="capitalize w-full mb-10">Balance</div>
                    <div
                      v-for="(b) in item.tokens"
                      :key="b.tickerSymbol"
                      class="flex items-center mr-10 last:mr-0"
                    >
                      <p class="text-sm text-chicory-flower dark:text-let-it-snow">
                        {{ formatNumber(b.balance) }}
                      </p>
                        &nbsp;
                      <p class="text-sm text-chicory-flower dark:text-let-it-snow">{{ `${b.tickerSymbol}` }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- CONTENT -->
            <template #content="{ collapsed }">
              <div
                class="flex flex-col space-y-10 pb-20 px-12 -mx-12 py-10"
                :class="getColor(collapsed)"
              >
                <div class="capitalize w-full text-chicory-flower dark:text-blair font-medium">USD Value</div>
                <div class="text-sm text-chicory-flower dark:text-let-it-snow">
                  {{ item.usdValue ? formatNumber(item.usdValue) : '' }}
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

import { IAaveData, IDeFiGeneralCoin } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'AaveProjectDetails',

  props: {
    project: {
      type: Object as PropType<IAaveData>,
      require: true
    },

    title: {
      type: String as PropType<string>,
      require: true
    },

    img: {
      type: String as PropType<string>,
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
      { property: 'usdValue', label: 'USD Value', width: 200 }
    ]

    const subProjectTitles = ['supplied', 'borrowed']

    const projectData = computed(() => {
      if (!props.project) {
        return []
      } else if (!props.project.borrowed.length && !props.project.supplied.length) {
        return []
      } else {
        return Object.keys(props.project).map((key: string) => {
          const data = props.project ? props.project[key] : []
          if (!data) return []
          return {
            subtitle: key,
            tokens: data,
            usdValue: data.reduce((acc: number, x: IDeFiGeneralCoin) => acc + x.usdValue, 0)
          }
        })
      }
    })

    return {
      projectHeaders,
      projectData,
      subProjectTitles,
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
