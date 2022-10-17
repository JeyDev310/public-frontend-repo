<template>
  <template v-if="loading">
    <AppLoader />
  </template>

  <template v-else>
    <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <!-- CONTENT -->
      <div class="intro__container flex flex-col flex-grow w-full mx-auto overflow-y-auto custom-scrollbar">
        <!-- HERO SECTION -->
        <IntroHero />

        <!-- TUTORIAL LINKS SECTION -->
        <IntroTuto />

        <!-- BLOG SECTION -->
        <IntroBlog />

        <!-- HELP SECTION -->
        <IntroHelp />
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import { vuex } from '@/store'
import { EErrorsMessage } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useBots } from '@/global-setup/bots.composition.setup'

import IntroHero from './components/intro-hero/IntroHero.vue'
import IntroTuto from './components/IntroTuto.vue'
import IntroBlog from './components/intro-blog/IntroBlog.vue'
import IntroHelp from './components/IntroHelp.vue'

export default defineComponent({
  name: 'Introduction',

  components: { IntroHero, IntroTuto, IntroBlog, IntroHelp },

  setup () {
    const { fetchSubscriptedBots } = useBots()

    const loading = ref<boolean>(false)

    async function initData (): Promise<void> {
      loading.value = true

      try {
        await Promise.all([
          vuex.auth.fetchUserInfo(),
          vuex.ubxtWallet.fetchUserWallet(),
          fetchSubscriptedBots()
        ])
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => { initData() })

    return { loading }
  }
})
</script>

<style lang="scss" scoped>
.intro {
  &__container {
    max-width: 1300px;
  }
}
</style>
