<template>
  <div class="grid grid-cols-2 flex-shrink-0 w-full gap-x-10 lg:gap-x-20 mt-auto">
    <template v-if="getAccount?.valid && subscriptionBot.enabled">
      <!-- DELETE -->
      <AppButton
        :size="!isMD ? 'md' : 'lg'"
        type="primary-border-filled"
        class="w-full"
        @click="deleteActivation()"
      >
        Delete
      </AppButton>

      <!-- PAUSE -->
      <AppButton
        :size="!isMD ? 'md' : 'lg'"
        class="w-full"
        @click="pauseActivation()"
      >
        Pause
      </AppButton>
    </template>

    <template v-if="getAccount?.valid && !subscriptionBot.enabled">
      <!-- DELETE -->
      <AppButton
        :size="!isMD ? 'md' : 'lg'"
        type="primary-border-filled"
        class="w-full"
        @click="deleteActivation()"
      >
        Delete
      </AppButton>
      <AppButton
        :disabled="baseAvailableLoading"
        :size="!isMD ? 'md' : 'lg'"
        class="w-full"
        @click="reactivateActivation()"
      >
        Reactivate
      </AppButton>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { routeNames } from '@/router'
import { useRouter } from 'vue-router'

import { algoBotsService } from '@/services'
import { EErrorsMessage } from '@/types'
import { appNotify } from '@/components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useMyBotDetailed } from '../../my-bot-detailed.composition.setup'

export default defineComponent({
  name: 'MyBotDetailedSummaryActions',

  setup () {
    const router = useRouter()

    const { isMD } = useCustomBreakpoints()
    const {
      bot,
      subscriptionBot,
      getAccount,
      baseAvailableLoading,
      setBotGlobalLoading
    } = useMyBotDetailed()

    async function deleteActivation (): Promise<void> {
      const isAllow = await appConfirm({
        title: 'Delete Your Bot?',
        body: 'Are you sure you want to delete this bot?',
        actionsName: ['Cancel', 'Delete']
      })

      if (isAllow && subscriptionBot.value) {
        setBotGlobalLoading(true)
        try {
          await algoBotsService.deleteSubscription({
            botId: bot.value.id || '',
            subId: subscriptionBot.value.id || ''
          })

          appNotify({ type: 'success', message: 'Bot successfully deleted' })
          router.push({ name: routeNames.algoBots })
        } catch (error) {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
        } finally {
          setBotGlobalLoading(false)
        }
      }
    }

    async function pauseActivation (): Promise<void> {
      const isAllow = await appConfirm({
        title: 'Put The Bot On Hold?',
        body: 'Are you sure you want to pause the bot? If you have an open position, we will leave it open so you can manage it manually',
        actionsName: ['Cancel', 'Pause']
      })

      if (isAllow && subscriptionBot.value) {
        setBotGlobalLoading(true)
        try {
          await algoBotsService.pauseActivation(subscriptionBot.value.id)

          appNotify({ type: 'success', message: 'Bot successfully paused' })
          router.push({ name: routeNames.myActiveBots })
        } catch (error) {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
        } finally {
          setBotGlobalLoading(false)
        }
      }
    }

    async function reactivateActivation (): Promise<void> {
      const isAllow = await appConfirm({
        title: 'Are you sure you want to activate this bot?',
        actionsName: ['Cancel', 'Activate']
      })

      if (isAllow && subscriptionBot.value) {
        setBotGlobalLoading(true)
        try {
          await algoBotsService.resumeActivation({
            botId: subscriptionBot.value.botId,
            subId: subscriptionBot.value.id
          })

          appNotify({ type: 'success', message: 'Bot successfully activated' })
          router.push({ name: routeNames.myActiveBots })
        } catch (error) {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
        } finally {
          setBotGlobalLoading(false)
        }
      }
    }

    return {
      isMD,
      baseAvailableLoading,
      subscriptionBot,
      getAccount,
      deleteActivation,
      pauseActivation,
      reactivateActivation
    }
  }
})
</script>
