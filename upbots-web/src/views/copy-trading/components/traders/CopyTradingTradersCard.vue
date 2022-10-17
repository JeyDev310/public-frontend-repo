
<template>
  <!-- DESKTOP | TABLET -->
  <mq-layout mq="lg+">
    <router-link
      #default="{ navigate }"
      :to="{
        name: routeNames.copyTrading,
        params: { id: data.id, name: data.name }
      }"
      custom
    >
      <div class="flex flex-col flex-grow py-20">
        <div class="flex items-center px-20 mb-20">
          <!-- LOGO -->
          <div
            class="
              flex
              flex-col
              flex-shrink-0
              w-70
              h-70
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
            <div class="flex items-center space-x-10">
              <!-- NAME -->
              <AppTruncatedTooltip
                :content="data.name"
                class="text-nile-blue dark:text-white font-semibold text-md2"
              />

              <!-- STATUS -->
              <template v-if="subscriptedBots.length">
                <Compute
                  #default="{ getCurrentBot }"
                  :getCurrentBot="subscriptedBots.find(e => e.botId === data.id)"
                >
                  <span
                    v-if="getCurrentBot"
                    class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden"
                    :class="getCurrentBot.enabled ? 'bg-spring-bouquet' : 'bg-alexandria'"
                  />
                </Compute>
              </template>

              <!-- TOKENS -->
              <div class="flex items-center flex-shrink-0">
                <template v-for="(token, tokenIndex) in [data.base, data.quote]" :key="tokenIndex">
                  <AppCryptoCoinChecker
                    v-if="token"
                    :icon-name="token"
                    :icon-size="1.2"
                    :img-size="18"
                    class="first:-ml-0 -ml-10"
                    :style="tokenIndex >= 1 ? `z-index: ${tokenIndex};` : ''"
                  />
                </template>
              </div>
            </div>

            <!-- LAST 30D PROFIT -->
            <div class="flex flex-col">
              <p class="text-nile-blue dark:text-let-it-snow">last 30d profit:</p>
              <AppFormatNumber
                :data="data.perfSnapshots?.month1"
                text-size="text-md"
                percent
                class="font-semibold"
              />
            </div>
          </div>
        </div>

        <!-- CHART -->
        <div
          class="copy-trading-traders-card__chart-wrap flex flex-col cursor-pointer"
          @click="navigate()"
        >
          <SingleColoredChart
            :index="index"
            :labels="data.perfSnapshots?.charts?.weeklyChart?.labels"
            :data="[{ name: data.base, data: data.perfSnapshots?.charts?.weeklyChart?.data }]"
            :padding-config="{ left: '0px', right: '0px', top: '0px', bottom: '0px' }"
          />
        </div>

        <div class="flex flex-col px-20">
          <!-- POSITION (TODO:) -->
          <div class="flex items-center mb-30">
            <span class="text-chicory-flower dark:text-white mr-10">Position: Open</span>
            <AppFormatNumber
              :data="data.perfSnapshots?.month1"
              text-size="text-base"
              percent
              class="font-semibold"
            />
          </div>

          <div class="flex items-center space-x-20">
            <!-- PERF FEES -->
            <div class="flex flex-col">
              <p class="text-beguiling-blue dark:text-hidden-sea-glass font-semibold">
                {{ data.perfFees ? `From ${getMinFeePercent(data.perfFees.percent)}` : '0' }}
              </p>
              <p class="text-chicory-flower dark:text-white font-medium mt-2">Perf fees</p>
            </div>

            <!-- FOLLOWERS (TODO:) -->
            <div class="flex flex-col">
              <p class="text-beguiling-blue dark:text-hidden-sea-glass font-semibold">
                0
              </p>
              <p class="text-chicory-flower dark:text-white font-medium mt-2">Followers</p>
            </div>

            <!-- NAVIGATE -->
            <div class="flex flex-grow">
              <AppButton
                type="primary-border-filled"
                size="lg"
                class="mx-auto"
                @click="navigate()"
              >
                Follow
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md">
    <AppExpand
      v-model="isExpanded"
      preview-classes="items-start"
      content-classes="flex flex-col"
      class="relative"
    >
      <!-- PREVIEW -->
      <template #preview>
        <div class="flex items-start justify-between w-full space-x-10">
          <div class="flex items-center space-x-10">
            <!-- LOGO -->
            <div
              class="
                flex
                flex-col
                w-24
                h-24
                border
                border-blair
                dark:border-let-it-snow
                rounded-full
                overflow-hidden
              "
            >
              <img
                :src="getBotLogoImg(data)"
                :alt="data.name"
                class="w-full h-full object-cover"
              >
            </div>

            <div class="flex flex-col">
              <div class="flex items-center space-x-10">
                <!-- NAME -->
                <AppTruncatedTooltip
                  :content="data.name"
                  class="text-nile-blue dark:text-let-it-snow font-semibold"
                />

                <!-- STATUS -->
                <template v-if="subscriptedBots.length">
                  <Compute
                    #default="{ getCurrentBot }"
                    :getCurrentBot="subscriptedBots.find(e => e.botId === data.id)"
                  >
                    <span
                      v-if="getCurrentBot"
                      class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden"
                      :class="getCurrentBot.enabled ? 'bg-spring-bouquet' : 'bg-alexandria'"
                    />
                  </Compute>
                </template>

                <!-- TOKENS -->
                <div class="flex items-center flex-shrink-0">
                  <template v-for="(token, tokenIndex) in [data.base, data.quote]" :key="tokenIndex">
                    <AppCryptoCoinChecker
                      v-if="token"
                      :icon-name="token"
                      :icon-size="1.2"
                      :img-size="18"
                      class="first:-ml-0 -ml-10"
                      :style="tokenIndex >= 1 ? `z-index: ${tokenIndex};` : ''"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>

          <!-- 30D PROFIT -->
          <div class="flex flex-col">
            <AppFormatNumber
              :data="data.perfSnapshots?.month1"
              text-size="leading-1"
              percent
              class="font-medium"
            />

            <span
              class="font-medium text-sm self-end"
              :class="data.perfSnapshots?.month1 >= 0 ? 'text-spring-bouquet' : 'text-alexandria'"
            >
              30d profit
            </span>
          </div>
        </div>
      </template>

      <!-- CONTENT -->
      <template #content>
        <!-- CHART -->
        <div class="copy-trading-traders-card__chart-wrap flex flex-col">
          <SingleColoredChart
            :index="index"
            :labels="data.perfSnapshots?.charts?.weeklyChart?.labels"
            :data="[{ name: data.base, data: data.perfSnapshots?.charts?.weeklyChart?.data }]"
            :padding-config="{ left: '0px', right: '0px', top: '0px', bottom: '0px' }"
          />
        </div>

        <!-- FOLLOW -->
        <router-link
          #default="{ navigate }"
          :to="{
            name: routeNames.copyTrading,
            params: { id: data.id, name: data.name }
          }"
          custom
        >
          <AppButton
            :type="isDarkMode ? 'white-outlined' : 'grey-outlined'"
            size="xlg"
            class="mb-20"
            @click="navigate()"
          >
            Follow
          </AppButton>
        </router-link>

        <div class="grid grid-cols-2 gap-10">
          <!-- POSITION (TODO:) -->
          <div class="flex flex-col">
            <span class="text-sm text-nile-blue dark:text-let-it-snow">Position</span>
            <AppTag>
              <div class="text-sm text-nile-blue dark:text-let-it-snow mr-5">Open</div>
              <AppFormatNumber
                :data="data.perfSnapshots?.month1"
                percent
                text-size="text-sm"
              />
            </AppTag>
          </div>

          <!-- FOLLOWERS (TODO:) -->
          <div class="flex flex-col">
            <span class="text-sm text-nile-blue dark:text-let-it-snow">Followers</span>
            <AppTag>0</AppTag>
          </div>

          <!-- PERF FEES -->
          <div class="flex flex-col">
            <span class="text-sm text-nile-blue dark:text-let-it-snow">Fees</span>
            <AppTag :data="`${data.perfFees ? `From ${getMinFeePercent(data.perfFees.percent)}` : '0'}%`" />
          </div>
        </div>
      </template>
    </AppExpand>
  </mq-layout>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, PropType, reactive, toRefs } from 'vue'

import { routeNames } from '@/router'

import { IBotSnapshot } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'
const SingleColoredChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/SingleColoredChart.vue' /* webpackChunkName: "SingleColoredChart" */),
  loadingComponent: ChartSkeleton
})

export default defineComponent({
  name: 'CopyTradingTradersCard',

  components: { SingleColoredChart },

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
    const { isDarkMode } = useGlobal()
    const { subscriptedBots, getMinFeePercent } = useBots()
    const { getBotLogoImg } = useAlgoBots()

    const state = reactive({
      isExpanded: false as boolean
    })

    return {
      ...toRefs(state),
      routeNames,
      isDarkMode,
      subscriptedBots,
      getBotLogoImg,
      getMinFeePercent
    }
  }
})
</script>

<style lang="scss" scoped>
.copy-trading-traders-card {
  &__chart-wrap {
    height: 136px;
  }
}
</style>
