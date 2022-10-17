<template>
  <div class="relative flex flex-col flex-shrink-0 w-full overflow-y-auto md:overflow-y-visible custom-scrollbar">
    <!-- DESKTOP -->
    <mq-layout mq="lg+" class="flex flex-col flex-grow relative overflow-y-auto custom-scrollbar">
      <AppLoader v-if="accountsLoading" class="rounded-xlg" />
      <!-- FOR USER WITH NO API KEYS -->
      <AppCard v-if="!getKeysData.length" class="p-30 flex flex-col w-full">
        <ConnectAPIKeyTuto />
      </AppCard>

      <!-- FOR USER WITH API KEYS -->
      <AppTable
        v-else
        v-model:dataset="getKeysData"
        :headers="headersKeys"
        class="h-full md:py-10 4xl:py-20"
        sort-front-side
      >
        <!-- TITLE -->
        <template #tableTitle>
          <p
            class="text-md 4xl:text-lg text-nile-blue dark:text-blair font-medium px-20 4xl:px-30 py-14"
          >
            My Exchanges Keys
          </p>
        </template>

        <!-- EXCHANGE -->
        <template #exchange="{ row }">
          <AppTruncatedTooltip :content="row?.exchange[0].toUpperCase() + row?.exchange.slice(1)" />
        </template>

        <!-- CREATED -->
        <template #created="{ row }">
          <AppTruncatedTooltip :content="$filters.date(row.created)" />
        </template>

        <!-- UPDATED -->
        <template #updated="{ row }">
          <AppTruncatedTooltip :content="$filters.date(row.updated)" />
        </template>

        <!-- VALID -->
        <template #valid="{ row }">
          <AppTruncatedTooltip
            class="font-medium"
            :class="row.valid ? 'text-spring-bouquet' : 'text-alexandria'"
            :content="row.valid ? 'Active' : 'Inactive'"
          />
        </template>
        <!-- ACTION BUTTONS -->
        <template #actions="{ row }">
          <div class="flex items-center text-nile-blue dark:text-blair h-full">
            <AppIcon name="edit" size="17" class="mx-10 cursor-pointer" @click="editRow(row)" />
            <AppIcon name="trash" size="17" class="mx-10 cursor-pointer" @click="removeRow(row)" />
          </div>
        </template>
      </AppTable>
    </mq-layout>

    <!-- MOBILE -->
    <mq-layout mq="sm-md" class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      <AppCard
        class="flex flex-col py-20"
        :class="getKeysData.length ? 'flex-grow overflow-y-auto custom-scrollbar' : 'px-20'"
      >
        <AppLoader v-if="accountsLoading" class="rounded-xlg" />

        <!-- TITLE -->
        <p
          class="flex justify-center flex-shrink-0 w-full
          text-md font-medium text-nile-blue dark:text-blair px-30 mb-20"
        >
          My Exchanges Keys
        </p>

        <!-- FOR USER WITH NO API KEYS -->
        <ConnectAPIKeyTuto v-if="!getKeysData.length" />

        <div v-else class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
          <AppCollapse v-model="openedItems" :data="getKeysData" class="flex flex-col flex-grow w-full">
            <AppCollapseItem
              v-for="(item) of getKeysData"
              :key="item.id"
              :name="item.id.toString()"
              class="border-b border-solid border-tugce-silver dark:border-rushing-river-second last:border-none mx-12"
            >
              <!-- PREVIEW -->
              <template #header="{ collapsed }">
                <div
                  class="grid grid-cols-2 gap-x-12 py-20 px-12 -mx-12"
                  :class="getColor(collapsed)"
                >
                  <!-- EXCHANGES -->
                  <div class="flex flex-col space-y-6">
                    <span class="text-beguiling-blue dark:text-blair font-medium">Exchange</span>
                    <AppTruncatedTooltip
                      class="text-beguiling-blue dark:text-white text-base"
                      :content="item?.exchange[0].toUpperCase() + item?.exchange.slice(1)"
                    />
                  </div>

                  <!-- NAME -->
                  <div class="flex flex-col space-y-6">
                    <span class="text-beguiling-blue dark:text-blair font-medium">Name</span>
                    <AppTruncatedTooltip
                      class="text-beguiling-blue dark:text-white text-base capitalize"
                      :content="item.name"
                    />
                  </div>
                </div>
              </template>

              <!-- CONTENT -->
              <template #content="{ collapsed }">
                <div
                  class="flex flex-col space-y-20 pb-20 px-12 -mx-12"
                  :class="getColor(collapsed)"
                >
                  <div class="grid grid-cols-2 gap-x-12">
                    <!-- CREATED -->
                    <div class="flex flex-col space-y-6">
                      <span class="text-beguiling-blue dark:text-blair font-medium">Creation date</span>
                      <AppTruncatedTooltip
                        :content="$filters.date(item.created)"
                        class="text-beguiling-blue dark:text-white text-base capitalize"
                      />
                    </div>

                    <!-- UPDATED -->
                    <div class="flex flex-col space-y-6">
                      <span class="text-beguiling-blue dark:text-blair font-medium">Last update</span>
                      <AppTruncatedTooltip
                        :content="$filters.date(item.updated)"
                        class="text-beguiling-blue dark:text-white text-base capitalize"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-x-12">
                    <!-- STATUS -->
                    <div class="flex flex-col space-y-6">
                      <span class="text-beguiling-blue dark:text-blair font-medium">Status</span>
                      <span class="text-beguiling-blue dark:text-white text-base capitalize">
                        {{ item.valid ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                  </div>

                  <!-- ACTION BUTTONS -->
                  <div class="grid grid-cols-2 gap-x-12">
                    <AppButton
                      type="primary-border"
                      size="lg"
                      class="flex items-center justify-center w-full space-x-8"
                      @click="editRow(item)"
                    >
                      <AppIcon name="trash" />
                      <span>Edit</span>
                    </AppButton>

                    <AppButton
                      type="primary-border"
                      size="lg"
                      class="flex items-center justify-center w-full space-x-8"
                      @click="removeRow(item)"
                    >
                      <AppIcon name="edit" />
                      <span>Delete</span>
                    </AppButton>
                  </div>
                </div>
              </template>
            </AppCollapseItem>
          </AppCollapse>
        </div>
      </AppCard>
    </mq-layout>

    <!-- EDIT MODAL -->
    <AppModal
      v-if="keyForEdit.id"
      v-model="isModalEditKeyOpen"
      :closeOnBackdrop="false"
    >
      <EditKeyModal
        :id="keyForEdit.id"
        :name="keyForEdit.name"
        @success="() => { keyForEdit = {}; fetchAccounts() }"
      />
    </AppModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, computed, PropType } from 'vue'

import { collapsedItemColor } from '@/core/helpers'

import { keysService } from '@/services'
import { EErrorsMessage, IKey } from '@/types'
import { appNotify } from '@/components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'

import { useGlobal } from '@/global-setup/global.composition.setup'

import EditKeyModal from '@/views/keys/components/EditKeyModal.vue'
import ConnectAPIKeyTuto from '@/views/keys/components/ConnectAPIKeyTuto.vue'

type THeader = { property: string; label: string; sortable?: boolean; minWidth?: number; width?: number; }

export default defineComponent({
  name: 'MyExchangeKeys',

  components: { EditKeyModal, ConnectAPIKeyTuto },

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup () {
    const {
      isDarkMode,
      accountsLoading,
      accounts,
      fetchAccounts,
      setAccountLoading
    } = useGlobal()

    const openedItems = ref<string[]>([])

    const isModalEditKeyOpen = ref<boolean>(false)
    const keyForEdit = ref({})

    const headersKeys: THeader[] = [
      { property: 'exchange', label: 'Exchange', sortable: true, minWidth: 200 },
      { property: 'name', label: 'Name', sortable: true, minWidth: 200 },
      { property: 'created', label: 'Creation date', sortable: true, minWidth: 160 },
      { property: 'updated', label: 'Last update', sortable: true, minWidth: 160 },
      { property: 'valid', label: 'Status', sortable: true, width: 100 },
      { property: 'actions', label: '', width: 140 }
    ]

    const getKeysData = computed({
      get () { return accounts.value },
      set (value: IKey[]) { return value }
    })

    function getColor (collapsed: boolean) {
      return collapsedItemColor(collapsed, isDarkMode.value)
    }

    function editRow (row: IKey) {
      keyForEdit.value = row
      nextTick(() => {
        isModalEditKeyOpen.value = true
      })
    }

    async function removeRow (row: IKey) {
      const isAllow = await appConfirm({
        title: 'Confirm your action',
        body: 'Are you sure to delete key?',
        actionsName: ['Cancel', 'Delete']
      })

      if (isAllow) {
        try {
          setAccountLoading(true)
          await keysService.delete(row.id)
          await fetchAccounts()

          appNotify({ type: 'success', message: `${row.name} key has been deleted` })
        } catch (error) {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
        } finally {
          setAccountLoading(false)
        }
      }
    }

    return {
      accountsLoading,
      isDarkMode,
      getKeysData,
      headersKeys,
      openedItems,
      keyForEdit,
      isModalEditKeyOpen,
      collapsedItemColor,
      getColor,
      editRow,
      removeRow,
      fetchAccounts
    }
  }
})
</script>
