import { computed, reactive, toRefs } from 'vue'

import { tradeService } from '@/services'
import { IEnabledExchanges, IOrder, IOrderFormatted } from './my-orders.types'
import { EErrorsMessage } from '@/types'
import { IAccount } from '../../trade-types'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'
import { appNotify } from '@/components/stateless/notifications'

import { useGlobal } from '@/global-setup/global.composition.setup'

const myOrderState = reactive({
  loading: false as boolean,
  myOrders: [] as IOrderFormatted[],
  period: { start: '', end: '' } as { start: string; end: string;},
  accountFilterValues: [] as string[],
  pairFilterValues: [] as string[],
  sideFilterValues: [] as string[],
  orderTypeFilterValues: [] as string[],
  statusFilterValues: [] as string[]
})

/* USE GLOBAL SETUP */
const { accounts, tradingSettings } = useGlobal()

function formattedSelectData (
  key: 'accountName' | 'sbl' | 'userOrderStatus' | 'side' | 'orderType'
): { label: string; value: string; img?: string; }[] {
  // ADD TYPE //
  return myOrderState.myOrders.map((el) => {
    if (key === 'accountName') {
      return { label: el[key], value: el[key], img: el.exch }
    } else {
      return { label: el[key], value: el[key] }
    }
  }).filter((thing, index, self) => {
    return index === self.findIndex((t) => {
      return (t.label === thing.label && t.value === thing.value)
    })
  })
}

function orderParser (orders: IOrder[], exhangesPairs: IEnabledExchanges, keys: IAccount[]): IOrderFormatted[] {
  return orders.map((o: IOrder) => {
    const exKeyName = keys.find((k) => k.id === o.exchKeyId)
    const exSymbol = exhangesPairs[o.exch].find((ex) => {
      let pairSymbol = ex.symbol

      if (ex.exchange === 'ftx') {
        pairSymbol = pairSymbol.replace('/', '')
      }

      return ex.symbol === o.sbl || pairSymbol === o.sbl
    })

    return {
      ...o,
      accountName: (exKeyName && exKeyName.name) || 'N/A',
      baseCurrency: exSymbol?.baseCurrency || 'N/A',
      quoteCurrency: exSymbol?.quoteCurrency || 'N/A'
    }
  })
}

const getEnabledExchanges = computed((): IEnabledExchanges => {
  const enabledData = tradingSettings.value.filter((s) => s.enabled)

  const toReturn: IEnabledExchanges = {}
  enabledData.forEach((el) => { toReturn[el.name] = el.pairs })
  return toReturn
})

function getExchangeImage (exchange: string): string {
  return `/img/cryptocoins/${exchange === 'bitmex_test' ? 'bitmex' : exchange}.svg`
}

function getOrderPrice (item: IOrder): number | string {
  if (item.userOrderStatus === 'filled') return item?.completion?.pExec || 0
  return item.priceAsked
}

function getTotal (item: IOrder): string {
  if (item.userOrderStatus === 'filled') {
    if (item?.completion?.cumulQuoteCost) return item?.completion?.cumulQuoteCost.toFixed(4)
    return '0'
  } else {
    return (Number(item.qtyBaseAsked) * Number(item.priceAsked)).toFixed(4)
  }
}

async function fetchOrders (): Promise<void> {
  try {
    myOrderState.loading = true
    const res = await tradeService.getTradeDirectOrders()

    myOrderState.myOrders = orderParser(res.data, getEnabledExchanges.value, accounts.value)
    myOrderState.loading = false
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

async function cancelOrder (payload: IOrder): Promise<void> {
  const isAllow = await appConfirm({
    title: 'Are you sure you want to Delete Order?',
    actionsName: ['Cancel', 'Delete']
  })

  if (isAllow) {
    try {
      await tradeService.putTradeDirectorderCancel(payload.id)
      await fetchOrders()
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || 'Sorry, operation failed' })
    }
  }
}

function setPeriod (period: {start: string; end: string;}): void {
  myOrderState.period = period
}

const getAccountFilterData = computed(() => formattedSelectData('accountName'))
const getPairFilterData = computed(() => formattedSelectData('sbl'))
const getSideFilterData = computed(() => formattedSelectData('side'))
const getOrderTypeFilterData = computed(() => formattedSelectData('orderType'))
const getStatusFilterData = computed(() => formattedSelectData('userOrderStatus'))

function clearAllFilters (): void {
  myOrderState.accountFilterValues = []
  setPeriod({ start: '', end: '' })
  myOrderState.pairFilterValues = []
  myOrderState.sideFilterValues = []
  myOrderState.orderTypeFilterValues = []
  myOrderState.statusFilterValues = []
}

// MY ORDERS FILTERED DATA //
function getMyOrdersFilteredData (isFilters: boolean): IOrderFormatted[] {
  if (isFilters) {
    if (
      !myOrderState.period.start &&
          !myOrderState.period.end &&
          !myOrderState.accountFilterValues.length &&
          !myOrderState.pairFilterValues.length &&
          !myOrderState.sideFilterValues.length &&
          !myOrderState.orderTypeFilterValues.length &&
          !myOrderState.statusFilterValues.length
    ) {
      return myOrderState.myOrders
    }
    return myOrderState.myOrders.filter((i) => {
      const filterByAccount = myOrderState.accountFilterValues.includes(i.accountName)

      const filterByDate = myOrderState.period.start && myOrderState.period.end
        ? (new Date(i.created_at).toISOString().split('T')[0] >= new Date(myOrderState.period.start).toISOString().split('T')[0]) &&
          (new Date(i.created_at).toISOString().split('T')[0] <= new Date(myOrderState.period.end).toISOString().split('T')[0])
        : true

      const filterByPair = myOrderState.pairFilterValues.includes(i.sbl)

      const filterBySide = myOrderState.sideFilterValues.includes(i.side)

      const filterByOrderType = myOrderState.orderTypeFilterValues.includes(i.orderType)

      const filterByStatus = myOrderState.statusFilterValues.includes(i.userOrderStatus)

      return (
        filterByDate &&
            (!myOrderState.accountFilterValues.length || filterByAccount) &&
            (!myOrderState.pairFilterValues.length || filterByPair) &&
            (!myOrderState.sideFilterValues.length || filterBySide) &&
            (!myOrderState.orderTypeFilterValues.length || filterByOrderType) &&
            (!myOrderState.statusFilterValues.length || filterByStatus)
      )
    })
  } else {
    return myOrderState.myOrders
  }
}

export const useMyOrder = function () {
  return {
    ...toRefs(myOrderState),

    getAccountFilterData,
    getPairFilterData,
    getSideFilterData,
    getOrderTypeFilterData,
    getStatusFilterData,

    fetchOrders,
    getExchangeImage,
    getOrderPrice,
    getTotal,
    cancelOrder,
    setPeriod,
    clearAllFilters,
    getMyOrdersFilteredData
  }
}
