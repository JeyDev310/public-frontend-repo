<template>
  <div class="flex flex-col overflow-y-hidden custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">My Active Bots</h2>
    </Portal>

    <!-- DESKTOP VIEW -->
    <mq-layout mq="lg+" class="flex flex-col space-y-20 4xl:space-y-24">
      <!-- MY RENTAL BOTS -->
      <MyActiveBotsTable
        title="Algobots Rental"
        :bot-data="getMyRentalBots"
        :subscription-data="rentalBotSubscriptionData"
        :loading="loading"
        @change-activation="onChangeActivation"
        @remove="removeRow"
      />

      <!-- MY PRIVATE BOTS -->
      <MyActiveBotsTable
        title="Algobots Private"
        :bot-data="getMyPrivateBots"
        :subscription-data="privateBotSubscriptionData"
        :loading="loading"
        @change-activation="onChangeActivation"
        @remove="removeRow"
      />
    </mq-layout>

    <!-- MOBILE VIEW -->
    <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <!-- MY BOT TABS (MOBILE) -->
      <AppButtonsGroup
        v-model="mobileActiveTab"
        :options="mobileActiveTabOptions"
        type="underline"
        size="sm"
        width="100%"
        class="self-center w-full mb-20"
      />

      <!-- MY RENTAL/PRIVATE BOTS -->
      <MyActiveBotsTable
        :bot-data="mobileActiveTab === mobileActiveTabOptions[0].value ? getMyRentalBots: getMyPrivateBots"
        :subscription-data="mobileActiveTab === mobileActiveTabOptions[0].value ?
          rentalBotSubscriptionData: privateBotSubscriptionData"
        :loading="loading"
        class="flex flex-grow"
        @change-activation="onChangeActivation"
        @remove="removeRow"
      />
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

import { vuex } from '@/store'
import { algoBotsService } from '@/services'
import { ECategory, EErrorsMessage, IAlgoBotSubscription, IPerfSubscriptionCycles } from '@/types'
import { appNotify } from '@/components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'

import { useBots } from '@/global-setup/bots.composition.setup'

import MyActiveBotsTable from '@/views/algobots-active/components/MyActiveBotsTable.vue'

export default defineComponent({
  name: 'MyActiveBots',

  components: { MyActiveBotsTable },

  setup () {
    const {
      bots,
      subscriptedBots,
      fetchAllAndSubscriptedBots,
      confirmChangeActivation,
      changeActivation
    } = useBots()

    const loading = ref<boolean>(false)

    const mobileActiveTab = ref<string>('my-rental-bots')
    const mobileActiveTabOptions: { label: string; value: string; }[] = [
      { label: 'Algobots Rental', value: 'my-rental-bots' },
      { label: 'Algobots Private', value: 'private-bots' }
    ]

    const rentalBotSubscriptionData = ref<IPerfSubscriptionCycles[][]>([])
    const privateBotSubscriptionData = ref<IPerfSubscriptionCycles[][]>([])

    const getMyRentalBots = computed(() => {
      return subscriptedBots.value?.filter((bot) => {
        return bots.value?.find(e => e.id === bot.botId)?.category === ECategory.AlgoBot
      })
    })

    const getMyPrivateBots = computed(() => {
      return subscriptedBots.value?.filter((bot) => {
        return bots.value?.find(e => e.id === bot.botId)?.category === ECategory.UserBot
      })
    })

    async function onChangeActivation (row: IAlgoBotSubscription, value: boolean): Promise<void> {
      const isAllow = await confirmChangeActivation(value)

      if (isAllow) {
        loading.value = true
        try {
          await changeActivation(row, value)
        } finally {
          loading.value = false
        }
      }
    }

    async function fetchPerformanceSubscription (): Promise<void> {
      const rentalSubscriptionData = await Promise.all(getMyRentalBots.value.map(async ({ id }) => {
        const res = await vuex.algobots.fetchPerformanceSubscriptionCyclesById({ id, isNotify: false })
        return res ? res.data : []
      }))

      const privateSubscriptionData = await Promise.all(getMyPrivateBots.value.map(async ({ id }) => {
        const res = await vuex.algobots.fetchPerformanceSubscriptionCyclesById({ id, isNotify: false })
        return res ? res.data : []
      }))

      rentalBotSubscriptionData.value = rentalSubscriptionData
      privateBotSubscriptionData.value = privateSubscriptionData
    }

    async function initData (): Promise<void> {
      loading.value = true

      try {
        await fetchAllAndSubscriptedBots()
        await fetchPerformanceSubscription()
      } finally {
        loading.value = false
      }
    }

    async function removeRow (row: IAlgoBotSubscription): Promise<void> {
      const isAllow = await appConfirm({
        title: 'Delete your bot',
        body: 'Are you sure you want to delete this bot?',
        actionsName: ['Cancel', 'Delete']
      })

      if (isAllow) {
        loading.value = true
        try {
          await algoBotsService.closePerformanceCycle({ botId: row.botId, botSubId: row.id })
          await algoBotsService.deleteSubscription({ botId: row.botId, subId: row.id })
          await initData()
        } catch (error) {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
        } finally {
          loading.value = false
        }
      }
    }

    onMounted(() => { initData() })

    return {
      loading,
      getMyRentalBots,
      getMyPrivateBots,
      rentalBotSubscriptionData,
      privateBotSubscriptionData,
      mobileActiveTab,
      mobileActiveTabOptions,
      removeRow,
      onChangeActivation
    }
  }
})
</script>
