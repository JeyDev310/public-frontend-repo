<template>
  <div class="flex flex-col flex-grow w-full space-y-10 overflow-y-auto custom-scrollbar">
    <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <!-- IF DATA AVAILABLE -->
      <template v-if="subscriptedBots.length">
        <div
          v-for="(item, index) in subscriptedBots"
          :key="item.id"
          class="mb-12 last:mb-0 cursor-pointer"
        >
          <!-- BOT ITEM -->
          <HomeAlgobotsActiveMobileItem :item="item" :index="index" :loading="loading" />
        </div>
      </template>

      <!-- NO DATA STATE -->
      <AppNoData v-else class="text-md font-semibold" />
    </div>

    <!-- SEE MORE BOTS -->
    <div class="flex flex-col w-full mt-auto">
      <router-link #default="{ navigate }" :to="{ name: routeNames.algoBots }" custom>
        <AppButton type="grey-outlined" size="xlg" rounded="lg" @click="navigate()">
          See more
        </AppButton>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { routeNames } from '@/router'

import { useBots } from '@/global-setup/bots.composition.setup'

import HomeAlgobotsActiveMobileItem from './HomeAlgobotsActiveMobileItem.vue'

export default defineComponent({
  name: 'HomeAlgobotsActiveMobile',

  components: { HomeAlgobotsActiveMobileItem },

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup () {
    const { subscriptedBots } = useBots()

    return { routeNames, subscriptedBots }
  }
})
</script>
