<template>
  <div
    class="
      flex
      flex-col
      flex-grow
      relative
      pt-20
      md:pt-0
      lg:pt-20
      px-20
      lg:px-30
      overflow-y-scroll
      custom-scrollbar
    "
  >
    <!-- LOADING -->
    <div
      v-if="botWebhooksLoading"
      class="flex flex-col items-center justify-center w-full h-full px-20"
    >
      <AppSkeleton type="table" view-box="0 0 1000 550" class="h-full w-full" />
    </div>

    <!-- CONTENT -->
    <template v-else>
      <div
        v-if="Object.keys(botWebhooks).length && botWebhooks.messages.length"
        class="flex flex-col space-y-30 lg:space-y-12 pb-20"
      >
        <div
          class="
            my-bot-detailed-webhook__item
            flex
            flex-col
            lg:flex-row
            lg:grid
            lg:items-center
            space-y-14
            lg:space-y-0
            lg:gap-x-20
          "
        >
          <!-- WEBHOOKS URL TITLE -->
          <div class="flex flex-col text-nile-blue dark:text-white text-sm md:text-base 4xl:text-md font-medium">
            Webhooks URL
          </div>

          <!-- WEBHOOKS URL -->
          <AppTruncatedTooltip
            :content="botWebhooks.webhookURL"
            class="text-nile-blue dark:text-blair whitespace-pre-line"
          />

          <!-- COPY WEBHOOKS URL -->
          <div class="flex justify-center lg:justify-end">
            <AppButton size="sm" @click="copyToClipboard({ value: botWebhooks.webhookURL })">Copy</AppButton>
          </div>
        </div>

        <!-- MESSAGES -->
        <div
          v-for="(item, index) in botWebhooks.messages"
          :key="index"
          class="
            my-bot-detailed-webhook__item
            flex
            flex-col
            lg:flex-row
            lg:grid
            lg:items-center
            space-y-14
            lg:space-y-0
            lg:gap-x-20
          "
        >
          <!-- POSITION | ORDER -->
          <div class="flex flex-col text-nile-blue dark:text-white text-sm md:text-base 4xl:text-md font-medium">
            <span class="capitalize">{{ item.position }} MARKET</span>
            <span>Order {{ item.stratType }}</span>
          </div>

          <!-- CODE -->
          <pre class="text-nile-blue dark:text-blair whitespace-pre-line">
            {{ getCode(item) }}
          </pre>

          <!-- COPY CODE -->
          <div class="flex justify-center lg:justify-end">
            <AppButton size="sm" @click="copyToClipboard({ value: getCode(item) })">Copy</AppButton>
          </div>
        </div>
      </div>

      <!-- NO DATA AVAILABLE -->
      <AppNoData v-else />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { copyToClipboard } from '@/core/helpers'
import { IUserBotWebhook } from '@/types'

import { useMyBotDetailed } from '../../my-bot-detailed.composition.setup'

export default defineComponent({
  name: 'MyBotDetailedWebhooks',

  setup () {
    const { botWebhooks, botWebhooksLoading } = useMyBotDetailed()

    function getCode (item: IUserBotWebhook): string {
      const data = {
        botId: item.botId,
        position: item.position,
        stratType: item.stratType,
        secret: item.secret
      }
      return JSON.stringify(data, undefined, 2)
    }

    return {
      botWebhooks,
      botWebhooksLoading,
      copyToClipboard,
      getCode
    }
  }
})
</script>

<style lang="scss" scoped>
.my-bot-detailed-webhook {
  &__item {
    @media(min-width: 1024px) {
      grid-template-columns: 1.4fr 3fr 1fr;
    }

    @media(max-width: 767px) {
      grid-template-columns: 1.2fr 2fr 1fr;
    }
  }
}
</style>
