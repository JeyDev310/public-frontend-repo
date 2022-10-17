<template>
  <!-- DESKTOP VIEW -->
  <mq-layout mq="lg+" class="referral__trancations flex flex-col flex-shrink-0 lg:flex-shrink-1 relative">
    <!-- LOADER -->
    <AppCard
      v-if="loading"
      class="flex flex-col items-center justify-center w-full h-full px-20"
    >
      <AppSkeleton type="table" view-box="0 0 1000 550" class="h-full w-full" />
    </AppCard>

    <!-- TABLE -->
    <template v-else>
      <AppTable
        v-model:dataset="tableData"
        :headers="tableHeaders"
        :is-mobile-view-list="false"
        class="flex flex-col flex-grow w-full"
      >
        <!-- TITLE -->
        <template #tableTitle>
          <mq-layout mq="lg+" class="flex justify-between items-center px-20 4xl:px-30 pb-14">
            <p class="md:text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair">
              Transactions
            </p>
          </mq-layout>
        </template>
      </AppTable>
    </template>
  </mq-layout>

  <!-- MOBILE VIEW -->
  <mq-layout mq="sm-md" class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
    <AppCard class="flex flex-col flex-grow relative overflow-y-auto custom-scrollbar">
      <!-- MOBILE LOADING -->
      <AppLoader v-if="loading" />

      <!-- MOBILE CONTENT -->
      <template v-else>
        <AppCollapse v-model="openedItems" :data="tableData" class="flex flex-col flex-grow w-full">
          <AppCollapseItem
            v-for="(item, index) of tableData"
            :key="index"
            :name="index.toString()"
            class="border-b border-solid border-tugce-silver dark:border-rushing-river-second last:border-none mx-12"
          >
            <!-- PREVIEW -->
            <template #header="{ collapsed }">
              <div
                class="grid grid-cols-3 gap-x-10 py-20 pl-12 -ml-12 pr-40 -mr-12"
                :class="getColor(collapsed)"
              >
                <!-- DATE -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Date</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white text-sm capitalize"
                    :content="item?.date ? item.date : '-'"
                  />
                </div>

                <!-- REFEREE -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Referee</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white text-sm capitalize"
                    :content="item?.referee ? item.referee : '-'"
                  />
                </div>

                <!-- UBXT GAINED -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm text-center">
                    UBXT Gained
                  </span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item.ubxtGained ? item.ubxtGained : '-'"
                  />
                </div>
              </div>
            </template>

            <!-- CONTENT -->
            <template #content="{ collapsed }">
              <div
                class="grid grid-cols-3 gap-10 pb-20 pl-12 -ml-12 pr-40 -mr-12"
                :class="getColor(collapsed)"
              >
                <!-- TYPE -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm text-center">
                    Type
                  </span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item.type ? item.type : '-'"
                  />
                </div>

                <!-- LEVEL -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm text-center">
                    Level
                  </span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item.level ? item.level : '-'"
                  />
                </div>

                <!-- REFERER -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm">Referer</span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white text-sm capitalize"
                    :content="item?.referer ? item.referer : '-'"
                  />
                </div>

                <!-- TRANSACTIONS HASH -->
                <div class="flex flex-col items-center space-y-2">
                  <span class="text-beguiling-blue dark:text-blair font-medium text-sm text-center">
                    Transaction Hash
                  </span>
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-white capitalize text-sm"
                    :content="item.transactionHash ? item.transactionHash : '-'"
                  />
                </div>
              </div>
            </template>
          </AppCollapseItem>
        </AppCollapse>
      </template>
    </AppCard>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import dayjs from 'dayjs'
import ordinal from 'ordinal'

import { collapsedItemColor } from '@/core/helpers'

import { vuex } from '@/store'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'ReferralTransactions',

  setup () {
    const { isDarkMode } = useGlobal()

    const loading = ref<boolean>(false)

    const openedItems = ref<string[]>([])

    const tableHeaders: { property: string; label: string; width?: number; minWidth?: number; }[] = [
      {
        property: 'date',
        label: 'Date',
        width: 120
      },
      {
        property: 'referee',
        label: 'Referee',
        width: 120
      },
      {
        property: 'referer',
        label: 'Referer',
        width: 120
      },
      {
        property: 'level',
        label: 'Level',
        width: 60
      },
      {
        property: 'type',
        label: 'Type',
        width: 150
      },
      {
        property: 'ubxtGained',
        label: 'UBXT Gained',
        minWidth: 120
      }
      // {
      //   property: 'transactionHash',
      //   label: 'Transaction hash',
      //   minWidth: 180
      // }
    ]

    // const tableMockData = ref([
    //   {
    //     date: '06/12/2021',
    //     referee: 'Thomas',
    //     referer: '-',
    //     level: '1st',
    //     type: 'UBXT credits',
    //     ubxtGained: '200',
    //     transactionHash: '-'
    //   },
    //   {
    //     date: '06/12/2021',
    //     referee: 'Amy',
    //     referer: 'Thomas',
    //     level: '2nd',
    //     type: 'Perf fees',
    //     ubxtGained: '120',
    //     transactionHash: '0X265AHKU'
    //   },
    //   {
    //     date: '06/12/2021',
    //     referee: 'Steph',
    //     referer: '-',
    //     level: '1st',
    //     type: 'UBXT credits',
    //     ubxtGained: '200',
    //     transactionHash: '-'
    //   },
    //   {
    //     date: '06/12/2021',
    //     referee: 'Amy',
    //     referer: 'Thomas',
    //     level: '2nd',
    //     type: 'Perf fees',
    //     ubxtGained: '103',
    //     transactionHash: '0X265AHKU'
    //   },
    //   {
    //     date: '06/12/2021',
    //     referee: 'Lucas',
    //     referer: '-',
    //     level: '1st',
    //     type: 'UBXT credits',
    //     ubxtGained: '200',
    //     transactionHash: '-'
    //   },
    //   {
    //     date: '06/12/2021',
    //     referee: 'Amy',
    //     referer: 'Thomas',
    //     level: '2nd',
    //     type: 'Perf fees',
    //     ubxtGained: '64.2',
    //     transactionHash: '0X265AHKU'
    //   },
    //   {
    //     date: '06/12/2021',
    //     referee: 'David',
    //     referer: '-',
    //     level: '1st',
    //     type: 'UBXT credits',
    //     ubxtGained: '200',
    //     transactionHash: '-'
    //   },
    //   {
    //     date: '06/12/2021',
    //     referee: 'Amy',
    //     referer: 'Thomas',
    //     level: '2nd',
    //     type: 'Perf fees',
    //     ubxtGained: '26',
    //     transactionHash: '0X265AHKU'
    //   }
    // ])

    const tableData = computed(() => {
      if (vuex.referral?.transactions) {
        const referees = vuex.referral.transactions.map((transaction) => {
          return {
            date: dayjs(transaction.createdAt).format('DD/MM/YYYY'),
            referee: transaction.refereeName,
            referer: transaction.refererName,
            level: ordinal(transaction.level + 1),
            type: transaction.type,
            ubxtGained: transaction?.amount.toFixed(4),
            transactionHash: ''
          }
        })
        return referees
      }
      return []
    })

    function getColor (collapsed: boolean) {
      return collapsedItemColor(collapsed, isDarkMode.value)
    }

    return {
      loading,
      openedItems,
      tableData,
      tableHeaders,
      getColor
    }
  }
})
</script>

<style lang="scss" scoped>
.referral {
  &__trancations {
    height: 399px;
  }
}
</style>
