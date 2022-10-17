<template>
  <div class="flex flex-col flex-grow space-y-20 4xl:space-y-24 w-full overflow-y-auto custom-scrollbar">
    <!-- TRADE FILTER BAR -->
    <TradeFilterBar />

    <!-- ROW 2 (DESKTOP) -->
    <mq-layout mq="xl+" class="space-y-20 4xl:space-y-24">
      <div class="new-order__second-row flex flex-shrink-0 space-x-20 4xl:space-x-24 overflow-y-auto custom-scrollbar">
        <!-- ORDER BOOK -->
        <TradeOrderBook class="new-order__order-book w-1/5" />

        <!-- CHART -->
        <TradingViewChart :symbol="widgetSymbol" class="w-3/5" />

        <!-- TRADE HISTORY -->
        <TradeHistory class="w-1/5" />
      </div>

      <div class="new-order__third-row flex flex-shrink-0 space-x-20 4xl:space-x-24 overflow-y-auto custom-scrollbar">
        <!-- BALANCE -->
        <div class="flex w-1/5">
          <Balance />
        </div>

        <!-- CREATE ORDER -->
        <div class="flex w-4/5 space-x-20 4xl:space-x-24 overflow-y-auto custom-scrollbar">
          <!-- ORDER BUY -->
          <OrderCardBuy />

          <!-- ORDER SELL -->
          <OrderCardSell />
        </div>
      </div>
    </mq-layout>

    <!-- ROW 2 (TABLET) -->
    <mq-layout mq="lg" class="space-y-20">
      <div class="flex flex-col flex-shrink-0 space-y-20 overflow-y-auto custom-scrollbar">
        <!-- CHART -->
        <TradingViewChart :symbol="widgetSymbol" class="new-order__chart flex-shrink-0" />

        <div class="grid grid-cols-3 gap-x-20 flex-shrink-0">
          <!-- BALANCE -->
          <Balance class="new-order__balance" />

          <!-- ORDER BOOK -->
          <TradeOrderBook class="new-order__order-book" />

          <!-- TRADE HISTORY -->
          <TradeHistory class="new-order__trade-history" />
        </div>
      </div>

      <div class="new-order__third-row grid grid-cols-2 gap-x-20 flex-shrink-0 overflow-y-auto custom-scrollbar">
        <!-- ORDER BUY -->
        <OrderCardBuy />

        <!-- ORDER SELL -->
        <OrderCardSell />
      </div>
    </mq-layout>

    <!-- OPEN TRADES (TABLET - DESKTOP) -->
    <mq-layout mq="lg+" class="new-order__fourth-row flex flex-shrink-0 overflow-y-auto custom-scrollbar">
      <MyOrders
        title="Open Orders"
        class="flex-shrink-0"
        height="300"
        :custom-filter-fn="(el) => el.userOrderStatus === 'waiting' || el.userOrderStatus === 'partial'"
      />
    </mq-layout>

    <!-- MOBILE -->
    <mq-layout mq="sm-md" class="flex flex-col">
      <div class="flex flex-col space-y-20">
        <!-- CHART -->
        <TradingViewChart :symbol="widgetSymbol" class="h-300" />

        <!-- BUTTON WHICH OPEN (BUY | SELL) ORDER VIEW -->
        <div :class="availableAccounts.length ? 'grid grid-cols-2 gap-x-20' : 'flex flex-col w-full'">
          <!-- STATE IF ACCOUNTS AVAILABLE -->
          <template v-if="availableAccounts.length">
            <!-- STATE IF ACCOUNT VALID -->
            <template v-if="defaultAccount.valid">
              <!-- BUY -->
              <AppButton
                type="blue-gradient"
                rounded="xl"
                size="xlg"
                class="w-full"
                @click="onChagneOrderView('buy')"
              >
                {{ `Buy ${defaultPair?.quoteCurrency ? defaultPair.quoteCurrency : binanceBtcUsdt.quoteCurrency}` }}
              </AppButton>

              <!-- SELL -->
              <AppButton
                type="purple-gradient"
                rounded="xl"
                size="xlg"
                class="w-full"
                @click="onChagneOrderView('sell')"
              >
                {{ `Sell ${defaultPair?.baseCurrency ? defaultPair.baseCurrency : binanceBtcUsdt.baseCurrency}` }}
              </AppButton>
            </template>
            <template v-else>
              <AppButton class="w-full" rounded="xl" size="xlg" disabled>API key is not valid</AppButton>
            </template>
          </template>

          <!-- STATE IF NO ACCOUNTS -->
          <template v-else>
            <router-link #default="{ navigate }" :to="{ name: routeNames.keys }" custom>
              <AppButton size="xlg" rounded="xl" class="w-full mt-auto" @click="navigate()">
                Connect an account
              </AppButton>
            </router-link>
          </template>
        </div>

        <!-- BALANCE -->
        <AppExpand v-model="balanceExpandValue">
          <!-- PREVIEW -->
          <template #preview>
            <div class="text-chicory-flower dark:text-blair font-medium w-full pl-10 self-center">
              Balance {{ defaultAccount.name ? ` on (${defaultAccount.name })` : ' (account not detected)' }}
            </div>
          </template>

          <!-- CONTENT -->
          <template #content>
            <Balance class="min-h-300 max-h-300" />
          </template>
        </AppExpand>

        <!-- ORDER BOOK -->
        <AppExpand v-model="orderBookExpandValue">
          <!-- PREVIEW -->
          <template #preview>
            <div class="text-chicory-flower dark:text-blair font-medium w-full pl-10 self-center">
              {{ `Order Book ${defaultPair?.name ? `(${defaultPair?.name})` : `(${binanceBtcUsdt.name})`} ` }}
            </div>
          </template>

          <!-- CONTENT -->
          <template #content>
            <TradeOrderBook class="min-h-300 max-h-300" />
          </template>
        </AppExpand>

        <!-- TRADE HISTORY -->
        <AppExpand v-model="tradeHistoryExpandValue">
          <!-- PREVIEW -->
          <template #preview>
            <div class="text-chicory-flower dark:text-blair font-medium w-full pl-10 self-center">
              Trade History
            </div>
          </template>

          <!-- CONTENT -->
          <template #content>
            <TradeHistory class="min-h-300 max-h-300" />
          </template>
        </AppExpand>

        <!-- OPEN ORDERS -->
        <AppExpand v-model="openOrdersExpandValue">
          <!-- PREVIEW -->
          <template #preview>
            <div class="text-chicory-flower dark:text-blair font-medium w-full pl-10 self-center">
              Open Orders
            </div>
          </template>

          <!-- CONTENT -->
          <template #content>
            <MyOrders
              :custom-filter-fn="(el) => el.userOrderStatus === 'waiting' || el.userOrderStatus === 'partial'"
              height="300"
              is-card-styled
            />
          </template>
        </AppExpand>
      </div>
    </mq-layout>

    <!-- ORDER BUY SELL (MOBILE) -->
    <OrderBuySellMobile :order-view="orderBuySellView" @on-close="handleCloseOrderView" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { routeNames } from '@/router'

import { useTrade } from '@/views/trade/trade-composition.setup'
import { useMyOrder } from '@/views/trade/components/my-orders/my-orders.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

import TradeFilterBar from './filters/TradeFilterBar.vue'
import TradeOrderBook from './order-book/TradeOrderBook.vue'
import TradingViewChart from './chart/TradingViewChart.vue'
import TradeHistory from './trade-history/TradeHistory.vue'
import Balance from './balance/Balance.vue'
import OrderCardBuy from './order/OrderCardBuy.vue'
import OrderCardSell from './order/OrderCardSell.vue'
import OrderBuySellMobile from './order/OrderBuySellMobile.vue'
import MyOrders from '../my-orders/MyOrders.vue'

type TOrder = 'buy' | 'sell'

export default defineComponent({
  name: 'TradeNewOrder',

  components: {
    TradeFilterBar,
    TradeOrderBook,
    TradingViewChart,
    TradeHistory,
    Balance,
    OrderCardBuy,
    OrderCardSell,
    OrderBuySellMobile,
    MyOrders
  },

  setup () {
    const { setDefaultAccount, availableAccounts, defaultPair, defaultAccount } = useGlobal()
    const {
      widgetSymbol,
      binanceBtcUsdt,
      fetchPriceAndSettings,
      fetchOrderBookData,
      setOrderBookFetchAllowed,
      fetchTradeHistoryData,
      setTradeHisotryFetchAllowed,
      fetchPortfolio,
      fetchTradingBalance
    } = useTrade()
    const { fetchOrders } = useMyOrder()

    const balanceExpandValue = ref<boolean>(false)
    const orderBookExpandValue = ref<boolean>(false)
    const tradeHistoryExpandValue = ref<boolean>(false)
    const openOrdersExpandValue = ref<boolean>(false)

    const orderBuySellView = ref<TOrder>()
    function onChagneOrderView (name: TOrder) {
      orderBuySellView.value = name
    }
    function handleCloseOrderView (value: TOrder) {
      orderBuySellView.value = value
    }

    async function initData (): Promise<void> {
      setDefaultAccount(false)
      await fetchPriceAndSettings()
      fetchOrderBookData()
      fetchTradeHistoryData()

      if (availableAccounts.value.length) {
        fetchOrders()
        fetchPortfolio()
        fetchTradingBalance()
      }
    }
    initData()

    onMounted(() => {
      setOrderBookFetchAllowed(true)
      setTradeHisotryFetchAllowed(true)
    })

    onBeforeUnmount(() => {
      setOrderBookFetchAllowed(false)
      setTradeHisotryFetchAllowed(false)
    })

    return {
      routeNames,
      balanceExpandValue,
      orderBookExpandValue,
      tradeHistoryExpandValue,
      openOrdersExpandValue,
      widgetSymbol,
      binanceBtcUsdt,
      availableAccounts,
      defaultPair,
      defaultAccount,
      orderBuySellView,
      onChagneOrderView,
      handleCloseOrderView
    }
  }

})
</script>

<style lang="scss" scoped>
.new-order {
  &__fourth-row {
    min-height: 200px;
  }

  @media(min-width: 2500px) {
    &__second-row {
      height: 585px;
    }

    &__third-row {
      height: 485px;
    }
  }

  @media(min-width: 1024px) and (max-width: 2499px) {
    &__second-row {
      height: 450px;
    }

    &__third-row {
      height: 365px;
    }
  }

  @media(max-width: 1023px) {

    &__third-row {
      height: 365px;
    }

    &__chart {
      height: 300px;
    }

    &__trade-history,
    &__order-book,
    &__balance {
      height: 300px;
    }
  }
}
</style>
