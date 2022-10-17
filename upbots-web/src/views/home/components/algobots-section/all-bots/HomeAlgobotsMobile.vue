<template>
  <div class="flex flex-col flex-grow space-y-20 overflow-y-auto custom-scrollbar">
    <HomeAlgobotsMobileItem
      v-for="(item, index) in bots"
      :key="item.id"
      :data="item"
      :index="index"
      :loading="botsLoading"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useBots } from '@/global-setup/bots.composition.setup'

import HomeAlgobotsMobileItem from './HomeAlgobotsMobileItem.vue'

export default defineComponent({
  name: 'HomeAlgobotsMobile',

  components: { HomeAlgobotsMobileItem },

  setup () {
    const { bots, botsLoading } = useBots()

    return { bots, botsLoading }
  }
})
</script>
