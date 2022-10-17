import { appNotify } from '@/components/stateless/notifications'
import { TIndexedObject } from '@/types'
import { ECryptoCurrency } from '@/types/crypto.types'

export * from './timer'
export * from '@/views/portfolio/helpers/cex'
export * from '@/views/portfolio/helpers/dex'
export * from '@/views/portfolio/helpers/summary'

export const cloneDeep = (value: any) => JSON.parse(JSON.stringify(value))

export const timeout = (ms: number): Promise<boolean> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getNestedProp = (obj: TIndexedObject, key: string) => {
  const arr: Array<string> = key.split('.')

  while (arr.length && obj) {
    const shift = arr.shift()
    if (shift) obj = obj[shift]
  }

  return obj
}

export const sortArrayByKey = (key: string, order = 'asc') => {
  return (a: TIndexedObject, b: TIndexedObject) => {
    const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
    const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]

    const comparison = (varA < varB) ? -1 : (varA > varB) ? 1 : 0

    return (order === 'desc') ? (comparison * -1) : comparison
  }
}

export const fixedDecimal = (value: string | number | null, to = 2, fallbackValue: string | number = '-') => {
  if (value === null || !value) {
    return fallbackValue
  } else {
    const toReturn = Number(value).toFixed(to)
    return toReturn === 'NaN' ? fallbackValue : toReturn
  }
}

export const truncString = (value: string, firstCharCount = 4, endCharCount = 4, dotCount = 3) => {
  let convertedStr = ''
  convertedStr += value.substring(0, firstCharCount)
  convertedStr += '.'.repeat(dotCount)
  convertedStr += value.substring(value.length - endCharCount, value.length)
  return convertedStr
}

export const coinChecker = (value: string) => {
  if (value === ECryptoCurrency.BTC) {
    return 'btc'
  } else if (value === ECryptoCurrency.ETH) {
    return ECryptoCurrency.ETH.toLowerCase()
  } else if (value === ECryptoCurrency.BUSD) {
    return ECryptoCurrency.BUSD.toLowerCase()
  } else if (value === ECryptoCurrency.BNB) {
    return ECryptoCurrency.BNB.toLowerCase()
  } else if (value === ECryptoCurrency.AVAX) {
    return ECryptoCurrency.AVAX.toLowerCase()
  } else if (value === ECryptoCurrency.UBXT) {
    return ECryptoCurrency.UBXT.toLowerCase()
  } else if (value === ECryptoCurrency.LINK) {
    return ECryptoCurrency.LINK.toLowerCase()
  } else if (value === ECryptoCurrency.TOMO) {
    return ECryptoCurrency.TOMO.toLowerCase()
  } else if (value === ECryptoCurrency.USDT) {
    return ECryptoCurrency.USDT.toLowerCase()
  } else {
    return 'generic'
  }
}

export const symbolChecker = (value: string) => {
  if (value === 'btc') return 'BTC'
  if (value === 'usd') return '$'
  if (value === 'eur') return '€'
  if (value === 'gbp') return '£'
  if (value === 'jpy') return '¥'
  if (value === 'cad') return 'CA$'
  if (value === 'chf') return 'Fr.'
  if (value === 'dkk') return 'Kr.'
}

export const collapsedItemColor = (collapsed: boolean, isDark: boolean) => {
  if (!collapsed && isDark) {
    return 'bg-crow-black-second bg-opacity-40'
  } else if (!collapsed && !isDark) {
    return 'bg-azureish-white bg-opacity-40'
  } else {
    return ''
  }
}

export const formatPrice = (price: number, decimals = 2) => {
  if (!price) {
    return 'N/A'
  } else if (parseFloat(price.toFixed(decimals)) !== 0) {
    return price.toFixed(decimals)
  } else {
    let i = decimals + 1
    while (parseFloat(price.toFixed(i)) === 0) i++
    return price.toFixed(i)
  }
}

export const formatNumber = (value: number, format = 'en-US') => {
  if (value > 100) {
    return Number(value.toFixed(2)).toLocaleString(format)
  } else {
    return Number(value.toFixed(3)).toLocaleString(format)
  }
}

export function copyToClipboard ({ value, infoMessage = 'Copied to clipboard' }: { value: string; infoMessage?: string; }) {
  const tempInput = document.createElement('input')
  tempInput.value = value
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand('copy')
  document.body.removeChild(tempInput)
  appNotify({ type: 'info', message: infoMessage })
}
