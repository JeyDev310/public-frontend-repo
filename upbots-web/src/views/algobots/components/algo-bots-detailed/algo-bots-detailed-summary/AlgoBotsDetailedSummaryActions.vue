<template>
  <!-- ACTION BUTTONS (ONLY FOR SUBSCRIPTED BOT) -->
  <div
    v-if="Object.keys(subscriptionBot).length"
    class="grid grid-cols-2 flex-shrink-0 w-full gap-x-10 lg:gap-x-20 mt-auto"
  >
    <template v-if="getAccount.valid && subscriptionBot.enabled">
      <AppButton
        :size="!isMD ? 'md' : 'lg'"
        type="primary-border-filled"
        class="w-full"
        @click="deleteActivation()"
      >
        Delete
      </AppButton>
      <AppButton
        :size="!isMD ? 'md' : 'lg'"
        class="w-full"
        @click="pauseActivation()"
      >
        Pause
      </AppButton>
    </template>

    <template v-if="getAccount.valid && !subscriptionBot.enabled">
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

import { useAlgoBotsDetailed } from '../algo-bots-detailed.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'AlgoBotsDetailedSummaryActions',

  setup () {
    /* USE ROUTER */
    const router = useRouter()

    const { isMD } = useCustomBreakpoints()
    const {
      bot,
      subscriptionBot,
      getAccount,
      baseAvailableLoading,
      isTradableAmount,
      setBotGlobalLoading
    } = useAlgoBotsDetailed()

    async function deleteActivation (): Promise<void> {
      let isAllow = await appConfirm({
        title: 'Delete Your Bot?',
        body: 'Are you sure you want to delete this bot?',
        actionsName: ['Cancel', 'Delete']
      })

      if (isAllow && bot.value && subscriptionBot.value.botRunning) {
        const perfeeRes: any = await algoBotsService.getCurrentPerformanceFee({
          botId: bot.value?.id || '',
          botSubId: subscriptionBot.value.id || ''
        })
        const currentPerfee = perfeeRes?.data?.result || 0
        const perfeesBotDeletionText = `Hey it seems that you have an open position on this bot,
                                        if you delete it now we will leave it open and ${currentPerfee.toFixed(4)}
                                        UBXT will be deducted from your balance to pay for the performance fees
                                        so you can manage it manually`
        const communityBotDeletionText = `Hey it seems that you have an open position on this bot,
                                          if you delete it now we will leave it open so you can manage it manually`
        const confirmText =
        bot.value?.perfFees?.percent ? perfeesBotDeletionText : communityBotDeletionText
        isAllow = await appConfirm({
          title: 'Are you sure?',
          body: confirmText,
          actionsName: ['Cancel', 'Delete']
        })
      }

      if (isAllow && subscriptionBot.value) {
        setBotGlobalLoading(true)
        try {
          await algoBotsService.closePerformanceCycle({
            botId: bot.value.id || '',
            botSubId: subscriptionBot.value.id || ''
          })
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
          if (bot.value.category !== 'userbot' && !isTradableAmount.value) {
            appNotify({ type: 'info', message: 'Please top up your UBXT balance to reactivate the bot!' })
          } else {
            await algoBotsService.resumeActivation({
              botId: subscriptionBot.value.botId,
              subId: subscriptionBot.value.id
            })

            appNotify({ type: 'success', message: 'Bot successfully activated' })
            router.push({ name: routeNames.myActiveBots })
          }
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
      getAccount,
      subscriptionBot,
      deleteActivation,
      pauseActivation,
      reactivateActivation
    }
  }
})
</script>
