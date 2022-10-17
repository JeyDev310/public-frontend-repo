import { ILineChartColors } from '@/types'

export const defaultGrid = (options = { left: '20px', right: '20px', bottom: '20px', top: '20px' }, containLabel = true) => Object.freeze({
  left: options.left,
  right: options.right,
  bottom: options.bottom,
  top: options.top,
  containLabel
})

export const defaultTooltip = () => Object.freeze({
  trigger: 'axis',
  axisPointer: {
    type: 'cross',
    label: {
      backgroundColor: '#222'
    }
  }
})

export const defaultXAxis = (show = true) => Object.freeze({
  boundaryGap: false,
  axisLine: {
    lineStyle: {
      color: '#427E7E'
    }
  },
  show
})

export const defaultYAxis = (splitLineColor: string, show = true) => ({
  type: 'value',
  axisLine: {
    lineStyle: {
      color: '#6DD3C9'
    }
  },
  splitLine: {
    lineStyle: {
      width: 1,
      color: splitLineColor
    }
  },
  show
})

export const lineChartColorSet: ILineChartColors[] = [
  { line: 'rgba(50,218,245, 1)', from: 'rgba(50,218,245, 1)', to: 'rgba(50,218,245,0)' },
  { line: 'rgba(132,130,210,1)', from: 'rgba(132,130,210,1)', to: 'rgba(132,130,210,0)' },
  { line: 'rgba(255,133,228, 1)', from: 'rgba(255,133,228, 1)', to: 'rgba(255,133,228,0)' },
  { line: 'rgba(239, 150, 122, 1)', from: 'rgba(239, 150, 122, 1)', to: 'rgba(239, 150, 122, 0)' },
  { line: 'rgba(119, 112, 254, 1)', from: 'rgba(119, 112, 254, 1)', to: 'rgba(119, 112, 254, 0)' },
  { line: 'rgba(37, 166, 200, 1)', from: 'rgba(37, 166, 200, 1)', to: 'rgba(37, 166, 200, 0)' },
  { line: 'rgba(69, 56, 224, 1)', from: 'rgba(69, 56, 224, 1)', to: 'rgba(69, 56, 224, 0)' },
  { line: 'rgba(210, 214, 51, 1)', from: 'rgba(210, 214, 51, 1)', to: 'rgba(210, 214, 51, 0)' },
  { line: 'rgba(96, 198, 48, 1)', from: 'rgba(96, 198, 48, 1)', to: 'rgba(96, 198, 48, 0)' },
  { line: 'rgba(255, 15, 123, 1)', from: 'rgba(255, 15, 123, 1)', to: 'rgba(255, 15, 123, 0)' },
  { line: 'rgba(37, 166, 200, 1)', from: 'rgba(37, 166, 200, 1)', to: 'rgba(37, 166, 200, 0)' },
  { line: 'rgba(117, 170, 212, 1)', from: 'rgba(117, 170, 212, 1)', to: 'rgba(117, 170, 212, 0)' },
  { line: 'rgba(114, 9, 183, 1)', from: 'rgba(114, 9, 183, 1)', to: 'rgba(114, 9, 183,0)' },
  { line: 'rgba(181, 23, 158, 1)', from: 'rgba(181, 23, 158, 1)', to: 'rgba(181, 23, 158,0)' },
  { line: 'rgba(70, 100, 50, 1)', from: 'rgba(70, 100, 50, 1)', to: 'rgba(70, 100, 50, 0)' }
]

export const pieChartColorSet: ILineChartColors[] = [
  { from: '#EF967A', to: '#EF967A' },
  { from: '#7770FE', to: '#7770FE' },
  { from: '#25A6C8', to: '#25A6C8' },
  { from: '#4538E0', to: '#4538E0' },
  { from: '#D2D633', to: '#D2D633' },
  { from: '#60C630', to: '#60C630' },
  { from: '#ff0f7b', to: '#f89b29' },
  { from: '#25A6C8', to: '#06D7CE' },
  { from: 'rgba(117, 170, 212, 1)', to: 'rgba(17, 239, 225, 1)' }
]
