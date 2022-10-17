<template>
  <mq-layout mq="lg+" class="flex flex-col relative overflow-y-auto custom-scrollbar">
    <!-- LOADER -->
    <AppLoader v-if="loading" class="rounded-xlg" />

    <!-- TABLE -->
    <AppTable
      v-model:dataset="getData"
      :headers="tableHeaders"
      sort-front-side
      :is-mobile-view-list="false"
      :is-table-wrap-styled="!isMD ? true : false"
      class="py-20"
    >
      <!-- TITLE -->
      <template #tableTitle>
        <mq-layout mq="lg+" class="flex justify-between items-center md:px-30 pb-14">
          <p class="md:text-lg font-medium text-chicory-flower dark:text-blair">
            My Rented Bots
          </p>
        </mq-layout>
      </template>

      <!-- ALGOBOT -->
      <template #algobot="{ row }">
        <div class="flex items-center space-x-6">
          <div class="flex items-center">
            <AppCryptoCoinChecker
              v-if="getPairData(row.botRef)"
              :icon-name="getPairData(row.botRef).base"
              :icon-size="1.2"
              :img-size="18"
            />

            <AppCryptoCoinChecker
              v-if="getPairData(row.botRef)"
              :icon-name="getPairData(row.botRef).quote"
              :icon-size="1.2"
              :img-size="18"
              class="-ml-10"
            />
          </div>

          <AppTruncatedTooltip :content="row.name" />
        </div>
      </template>

      <!-- ACTIVATED -->
      <template #activated="{ row }">
        <AppTruncatedTooltip
          :content="row?.activatedAt ? $filters.date(row.activatedAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A'"
        />
      </template>

      <!-- TOTAL USER -->
      <template #totalUser="{ row }">
        <AppTruncatedTooltip :content="row?.totalUsers || row?.totalUsers === 0 ? row.totalUsers : 'N/A'" />
      </template>

      <!-- TOTAL GAINED -->
      <template #totalGained="{ row }">
        <AppTruncatedTooltip
          :content="row?.totalRealisedUbxtGain || row?.totalRealisedUbxtGain === 0 ?
            row.totalRealisedUbxtGain.toFixed(4) :
            'N/A'"
        />
      </template>

      <!-- LAST TRADE AMOUNT -->
      <template #lastTradeAmount="{ row }">
        <AppTruncatedTooltip
          :content="row?.lastTradeAmount || row?.lastTradeAmount === 0 ?
            row.lastTradeAmount.toFixed(4) :
            'N/A'"
        />
      </template>
    </AppTable>
  </mq-layout>

  <!-- MOBILE VIEW -->
  <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <AppCard
      class="
        my-rented-bots-table
        flex
        flex-col
        flex-grow
        w-full
        pt-20
        overflow-y-auto
        custom-scrollbar
      "
    >
      <!-- TITLE -->
      <p
        class="
          flex
          justify-center
          flex-shrink-0
          w-full
          text-md
          font-medium
          text-nile-blue
          dark:text-blair
          px-30
          mb-10
        "
      >
        My Rented Bots
      </p>

      <div class="flex flex-col relative w-full pb-10 overflow-y-auto custom-scrollbar">
        <!-- LOADER -->
        <AppLoader v-if="loading" class="rounded-b-xlg" />

        <!-- CONTENT -->
        <AppCollapse v-model="openedItems" :data="getData" class="flex flex-col flex-grow w-full">
          <AppCollapseItem
            v-for="(item, index) of getData"
            :key="index"
            :name="index.toString()"
            class="border-b border-solid border-tugce-silver dark:border-rushing-river-second last:border-none mx-12"
          >
            <!-- PREVIEW -->
            <template #header="{ collapsed }">
              <div
                class="grid grid-cols-2 gap-x-10 py-20 pl-12 -ml-12 pr-40 -mr-12"
                :class="collapsedItemColor(collapsed)"
              >
                <!-- ALGOBOT -->
                <div class="flex flex-col items-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Type</div>
                  <div class="flex items-center self-start space-x-6">
                    <div class="flex items-center flex-shrink-0">
                      <AppCryptoCoinChecker
                        v-if="getPairData(item.botRef)"
                        :icon-name="getPairData(item.botRef).base"
                        :icon-size="1.2"
                        :img-size="18"
                      />

                      <AppCryptoCoinChecker
                        v-if="getPairData(item.botRef)"
                        :icon-name="getPairData(item.botRef).quote"
                        :icon-size="1.2"
                        :img-size="18"
                        class="-ml-10"
                      />
                    </div>

                    <AppTruncatedTooltip
                      :content="item.name"
                      class="font-medium text-nile-blue dark:text-white capitalize"
                    />
                  </div>
                </div>

                <!-- ACTIVATED -->
                <div class="flex flex-col items-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Activated</div>
                  <AppTruncatedTooltip
                    :content="item?.activatedAt ? $filters.date(item.activatedAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A'"
                    class="font-medium text-nile-blue dark:text-white capitalize"
                  />
                </div>
              </div>
            </template>

            <!-- CONTENT -->
            <template #content="{ collapsed }">
              <div :class="collapsedItemColor(collapsed)" class="pb-20 pl-12 -ml-12 -mr-12 pr-40 space-y-20">
                <div class="grid grid-cols-2 gap-10">
                  <!-- TOTAL USER -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Total User</div>
                    <AppTruncatedTooltip
                      :content="item?.totalUsers || item?.totalUsers === 0 ? item.totalUsers : 'N/A'"
                      class="font-medium text-nile-blue dark:text-white capitalize"
                    />
                  </div>

                  <!-- TOTAL GAINE UBXT -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Total Gained UBXT</div>
                    <AppTruncatedTooltip
                      :content="item?.totalRealisedUbxtGain || item?.totalRealisedUbxtGain === 0 ?
                        item.totalRealisedUbxtGain.toFixed(4) :
                        'N/A'"
                      class="font-medium text-nile-blue dark:text-white capitalize"
                    />
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
import { defineComponent, computed, PropType, ref } from 'vue'

import { routeNames } from '@/router'

import { useBots } from '@/global-setup/bots.composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'MyRentedBotsTable',

  props: {
    data: {
      type: Array,
      required: true
    },

    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup (props) {
    const { isDarkMode } = useGlobal()
    const { bots } = useBots()
    const { isMD } = useCustomBreakpoints()

    const tableHeaders: { property: string; label: string; sortable: boolean; minWidth: number; }[] = [
      { property: 'algobot', label: 'Algo Bot', sortable: true, minWidth: 200 },
      { property: 'activated', label: 'Activated', sortable: true, minWidth: 120 },
      { property: 'totalUser', label: 'Total User', sortable: true, minWidth: 120 },
      { property: 'totalGained', label: 'Total Gained UBXT', sortable: true, minWidth: 120 },
      { property: 'lastTradeAmount', label: 'Last Traded Amount (USD)', sortable: true, minWidth: 120 }
    ]

    const openedItems = ref<string[]>([])

    const getData = computed({
      get () { return props.data },
      set (value) { return value }
    })

    function getPairData (botRef: string) {
      if (bots.value) {
        return bots.value.find((bot) => bot.id === botRef)
      }
      return null
    }

    function collapsedItemColor (collapsed: boolean): string {
      if (!collapsed && isDarkMode.value) {
        return 'bg-crow-black-second bg-opacity-40'
      } else if (!collapsed && !isDarkMode.value) {
        return 'bg-azureish-white bg-opacity-40'
      } else {
        return ''
      }
    }

    return {
      routeNames,
      isMD,
      tableHeaders,
      getData,
      openedItems,
      getPairData,
      collapsedItemColor
    }
  }
})
</script>
