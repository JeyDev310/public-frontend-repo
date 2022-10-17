<template>
  <div class="flex flex-col w-full overflow-x-hidden">
    <template v-if="Object.keys(data).length">
      <!-- DESKTOP -->
      <mq-layout
        mq="lg+"
        class="algobots-rental-bot__card relative flex flex-col rounded-xl"
        :class="[cardTypes, getModeName]"
      >
        <!-- TOP SIDE -->
        <div class="flex items-start justify-between space-x-20 px-20 pt-20 4xl:px-30 4xl:pt-30">
          <div class="flex items-center">
            <!-- LOGO -->
            <div
              class="
                flex
                flex-col
                flex-shrink-0
                w-50
                h-50
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
              <div class="flex items-center">
                <!-- NAME -->
                <AppTruncatedTooltip
                  :content="data.name"
                  class="text-nile-blue dark:text-white font-semibold text-md2"
                />

                <!-- STATUS -->
                <template v-if="type === EAlgoBotsCardType.Bot">
                  <template v-if="subscriptedBots.length">
                    <Compute
                      #default="{ getCurrentBot }"
                      :getCurrentBot="subscriptedBots.find(e => e.botId === data.id)"
                    >
                      <span
                        v-if="getCurrentBot"
                        class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden ml-8"
                        :class="getCurrentBot.enabled ? 'bg-spring-bouquet' : 'bg-alexandria'"
                      />
                    </Compute>
                  </template>
                </template>
              </div>

              <!-- CREATOR -->
              <div class="text-nile-blue dark:text-white text-sm font-medium">{{ data.creator }}</div>
            </div>
          </div>

          <!-- MEDAL -->
          <template v-if="type === EAlgoBotsCardType.BestBot">
            <AppIcon name="medal" size="37" class="mr-20" :class="getMedalColor" />
          </template>

          <!-- FOLLOWERS -->
          <template v-if="type === EAlgoBotsCardType.PopularBot">
            <div v-if="data.followers" class="flex space-x-10 justify-end items-center">
              <AppIcon name="followers" size="25" class="text-hidden-sea-glass" />

              <span class="text-hidden-sea-glass font-medium text-lg 4xl:text-2xl">
                {{ formatNumber(data.followers) }}
              </span>
            </div>
          </template>

          <!-- TODO -->
          <!-- <template v-if="type === EAlgoBotsCardType.Bot">
              <router-link
                #default="{ navigate }"
                :to="{ name: routeNames.algoBotDetailedReviews, params: { id: data.id, name: data.name } }"
                custom
              >
                <div
                  class="pl-10"
                  @click="subscriptedBots.find(e => e.botId === data.id) ? null : navigate()"
                >
                  <RatingStars
                    :botId="data.id"
                    :botName="data.name"
                    :num="data.raters && data.raters.length > 0 ? data.ratings : 0"
                    :raters="data.raters ? data.raters.length : 0"
                    :reviewed="data.raters ? !!(data.raters.find(r => r.user === userProfile.id)) : false"
                    :createdAt="subscriptedBots.find(b => b.botId === data.id)?.createdAt"
                    :goReview="navigate"
                  />
                </div>
              </router-link>
            </template> -->
          <!-- <template v-if="type === EAlgoBotsCardType.Bot">
              <AppTag
                type="tertiary"
                :data="`${data.perfFees ? `From ${getMinFeePercent(data.perfFees.percent)}` : '0'}% fees`"
                class="flex-shrink-0"
              />
            </template> -->
        </div>

        <div class="algobots-rental-bot__chart-wrap grid grid-cols-3 pl-20 4xl:pl-30 overflow-hidden">
          <!-- TOTAL PERF -->
          <div class="flex flex-col self-center py-10">
            <AppFormatNumber
              :data="data.perfSnapshots?.allmonths"
              percent
              text-size="text-xl 4xl:text-2xl font-bold leading-1"
            />
            <span class="4xl:text-xl text-chicory-flower dark:text-white leading-1 pl-16">Total Perf</span>
          </div>

          <!-- CHART -->
          <router-link
            #default="{ navigate }"
            :to="{
              name: getBotDetailedRedirectRoute(data.category),
              params: { id: data.id, name: data.name }
            }"
            custom
          >
            <div class="col-span-2 cursor-pointer" @click="navigate()">
              <SingleColoredChart
                :index="index"
                :labels="data.perfSnapshots?.charts?.weeklyChart?.labels"
                :data="[{ name: data.base, data: data.perfSnapshots?.charts?.weeklyChart?.data }]"
                :padding-config="{ left: '0px', right: '0px', top: '0px', bottom: '0px' }"
              />
            </div>
          </router-link>
        </div>

        <!-- BOTTOM SIDE -->
        <div
          class="algobots-rental-bot__info-wrap flex justify-between w-full space-x-20 p-20 4xl:p-30 rounded-b-xl"
          :class="[cardTypes, getModeName]"
        >
          <div class="flex space-x-20 flex-grow">
            <!-- PAIR -->
            <div class="flex flex-col items-center space-y-6">
              <span class="text-sm 4xl:text-xl text-chicory-flower dark:text-white">Pair</span>
              <div class="flex items-center flex-shrink-0">
                <template v-for="(token, tokenIndex) in [data.base, data.quote]" :key="tokenIndex">
                  <AppCryptoCoinChecker
                    v-if="token"
                    :icon-name="token"
                    :icon-size="1.2"
                    :img-size="18"
                    class="first:-ml-0 -ml-10"
                    :style="tokenIndex >= 1 && `z-index: ${tokenIndex};`"
                  />
                </template>
              </div>
            </div>

            <!-- 3M PERF -->
            <div class="flex flex-col space-y-6">
              <span class="text-sm 4xl:text-xl text-chicory-flower dark:text-white text-center">3M Perf</span>
              <AppTag type="tertiary" class="min-w-70">
                <AppFormatNumber
                  :data="data.perfSnapshots?.month3"
                  text-size="text-sm"
                  percent
                />
              </AppTag>
            </div>

            <!-- 6M PERF -->
            <div class="flex flex-col items-center space-y-6">
              <span class="text-sm 4xl:text-xl text-chicory-flower dark:text-white text-center">6M Perf</span>
              <AppTag type="tertiary" class="min-w-70">
                <AppFormatNumber
                  :data="data.perfSnapshots?.month6"
                  text-size="text-sm"
                  percent
                />
              </AppTag>
            </div>

            <!-- ALLMONTHS -->
            <template v-if="data.category === ECategory.UserBot">
              <div class="flex flex-col items-center space-y-6">
                <span class="text-sm 4xl:text-xl text-chicory-flower dark:text-white text-center">Total Perf%</span>
                <AppTag type="tertiary" class="min-w-70">
                  <AppFormatNumber
                    :data="data.perfSnapshots?.allmonths"
                    text-size="text-sm"
                    percent
                  />
                </AppTag>
              </div>
            </template>

            <template v-else>
              <!-- PERCENT -->
              <template v-if="type === EAlgoBotsCardType.Bot">
                <div class="flex flex-col items-center space-y-6">
                  <span class="text-sm 4xl:text-xl text-chicory-flower dark:text-white text-center">&nbsp;</span>
                  <AppTag
                    type="tertiary"
                    :data="`${data.perfFees ? `From ${getMinFeePercent(data.perfFees.percent)}` : '0'}% fees`"
                  />
                </div>
              </template>
            </template>
          </div>

          <!-- SEE MORE -->
          <router-link
            #default="{ navigate }"
            :to="{
              name: getBotDetailedRedirectRoute(data.category),
              params: { id: data.id, name: data.name }
            }"
            custom
          >
            <div class="flex items-end">
              <AppButton
                type="grey-outlined"
                rounded="xlg"
                size="sm"
                class="flex-shrink-0"
                @click="navigate()"
              >
                See more
              </AppButton>
            </div>
          </router-link>
        </div>
      </mq-layout>

      <!-- MOBILE -->
      <mq-layout mq="sm-md">
        <AppExpand
          v-model="expandValue"
          background="algobots-rental-bot__card"
          preview-classes="items-start"
          content-classes="flex flex-col"
          :class="[cardTypes, getModeName]"
          class="relative"
        >
          <!-- PREVIEW -->
          <template #preview>
            <div class="flex items-start justify-between w-full space-x-20">
              <div class="flex w-full">
                <!-- LOGO -->
                <div
                  class="
                    flex
                    flex-col
                    flex-shrink-0
                    w-24
                    h-24
                    border
                  border-blair
                  dark:border-let-it-snow
                    rounded-full
                    overflow-hidden
                    mr-12
                  "
                >
                  <img
                    :src="getBotLogoImg(data)"
                    :alt="data.name"
                    class="w-full h-full object-cover"
                  >
                </div>

                <div class="flex items-center space-x-10 w-full">
                  <div class="flex flex-col items-start">
                    <div class="flex items-center">
                      <!-- NAME -->
                      <AppTruncatedTooltip
                        :content="data.name"
                        class="text-nile-blue dark:text-let-it-snow font-semibold"
                      />

                      <!-- STATUS -->
                      <template v-if="type === EAlgoBotsCardType.Bot">
                        <template v-if="subscriptedBots.length">
                          <Compute
                            #default="{ getCurrentBot }"
                            :getCurrentBot="subscriptedBots.find(e => e.botId === data.id)"
                          >
                            <span
                              v-if="getCurrentBot"
                              class="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden ml-8"
                              :class="getCurrentBot.enabled ? 'bg-spring-bouquet' : 'bg-alexandria'"
                            />
                          </Compute>
                        </template>
                      </template>
                    </div>

                    <!-- CREATOR -->
                    <AppTruncatedTooltip
                      :content="data.creator"
                      class="text-nile-blue dark:text-let-it-snow text-sm"
                    />
                  </div>

                  <!-- MEDAL -->
                  <template v-if="type === EAlgoBotsCardType.BestBot ">
                    <AppIcon name="medal" size="26" :class="getMedalColor" />
                  </template>
                </div>
              </div>

              <div v-if="data.perfSnapshots?.allmonths" class="flex items-center flex-shrink-0">
                <!-- FOLLOWERS -->
                <div v-if="data.followers" class="flex space-x-10 justify-end items-center">
                  <AppIcon name="followers" size="22" class="text-hidden-sea-glass" />
                  <span class="text-hidden-sea-glass font-medium text-lg 4xl:text-2xl">
                    {{ formatNumber(data.followers) }}
                  </span>
                </div>

                <!-- ALLMONTHS -->
                <div v-else-if="data.perfSnapshots?.allmonths" class="flex flex-col justify-end">
                  <!-- TODO -->
                  <!-- <router-link
                      #default="{ navigate }"
                      :to="{ name: routeNames.algoBotDetailedReviews, params: { id: data.id, name: data.name } }"
                      custom
                    >
                      <div
                        v-if="type === EAlgoBotsCardType.Bot"
                        class="text-xs self-end"
                        @click="subscriptedBots.find(e => e.botId === data.id) ? null : navigate()"
                      >
                        <RatingStars
                          :botId="data.id"
                          :botName="data.name"
                          :num="data.raters && data.raters.length > 0 ? data.ratings : 0"
                          :raters="data.raters ? data.raters.length : 0"
                          :reviewed="data.raters ? !!(data.raters.find(r => r.user === userProfile.id)) : false"
                          :createdAt="subscriptedBots.find(b => b.botId === data.id)?.createdAt"
                          :goReview="navigate"
                        />
                      </div>
                    </router-link> -->
                  <AppFormatNumber
                    :data="data.perfSnapshots?.allmonths"
                    percent
                    text-size="font-medium leading-1"
                  />
                  <span
                    class="font-medium text-sm self-end"
                    :class="data.perfSnapshots?.allmonths >= 0 ? 'text-spring-bouquet' : 'text-alexandria'"
                  >
                    Tot Perf.
                  </span>
                </div>
              </div>
            </div>
          </template>

          <!-- CONTENT -->
          <template #content>
            <!-- CHART -->
            <div class="algobots-rental-bot__chart-wrap w-full mb-5">
              <SingleColoredChart
                :index="index"
                :labels="data.perfSnapshots?.charts?.weeklyChart?.labels"
                :data="[{ name: data.base, data: data.perfSnapshots?.charts?.weeklyChart?.data }]"
              />
            </div>

            <!-- SEE MORE -->
            <router-link
              #default="{ navigate }"
              :to="{
                name: getBotDetailedRedirectRoute(data.category),
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
                See more
              </AppButton>
            </router-link>

            <!-- TAGS -->
            <div class="grid grid-cols-3 gap-10">
              <!-- PERF 3M% -->
              <div class="algobots-rental-bot__mobile-tag-wrap">
                <span class="text-sm text-nile-blue dark:text-let-it-snow">Perf 3M%</span>
                <AppTag>
                  <AppFormatNumber
                    :data="data.perfSnapshots?.month3"
                    percent
                    text-size="text-sm"
                  />
                </AppTag>
              </div>

              <!-- MDD -->
              <div class="algobots-rental-bot__mobile-tag-wrap">
                <span class="text-sm text-nile-blue dark:text-let-it-snow">MDD</span>
                <AppTag
                  :data="data.perfSnapshots?.maxDrawdown ? data.perfSnapshots?.maxDrawdown.toFixed(2) : 'N/A'"
                />
              </div>

              <!-- STRAT -->
              <div class="algobots-rental-bot__mobile-tag-wrap">
                <span class="text-sm text-nile-blue dark:text-let-it-snow">Strat</span>
                <AppTag :data="data.stratType ? data.stratType : 'N/A'" />
              </div>

              <!-- PERF 6M% -->
              <div class="algobots-rental-bot__mobile-tag-wrap">
                <span class="text-sm text-nile-blue dark:text-let-it-snow">Perf 6M%</span>
                <AppTag>
                  <AppFormatNumber
                    :data="data.perfSnapshots?.month6"
                    percent
                    text-size="text-sm"
                  />
                </AppTag>
              </div>

              <!-- #TRADE -->
              <div class="algobots-rental-bot__mobile-tag-wrap">
                <span class="text-sm text-nile-blue dark:text-let-it-snow">#trade</span>
                <AppTag :data="data.avgtrades ? String(data.avgtrades) : 'N/A'" />
              </div>

              <!-- PERF 6M% -->
              <div v-if="data.category === ECategory.UserBot" class="algobots-rental-bot__mobile-tag-wrap">
                <span class="text-sm text-nile-blue dark:text-let-it-snow">Total Perf</span>
                <AppTag>
                  <AppFormatNumber
                    :data="data.perfSnapshots?.month6"
                    percent
                    text-size="text-sm"
                  />
                </AppTag>
              </div>

              <!-- FEES -->
              <div v-else class="algobots-rental-bot__mobile-tag-wrap">
                <span class="text-sm text-nile-blue dark:text-let-it-snow">Fees</span>
                <AppTag :data="`${data.perfFees ? `From ${getMinFeePercent(data.perfFees.percent)}` : '0'}%`" />
              </div>
            </div>
          </template>
        </AppExpand>
      </mq-layout>
    </template>

    <!-- NO DATA FOUND STATE -->
    <template v-else>
      <AppNoData
        class="algobots-rental-bot__card no-data"
        color="text-nile-blue dark:text-let-it-snow"
        :class="[cardTypes, getModeName]"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, PropType, computed, ref } from 'vue'

import { routeNames } from '@/router'

import { vuex } from '@/store'
import { TIndexedObject, EAlgoBotsCardType, IBotSnapshot, ECategory } from '@/types'

import { formatNumber } from '@/core/helpers'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'
import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'

import ChartSkeleton from '@/components/stateless/charts/ChartSkeleton.vue'
// import RatingStars from '@/views/algobots/components/RatingStars.vue'

type TTypes = 'bot' | 'best-bot' | 'popular-bot'

const types: TIndexedObject<string> = Object.freeze({
  bot: 'is-bot',
  'best-bot': 'is-best-bot',
  'popular-bot': 'is-popular-bot'
})

const SingleColoredChart = defineAsyncComponent({
  loader: () => import('@/components/stateless/charts/SingleColoredChart.vue' /* webpackChunkName: "SingleColoredChart" */),
  loadingComponent: ChartSkeleton
})

export default defineComponent({
  name: 'AlgoBotsCard',

  components: { SingleColoredChart },

  props: {
    data: {
      type: Object as PropType<IBotSnapshot>,
      default: () => ({})
    },

    index: {
      type: Number as PropType<number>,
      required: true
    },

    type: { // IF YOU NEED TO USE TYPE (PLEASE USE ENUM NAME FOR IT)
      type: String as PropType<TTypes>,
      default: EAlgoBotsCardType.Bot
    },

    loading: {
      type: Boolean as PropType<boolean>,
      required: false
    }
  },

  setup (props) {
    const { isDarkMode, getModeName } = useGlobal()
    const { isMD } = useCustomBreakpoints()
    const { subscriptedBots, getMinFeePercent, getBotDetailedRedirectRoute } = useBots()
    const { getBotLogoImg } = useAlgoBots()

    const expandValue = ref<boolean>(false)

    const userProfile = computed(() => vuex.auth.user)

    const cardTypes = computed(() => types[props.type])

    const getMedalColor = computed((): string => {
      if (props.index === 0) return 'text-golden-poppy'
      if (props.index === 1) return 'text-silver'
      return 'text-pan-tostado'
    })

    return {
      ECategory,
      userProfile,
      routeNames,
      EAlgoBotsCardType,
      isMD,
      expandValue,
      isDarkMode,
      getModeName,
      getMedalColor,
      cardTypes,
      subscriptedBots,
      formatNumber,
      getMinFeePercent,
      getBotLogoImg,
      getBotDetailedRedirectRoute
    }
  }
})
</script>

<style lang="scss">
.algobots-rental-bot {
  &__card {
    min-height: 295px;

    &.is-bot,
    &.is-popular-bot {
      &.is-dark {
        background: linear-gradient(119.59deg, #41536D 22.04%, rgba(45, 59, 80, 0.56) 94.24%);
      }

      &.is-light {
        @apply bg-white;
      }
    }

    &.is-best-bot {
      &.is-dark {
        background: linear-gradient(119.59deg, rgba(127, 134, 255, 0.71) 22.04%, rgba(45, 59, 80, 0.56) 94.24%);
      }

      &.is-light {
        @apply bg-white;
      }
    }

    &.no-data {
      @apply
        flex flex-col items-center justify-center
        relative
        text-md 4xl:text-lg font-semibold
        rounded-xl text-center
        p-10 md:p-30
    }
  }

  &__info-wrap {
    &.is-bot,
    &.is-popular-bot {
      @apply dark:bg-sargasso-sea border-t border-transparent border-blair dark:border-let-it-snow;
    }

    &.is-best-bot {
      @apply
      dark:bg-port-gore dark:bg-opacity-100
      border-t border-transparent border-blair dark:border-blue-party-parrot;
    }
  }

  @media(min-width: 2560px) {
    &__chart-wrap {
      height: 160px;
    }
  }

  @media(min-width: 768px) and (max-width: 2559px) {
    &__chart-wrap {
      height: 136px;
    }
  }

  @media(max-width: 767px) {
    &__card {
      min-height: 62px;
    }

    &__chart-wrap {
      height: 120px;
    }
  }
}
</style>
