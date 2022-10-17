<template>
  <!-- DESKTOP VIEW -->
  <mq-layout mq="lg+" class="bot-allocation-table flex flex-col overflow-y-auto custom-scrollbar">
    <!-- TABLE -->
    <AppTable
      v-model:dataset="getData"
      :headers="tableHeaders"
      sort-front-side
      :is-mobile-view-list="false"
      :is-table-wrap-styled="isMD"
      class="py-20"
    >
      <!-- TITLE -->
      <template #tableTitle>
        <mq-layout mq="lg+" class="flex justify-between items-center md:px-30 pb-14">
          <p class="md:text-lg font-medium text-chicory-flower dark:text-blair">Bot Allocation</p>
        </mq-layout>
      </template>

      <!-- BOT NAME & COINS -->
      <template #bot="{ row }">
        <div class="flex items-center space-x-6">
          <div class="flex items-center">
            <AppCryptoCoinChecker
              v-if="getPairData(row.botRef)"
              :icon-name="getPairData(row.botRef).base"
              :icon-size="1.2"
              :img-size="18"
            />

            <AppCryptoCoinChecker
              v-if="getPairData(row.botRef)"
              :icon-name="getPairData(row.botRef).quote"
              :icon-size="1.2"
              :img-size="18"
              class="-ml-10"
            />
          </div>

          <AppTruncatedTooltip :content="row.botName" class="font-medium text-base" />
        </div>
      </template>

      <!-- STATUS -->
      <template #status="{ row }">
        <div v-if="row.status" class="flex space-x-10 items-center">
          <div class="w-10 h-10 rounded-full" :class="getStatusStyle(row.status)" />
          <AppTruncatedTooltip
            class="font-medium capitalize md:text-base xl:text-base"
            :content="row.status.toLowerCase()"
          />
        </div>
      </template>

      <!-- AMOUNT -->
      <template #amount="{ row }">
        <AppTruncatedTooltip
          class="font-medium md:text-base xl:text-base"
          :content="row ? (row.amount == 0 ? 0 : row.amount.toFixed(4)) : 'N/A'"
        />
      </template>

      <!-- CREDIT AMOUNT -->
      <template #creditAmount="{ row }">
        <AppTruncatedTooltip
          class="font-medium md:text-base xl:text-base"
          :content="row ? (row.creditAmount == 0 ? 0 : row.creditAmount.toFixed(4)) : 'N/A'"
        />
      </template>

      <!-- PAID AMOUNT -->
      <template #paidAmount="{ row }">
        <AppTruncatedTooltip
          class="font-medium md:text-base xl:text-base"
          :content="row ? (row.paidAmount == 0 ? 0 : row.paidAmount.toFixed(4)) : 'N/A'"
        />
      </template>

      <!-- VIEW -->
      <template #view="{ row }">
        <router-link :to="{ name: routeNames.algoBotDetailed, params: { id: row.botId, name: row.botName }}">
          <AppIcon
            name="eye"
            size="18"
            class="text-chicory-flower dark:text-blair cursor-pointer"
          />
        </router-link>
      </template>
    </AppTable>
  </mq-layout>

  <!-- MOBILE VIEW -->
  <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <AppCard
      class="bot-allocation-table flex flex-col flex-grow w-full pt-20 overflow-y-auto custom-scrollbar"
    >
      <!-- TITLE -->
      <p
        class="
          flex
          justify-center
          flex-shrink-0
          w-full
          text-md
          font-medium
          text-nile-blue
          dark:text-blair
          px-30
          mb-10
        "
      >
        Bot Allocation
      </p>

      <div class="flex flex-col w-full pb-10 overflow-y-auto custom-scrollbar">
        <!-- CONTENT -->
        <AppCollapse v-model="openedItems" :data="getData" class="flex flex-col flex-grow w-full">
          <AppCollapseItem
            v-for="(item, index) of getData"
            :key="index"
            :name="index.toString()"
            class="border-b border-solid border-tugce-silver dark:border-rushing-river-second last:border-none mx-12"
          >
            <!-- PREVIEW -->
            <template #header="{ collapsed }">
              <div
                class="grid grid-cols-2 gap-x-10 py-20 pl-12 -ml-12 pr-40 -mr-12"
                :class="collapsedItemColor(collapsed)"
              >
                <!-- ALGOBOT -->
                <div class="flex flex-col items-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Algobot</div>
                  <div class="flex items-center self-start space-x-6">
                    <div class="flex items-center flex-shrink-0">
                      <AppCryptoCoinChecker
                        v-if="getPairData(item.botRef)"
                        :icon-name="getPairData(item.botRef).base"
                        :icon-size="1.2"
                        :img-size="18"
                      />

                      <AppCryptoCoinChecker
                        v-if="getPairData(item.botRef)"
                        :icon-name="getPairData(item.botRef).quote"
                        :icon-size="1.2"
                        :img-size="18"
                        class="-ml-10"
                      />
                    </div>

                    <AppTruncatedTooltip :content="item.botName" class="font-medium text-nile-blue dark:text-white" />
                  </div>
                </div>

                <!-- STATUS -->
                <div class="flex flex-col items-center space-y-2">
                  <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Status</div>
                  <div v-if="item.status" class="flex space-x-10 items-center">
                    <div class="w-10 h-10 rounded-full" :class="getStatusStyle(item.status)" />
                    <AppTruncatedTooltip
                      class="font-medium capitalize text-nile-blue dark:text-white"
                      :content="item.status.toLowerCase()"
                    />
                  </div>
                </div>
              </div>
            </template>

            <!-- CONTENT -->
            <template #content="{ collapsed }">
              <div :class="collapsedItemColor(collapsed)" class="pb-20 px-12 -mx-12 space-y-20">
                <div class="grid grid-cols-3 gap-10">
                  <!-- UBXT AVAILABLE -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium text-sm">UBXT Available</div>
                    <AppTruncatedTooltip
                      class="font-medium text-nile-blue dark:text-white"
                      :content="item ? (item.amount == 0 ? 0 : item.amount.toFixed(4)) : 'N/A'"
                    />
                  </div>

                  <!-- UBXT CREDIT -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium text-sm">UBXT Credit</div>
                    <AppTruncatedTooltip
                      class="font-medium text-nile-blue dark:text-white"
                      :content="item ? (item.creditAmount == 0 ? 0 : item.creditAmount.toFixed(4)) : 'N/A'"
                    />
                  </div>

                  <!-- TOTAL PAID -->
                  <div class="flex flex-col items-center space-y-2">
                    <div class="text-beguiling-blue dark:text-blair font-medium text-sm">Total Paid</div>
                    <AppTruncatedTooltip
                      class="font-medium text-nile-blue dark:text-white"
                      :content="item ? (item.paidAmount == 0 ? 0 : item.paidAmount.toFixed(4)) : 'N/A'"
                    />
                  </div>
                </div>

                <!-- REDIRECT BUTTON -->
                <div class="grid grid-cols-2 gap-x-20">
                  <div />

                  <router-link
                    #default="{ navigate }"
                    :to="{ name: routeNames.algoBotDetailed, params: { id: item.botId, name: item.botName } }"
                    custom
                  >
                    <AppButton
                      type="primary-border"
                      size="lg"
                      class="flex items-center justify-center space-x-8"
                      @click="navigate()"
                    >
                      <AppIcon name="eye" />
                    </AppButton>
                  </router-link>
                </div>
              </div>
            </template>
          </AppCollapseItem>
        </AppCollapse>
      </div>
    </AppCard>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { routeNames } from '@/router'

import { useBots } from '@/global-setup/bots.composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'BotAllocationTable',

  props: {
    data: {
      type: Array,
      required: true
    }
  },

  setup (props) {
    const { isDarkMode } = useGlobal()
    const { bots } = useBots()
    const { isMD } = useCustomBreakpoints()

    // HEADERS //
    const tableHeaders: { property: string; label: string; sortable: boolean; minWidth: number; }[] = [
      { property: 'bot', label: 'Algo Bot', sortable: true, minWidth: 200 },
      { property: 'status', label: 'Status', sortable: true, minWidth: 120 },
      { property: 'amount', label: 'UBXT Available', sortable: true, minWidth: 150 },
      { property: 'creditAmount', label: 'UBXT Credit', sortable: true, minWidth: 120 },
      { property: 'paidAmount', label: 'Total Paid', sortable: true, minWidth: 120 },
      { property: 'view', label: 'View', sortable: false, minWidth: 80 }
    ]

    const openedItems = ref<string[]>([])

    const getData = computed({
      get () { return props.data },
      set (value) { return value }
    })

    function getPairData (botRef: string) {
      if (bots.value) {
        return bots.value.find((bot) => bot.botRef === botRef)
      }
      return null
    }

    function getStatusStyle (status: string): string {
      if (status === 'ENABLED') return 'bg-american-green'
      if (status === 'DISABLED') return 'bg-alexandria'
      if (status === 'LOCKED') return 'bg-mulgore-mustard'
      return ''
    }

    function collapsedItemColor (collapsed: boolean): string {
      if (!collapsed && isDarkMode.value) {
        return 'bg-crow-black-second bg-opacity-40'
      } else if (!collapsed && !isDarkMode.value) {
        return 'bg-azureish-white bg-opacity-40'
      } else {
        return ''
      }
    }

    return {
      routeNames,
      isMD,
      tableHeaders,
      getData,
      openedItems,
      getStatusStyle,
      getPairData,
      collapsedItemColor
    }
  }
})
</script>

<style lang="scss" scoped>
.bot-allocation-table {
  max-height: 400px;
}
</style>
