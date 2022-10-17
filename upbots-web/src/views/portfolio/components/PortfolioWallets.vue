<template>
  <!-- DESKTOP -->
  <mq-layout mq="lg+" class="flex flex-grow flex-col w-full overflow-y-auto custom-scrollbar">
    <AppCard
      class="flex flex-grow flex-col relative w-full py-10 px-10 md:px-30 md:py-20 overflow-y-auto custom-scrollbar"
    >
      <!-- LOADER -->
      <AppLoader v-if="loading" />

      <!-- HEADER -->
      <div class="flex w-full items-center justify-between mb-40">
        <h2 class="text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair">My Wallets</h2>
        <AppButton
          v-if="filteredAccounts.length && walletType === 'cex'"
          type="primary-border"
          size="xs"
          is-uppercase
          @click="toggleWalletSelectAll"
        >
          {{ getIsSelectAll ? 'Unselect All' : 'Select All' }}
        </AppButton>

        <AppButton
          v-if="filteredAccounts.length && walletType === 'dex' && !getIsSelectAll"
          type="primary-border"
          size="xs"
          is-uppercase
          @click="toggleWalletSelectAll"
        >
          Select All
        </AppButton>
      </div>

      <!-- BODY -->
      <div
        v-if="filteredAccounts.length"
        class="flex flex-col w-full mb-20 overflow-auto custom-scrollbar"
      >
        <template v-for="(account, index) in filteredAccounts" :key="index">
          <Compute #default="{ isSelected }" :isSelected="selectedWallets.find((el)=> el === account.name)">
            <div class="flex items-center mb-24 last:mb-0">
              <div class="flex w-1/3">
                <AppRadio
                  :modelValue="isSelected"
                  :inputValue="isSelected"
                  class="w-full"
                  @click="toggleWalletCheckbox(account)"
                >
                  <AppTruncatedTooltip
                    :content="`${account.name}:`"
                    class="text-base font-medium text-chicory-flowers dark:text-white"
                  />
                </AppRadio>
              </div>

              <div class="flex flex-grow flex-col ml-20">
                <div class="text-sm text-chicory-flower dark:text-bright-turquoise">
                  {{ account.total.btc.toFixed(6) }} BTC
                </div>

                <div class="text-sm text-chicory-flower dark:text-let-it-snow">
                  {{
                    `${formatNumber(getConvertedCurrency(account.total.btc || 0))}
                    ${getFavoriteCurrency.label}`
                  }}
                </div>
              </div>

              <div class="flex w-1/6 justify-end">
                <AppDropdown
                  :actions="dropdownActions[walletType]"
                  placement="left-start"
                  dropdown-width="120px"
                  @edit="editWallet(account.name)"
                  @remove="removeWallet(account.name)"
                >
                  <template #preview="{ preview }">
                    <span
                      class="group flex items-center justify-center cursor-pointer w-32 h-32 rounded-full"
                      :class="preview && 'dark:bg-black dark:bg-opacity-10 bg-chicory-flower bg-opacity-10'"
                    >
                      <AppIcon name="dots" class="transform rotate-90 text-bluster-blue dark:text-let-it-snow" />
                    </span>
                  </template>

                  <template #actions="{ action }">
                    <AppIcon class="mr-10" :name="action.icon" />
                  </template>
                </AppDropdown>
              </div>
            </div>
          </Compute>
        </template>
      </div>

      <div v-else class="flex flex-grow items-center justify-center w-full py-30 mb-20">
        <AppNoData color="text-chicory-flower dark:text-let-it-snow" />
      </div>

      <template v-if="walletType === 'cex'">
        <router-link #default="{ navigate }" :to="{ name: routeNames.keys }" custom>
          <AppButton
            type="primary-border-filled"
            size="xlg"
            class="w-full mt-auto"
            @click="navigate()"
          >
            Add New Portfolio
          </AppButton>
        </router-link>
      </template>

      <AppButton
        v-else
        type="primary-border-filled"
        size="xlg"
        class="self-end w-full mt-auto"
        @click="addDexWallet"
      >
        Add New Wallet
      </AppButton>
    </AppCard>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md" class="flex flex-col flex-shrink-0 overflow-y-auto custom-scrollbar">
    <AppExpand
      v-model="expandValue"
      preview-classes="flex justify-between"
      content-classes="flex flex-col overflow-y-auto custom-scrollbar"
      class="flex flex-col relative overflow-y-auto custom-scrollbar"
    >
      <!-- PREVIEW -->
      <template #preview>
        <div class="flex items-center text-chicory-flower dark:text-tradewind">
          <AppIcon name="wallet" />
          <span class="text-base font-medium ml-14">My Wallets</span>
        </div>
      </template>

      <!-- BODY -->
      <template #content>
        <!-- LOADER -->
        <AppLoader v-if="loading" class="rounded-xlg" />

        <div class="flex flex-col w-full overflow-y-auto custom-scrollbar">
          <button
            v-if="filteredAccounts.length && walletType === 'cex'"
            class="
              self-end
              text-xs
              text-chicory-flower
              dark:text-blair
              border
              border-chicory-flower
              dark:border-blair
              rounded-sm
              px-6
              py-4
            "
            @click="toggleWalletSelectAll"
          >
            {{ getIsSelectAll ? 'Unselect All' : 'Select All' }}
          </button>

          <button
            v-if="filteredAccounts.length && walletType === 'dex' && !getIsSelectAll"
            class="
              self-end
              text-xs
              text-chicory-flower
              dark:text-blair
              border
              border-chicory-flower
              dark:border-blair
              rounded-sm
              px-6
              py-4
            "
            @click="toggleWalletSelectAll"
          >
            Select All
          </button>

          <div
            v-if="filteredAccounts.length"
            class="portfolio-wallets__content flex flex-col w-full my-20 overflow-y-auto custom-scrollbar"
          >
            <template v-for="(account, index) in filteredAccounts" :key="index">
              <Compute #default="{ isSelected }" :isSelected="selectedWallets.find((el)=> el === account.name)">
                <div class="flex items-center mb-24 last:mb-0">
                  <div class="flex w-1/3">
                    <AppRadio
                      :modelValue="isSelected"
                      :inputValue="isSelected"
                      class="w-full"
                      @click="toggleWalletCheckbox(account)"
                    >
                      <AppTruncatedTooltip
                        :content="`${account.name}:`"
                        class="text-base font-medium text-chicory-flower dark:text-white"
                      />
                    </AppRadio>
                  </div>

                  <div class="flex flex-grow flex-col ml-20">
                    <div class="text-sm text-chicory-flower dark:text-bright-turquoise">
                      {{ account.total.btc.toFixed(6) }} BTC
                    </div>

                    <div class="text-sm text-chicory-flower dark:text-let-it-snow">
                      {{
                        `${formatNumber(getConvertedCurrency(account.total.btc || 0))}
                          ${getFavoriteCurrency.label}`
                      }}
                    </div>
                  </div>

                  <div class="flex w-1/6 justify-end">
                    <AppDropdown
                      :actions="dropdownActions[walletType]"
                      placement="left-start"
                      dropdown-width="120px"
                      @edit="editWallet(account.name)"
                      @remove="removeWallet(account.name)"
                    >
                      <template #preview="{ preview }">
                        <span
                          class="group flex items-center justify-center cursor-pointer w-32 h-32 rounded-full"
                          :class="preview && 'dark:bg-black dark:bg-opacity-10 bg-chicory-flower bg-opacity-10'"
                        >
                          <AppIcon name="dots" class="transform rotate-90 text-bluster-blue dark:text-let-it-snow" />
                        </span>
                      </template>

                      <template #actions="{ action }">
                        <AppIcon class="mr-10" :name="action.icon" />
                      </template>
                    </AppDropdown>
                  </div>
                </div>
              </Compute>
            </template>
          </div>

          <div v-else class="flex flex-grow items-center justify-center w-full py-30 mb-20">
            <AppNoData color="text-chicory-flower dark:text-let-it-snow" />
          </div>

          <template v-if="walletType === 'cex'">
            <router-link #default="{ navigate }" :to="{ name: routeNames.keys }" custom>
              <AppButton

                type="primary-border-filled"
                size="xlg"
                class="self-end w-full mt-auto"
                @click="navigate()"
              >
                Add New Portfolio
              </AppButton>
            </router-link>
          </template>

          <AppButton
            v-else
            type="primary-border-filled"
            size="xlg"
            class="self-end w-full mt-auto"
            @click="addDexWallet"
          >
            Add New Wallet
          </AppButton>
        </div>
      </template>
    </AppExpand>
  </mq-layout>

  <!-- MODALS -->
  <AppModal v-model="isModalOpen" :beforeClose="handleModalClose" :modal-width="modalWidth">
    <!-- EDIT CEX WALLET MODAL -->
    <EditCexWalletModal
      v-if="walletType === 'cex' && isModalEditOpen && editItem.id"
      :id="editItem.id"
      :name="editItem.name"
      :public-key="editItemInfo"
      @success="() => updateWallet()"
    />

    <!-- ADD DEX WALLET MODAL -->
    <AddDexWalletModal v-if="isModalAddDexOpen" @success="() => updateWallet()" />
  </AppModal>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, nextTick, reactive, toRefs } from 'vue'
import { routeNames } from '@/router'

import { vuex } from '@/store'
import { keysService } from '@/services'

import { formatNumber } from '@/core/helpers'
import { allDexWalletsOption } from '@/views/portfolio/store/dex/consts'
import { EErrorsMessage, IAccount } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'

import { appNotify } from '@/components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'

import EditCexWalletModal from '@/views/portfolio/components/EditCexWalletModal.vue'
import AddDexWalletModal from '@/views/portfolio/components/AddDexWalletModal.vue'

export default defineComponent({
  name: 'PortfolioWallets',

  components: { EditCexWalletModal, AddDexWalletModal },

  props: {
    walletType: {
      type: String as PropType<'cex' | 'dex'>,
      required: true
    }
  },

  setup (props) {
    const { accounts, getFavoriteCurrency, getConvertedCurrency } = useGlobal()

    const expandValue = ref<boolean>(false)

    const loading = ref<boolean>(false)

    const filteredAccounts = computed(() => vuex[props.walletType].getAccounts)
    const wallets = computed(() => filteredAccounts.value.map((account: IAccount) => account.name))
    const selectedWallets = computed(() => vuex[props.walletType].getSelectedWallets)

    const state = reactive({
      openedItems: [] as string[]
    })

    const { openedItems } = toRefs(state)

    // Modal
    const isModalOpen = ref<boolean>(false)
    const isModalEditOpen = ref<boolean>(false)
    const isModalAddDexOpen = ref<boolean>(false)
    const modalWidth = ref<string>('500')

    const editItem: any = ref({})
    const editItemInfo = ref<string>('')

    const dropdownActions = {
      dex: [
        { label: 'Delete', method: 'remove', icon: 'trash' }
      ],

      cex: [
        { label: 'Edit key', method: 'edit', icon: 'edit' },
        { label: 'Delete', method: 'remove', icon: 'trash' }
      ]
    }

    const getIsSelectAll = computed(() => selectedWallets.value.length === filteredAccounts.value.length)

    async function toggleWalletSelectAll () {
      loading.value = true

      try {
        if (props.walletType === 'cex') {
          vuex.cex.setSelectedWallets(!getIsSelectAll.value ? wallets.value : [])
          await vuex.cex.fetchPortfolioDistribution(null)
          await vuex.cex.fetchPortfolioEvolution()
        } else {
          vuex.dex.setSelectedWallet(allDexWalletsOption)
          await vuex.dex.fetchDexBalance()
        }
      } finally {
        loading.value = false
      }
    }

    async function toggleWalletCheckbox (account: IAccount) {
      loading.value = true
      const { name } = account

      await vuex[props.walletType].handleToggleWallet(name)
      loading.value = false
    }

    async function updateWallet () {
      isModalOpen.value = false
      loading.value = true
      if (props.walletType === 'cex') {
        editItem.value = {}
        isModalEditOpen.value = false
        await vuex.cex.fetchCEXPortfolioData()
      } else {
        isModalAddDexOpen.value = false
      }
      loading.value = false
    }

    function editWallet (accountName: string) {
      if (props.walletType === 'cex') {
        const keyData = computed(() => accounts.value.find((key) => key.name === accountName))

        if (keyData.value && keyData.value.id) {
          editItem.value = keyData.value
          editItemInfo.value = keyData.value.publicKey

          nextTick(() => {
            isModalOpen.value = true
            isModalEditOpen.value = true
            modalWidth.value = '500'
          })
        }
      }
    }

    async function removeWallet (accountName: string) {
      const isAllow = await appConfirm({
        title: 'Confirm your action',
        body: 'Are you sure to delete a wallet?'
      })

      if (isAllow) {
        try {
          if (props.walletType === 'cex') {
            const keyData = computed(() => accounts.value.find((key) => key.name === accountName))

            if (keyData.value) {
              await keysService.delete(keyData.value.id)
              appNotify({ type: 'success', message: `${keyData.value.name} key has been deleted` })
              updateWallet()
            }
          } else {
            await vuex.dex.deleteWallet(accountName)
            appNotify({ type: 'success', message: `${accountName} wallet has been deleted` })
          }
        } catch (error) {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
        }
      } else {
        return false
      }
    }

    function addDexWallet () {
      isModalOpen.value = true
      isModalAddDexOpen.value = true
      modalWidth.value = '1200'
    }

    function handleModalClose () {
      return appConfirm({ title: 'Confirm your action', body: 'Are you sure to close?' })
    }

    return {
      routeNames,
      expandValue,
      loading,
      openedItems,
      modalWidth,
      isModalOpen,
      isModalAddDexOpen,
      isModalEditOpen,
      filteredAccounts,
      selectedWallets,
      dropdownActions,
      editItemInfo,
      getFavoriteCurrency,
      getIsSelectAll,
      editItem,
      formatNumber,
      getConvertedCurrency,
      toggleWalletSelectAll,
      toggleWalletCheckbox,
      handleModalClose,
      editWallet,
      removeWallet,
      updateWallet,
      addDexWallet
    }
  }
})
</script>

<style lang="scss" scoped>
.portfolio-wallets {
  &__content {
    @media(max-width: 767px) {
      min-height: 200px;
      max-height: 250px;
    }
  }
}
</style>
