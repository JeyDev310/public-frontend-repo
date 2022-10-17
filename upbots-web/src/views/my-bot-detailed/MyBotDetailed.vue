<template>
  <div class="flex flex-col flex-grow relative w-full overflow-y-hidden custom-scrollbar">
    <!-- TITLE -->
    <AppLoader v-if="loading" class="rounded-xlg" />

    <template v-else>
      <MyBotDetailedActiveInactive />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

import { routeNames, router } from '@/router'
import { useRoute } from 'vue-router'

import { ECategory } from '@/types'

import { useMyBotDetailed } from './my-bot-detailed.composition.setup'

import MyBotDetailedActiveInactive from './components/MyBotDetailedActiveInactive.vue'

export default defineComponent({
  name: 'MyBotDetailed',

  components: { MyBotDetailedActiveInactive },

  setup () {
    /* USE ROUTE */
    const route = useRoute()

    const {
      bot,
      subscriptionBot,
      fetchBotSnapshotById,
      fetchBotSubscriptionById
    } = useMyBotDetailed()

    /* STATE */
    const state = reactive({
      loading: true as boolean
    })

    async function initData (): Promise<void> {
      state.loading = true

      await fetchBotSnapshotById(route.params.id as string)
      await fetchBotSubscriptionById(route.params.id as string)

      if (Object.keys(bot.value).length && bot.value.category === ECategory.UserBot) {
        state.loading = false
      } else {
        router.push({ name: routeNames.algoBots })
      }
    }

    onMounted(() => { initData() })

    return { ...toRefs(state), bot, subscriptionBot }
  }
})
</script>
