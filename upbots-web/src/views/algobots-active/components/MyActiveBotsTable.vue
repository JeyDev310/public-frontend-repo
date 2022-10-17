<template>
  <div class="flex flex-col w-full relative overflow-y-auto custom-scrollbar">
    <!-- DESKTOP VIEW -->
    <mq-layout mq="lg+" class="flex flex-col w-full relative overflow-y-auto custom-scrollbar">
      <!-- LOADING -->
      <AppLoader v-if="loading" class="rounded-xlg" />

      <!-- CONTENT -->
      <AppTable
        v-model:dataset="getData"
        :headers="headersBots"
        class="my-active-bots__table flex-col pt-0"
        sort-front-side
        @row-click="onRedirectToDetailed"
      >
        <!-- TITLE -->
        <template #tableTitle>
          <p class="text-md 4xl:text-lg text-nile-blue dark:text-blair px-20 4xl:px-30 py-14">{{ title }}</p>
        </template>

        <!-- BOT NAME -->
        <template #botName="{ row }">
          <Compute #default="{ foundItem }" :foundItem="bots.filter(e => e.id === row.botId)">
            <template v-if="foundItem && foundItem.length">
              <div class="flex items-center space-x-5">
                <div class="flex items-center">
                  <template
                    v-for="(token, tokenIndex) in [foundItem[0].base, foundItem[0].quote]"
                    :key="tokenIndex"
                  >
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

                <AppTruncatedTooltip :content="foundItem.length ? foundItem[0].name : ''" />
              </div>
            </template>
          </Compute>
        </template>

        <!-- STATUS -->
        <template #enabled="{ row }">
          <div v-if="row.enabled" class="flex items-center space-x-5">
            <span class="w-10 h-10 bg-spring-bouquet rounded-full " />
            <span class="text-nile-blue dark:text-white">Active</span>
          </div>

          <div v-else class="flex items-center space-x-5">
            <span class="w-10 h-10 bg-alexandria rounded-full " />
            <span class="text-nile-blue dark:text-white">Paused</span>
          </div>
        </template>

        <!-- ACCOUNT -->
        <template #account="{ row }">
          <Compute
            #default="{ foundItem }"
            :foundItem="availableAccounts.filter(key => key.id === row.apiKeyRef)"
          >
            <div
              v-if="foundItem"
              class="flex items-center space-x-4"
            >
              <img
                class="w-20 h-20 max-w-20"
                :src="`/img/cryptocoins/${foundItem[0].exchange}.svg`"
                :alt="foundItem[0].name"
              >
              <AppTruncatedTooltip
                :content="foundItem[0].name"
                class="text-nile-blue dark:text-white"
              />
            </div>
            <span v-else class="text-nile-blue dark:text-white">-</span>
          </Compute>
        </template>

        <!-- TOTAL GAIN -->
        <template #totalGain="{ rowIndex }">
          <AppFormatNumber :data="getTotalGain(rowIndex)" />
        </template>

        <!-- CREATED -->
        <template #createdAt="{ row }">{{ $filters.date(row.createdAt) }}</template>

        <!-- POSITION -->
        <template #botRunning="{ row }">
          <div v-if="row.botRunning" class="flex items-center space-x-5">
            <span class="w-10 h-10 bg-spring-bouquet rounded-full " />
            <span class="text-nile-blue dark:text-white">Open</span>
          </div>

          <div v-else class="flex items-center space-x-5">
            <span class="w-10 h-10 bg-alexandria rounded-full " />
            <span class="text-nile-blue dark:text-white">Close</span>
          </div>
        </template>

        <!-- ACTIONS -->
        <template #actions="{ row }">
          <div class="flex items-center justify-end h-full space-x-10">
            <AppToggle :model-value="row.enabled" @change="$emit('change-activation', row, $event)" />

            <AppIcon
              name="trash"
              size="20"
              class="text-nile-blue dark:text-blair cursor-pointer"
              @click.stop="$emit('remove', row)"
            />
          </div>
        </template>
      </AppTable>
    </mq-layout>

    <!-- MOBILE VIEW -->
    <mq-layout mq="sm-md" class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      <!-- IF DATA AVAILABLE -->
      <template v-if="getData.length">
        <div class="flex flex-col space-y-12">
          <AppCard
            v-for="(item, index) in getData"
            :key="item.id"
            class="my-active-bots__card flex flex-col relative py-8 px-10"
          >
            <!-- LOADER -->
            <AppLoader v-if="loading" class="rounded-xlg" size="sm" />

            <!-- CONTENT -->
            <template v-else>
              <!-- VIEW BOT DETAIL/DELETE BOT -->
              <AppDropdown
                :actions="onDropdownAction"
                placement="left-start"
                dropdown-width="110px"
                class="flex absolute top-0 right-0 p-10"
                @delete="$emit('remove', item)"
                @view="onRedirectToDetailed(item)"
              >
                <template #preview>
                  <AppIcon
                    name="dots"
                    size="16"
                    class="transform selft-start rotate-90 text-bluster-blue dark:text-white"
                  />
                </template>

                <template #actions="{ action }">
                  <AppIcon class="mr-10" :name="action.icon" />
                </template>
              </AppDropdown>

              <div class="flex pr-40">
                <!-- CURRENCY ICONS -->
                <Compute #default="{ foundItem }" :foundItem="bots.filter(e => e.id === item.botId)">
                  <template v-if="foundItem && foundItem.length">
                    <div class="flex flex-shrink-0 space-x-10 items-start">
                      <!-- CURRENCY ICONS -->
                      <div class="flex items-center">
                        <template
                          v-for="(token, tokenIndex) in [foundItem[0].base, foundItem[0].quote]"
                          :key="tokenIndex"
                        >
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

                    <div class="flex flex-col flex-grow mx-10">
                      <!-- BOT NAME -->
                      <AppTruncatedTooltip
                        v-if="foundItem[0]?.name ? foundItem[0]?.name : '-'"
                        :content="foundItem[0].name"
                        class="text-beguiling-blue dark:text-white text-base font-semibold"
                      />

                      <!-- BOT CREATION DATE -->
                      <AppTruncatedTooltip
                        v-if="item?.createdAt ? item.createdAt : '-'"
                        :content="$filters.date(item.createdAt)"
                        class="text-beguiling-blue dark:text-white text-sm"
                      />
                    </div>
                  </template>
                </Compute>

                <!-- BOT TOTAL GAINED -->
                <div class="flex flex-shrink-0 self-start">
                  <AppFormatNumber :data="getTotalGain(index)">
                    <template #value="{ data }">
                      <span class="font-medium">$</span>
                      <AppTruncatedTooltip :content="data" class="font-semibold" />
                    </template>
                  </AppFormatNumber>
                </div>
              </div>

              <div class="flex mt-14 space-x-10">
                <div class="flex flex-grow space-x-6">
                  <!-- BOT POSITION -->
                  <AppTag type="tertiary" class="flex space-x-2">
                    <template v-if="item.botRunning && getOpenPositionProfit(index)">
                      <div>Open</div>
                      <div>
                        <AppFormatNumber
                          :data="getOpenPositionProfit(index)"
                          percent
                          text-size="text-sm"
                          class="font-medium"
                        />
                      </div>
                    </template>

                    <template v-else>
                      <AppNoData title="Closed" class="text-sm" color="" />
                    </template>
                  </AppTag>

                  <!-- BOT ACCOUNT -->
                  <AppTag type="tertiary" class="flex space-x-2">
                    <Compute
                      #default="{ foundItem }"
                      :foundItem="availableAccounts.filter(key => key.id === item.apiKeyRef)"
                    >
                      <div
                        v-if="foundItem"
                        class="flex items-center space-x-4"
                      >
                        <img
                          :src="`/img/cryptocoins/${foundItem[0].exchange}.svg`"
                          :alt="foundItem[0].name"
                          class="w-12 h-12 max-w-12"
                        >
                        <AppTruncatedTooltip :content="foundItem[0].name" />
                      </div>
                      <span v-else>-</span>
                    </Compute>
                  </AppTag>

                  <!-- BOT TRADES -->
                  <!-- TODO: WAIT BACKEND TO BE FIXED -->
                  <!--<AppTag type="tertiary" class="flex space-x-2">
                    <Compute #default="{ foundItem }" :foundItem="bots.filter(e => e.id === item.botId)">
                      <div>{{ foundItem[0]?.avgtrades ? foundItem[0]?.avgtrades: 0 }}</div>
                    </Compute>
                    <div>trades</div>
                  </AppTag>-->
                </div>

                <AppToggle
                  type="secondary"
                  :model-value="item.enabled"
                  class="flex-shrink-0"
                  @change="$emit('change-activation', item, $event)"
                />
              </div>
            </template>
          </AppCard>
        </div>
      </template>

      <!-- NO DATA STATE -->
      <AppNoData v-else class="text-md font-semibold" />
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { router } from '@/router'

import { ISubscriptedBots, IPerfSubscriptionCycles, ECategory } from '@/types'

import { useBots } from '@/global-setup/bots.composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'MyActiveBotsTable',

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      require: true
    },

    botData: {
      type: Array as PropType<ISubscriptedBots[]>,
      require: true
    },

    subscriptionData: {
      type: Array as PropType<IPerfSubscriptionCycles[][]>,
      require: true
    },

    title: {
      type: String as PropType<string>,
      default: ''
    }
  },

  emits: ['change-activation', 'remove'],

  setup (props) {
    const { availableAccounts } = useGlobal()
    const { bots, getBotDetailedRedirectRoute } = useBots()

    const headersBots: {
      property: string;
      label: string;
      width?: number;
      minWidth?: number;
      sortable?: boolean;
    }[] = [
      { property: 'botName', label: 'Algo Bot', minWidth: 250 },
      { property: 'enabled', label: 'Status', minWidth: 150, sortable: true },
      { property: 'account', label: 'Account', minWidth: 150 },
      { property: 'totalGain', label: 'Total Gain', minWidth: 150 },
      { property: 'createdAt', label: 'Activation Date', minWidth: 250, sortable: true },
      { property: 'botRunning', label: 'Position', width: 150, sortable: true },
      { property: 'actions', label: '', width: 150 }
    ]

    const onDropdownAction: { label: string; method: string; icon: string; }[] = [
      { label: 'Delete', method: 'delete', icon: 'trash' },
      { label: 'See More', method: 'view', icon: 'eye' }
    ]

    const getData = computed((): ISubscriptedBots[] => props.botData || [])

    function onRedirectToDetailed (item: any): void {
      const findBot = bots.value.find(e => e.id === item.botId)

      router.push({
        name: getBotDetailedRedirectRoute(findBot?.category || ECategory.AlgoBot),
        params: { id: item.botId, name: item.name }
      })
    }

    function getOpenPositionProfit (index: number): number | null {
      if (!props.subscriptionData) return null

      const data = props.subscriptionData[index]
      if (data.length) {
        return data[0]?.profitPercentage || 0
      } else {
        return 0
      }
    }

    function getTotalGain (index: number): number {
      if (!props.subscriptionData) {
        return 0
      } else {
        const data = props.subscriptionData[index]
        return data?.length ? data.reduce((acc, cur) => acc + (cur?.realisedGain?.usd || 0), 0)
          : 0
      }
    }

    return {
      availableAccounts,
      bots,
      headersBots,
      getData,
      onDropdownAction,
      getOpenPositionProfit,
      onRedirectToDetailed,
      getTotalGain
    }
  }
})
</script>

<style lang="scss" scoped>
  .my-active-bots {
    &__table {
      max-height: 420px;
    }

    &__card {
      min-height: 106px;
    }
  }
</style>
