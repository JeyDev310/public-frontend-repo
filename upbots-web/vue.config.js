module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      analyzerMode: 'disabled',
      openAnalyzer: false // set true to open analyzer
    }
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true, // forces PWA to use new update service worker (Safari mainly)
      clientsClaim: true
    }
  }
}
