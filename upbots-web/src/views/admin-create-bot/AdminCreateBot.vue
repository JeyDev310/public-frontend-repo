<template>
  <div class="flex flex-col overflow-y-hidden custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Admin Create Bot</h2>
    </Portal>
    <!-- CONTENT -->
    <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      <div class="grid grid-cols-2 gap-20 p-10">
        <AppSelect
          :model-value="selectedBot"
          :options="availableBots"
          size="xs"
          style="min-width: 40px;"
          @change="(bot: any) => handleBotChange(bot)"
        >
          <template #selection="{ value, hasInitialValue }">
            <template v-if="hasInitialValue">
              <p>{{ value.name }}</p>
            </template>
            <template v-else>Select your bot</template>
          </template>

          <template #options="{ item }">
            <p>{{ item.name }}</p>
          </template>
        </AppSelect>
        <input
          v-model="botName"
          name="bot_name"
          placeholder="Bot Name"
          class="input min-h-60"
        >
        <input
          v-model="botRef"
          name="botRef"
          placeholder="RefName"
          class="input min-h-60"
        >
        <input
          v-model="botVer"
          name="botVer"
          placeholder="Version"
          class="input min-h-60"
        >
        <input
          v-model="description"
          name="description"
          placeholder="Description"
          class="input min-h-60"
        >
        <input
          v-model="stratType"
          name="stratType"
          placeholder="Strat Type"
          class="input min-h-60"
        >
        <input
          v-model="creator"
          name="creator"
          placeholder="Creator"
          class="input min-h-60"
        >
        <input
          v-model="marketBase"
          name="marketBase"
          placeholder="Market Base"
          class="input min-h-60"
        >
        <input
          v-model="perfFeesPercent"
          name="perfFeesPercent"
          placeholder="PerfFees Percent"
          class="input min-h-60"
        >
        <input
          v-model="perfFeesAddress"
          name="perfFeesAddress"
          placeholder="PerfFees Address"
          class="input min-h-60"
        >
        <input
          v-model="perfFeesDistributions"
          name="perfFeesDistributions"
          placeholder="PerfFees Distributions"
          class="input min-h-60"
        >
        <input
          v-model="exchangesType"
          name="exchangesType"
          placeholder="Exchanges Types"
          class="input min-h-60"
        >
        <input
          v-model="priceDecimal"
          name="priceDecimal"
          placeholder="Price Decimal"
          class="input min-h-60"
        >
      </div>
      <AppButton class="w-full mt-auto" :disabled="loading" @click="handleClick(false)">
        Add Bot
      </AppButton>
      <AppButton class="w-full" :disabled="loading" style="margin-top: 16px" @click="handleClick(true)">
        Update Bot
      </AppButton>
      <AppButton class="w-full" :disabled="loading" style="margin-top: 16px" @click="handleDeleteClick()">
        Delete Bot
      </AppButton>
      <hr class="solid border-white mt-14">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl mb-12 mt-12">
        Upload Bot Logo
      </h2>
      <div class="p-10">
        <label class="text-nile-blue dark:text-let-it-snow leading-1 mb-6 cursor-pointer 4xl:text-md 5xl:text-lg">
          Bot Image
        </label>
        <br>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/png, image/jpeg"
          @change="handleFileChange"
        >
      </div>
      <AppButton class="w-full" :disabled="loading" style="margin-top: 16px" @click="handleClickUpload()">
        Upload
      </AppButton>
      <hr class="solid border-white mt-14">
      <div>
        <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl mb-12 mt-12">
          Upload Trading History
        </h2>
        <Form ref="csvForm" class="w-full flex flex-col flex-grow space-y-30 bg-green" @submit="onCsvFormSubmit">
          <div class="p-10">
            <label class="text-nile-blue dark:text-let-it-snow leading-1 mb-6 cursor-pointer 4xl:text-md 5xl:text-lg">
              Trading History CSV
            </label>
            <br>
            <input
              id="csv"
              ref="csvFileInput"
              name="csv"
              type="file"
              accept="text/csv"
              @change="handleCSVFileChange"
            >
          </div>
          <AppButton class="mt-auto w-full" :disabled="loading">
            Upload
          </AppButton>
        </Form>
      </div>
      <div class="mt-10">
        <AppButton class="mt-auto w-full" :disabled="loading" @click="handleClickDownload()">
          Download CSV
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref, reactive, toRefs, inject } from 'vue'
import { appNotify } from '../../components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'
import { botService } from '@/services'
import AppSelect from '@/components/stateless/AppSelect.vue'
import exportFromJSON from 'export-from-json'

export default defineComponent({
  name: 'AdminCreateBot',
  components: { AppSelect },
  setup () {
    const initialState = {
      selectedBot: {} as any,
      availableBots: [] as any[],
      botName: '',
      botRef: '',
      botVer: '',
      description: '',
      stratType: '',
      creator: '',
      marketBase: '',
      perfFeesPercent: '',
      perfFeesAddress: '',
      perfFeesDistributions: '',
      exchangesType: '',
      priceDecimal: ''
    }

    const $papa = inject('$papa') as any
    const loading = ref(false)
    const imageFile = ref<any>(null)
    const imageFileInput = ref(null)
    const csvFileInput = ref(null)
    const csvFile = ref<any>(null)
    const botForm = ref(null)
    let parsedData = null as any
    const botFormData = reactive({ ...initialState })
    const loadBotList = async () => {
      try {
        const result = await botService.getAll()
        botFormData.availableBots = result.data
      } catch (error) {
        console.log(error)
      }
    }
    const resetForm = () => {
      Object.assign(botFormData, initialState)
      // imageFile.value.target.value = null
      imageFile.value = null
      loadBotList()
    }
    const handleBotChange = async (bot: any) => {
      console.log(bot)
      botFormData.selectedBot = bot
      botFormData.botName = bot.name
      botFormData.botRef = bot.botRef
      botFormData.botVer = bot.botVer
      botFormData.description = bot.description
      botFormData.perfFeesPercent = bot.perfFees?.percent
      botFormData.perfFeesAddress = bot.perfFees?.address
      botFormData.exchangesType = JSON.stringify(bot.exchangesType)?.replace('[', '').replace(']', '')
      botFormData.creator = bot.creator
      botFormData.marketBase = bot.base
      botFormData.stratType = bot.stratType
      botFormData.perfFeesDistributions = JSON.stringify(bot.perfFees.distribution)?.replace('{', '').replace('}', '')
      botFormData.priceDecimal = bot.priceDecimal
    }
    const handleFileChange = (event: any) => {
      imageFile.value = event.target.files[0]
    }
    const handleCSVFileChange = async (event: any) => {
      csvFile.value = event.target.files[0]
      if (csvFile.value) {
        console.log($papa)
        $papa.parse(csvFile.value, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: function (result: any) {
            const data = result.data
            if (Array.isArray(data)) {
              data.forEach((row: any) => {
                row.botRef = botFormData.selectedBot.botRef
              })
              parsedData = data
            }
          }
        })
      }
    }
    const onCsvFormSubmit = async (e: any) => {
      e.preventDefault()
      console.log(parsedData)
      const selectedBotId = botFormData.selectedBot.id
      if (!selectedBotId || !parsedData) appNotify({ type: 'error', message: 'Please select both of a bot and csv file.' })
      await botService.postTradingHistory(parsedData, selectedBotId)
      await botService.updateTheoricalCycles(selectedBotId)
      appNotify({ type: 'success', message: 'Bot Trading history successfully submitted.' })
      parsedData = null
      csvFile.value = null
      resetForm()
    }
    const onFormSubmit = async (isUpdateMode: boolean) => {
      const exchangesType = botFormData.exchangesType.replace(/['"]+/g, '').split(',')
      const distribution = JSON.parse(`{${botFormData.perfFeesDistributions}}`)
      const payload = {
        botRef: botFormData.botRef,
        botVer: botFormData.botVer,
        creator: botFormData.creator,
        description: botFormData.description,
        name: botFormData.botName,
        stratType: botFormData.stratType,
        market: {
          base: botFormData.marketBase,
          quote: 'USDT'
        },

        perfFees: {
          percent: botFormData.perfFeesPercent,
          address: botFormData.perfFeesAddress,
          distribution: {
            ...distribution
          }
        },

        exchangesType: exchangesType,
        priceDecimal: botFormData.priceDecimal
      }
      if (isUpdateMode && !botFormData.selectedBot.id) {
        appNotify({ type: 'error', message: 'Please select a bot' })
        return
      }
      try {
        loading.value = true
        isUpdateMode
          ? await botService.updateBot(payload, botFormData.selectedBot.id) : await botService.postNewBot(payload)
        appNotify({ type: 'success', message: 'Bot has been added successfully' })
      } catch (error: any) {
        console.log(error)
        appNotify({ type: 'error', message: error })
      }
      loading.value = false
      resetForm()
    }
    const handleDeleteClick = async () => {
      if (!botFormData.selectedBot.id) {
        appNotify({ type: 'error', message: 'Please select a bot' })
        return
      }

      const isAllow = await appConfirm({
        title: 'Confirm your action',
        body: 'Are you sure to delete the bot?',
        actionsName: ['Cancel', 'Delete']
      })

      if (isAllow) {
        await botService.deleteBot(botFormData.selectedBot.id)
        appNotify({ type: 'success', message: 'Bot has been deleted successfully' })
        resetForm()
      }
    }
    function handleClick (bool: boolean) {
      onFormSubmit(bool)
    }
    function manipulateTrackingData (data: any[]): any[] {
      const newData = [] as any[]
      data.forEach((tracking) => {
        newData.push({
          botRef: tracking.botRef ? tracking.botRef : '',
          botVer: tracking.botVer ? tracking.botVer : '',
          stratType: tracking.stratType ? tracking.stratType : '',
          position: tracking.position ? tracking.position : '',
          estimatedPrice: tracking.estimatedPrice ? tracking.estimatedPrice : '',
          sbl: tracking.sbl ? tracking.sbl : '',
          base: tracking.base ? tracking.base : '',
          quote: tracking.quote ? tracking.quote : '',
          exch: tracking.exch ? tracking.exch : '',
          signalDateTime: tracking.signalDateTime ? tracking.signalDateTime : '',
          botCycle: tracking.botCycle ? tracking.botCycle : ''
        })
      })
      return newData
    }
    const handleClickUpload = async () => {
      if (!imageFile.value) {
        appNotify({ type: 'error', message: 'Please select bot image' })
        return
      }
      if (!botFormData.selectedBot.id) {
        appNotify({ type: 'error', message: 'Please select a bot' })
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(imageFile.value)
      const formData = new FormData()
      formData.append('file', imageFile.value)
      await botService.uploadBotImage(formData, botFormData.selectedBot.id)
      appNotify({ type: 'success', message: 'Bot logo has been updated' })
    }
    const handleClickDownload = async () => {
      if (botFormData.selectedBot.id) {
        const trackingData = await botService.getTradingHistory(botFormData.selectedBot.id)
        console.log(trackingData)
        const fileName = `${botFormData.selectedBot.id}_history`
        const exportType = exportFromJSON.types.csv
        const fields = [
          'botRef',
          'botVer',
          'stratType',
          'position',
          'estimatedPrice',
          'sbl',
          'base',
          'quote',
          'exch',
          'signalDateTime',
          'botCycle'
        ]
        exportFromJSON({
          data: manipulateTrackingData(trackingData.data as any[]) as Array<any>,
          fileName,
          exportType,
          fields
        })
      } else {
        appNotify({ type: 'error', message: 'Please select a bot' })
      }
    }
    loadBotList()

    return {
      loading,
      handleFileChange,
      onFormSubmit,
      handleBotChange,
      handleCSVFileChange,
      handleClick,
      handleDeleteClick,
      handleClickUpload,
      handleClickDownload,
      onCsvFormSubmit,
      resetForm,
      botForm,
      parsedData,
      csvFileInput,
      imageFileInput,
      ...toRefs(botFormData)
    }
  }
})
</script>
<style lang="scss" scoped>
.input {
  @apply
    px-10
    bg-transparent
    text-base
    text-bluster-blue
    dark:text-white
    placeholder-bluster-blue
    border-2
    border-cold-blue
    focus:outline-none;
}
</style>
