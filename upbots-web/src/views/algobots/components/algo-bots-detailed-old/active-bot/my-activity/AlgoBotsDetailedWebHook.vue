<template>
  <div class="flex flex-col flex-grow relative lg:pt-20 md:pt-0 lg:px-30 overflow-y-scroll custom-scrollbar">
    <!-- LOADING -->
    <AppLoader v-if="loading || algoBotsDetailedLoading" />

    <!-- CONTENT -->
    <div v-else class="flex flex-col space-y-12">
      <div class="algobots-detailed-webhook__item">
        <div class="text-nile-blue dark:text-white text-sm md:text-base 4xl:text-md font-medium">
          Webhook URL
        </div>

        <AppTruncatedTooltip
          :content="webhookURL"
          class="text-nile-blue dark:text-blair text-sm 4xl:text-base"
        />

        <div class="flex justify-end">
          <AppButton
            size="xs"
            :disabled="!webhookURL"
            @click="copyInfo(webhookURL)"
          >
            Copy
          </AppButton>
        </div>
      </div>

      <div class="algobots-detailed-webhook__item">
        <div class="text-nile-blue dark:text-white text-sm md:text-base 4xl:text-md font-medium">
          Message(Open)
        </div>

        <AppTruncatedTooltip
          :content="webhookOpenMessage"
          class="text-nile-blue dark:text-blair text-sm 4xl:text-base"
        />

        <div class="flex justify-end">
          <AppButton
            size="xs"
            :disabled="!webhookOpenMessage"
            @click="copyInfo(webhookOpenMessage)"
          >
            Copy
          </AppButton>
        </div>
      </div>

      <div class="algobots-detailed-webhook__item">
        <div class="text-nile-blue dark:text-white text-sm md:text-base 4xl:text-md font-medium">
          Message(Close)
        </div>

        <AppTruncatedTooltip
          :content="webhookCloseMessage"
          class="text-nile-blue dark:text-blair text-sm 4xl:text-base"
        />

        <div class="flex justify-end">
          <AppButton
            size="xs"
            :disabled="!webhookCloseMessage"
            @click="copyInfo(webhookCloseMessage)"
          >
            Copy
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, ref } from 'vue'
import { algoBotsService } from '@/services'

import { useAlgoBotsDetailed } from '@/views/algobots/components/algo-bots-detailed/algo-bots-detailed.setup'

import { copyToClipboard } from '@/core/helpers'

export default defineComponent({
  name: 'AlgoBotsDetailedWebHook',

  components: {
  },

  setup () {
    // ALGOBOTS DETAILED SETUP //
    const { algoBotsDetailedLoading, getAlgobotsSubscriptionByBotId } = useAlgoBotsDetailed()

    // LOADING //
    const loading = ref<boolean>(false)

    /* WEBHOOK MESSAGE STATE */
    const state = reactive({
      webhookURL: '' as string,
      webhookOpenMessage: '' as string,
      webhookCloseMessage: '' as string
    })

    function copyInfo (value: string) {
      copyToClipboard({ value })
    }

    // INIT ACTIVITY DATA //
    async function initBotActivityData () {
      loading.value = true
      try {
        const res = await algoBotsService.getUserBotWebHook(
          {
            botId: getAlgobotsSubscriptionByBotId?.value?.botId || '',
            botSubId: getAlgobotsSubscriptionByBotId?.value?.id || ''
          })
        state.webhookURL = res.data.webhookURL
        state.webhookOpenMessage = JSON.stringify(res.data.open, undefined, 2)
        state.webhookCloseMessage = JSON.stringify(res.data.close, undefined, 2)
      } finally {
        loading.value = false
      }
    }
    initBotActivityData()

    return {
      ...toRefs(state),
      algoBotsDetailedLoading,
      loading,
      copyInfo
    }
  }
})
</script>

<style lang="scss" scoped>
.algobots-detailed-webhook {
  &__item {
    @apply grid items-center;
    grid-template-columns: 1fr 3fr 1fr;

    @media(max-width: 767px) {
      grid-template-columns: 1.2fr 2fr 1fr;
    }
  }
}
</style>
