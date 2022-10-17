<template>
  <div class="flex flex-col flex-grow relative w-full overflow-y-hidden custom-scrollbar">
    <!-- LOADING -->
    <AppLoader v-if="loading" class="rounded-xlg" />

    <!-- DATA -->
    <template v-else>
      <AlgoBotsDetailedActiveInactive />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

import { routeNames, router } from '@/router'
import { useRoute } from 'vue-router'

import { ECategory } from '@/types'

import { useAlgoBotsDetailed } from './components/algo-bots-detailed/algo-bots-detailed.composition.setup'

import AlgoBotsDetailedActiveInactive from '@/views/algobots/components/algo-bots-detailed/AlgoBotsDetailedActiveInactive.vue'

export default defineComponent({
  name: 'AlgoBotDetailed',

  components: { AlgoBotsDetailedActiveInactive },

  setup () {
    const route = useRoute()

    const { bot, fetchBotSnapshotById, fetchBotSubscriptionById } = useAlgoBotsDetailed()

    const state = reactive({
      loading: true as boolean
    })

    async function initData (): Promise<void> {
      state.loading = true

      await fetchBotSnapshotById(route.params.id as string)
      await fetchBotSubscriptionById(route.params.id as string)

      if (Object.keys(bot.value).length && bot.value.category === ECategory.AlgoBot) {
        state.loading = false
      } else {
        router.push({ name: routeNames.algoBots })
      }
    }

    onMounted(() => { initData() })

    return { ...toRefs(state) }
  }
})
</script>
