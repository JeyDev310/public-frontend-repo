import { registerTheme } from 'echarts/core'

const theme = {
  backgroundColor: 'transparent',
  legendTextColor: '#fff',
  textColor: '#fff',
  markTextColor: '#fff',
  textStyle: {
    fontFamily: 'Montserrat'
  }
}

export const registerChartTheme = () => {
  registerTheme('upbDark', theme)
  console.info('Chart theme "upbDark" has been registered')
}
