<template>
  <div class="playground-wrapper flex flex-col flex-grow overflow-y-hidden">
    <!-- HEADER -->
    <div class="flex items-center px-20 py-24 bg-deep-blue-sea">
      <div class="flex items-center flex-grow">
        <span class="mr-10 text-tradewind text-xl font-bold">Playgrounds: </span>
        <span class="text-mint-chiffon text-lg font-medium">{{ route.name }}</span>
      </div>

      <AppThemeToggle wrapper-classes="mr-30 text-white" size="24" />

      <router-link :to="{ name: routeNames.rootPage }" class="text-mint-chiffon font-bold">Go to App</router-link>
    </div>

    <!-- MAIN -->
    <div class="flex flex-grow overflow-y-hidden">
      <!-- SIDEBAR -->
      <ul class="flex flex-col bg-deep-blue-sea overflow-auto" style="min-width: 200px">
        <router-link
          v-for="{ name, path } of playgroundNavigation"
          :key="path"
          #default="{ navigate, isActive }"
          :to="{ name }"
          custom
        >
          <li
            class="py-10 px-40 text-white cursor-pointer"
            :class="{'text-aqua-fresco font-bold': isActive }"
            @click="navigate"
          >
            {{ name }}
          </li>
        </router-link>
      </ul>

      <!-- CONTENT -->
      <div class="flex flex-grow overflow-y-scroll custom-scrollbar p-20 mb-20">
        <router-view #default="{ Component }">
          <component :is="Component" :tailwind="tailwind" class="w-full" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { playgroundElementRoutes } from './playground.routes'
import { useRoute, routeNames } from '@/router'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { theme } = require('../../tailwind.config')

export default defineComponent({
  name: 'Playground',

  beforeRouteEnter (to, from, next) {
    if (process.env.VUE_APP_NODE_ENV !== 'local') {
      return next({ name: routeNames.notFound })
    }
    next()
  },

  setup () {
    const route = useRoute()

    const playgroundNavigation = playgroundElementRoutes
    const tailwind = theme

    return { playgroundNavigation, route, routeNames, tailwind }
  }
})
</script>
