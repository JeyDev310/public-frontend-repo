
<template>
  <router-link
    #default="{ navigate }"
    :to="{
      name: routeNames.copyTrading,
      params: { id: data.id, name: data.name }
    }"
    custom
  >
    <div class="flex items-center space-x-10 cursor-pointer" @click="navigate()">
      <!-- INDEX -->
      <p class="text-nile-blue dark:text-let-it-snow md:text-lg">#{{ index + 1 }}</p>

      <!-- LOGO -->
      <div
        class="
          flex
          flex-col
          flex-shrink-0
          w-40
          md:w-50
          h-40
          md:h-50
          border
          border-blair
          dark:border-let-it-snow
          rounded-full
          overflow-hidden
          mr-16
        "
      >
        <img
          :src="getBotLogoImg(data)"
          :alt="data.name"
          class="w-full h-full object-cover"
        >
      </div>

      <div class="flex flex-col">
        <!-- NAME -->
        <div class="mb-5 text-beguiling-blue dark:text-blair">{{ data.name }}</div>

        <!-- TOT PERF -->
        <AppFormatNumber
          :data="data.perfSnapshots?.allmonths"
          percent
          text-size="text-lg md:text-xl 4xl:text-2xl font-bold leading-1"
        />
      </div>

      <!-- FOLLOW (MOBILE ONLY) -->
      <mq-layout mq="sm-md" class="flex flex-grow">
        <AppButton
          type="primary-border-filled"
          size="sm"
          class="ml-auto"
          @click="navigate()"
        >
          Follow
        </AppButton>
      </mq-layout>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { routeNames } from '@/router'

import { IBotSnapshot } from '@/types'

import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

export default defineComponent({
  name: 'CopyTradingTopTradesItem',

  props: {
    data: {
      type: Object as PropType<IBotSnapshot>,
      required: true
    },

    index: {
      type: Number as PropType<number>,
      required: true
    }
  },

  setup () {
    const { getBotLogoImg } = useAlgoBots()

    return { routeNames, getBotLogoImg }
  }
})
</script>
