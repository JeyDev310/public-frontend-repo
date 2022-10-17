<template>
  <div
    class="flex flex-col md:space-y-20 4xl:space-y-24 w-full overflow-y-auto custom-scrollbar"
    :style="[height && `max-height: ${height}px;`, height && `min-height: ${height}px;`]"
  >
    <!-- MY ORDERS FILTER BAR -->
    <MyOrdersFilterBar v-if="isFilters && myOrdersFilteredData.length" />

    <!-- CONTENT (TABLET - DESKTOP) -->
    <template v-if="!isMD">
      <AppTable v-model:dataset="myOrdersFilteredData" :headers="headersTrades">
        <!-- TITLE -->
        <template #tableTitle>
          <p class="md:text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair px-20 4xl:px-30 pb-14">
            {{ title }}
          </p>
        </template>

        <!-- PAIR -->
        <template #account="{ row }">
          <div class="flex items-center space-x-10">
            <img :src="getExchangeImage(row.exch)" :alt="row.exch" class="w-18 max-w-18 h-18">
            <p>{{ row.accountName }}</p>
          </div>
        </template>

        <!-- DATE -->
        <template #date="{ row }">{{ $filters.date(row.created_at) }}</template>

        <!-- ORDER PRICE -->
        <template #orderPrice="{ row }">
          <div class="flex items-start space-x-5">
            <span>{{ getOrderPrice(row) }}</span>
            <span class="text-xs mt-1">({{ row.quoteCurrency }})</span>
          </div>
        </template>

        <!-- AMOUNT -->
        <template #amount="{ row }">
          <div class="flex items-start space-x-5">
            <span>{{ Number(row.qtyBaseAsked).toFixed(4) }}</span>
            <span class="text-xs mt-1">({{ row.baseCurrency }})</span>
          </div>
        </template>

        <!-- TOTAL -->
        <template #total="{ row }">
          <div class="flex items-start space-x-5">
            <span>{{ getTotal(row) }}</span>
            <span class="text-xs mt-1">({{ row.quoteCurrency }})</span>
          </div>
        </template>

        <!-- STATUS -->
        <template #status="{ row }">
          {{ row.userOrderStatus?.toLowerCase() === 'waiting' ? 'OPEN' : row.userOrderStatus?.toUpperCase() }}
        </template>

        <!-- ACTION BUTTONS -->
        <template #actions="{ row }">
          <AppButton
            v-if="row.userOrderStatus?.toUpperCase() == 'WAITING' || row.userOrderStatus?.toUpperCase() == 'PARTIAL'"
            type="primary-border-filled" size="xs" class="flex flex-col items-center justify-center h-full"
            @click="cancelOrder(row)"
          >
            Cancel
          </AppButton>
        </template>
      </AppTable>
    </template>

    <!-- CONTENT (MOBILE) -->
    <template v-else>
      <template v-if="myOrdersFilteredData.length">
        <div class="flex flex-col flex-shrink-0 w-full overflow-y-auto custom-scrollbar">
          <AppCard
            v-for="(item) of myOrdersFilteredData"
            :key="item.id"
            class="flex flex-col relative space-y-16 mb-14 last:mb-0"
            :rounded="!isCardStyled ? 'rounded-xlg' : ''"
            :is-default-background="!isCardStyled"
            :class="!isCardStyled ?
              'p-10' :
              `
              border-b
              border-solid
              border-tugce-silver
              dark:border-rushing-river-second
              last:border-none
              pb-14
              last:pb-0
            `
            "
          >
            <div class="flex justify-between">
              <div class="flex space-x-12 items-center">
                <AppIcon
                  name="buy-sell-arrow"
                  :size="25"
                  :class="item.side === EOrderSideType.BUY ?
                    'text-spring-bouquet' :
                    'text-pochard-duck-head transform rotate-180'"
                />
                <div class="flex flex-col">
                  <!-- SIDE/PAIR -->
                  <div class="flex space-x-4 uppercase font-semibold items-center">
                    <span :class="item.side === EOrderSideType.BUY ? 'text-spring-bouquet' : 'text-pochard-duck-head'">
                      {{ item.side }}
                    </span>

                    <span class="text-ball-blue">{{ item.sbl ? item.sbl : 'N/A' }}</span>

                    <!-- IF STATUS IS OPEN -->
                    <span
                      v-if="item.userOrderStatus?.toLowerCase() === 'waiting'"
                      class="bg-foam-green h-10 w-10 rounded-full"
                    />
                  </div>

                  <!-- DATE -->
                  <AppTruncatedTooltip
                    class="text-beguiling-blue dark:text-blair text-sm capitalize"
                    :content="$filters.date(item.created_at)"
                  />
                </div>
              </div>

              <!-- AMOUNT/ORDER PRICE -->
              <div class="flex flex-col items-end">
                <div class="font-semibold text-beguiling-blue dark:text-white">
                  {{ Number(item.qtyBaseAsked).toFixed(4) }} {{ item.baseCurrency }}
                </div>

                <div
                  v-if="(
                    item.userOrderStatus?.toLowerCase() !== 'cancelled' &&
                    item.userOrderStatus?.toLowerCase() !== 'failed'
                  )"
                  class="text-beguiling-blue dark:text-white text-xs"
                >
                  {{ `${formatNumber(Number(getOrderPrice(item)))} ${item.quoteCurrency}` }}
                </div>
                <div v-else class="text-pochard-duck-head text-xs capitalize">{{ item.userOrderStatus }}</div>
              </div>
            </div>

            <div class="flex space-x-5">
              <!-- ACCOUNT -->
              <AppTag type="secondary" class="flex space-x-4">
                <img :src="getExchangeImage(item.exch)" :alt="item.exch" class="w-12 max-w-12 h-12">
                <AppTruncatedTooltip
                  class="text-beguiling-blue dark:text-light-steel-blue text-xs"
                  :content="item.accountName"
                />
              </AppTag>

              <!-- ORDER TYPE -->
              <AppTag type="secondary">
                <span class="text-beguiling-blue dark:text-light-steel-blue text-xs">
                  {{ item.orderType === 'Limit' ? 'Limit' : 'Market' }}
                </span>
              </AppTag>

              <!-- STATUS -->
              <AppTag type="secondary" class="flex space-x-4">
                <span class="text-beguiling-blue dark:text-light-steel-blue text-xs capitalize">
                  {{ item.userOrderStatus?.toLowerCase() === 'waiting' ? 'open' : item.userOrderStatus }}
                </span>
              </AppTag>

              <!-- TOTAL -->
              <AppTag type="secondary" class="flex space-x-4">
                <AppTruncatedTooltip
                  class="text-beguiling-blue dark:text-light-steel-blue text-xs"
                  :content="item.userOrderStatus?.toLowerCase() !== 'cancelled' &&
                    item.userOrderStatus?.toLowerCase() !== 'failed' ?
                      `${getTotal(item)} ${item.quoteCurrency}`: `0 ${item.quoteCurrency}`"
                />
              </AppTag>
            </div>
          </AppCard>
        </div>
      </template>

      <template v-else>
        <AppNoData class="py-60" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import { formatNumber } from '@/core/helpers'

import { TCallbackFn } from '@/types'
import { EOrderSideType } from '../../trade-types'

import { useMyOrder } from './my-orders.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import MyOrdersFilterBar from './MyOrdersFilterBar.vue'

export default defineComponent({
  name: 'MyOrders',

  components: { MyOrdersFilterBar },

  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    },

    customFilterFn: {
      type: Function as PropType<TCallbackFn<any, boolean>>,
      default: () => true
    },

    isFilters: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    height: {
      type: String as PropType<string>,
      default: ''
    },

    isCardStyled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup (props) {
    const { isDarkMode } = useGlobal()
    const { isMD } = useCustomBreakpoints()
    const {
      getMyOrdersFilteredData,
      getExchangeImage,
      getOrderPrice,
      getTotal,
      cancelOrder
    } = useMyOrder()

    const headersTrades = [
      { property: 'account', label: 'Account', minWidth: 200 },
      { property: 'date', label: 'Date', minWidth: 200 },
      { property: 'sbl', label: 'Pair', minWidth: 150 },
      { property: 'side', label: 'Side', width: 100 },
      { property: 'orderPrice', label: 'Order Price', minWidth: 150 },
      { property: 'amount', label: 'Amount', width: 150 },
      { property: 'orderType', label: 'Order Type', minWidth: 150 },
      { property: 'total', label: 'Total', minWidth: 150 },
      { property: 'status', label: 'Status', minWidth: 150 },
      { property: 'actions', label: '', minWidth: 150 }
    ]

    const myOrdersFilteredData = computed(() => getMyOrdersFilteredData(props.isFilters).filter(props.customFilterFn))

    return {
      isMD,
      EOrderSideType,
      isDarkMode,
      headersTrades,
      myOrdersFilteredData,
      formatNumber,
      getOrderPrice,
      getTotal,
      getExchangeImage,
      cancelOrder
    }
  }
})
</script>
