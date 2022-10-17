import { createApp } from 'vue'
import App from '@/App.vue'
import VueMq from 'vue3-mq'

import SocketIO from '@/plugins/socket-io.plugin'
import VueVirtualScroller from 'vue-virtual-scroller'

/* SOCIAL MEDIA LINKS */
import VueSocialSharing from 'vue-social-sharing'

import VuePapaParse from 'vue-papa-parse'

import { router } from '@/router'
import { store } from '@/store'
import { globalComponent } from '@/registerGlobalComponents'
import { PortalPlugin, filters, directives } from '@/plugins'

import '@/assets/css/main.css'

import '@/registerServiceWorker'

export const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(SocketIO, {
    connection: process.env.VUE_APP_ROOT_API || 'http://localhost:3000',
    options: {
      autoConnect: false,
      reconnectionAttempts: 40, // default infinity
      reconnectionDelay: 4000
    }
  }, { store })
  .use(PortalPlugin)
  .use(globalComponent)
  .use(VueMq, {
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1440,
      '3xl': 1920,
      '4xl': 2500,
      '5xl': 3000,
      '6xl': Infinity
    }
  })
  .use(filters)
  .use(directives)
  .use(VueVirtualScroller)
  .use(VueSocialSharing)
  .use(VuePapaParse)
app.provide('$papa', app.config.globalProperties.$papa)
router.isReady().then(() => {
  app.mount('#app')
})
