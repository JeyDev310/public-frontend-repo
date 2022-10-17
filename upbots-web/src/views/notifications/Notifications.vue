<template>
  <div class="flex flex-col flex-grow w-full overflow-y-hidden custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Notifications</h2>
    </Portal>

    <div class="flex flex-col flex-grow w-full pb-20 md:pb-0 overflow-y-auto custom-scrollbar">
      <AppCard class="flex flex-col flex-grow relative w-full md:pt-20 overflow-y-auto custom-scrollbar">
        <!-- LOADER -->
        <AppLoader v-if="notificationsLoading" class="rounded-xlg" />

        <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
          <!-- ACTION BAR DESKTOP -->
          <mq-layout mq="lg+">
            <div class="
          flex justify-between items-center border-b-2 border-solid
          border-catskill-white dark:border-pickled-bluewood px-20 pb-20"
            >
              <Compute #default="{ isDisabled }" :isDisabled="!selectedNotifications.length">
                <div class="flex flex-col md:flex-row md:space-x-10">
                  <AppButton class="w-full md:w-auto mb-8 md:mb-0" :disabled="isDisabled" @click="readSelected">
                    Read ({{ selectedNotifications.length }})
                  </AppButton>
                  <AppButton class="w-full md:w-auto" :disabled="isDisabled" @click="deleteSelected">
                    Delete ({{ selectedNotifications.length }})
                  </AppButton>
                </div>
              </Compute>

              <div class="flex flex-col md:flex-row md:space-x-10">
                <AppButton class="w-full md:w-auto mb-8 md:mb-0" @click="readAll">Read all</AppButton>
                <AppButton class="w-full md:w-auto" @click="unreadAll">Unread all</AppButton>
              </div>
            </div>
          </mq-layout>

          <!-- ACTION BAR MOBILE -->
          <mq-layout mq="sm-md">
            <AppExpand ref="filterExpand" v-model="expandValue" content-classes="flex flex-col" background="''">
              <!-- PREVIEW -->
              <template #preview>
                <div class="flex items-start justify-between w-full">
                  <span class="text-beguiling-blue dark:text-blair text-md font-medium">
                    Filters:
                  </span>
                </div>
              </template>

              <!-- CONTENT -->
              <template #content>
                <div class="flex flex-col items-center justify-center w-full space-y-12">
                  <div class="grid grid-cols-2 w-full gap-x-10">
                    <Compute #default="{ isDisabled }" :isDisabled="!selectedNotifications.length">
                      <div class="flex flex-col md:flex-row space-y-10">
                        <AppButton class="w-full" :disabled="isDisabled" @click="readSelected">
                          Read ({{ selectedNotifications.length }})
                        </AppButton>
                        <AppButton class="w-full" :disabled="isDisabled" @click="deleteSelected">
                          Delete ({{ selectedNotifications.length }})
                        </AppButton>
                      </div>
                    </Compute>

                    <div class="flex flex-col space-y-10">
                      <AppButton class="w-full" @click="readAll">Read all</AppButton>
                      <AppButton class="w-full" @click="unreadAll">Unread all</AppButton>
                    </div>
                  </div>

                  <div class="flex items-center space-x-4">
                    <div class="text-beguiling-blue dark:text-blair font-medium">Source:</div>
                    <AppDropdown
                      v-model="sourceValue"
                      :actions="sourceData"
                      dropdown-width="150px"
                    />
                  </div>
                </div>
              </template>
            </AppExpand>
          </mq-layout>

          <!-- DESKTOP -->
          <mq-layout mq="lg+" class="flex flex-col flex-grow w-full pt-20 overflow-y-hidden custom-scrollbar">
            <!-- HEADERS -->
            <div class="notifications__header grid gap-x-20 md:gap-x-30 flex-shrink-0 mb-20 px-10 md:px-20">
              <div />
              <div class="text-nile-blue dark:text-let-it-snow">Date & Time</div>
              <div class="text-nile-blue dark:text-let-it-snow">Message</div>
              <div class="text-nile-blue dark:text-let-it-snow">Bot Name</div>
              <div class="flex items-center space-x-6">
                <div class="text-nile-blue dark:text-let-it-snow font-medium">Source</div>
                <AppDropdown v-model="sourceValue" :actions="sourceData" dropdown-width="150px" />
              </div>
              <div />
            </div>

            <!-- ITEMS -->
            <div class="flex flex-col flex-grow gap-10 w-full pb-20 overflow-y-auto custom-scrollbar">
              <div
                v-for="item in notifications"
                :key="item.id"
                class="notifications__items grid gap-x-20 xl:gap-x-30 items-center flex-shrink-0 py-10 px-10 md:px-20"
                :class="{ 'bg-emptiness dark:bg-calico-dress': !item.isRead }"
              >
                <AppMultipleCheckbox
                  v-model:items="selectedNotifications"
                  :value="item.id"
                  :fieldId="item.id"
                />

                <div>
                  <AppTruncatedTooltip
                    :content="$filters.date(item.createdAt)"
                    class="text-nile-blue dark:text-downy"
                  />
                </div>

                <div class="flex flex-col">
                  <AppTruncatedTooltip
                    :content="`${item.exch.toUpperCase()} : ${item.type} ${item.side} - ${item.status}`"
                    class="text-nile-blue dark:text-downy"
                  />

                  <template v-if="item.status === 'ERROR'">
                    <AppTruncatedTooltip
                      :content="
                        item.errorReason ?
                          `${item.sbl}: failure: ${getErrorMsg(item.errorReason, item.exch)}` :
                          ''
                      "
                      class="leading-xs text-downy"
                    />
                  </template>

                  <template v-if="item.status === 'CANCELLED'">
                    <AppTruncatedTooltip
                      :content="item.errorReason ? `${item.sbl}: order cancelled: ${item.errorReason}` : ''"
                      class="leading-xs text-downy"
                    />
                  </template>

                  <template v-if="item.status === 'NEW'">
                    <AppTruncatedTooltip
                      :content="`${item.sbl}: asked: ${item.qOrig} @ ${item.pAsk}`"
                      class="leading-xs text-white"
                    />
                  </template>

                  <template v-if="item.status === 'FILLED' || item.status === 'PARTIALLY_FILLED'">
                    <AppTruncatedTooltip
                      :content="`${item.sbl}: executed ${item.qExec} @ ${item.pExec}`"
                      class="leading-xs text-downy"
                    />
                    <AppTruncatedTooltip
                      :content="`Cumulative cost: ${item.cumulQuoteCost} ${getCurrency(item.sbl)}`"
                      class="leading-xs text-downy"
                    />
                  </template>
                </div>

                <div>
                  <AppTruncatedTooltip
                    :content="item.botName || '-------'"
                    class="text-downy text-md leading-xs capitalize"
                  />
                </div>

                <div>
                  <AppTruncatedTooltip
                    :content="getInitiatorLabel(item.initiator)"
                    class="text-downy text-md leading-xs capitalize"
                  />
                </div>

                <div class="flex justify-end">
                  <AppIcon
                    v-if="!item.isRead"
                    name="eye"
                    size="20"
                    class="text-nile-blue dark:text-downy cursor-pointer"
                    @click="readNotification(item.id)"
                  />
                  <AppIcon
                    name="trash"
                    size="20"
                    class="text-nile-blue dark:text-downy cursor-pointer ml-10"
                    @click="deleteNotification(item.id)"
                  />
                </div>
              </div>
            </div>
          </mq-layout>

          <!-- MOBILE -->
          <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
            <AppCollapse v-model="openedItems" :data="notifications">
              <AppCollapseItem
                v-for="(item) of notifications"
                :key="item.id"
                :name="item.id.toString()"
                class="border-b border-solid border-tugce-silver dark:border-rushing-river-second last:border-none
                mx-12"
              >
                <!-- PREVIEW -->
                <template #header="{ collapsed }">
                  <div
                    class="flex space-x-20 py-20 px-12 -mx-12"
                    :class="collapsedItemColor(collapsed)"
                  >
                    <!-- SELECT ITEM -->
                    <div class="flex flex-col flex-shrink-0 ">
                      <AppMultipleCheckbox
                        v-model:items="selectedNotifications"
                        :value="item.id"
                        :fieldId="item.id"
                        class="mt-2"
                        @click="onCheckboxClick()"
                      />
                    </div>

                    <!-- MESSAGE -->
                    <div class="flex flex-col space-y-6 pr-40">
                      <span class="text-beguiling-blue dark:text-blair font-medium">Message:</span>
                      <div class="flex flex-col">
                        <AppTruncatedTooltip
                          :content="`${item.exch.toUpperCase()} : ${item.type} ${item.side} - ${item.status}`"
                          class="text-nile-blue dark:text-downy"
                        />

                        <template v-if="item.status === 'ERROR'">
                          <AppTruncatedTooltip
                            :content="
                              item.errorReason ?
                                `${item.sbl}: failure: ${getErrorMsg(item.errorReason, item.exch)}` :
                                ''
                            "
                            class="leading-xs text-downy"
                          />
                        </template>

                        <template v-if="item.status === 'CANCELLED'">
                          <AppTruncatedTooltip
                            :content="item.errorReason ? `${item.sbl}: order cancelled: ${item.errorReason}` : ''"
                            class="leading-xs text-downy"
                          />
                        </template>

                        <template v-if="item.status === 'NEW'">
                          <AppTruncatedTooltip
                            :content="`${item.sbl}: asked: ${item.qOrig} @ ${item.pAsk}`"
                            class="leading-xs text-white"
                          />
                        </template>

                        <template v-if="item.status === 'FILLED' || item.status === 'PARTIALLY_FILLED'">
                          <AppTruncatedTooltip
                            :content="`${item.sbl}: executed ${item.qExec} @ ${item.pExec}`"
                            class="leading-xs text-downy"
                          />
                          <AppTruncatedTooltip
                            :content="`Cumulative cost: ${item.cumulQuoteCost} ${getCurrency(item.sbl)}`"
                            class="leading-xs text-downy"
                          />
                        </template>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- CONTENT -->
                <template #content="{ collapsed }">
                  <div
                    class="flex flex-col space-y-20 pb-20 px-12 -mx-12"
                    :class="collapsedItemColor(collapsed)"
                  >
                    <div class="grid grid-cols-2 gap-x-12">
                      <!-- BOT NAME -->
                      <div class="flex flex-col space-y-6">
                        <span class="text-beguiling-blue dark:text-blair font-medium">Bot name:</span>
                        <AppTruncatedTooltip
                          :content="item.botName || '-------'"
                          class="text-downy text-md leading-xs capitalize"
                        />
                      </div>

                      <!-- SOURCE -->
                      <div class="flex flex-col space-y-6">
                        <span class="text-beguiling-blue dark:text-blair font-medium">Source:</span>
                        <AppTruncatedTooltip
                          :content="getInitiatorLabel(item.initiator)"
                          class="text-downy text-md leading-xs capitalize"
                        />
                      </div>
                    </div>

                    <!-- ACTION BUTTONS -->
                    <div class="grid grid-cols-2 gap-x-12">
                      <AppButton
                        v-if="!item.isRead"
                        type="primary-border"
                        size="lg"
                        class="flex items-center justify-center w-full space-x-8"
                        @click="readNotification(item.id)"
                      >
                        <AppIcon name="eye" />
                      </AppButton>

                      <AppButton
                        type="primary-border"
                        size="lg"
                        class="flex items-center justify-center w-full space-x-8"
                        @click="deleteNotification(item.id)"
                      >
                        <AppIcon name="trash" />
                        <span>Delete</span>
                      </AppButton>
                    </div>
                  </div>
                </template>
              </AppCollapseItem>
            </AppCollapse>
          </mq-layout>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

import { vuex } from '@/store'
import { notificationsService } from '@/services'
import { EErrorsMessage } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useGlobal } from '@/global-setup/global.composition.setup'

type TSourceDropdown = {value: string; label: string;}

const binanceErrorCodes: {code: string; msg: string;}[] = [
  { code: '-1000', msg: 'An unknown error occured while processing the request' },
  { code: '-1001', msg: 'Internal error, Please try again' },
  { code: '-1002', msg: 'You are not authorized to execute this request' },
  { code: '-1003', msg: 'Too many requests queued' },
  { code: '-1006', msg: 'An unexpected response was received from the message bus. Execution status unknown' },
  { code: '-1007', msg: 'Timeout waiting for response from backend server. Send status unknown; execution status unknown' },
  { code: '-1010', msg: 'Error message received' },
  { code: '-1011', msg: 'This IP cannot access this route' },
  { code: '-1013', msg: 'Order size does not meet minimum order quantity' },
  { code: '-1014', msg: 'Unsupported order combination' },
  { code: '-1015', msg: 'Too many new orders' },
  { code: '-1016', msg: 'This service is no longer available' },
  { code: '-1020', msg: 'This operation is not supported' },
  { code: '-1021', msg: 'Invalid timestamp' },
  { code: '-1022', msg: 'Invalid signature' },
  { code: '-1023', msg: 'Start time is greater than end time' },
  { code: '-1100', msg: 'Illegal characters found in a parameter' },
  { code: '-1101', msg: 'Too many parameters sent for this endpoint' },
  { code: '-1102', msg: 'A mandatory parameter was not sent, was empty/null, or malformed' },
  { code: '-1103', msg: 'An unknown parameter was sent' },
  { code: '-1104', msg: 'Not all sent parameters were read' },
  { code: '-1105', msg: 'A parameter was empty' },
  { code: '-1106', msg: 'A parameter was sent when not required' },
  { code: '-1111', msg: 'Precision is over the maximum defined for this asset' },
  { code: '-1112', msg: 'No orders on book for symbol' },
  { code: '-1114', msg: 'TimeInForce parameter sent when not required' },
  { code: '-1115', msg: 'Invalid timeInForce' },
  { code: '-1116', msg: 'Invalid orderType' },
  { code: '-1117', msg: 'Invalid side' },
  { code: '-1118', msg: 'New client order ID was empty' },
  { code: '-1119', msg: 'Original client order ID was empty' },
  { code: '-1120', msg: 'Invalid interval' },
  { code: '-1121', msg: 'Invalid symbol' },
  { code: '-1125', msg: 'This listenKey does not exist' },
  { code: '-1127', msg: 'Lookup interval is too big' },
  { code: '-1128', msg: 'Combination of optional parameters invalid' },
  { code: '-1130', msg: 'Invalid data sent for a parameter' },
  { code: '-2010', msg: 'New order rejected' },
  { code: '-2011', msg: 'Cancel rejected' },
  { code: '-2013', msg: 'Order does not exist' },
  { code: '-2014', msg: 'API-key format invalid' },
  { code: '-2015', msg: 'Invalid API-key, IP, or permissions for action' },
  { code: '-2016', msg: 'No trading window could be found for the symbol. Try ticker/24hrs instead' },
  { code: '-2018', msg: 'Balance is insufficient' },
  { code: '-2019', msg: 'Margin is insufficient' },
  { code: '-2020', msg: 'Unable to fill' },
  { code: '-2021', msg: 'Order would immediately trigger' },
  { code: '-2022', msg: 'ReduceOnly Order is rejected' },
  { code: '-2023', msg: 'User in liquidation mode now' },
  { code: '-2024', msg: 'Position is not sufficient' },
  { code: '-2025', msg: 'Reach max open order limit' },
  { code: '-2026', msg: 'This OrderType is not supported when reduceOnly' },
  { code: '-2027', msg: 'Exceeded the maximum allowable position at current leverage' },
  { code: '-2028', msg: 'Leverage is smaller than permitted: insufficient margin balance' }
]

export default defineComponent({
  name: 'Notifications',

  setup () {
    const { isDarkMode } = useGlobal()

    const filterExpand = ref()

    const expandValue = ref<boolean>(false)

    const notificationsLoading = ref<boolean>(false)

    const selectedNotifications = ref<string[]>([])
    const sourceValue = ref<TSourceDropdown>({ value: 'all', label: 'All' })
    const sourceData: TSourceDropdown[] = [
      { value: 'all', label: 'ALL' },
      { value: 'algobot', label: 'ALGOBOT' },
      { value: 'direct', label: 'MANUAL TRADE' }
    ]

    const notifications = computed(() => {
      if (sourceValue.value.value === 'all') {
        return vuex.notifications.notifications
      } else {
        return vuex.notifications.notifications.filter((x) => x.initiator === sourceValue.value.value)
      }
    })

    const openedItems = ref<string[]>([])

    function getInitiatorLabel (initiator: string) {
      return initiator === 'direct' || initiator === '' ? 'manual trade' : initiator
    }

    function collapsedItemColor (collapsed: boolean) {
      if (!collapsed && isDarkMode.value) {
        return 'bg-crow-black-second bg-opacity-40'
      } else if (!collapsed && !isDarkMode.value) {
        return 'bg-azureish-white bg-opacity-40'
      } else {
        return ''
      }
    }

    function getCurrency (pair: string) {
      return pair.includes('/') ? pair.split('/')[1] : ''
    }

    async function deleteNotification (id: string) {
      notificationsLoading.value = true

      try {
        await notificationsService.delete(id)
        await vuex.notifications.fetchNotifications()
        if (notifications.value.length) {
          openedItems.value = [notifications.value[0].id.toString()]
        }
        appNotify({ type: 'success', message: 'Notification has been deleted' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        notificationsLoading.value = false
      }
    }

    async function readNotification (id: string) {
      notificationsLoading.value = true

      try {
        await notificationsService.read(id)
        await vuex.notifications.fetchNotifications()
        openedItems.value = [notifications.value[0].id.toString()]
        appNotify({ type: 'success', message: 'Notification has been read' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        notificationsLoading.value = false
      }
    }

    async function readAll () {
      notificationsLoading.value = true

      try {
        await notificationsService.readAll()
        await vuex.notifications.fetchNotifications()
        openedItems.value = [notifications.value[0].id.toString()]
        appNotify({ type: 'success', message: 'Notifications have been read' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        notificationsLoading.value = false
      }
    }

    async function unreadAll () {
      notificationsLoading.value = true

      try {
        await notificationsService.unreadAll()
        await vuex.notifications.fetchNotifications()
        openedItems.value = [notifications.value[0].id.toString()]
        appNotify({ type: 'success', message: 'Notifications have become unread' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        notificationsLoading.value = false
      }
    }

    async function readSelected () {
      notificationsLoading.value = true

      try {
        await Promise.all(selectedNotifications.value.map(nId => notificationsService.read(nId)))
        await vuex.notifications.fetchNotifications()
        openedItems.value = [notifications.value[0].id.toString()]
        appNotify({ type: 'success', message: 'Notifications have been successfully updated' })
        selectedNotifications.value = []
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        notificationsLoading.value = false
      }
    }

    async function deleteSelected () {
      notificationsLoading.value = true

      try {
        await Promise.all(selectedNotifications.value.map(nId => notificationsService.delete(nId)))
        await vuex.notifications.fetchNotifications()
        selectedNotifications.value = []
        appNotify({ type: 'success', message: 'Notifications have been successfully updated' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        notificationsLoading.value = false
      }
    }

    function getErrorMsg (errReason: string, exchange: string) {
      if (exchange === 'binance') {
      // errReason from Binance is status code ex. -2011
        const error = binanceErrorCodes.find((err: { code: string; msg: string; }) => err.code === errReason)
        return error ? `${error.msg} (code: ${errReason.replace('-', '')})` : `code: ${errReason.replace('-', '')}`
      }
      return errReason
    }

    //  OPEN FILTER WHEN USER SELECT THE ITEM (ONLY FOR MOBILE VIEW) //
    function onCheckboxClick () {
      if (filterExpand.value) {
        filterExpand.value.isExpanded = true
      }
    }

    async function initData () {
      notificationsLoading.value = true

      try {
        await vuex.notifications.fetchNotifications()
        openedItems.value = [notifications.value[0].id.toString()]
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        notificationsLoading.value = false
      }
    }

    onMounted(() => { initData() })

    return {
      expandValue,
      filterExpand,
      notifications,
      selectedNotifications,
      sourceValue,
      sourceData,
      openedItems,
      notificationsLoading,
      readAll,
      unreadAll,
      readNotification,
      deleteNotification,
      readSelected,
      deleteSelected,
      getErrorMsg,
      getCurrency,
      getInitiatorLabel,
      collapsedItemColor,
      onCheckboxClick
    }
  }
})
</script>

<style lang="scss" scoped>
.notifications {
  &__header,
  &__items {
    grid-template-columns: 20px 1fr 1fr 1fr 1fr 48px;
  }
}
</style>
