<template>
  <div class="flex flex-col overflow-y-hidden custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Copy Trading</h2>
    </Portal>

    <!-- CONTENT (DESKTOP | TABLET) -->
    <mq-layout mq="lg+" class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      <!-- TOP TRADERS -->
      <CopyTradingTopTrades :loading="loading" />

      <!-- COPY TRADERS -->
      <CopyTradingTraders :loading="loading" />
    </mq-layout>

    <!-- CONTENT (MOBILE) -->
    <mq-layout mq="sm-md" class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      <!-- TABS -->
      <AppButtonsGroup
        v-model="mobileTabActive"
        :options="mobileTabOptions"
        type="underline"
        size="sm"
        width="100%"
        class="self-center w-full mb-20"
      />

      <div class="flex w-full flex-col flex-grow overflow-y-auto custom-scrollbar">
        <!-- TOP TRADERS TAB -->
        <template v-if="mobileTabActive === mobileTabOptions[0].value">
          <CopyTradingTopTrades :loading="loading" />
        </template>

        <!-- COPY TRADERS TAB -->
        <template v-if="mobileTabActive === mobileTabOptions[1].value">
          <CopyTradingTraders :loading="loading" />
        </template>
      </div>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

import { useBots } from '@/global-setup/bots.composition.setup'

import CopyTradingTopTrades from './components/top-traders/CopyTradingTopTrades.vue'
import CopyTradingTraders from './components/traders/CopyTradingTraders.vue'

export default defineComponent({
  name: 'CopyTrading',

  components: { CopyTradingTopTrades, CopyTradingTraders },

  setup () {
    /* USE BOTS SETUP */
    const { fetchAllAndSubscriptedBots } = useBots()

    const state = reactive({
      loading: false as boolean,
      mobileTabActive: 'top-traders' as string
    })

    const mobileTabOptions: { label: string; value: string; }[] = [
      { label: 'Top Traders', value: 'top-traders' },
      { label: 'Copy Traders', value: 'copy-traders' }
    ]

    async function initData (): Promise<void> {
      state.loading = true
      try {
        await fetchAllAndSubscriptedBots()
      } finally {
        state.loading = false
      }
    }

    onMounted(() => { initData() })

    return { ...toRefs(state), mobileTabOptions }
  }
})
</script>
