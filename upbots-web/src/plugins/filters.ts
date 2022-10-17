import { App } from 'vue'
import dayjs from 'dayjs'
import { fixedDecimal as fixedDecimalHelper, truncString as truncStringPortion, coinChecker as coinCheckerHelper } from '../core/helpers/index'

const date = (value: string | Date, format = 'MMM D, YYYY h:mm A') => {
  return dayjs(value).format(format)
}

const fixedDecimal = fixedDecimalHelper

const perfs = (num: number) => {
  const toNum = Number(num)
  return toNum ? `${toNum >= 0 ? '+' : ''}${toNum.toFixed(2)}%` : '-'
}

const truncString = truncStringPortion

const coinChecker = coinCheckerHelper

export const filters = {
  install: (app: App): void => {
    app.config.globalProperties.$filters = {
      date,
      fixedDecimal,
      perfs,
      truncString,
      coinChecker
    }
  }
}
