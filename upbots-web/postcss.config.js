/* eslint-disable @typescript-eslint/no-var-requires */
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')
const purgecssConfig = {
  content: [
    './public/**/*.html',
    './src/assets/styles/**/*.css',
    './src/**/*.html',
    './src/**/*.vue'
  ],
  whitelist: [
    'vue-recycle-scroller',
    'direction-vertical',
    'ready',
    'scroller',
    'resize-observer'
  ],
  whitelistPatterns: [
    /-(leave|enter|appear)(|-(to|from|active))$/,
    /^(?!(|.*?:)cursor-move).+-move$/,
    /^router-link(|-exact)-active$/,
    /data-v-.*/,
    /swiper-/,
    /rounded-/,
    /size-/,
    /fade-/,
    /dropdown-/,
    /vue-recycle-scroller__/,
    /resize-/,
    /icon-/
  ],
  extractors: [
    {
      extractor: (content) => content.match(/[A-Za-z0-9-+_:/]+/g) || [],
      extensions: ['html', 'vue', 'js', 'css']
    }
  ]
}
module.exports = {
  plugins: [tailwindcss, autoprefixer(), ...(process.env.VUE_APP_NODE_ENV === 'local' ? [] : [purgecss(purgecssConfig)])]
}
