<template>
  <div class="flex items-center justify-center w-full space-x-20 md:space-x-50 mt-40">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="
        font-medium
        text-base
        md:text-md2
        text-nile-blue
        dark:text-soaring-eagle
        hover:text-hidden-sea-glass
        transition
        duration-300
      "
    >
      <!-- IF BUY UBXT MODAL -->
      <template v-if="item.route">
        <router-link #default="{ navigate }" :to="{ name: item.route }" custom>
          <span class="cursor-pointer" @click="navigate()">{{ item.name }}</span>
        </router-link>
      </template>

      <!-- IF LINKS -->
      <template v-else>
        <a :href="item.link" target="_blank">
          {{ item.name }}
        </a>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routeNames } from '@/router'

export default defineComponent({
  name: 'StakingFooter',

  setup () {
    const data = [
      { name: 'Buy UBXT', value: 'buy-ubxt', route: routeNames.buyUBXT, link: null },
      { name: 'Discord', value: 'discord', route: null, link: 'https://discord.com/invite/wCrdMYEVjd' },
      { name: 'Telegram', value: 'telegram', route: null, link: 'https://t.me/Upbots_announcement' },
      { name: 'GitBook', value: 'gitbook', route: null, link: 'https://upbots.gitbook.io/upbots/getting-started/what-is-upbots' }
    ]

    return { data, routeNames }
  }
})
</script>
