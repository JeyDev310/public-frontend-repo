import { graphic } from 'echarts/core'
import { lineChartColorSet, pieChartColorSet } from './charts.config'
import { ILineChartColors, ILineChartDataRaw, IBuildChartData, TIndexedArray } from '@/types'

// TODO need to review and refactor

export const createGradient = ({ from, to }: ILineChartColors) => {
  return new graphic.LinearGradient(0, 0, 0, 1, [{
    offset: 0,
    color: from
  }, {
    offset: 1,
    color: to
  }])
}

export const createMarkersData = (data: TIndexedArray<string | number>) => {
  const markersData: TIndexedArray<string | number> = []

  data.forEach((el) => {
    markersData.push(
      {
        coord: [el.openAt.slice(0, 10), el.entryPrice],
        itemStyle: {
          color: lineChartColorSet[0].line,
          shadowColor: lineChartColorSet[0].line
        },
        label: {
          formatter: 'B'
        }
      }
    )

    if (!el.open) {
      markersData.push({
        coord: [el.closeAt.slice(0, 10), el.closePrice],
        itemStyle: {
          color: 'rgba(127, 0, 129, 1)',
          shadowColor: 'rgba(127, 0, 129, 1)'
        },
        label: {
          formatter: 'S'
        }
      })
    }
  })

  return markersData
}

export const createMarkers = (data: TIndexedArray<string | number>) => {
  return {
    data,
    itemStyle: {
      borderColor: 'white',
      borderWidth: 2
    },
    label: {
      show: true,
      color: 'white',
      fontSize: 8
    },
    symbolOffset: [0, -10],
    symbolSize: 20,
    symbol: 'circle'
  }
}

export const buildLineChartColors = (index: number) => {
  const colors: ILineChartColors[] = lineChartColorSet
  const colorIndex = index <= lineChartColorSet.length - 1 ? index : index % lineChartColorSet.length

  return {
    itemStyle: {
      color: colors[colorIndex].line
    },
    areaStyle: {
      color: createGradient(colors[colorIndex])
    }
  }
}

export const buildChartData = (properties: IBuildChartData) => {
  const smooth = properties.smooth ?? 0.4
  const symbol = properties.symbol ?? 'circle'
  const symbolSize = properties.symbolSize ?? 5
  const markPoint = properties.markers ?? null

  return properties.data.map(({ name, data }, index) => {
    return {
      name,
      data,
      smooth,
      symbol,
      symbolSize,
      type: 'line',
      markPoint,
      ...buildLineChartColors(properties.outherIndex ?? index)
    }
  })
}

export const buildPieChartData = (dataRaw: ILineChartDataRaw[]) => {
  const colors: ILineChartColors[] = pieChartColorSet
  const data: any = []
  const color: any = []

  dataRaw.forEach((raw, index) => {
    // TODO IMPROVE IT //
    const colorIndex = index <= pieChartColorSet.length - 1 ? index : index % pieChartColorSet.length
    data.push({ name: raw.name, value: raw.data, color: colors[colorIndex] })
    color.push(createGradient(colors[colorIndex]))
  })

  return {
    data,
    color
  }
}

export const portfolioEvolutionSeries = (properties: IBuildChartData) => {
  const smooth = properties.smooth ?? 0.4
  const symbol = properties.symbol ?? 'circle'
  const symbolSize = properties.symbolSize ?? 5

  return properties.data.map(({ name, data }, index) => {
    return {
      name,
      data,
      smooth,
      symbol,
      symbolSize,
      type: 'line',
      ...buildLineChartColors(properties.outherIndex ?? index),
      yAxisIndex: index
    }
  })
}
