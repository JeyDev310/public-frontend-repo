<template>
  <AppCard
    class="
      flex
      flex-col
      xl:flex-row
      items-start
      w-full
      px-20
      py-14
      bg-wizard-white
      dark:bg-black
      bg-opacity-60
      dark:bg-opacity-10
    "
    :is-default-background="false"
  >
    <!-- USER IMG -->
    <div class="flex-shrink-0 w-50 h-50 rounded-full -mt-36 xl:-mt-0 mx-auto xl:ml-0 xl:mr-12 overflow-hidden">
      <img v-if="data.img" :src="data.img" :alt="data.name" class="w-full h-full object-cover">
      <div
        v-else
        class="
          text-industrial-gray
          flex
          items-center
          justify-center
          w-full
          h-full
          dark:text-white
          font-medium
          text-xl
          border-2
          border-chicory-flower
          dark:border-blair
          rounded-full
        "
      >
        {{ data.name[0] }}
      </div>
    </div>

    <div class="flex w-full space-x-12 mt-10 xl:mt-0">
      <div class="flex flex-col flex-grow">
        <div class="flex flex-col xl:mb-16">
          <div class="flex items-center">
            <!-- USER NAME -->
            <div class="text-nile-blue dark:text-white text-md font-medium mr-12">
              <AppTruncatedTooltip :content="data.name" />
            </div>

            <!-- USER COUNT -->
            <div v-if="data.userCount" class="flex items-end">
              <AppIcon name="people" size="24" class="text-blair" />
              <span class="text-blair text-18 font-medium leading-normal ml-8">{{ data.userCount }}</span>
            </div>
          </div>

          <!-- DATE -->
          <div class="text-sm italic text-nile-blue dark:text-white mt-2">
            {{ $filters.date(data.date, 'DD MMM YYYY hh:mm:ss') }}
          </div>
        </div>

        <!-- TOTAL EARNED -->
        <mq-layout mq="2xl+" class="flex items-center">
          <span class="text-chicory-flower dark:text-blair mr-10">Total Earned</span>
          <span class="text-ball-blue font-semibold">+{{ formatNumber(data.totalEarned) }} UBXT</span>
        </mq-layout>
      </div>

      <!-- TAG -->
      <div class="flex flex-col flex-shrink-0 ml-auto">
        <div
          class="
            referral__my-referees-item-tag
            flex
            flex-col
            items-center
            justify-center
            border
            border-solid
            border-chicory-flower
            dark:border-blair
            rounded-sm1
            px-14
          "
        >
          <span class="text-chicory-flower dark:text-blair text-md">{{ data.tag }}</span>
        </div>
      </div>
    </div>

    <!-- TOTAL EARNED -->
    <mq-layout mq="sm-xl" class="flex items-center mt-16">
      <span class="text-chicory-flower dark:text-blair mr-10">Total Earned</span>
      <span class="text-ball-blue font-semibold">+{{ formatNumber(data.totalEarned) }} UBXT</span>
    </mq-layout>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { formatNumber } from '@/core/helpers'

export default defineComponent({
  name: 'ReferralMyRefereesItem',

  props: {
    data: {
      type: Object as PropType<any>, // TODO add type
      required: true
    }
  },

  setup () {
    return { formatNumber }
  }
})
</script>

<style lang="scss" scoped>
.referral {
  &__my-referees-item-tag {
    min-width: 60px;
  }
}
</style>
