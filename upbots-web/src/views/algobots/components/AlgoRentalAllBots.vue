<template>
  <div class="algobots-rental-all-bots__card-wrap">
    <!-- LOADING -->
    <template v-if="loading">
      <div
        class="algobots-rental-bot__card is-popular-bot relative flex flex-col w-full rounded-xl"
        :class="getModeName"
      >
        <AppLoader class="rounded-xl" :size="isMD ? 'xs' : 'lg'" />
      </div>
    </template>

    <!-- LIST OF ITEMS -->
    <template v-else>
      <template v-if="data.length">
        <!-- DESKTOP -->
        <mq-layout
          mq="lg+"
          class="
            grid
            grid-rows-1
            lg:grid-rows-none
            lg:grid-cols-2
            2xl:grid-cols-3
            3xl:grid-cols-4
            gap-20
            lg:gap-24
            4xl:gap-28
            overflow-x-hidden
          "
        >
          <AlgoBotsCard
            v-for="(item, index) in data"
            :key="item.id"
            :data="item"
            :index="index"
          />
        </mq-layout>

        <!-- MOBILE -->
        <mq-layout mq="sm-md" class="flex flex-col space-y-20">
          <AlgoBotsCard
            v-for="(item, index) in data"
            :key="item.id"
            :data="item"
            :index="index"
          />
        </mq-layout>
      </template>

      <!-- NO DATA FOUND STATE -->
      <template v-else>
        <AppNoData
          title="No data found. Please try again!"
          color="text-nile-blue dark:text-let-it-snow"
          class="algobots-rental-bot__card is-bot no-data w-full"
          :class="getModeName"
        />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IBotSnapshot } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import AlgoBotsCard from '@/views/algobots/components/AlgoBotsCard.vue'

export default defineComponent({
  name: 'AlgoRentalAllBots',

  components: { AlgoBotsCard },

  props: {
    data: {
      type: Array as PropType<IBotSnapshot[]>,
      required: true
    },

    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup () {
    const { isMD } = useCustomBreakpoints()
    const { getModeName } = useGlobal()

    return { isMD, getModeName }
  }
})
</script>

<style lang="scss" scoped>
.algobots-rental-all-bots {
  &__card-wrap {
    grid-auto-rows: minmax(min-content, max-content);
  }
}
</style>
