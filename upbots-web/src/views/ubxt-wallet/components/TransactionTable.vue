<template>
  <!-- DESKTOP VIEW -->
  <mq-layout mq="lg+" class="transaction-table flex flex-col relative overflow-y-auto custom-scrollbar">
    <!-- LOADER -->
    <AppLoader v-if="loading" class="rounded-xlg" />

    <!-- TABLE -->
    <AppTable
      v-model:dataset="getData"
      :headers="tableHeaders"
      sort-front-side
      :is-mobile-view-list="false"
      :is-table-wrap-styled="isMD"
      class="py-20"
    >
      <!-- TITLE -->
      <template #tableTitle>
        <mq-layout mq="lg+" class="flex justify-between items-center md:px-30 pb-14">
          <p class="md:text-lg font-medium text-chicory-flower dark:text-blair">
            UBXT Transaction
          </p>
        </mq-layout>
      </template>

      <!-- TYPE & IMG -->
      <template #type="{ row }">
        <div v-if="row.type" class="flex space-x-10 items-center">
          <img
            v-if="row.type === 'DEPOSIT'"
            src="/img/ubxt-wallet/deposit.svg"
            :alt="row.type"
            class="w-18 h-18"
          >
          <img v-else src="/img/ubxt-wallet/payment.png" :alt="row.type" class="w-18 h-18">

          <div v-if="row.type" class="w-full">
            <AppTruncatedTooltip
              class="font-medium md:text-base xl:text-base capitalize"
              :content="getType(row)"
            />
          </div>
        </div>
      </template>

      <!-- BOT NAME -->
      <template #botName="{ row }">
        <AppTruncatedTooltip
          class="font-medium md:text-base xl:text-base capitalize"
          :content="row?.botName ? row.botName : 'N/A'"
        />
      </template>

      <!-- STATUS -->
      <template #status="{ row }">
        <AppTruncatedTooltip
          class="font-medium md:text-base xl:text-base capitalize"
          :content="row?.status ? getStatus(row) : 'N/A'"
        />
      </template>

      <!-- AMOUNT -->
      <template #amount="{ row }">
        <div>{{ getAmount(row) }}</div>
      </template>

      <!-- CONFIRM -->
      <template #confirm="{ row }">
        <div>{{ row?.confirmPercent ? row.confirmPercent : 'N/A' }}</div>
      </template>

      <!-- CREATED AT -->
      <template #createdAt="{ row }">
        <AppTruncatedTooltip :content="row?.createdAt ? $filters.date(row.createdAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A'" />
      </template>

      <!-- HASH -->
      <template #hash="{row}">
        <div class="flex w-full">
          <p v-if="row.hash" class="flex items-center justify-between w-full space-x-6">
            <a :href="row.explorer" target="_blank" class="hover:underline cursor-pointer">
              {{ $filters.truncString(row.hash, 8, 6) }}
            </a>
            <AppIcon name="copy" size="18" class="cursor-pointer" @click="copyAddress(row)" />
          </p>
          <p v-else class="">N/A</p>
        </div>
      </template>
    </AppTable>
  </mq-layout>

  <!-- MOBILE VIEW -->
  <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <AppCard
      class="
        transaction-table
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
        UBXT Transactions
      </p>

      <div class="flex flex-col relative w-full pb-10 overflow-y-auto custom-scrollbar">
        <!-- LOADING -->
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
                <!-- TYPE -->
                <div class="flex flex-col items-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Type</div>
                  <div v-if="item.type" class="flex space-x-10 items-center">
                    <img
                      v-if="item.type === 'DEPOSIT'"
                      src="/img/ubxt-wallet/deposit.svg"
                      :alt="item.type"
                      class="w-18 h-18"
                    >
                    <img v-else src="/img/ubxt-wallet/payment.png" :alt="item.type" class="w-18 h-18">

                    <div v-if="item.type" class="w-full">
                      <AppTruncatedTooltip
                        class="font-medium text-nile-blue dark:text-white capitalize"
                        :content="getType(item)"
                      />
                    </div>
                  </div>
                </div>

                <!-- STATUS -->
                <div class="flex flex-col items-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Status</div>
                  <AppTruncatedTooltip
                    class="font-medium text-nile-blue dark:text-white capitalize"
                    :content="item?.status ? item.status.toLowerCase() : 'N/A'"
                  />
                </div>
              </div>
            </template>

            <!-- CONTENT -->
            <template #content="{ collapsed }">
              <div :class="collapsedItemColor(collapsed)" class="pb-20 pl-12 -ml-12 -mr-12 pr-40 space-y-20">
                <div class="grid grid-cols-2 gap-10">
                  <!-- BOT NAME -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Bot Name</div>
                    <AppTruncatedTooltip
                      class="font-medium text-nile-blue dark:text-white capitalize"
                      :content="item?.botName ? item.botName : 'N/A'"
                    />
                  </div>

                  <!-- CREATED -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Created</div>
                    <AppTruncatedTooltip
                      :content="item?.createdAt ? $filters.date(item.createdAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A'"
                      class="text-nile-blue dark:text-white font-medium"
                    />
                  </div>

                  <!-- CREATED -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Amount</div>
                    <div class="text-nile-blue dark:text-white font-medium">{{ getAmount(item) }}</div>
                  </div>

                  <!-- CREATED -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Confirm%</div>
                    <div class="text-nile-blue dark:text-white font-medium">
                      {{ item?.confirmPercent ? item.confirmPercent : 'N/A' }}
                    </div>
                  </div>
                </div>

                <div class="flex flex-col items-center justify-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Transactions Hash</div>
                  <div class="flex items-center justify-center w-full">
                    <p v-if="item.hash" class="flex items-center justify-center w-full space-x-20">
                      <a
                        :href="item.explorer"
                        target="_blank"
                        class="text-nile-blue dark:text-white font-medium hover:underline cursor-pointer"
                      >
                        {{ $filters.truncString(item.hash, 8, 6) }}
                      </a>
                      <AppIcon
                        name="copy"
                        size="18"
                        class="text-nile-blue dark:text-white font-medium cursor-pointer"
                        @click="copyAddress(item)"
                      />
                    </p>
                    <p v-else class="text-nile-blue dark:text-white font-medium">N/A</p>
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
import { defineComponent, computed, ref, PropType } from 'vue'

import { copyToClipboard } from '@/core/helpers'
import { ETransactionTypes, ETransferType, ETransactionStatuses } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'TransactionTable',

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
    const { isMD } = useCustomBreakpoints()

    const tableHeaders: { property: string; label: string; sortable: boolean; minWidth: number; }[] = [
      { property: 'type', label: 'Type', sortable: true, minWidth: 150 },
      { property: 'botName', label: 'Bot Name', sortable: true, minWidth: 150 },
      { property: 'status', label: 'Status', sortable: true, minWidth: 150 },
      { property: 'amount', label: 'Amount', sortable: true, minWidth: 150 },
      { property: 'confirm', label: 'Confirm%', sortable: true, minWidth: 150 },
      { property: 'createdAt', label: 'Created', sortable: true, minWidth: 150 },
      { property: 'hash', label: 'Transactions Hash', sortable: true, minWidth: 250 }
    ]

    const openedItems = ref<string[]>([])

    const getData = computed({
      get () { return props.data },
      set (value) { return value }
    })

    // TODO REFACTOR //
    function getCapitalizeText (text: string): string {
      return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase().replace('_', ' ')}`
    }

    // TODO REFACTOR //
    function getType (item: any): string {
      if (item.type === ETransactionTypes.PERFORMANCE_FEE && item.subType) {
        return `Perf-fee (${getCapitalizeText(item.subType)})`
      }
      return item.type.toLowerCase()
    }

    // TODO REFACTOR //
    function getAmount (row: any): string {
      if (
        row.type === ETransactionTypes.PERFORMANCE_FEE &&
      Number(row.amount) > 0 &&
      Number(row.totalAmount) > 0 &&
      row.totalAmount > row.amount
      ) {
        return `${row.amount.toFixed(3)}/${row.totalAmount.toFixed(3)} UBXT`
      } else {
        return `${Number.isInteger(row.amount) ? row.amount : row.amount.toFixed(3)} UBXT`
      }
    }

    // TODO REFACTOR //
    function copyAddress (item: any): void {
      let hash = ''
      if (item.type.toUpperCase() === 'DEPOSIT') {
        hash = item.hash
      } else {
        if (item?.detail?.hash) {
          hash = item.detail.hash
        } else {
          hash = item.hash
        }
      }

      const tempInput = document.createElement('input')
      tempInput.value = hash
      copyToClipboard({ value: tempInput.value })
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

    function getStatus (data: any): string {
      let status = getCapitalizeText(data.status)

      const isTypeWithdrawAndPerformaceFee = (
        data.type === ETransactionTypes.WITHDRAW || data.type === ETransactionTypes.PERFORMANCE_FEE
      )
      const isSubTypeWithdraw = data.subType === ETransferType.WITHDRAW
      const isStatusPendingAndConfirmed = (
        data.status === ETransactionStatuses.PENDING || data.status === ETransactionStatuses.CONFIRMED
      )

      if (isTypeWithdrawAndPerformaceFee && isSubTypeWithdraw && isStatusPendingAndConfirmed) {
        status = 'Sent'
      }

      return status
    }

    return {
      isMD,
      tableHeaders,
      getData,
      openedItems,
      getType,
      copyAddress,
      getAmount,
      collapsedItemColor,
      getStatus
    }
  }
})
</script>

<style lang="scss" scoped>
.transaction-table {
  max-height: 400px;
}
</style>
