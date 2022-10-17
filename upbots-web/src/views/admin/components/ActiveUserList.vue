<template>
  <div class="flex flex-col space-y-20 relative">
    <!-- ACTIVE USER SUMMARY -->
    <div class="flex flex-col space-y-20 md:space-y-0 md:flex-row md:space-x-20">
      <div class="grid grid-cols-2 items-center w-full md:w-auto">
        <p class="text-chicory-flower dark:text-white">Active Day</p>
        <AppInputNumber
          v-model="activeDay"
          placeholder="Days"
          :min="1"
          @change="handleActiveDayUpdate"
        />
      </div>
      <div class="grid grid-cols-2 items-center w-full md:w-auto">
        <p class="text-chicory-flower dark:text-white">Active Users</p>
        <AppInputNumber v-model="activeUsers.length" placeholder="Users" :is-arrow="false" readonly />
      </div>

      <AppButton :disabled="!activeUsers.length" @click="handleGenerateFile()">
        Download CSV
      </AppButton>
    </div>

    <!-- ACTIVE USER LIST -->
    <div class="flex relative">
      <!-- LOADER -->
      <AppLoader v-if="loading" class="rounded-xlg" />

      <!-- TABLE -->
      <AppTable
        v-if="activeUsers.length"
        v-model:dataset="activeUsers"
        :headers="tableHeaders"
        :is-mobile-view-list="false"
        class="active-user-table flex flex-col flex-grow w-full pt-10 md:py-20"
      >
        <!-- TITLE -->
        <template #tableTitle>
          <mq-layout mq="lg+" class="flex justify-between items-center px-20 4xl:px-30 pb-14">
            <p class="md:text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair">
              Active User List
            </p>
          </mq-layout>
        </template>
      </AppTable>

      <!-- NO DATA STATE -->
      <template v-else>
        <AppCard class="active-user-table w-full pt-20 px-30">
          <mq-layout mq="lg+">
            <p class="md:text-md 4xl:text-lg font-medium text-chicory-flower dark:text-blair">
              Active User List
            </p>
          </mq-layout>
          <div class="flex flex-grow items-center justify-center h-full">
            <AppNoData color="text-chicory-flower dark:text-let-it-snow" />
          </div>
        </AppCard>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { vuex } from '@/store'
import { IActiveUser } from '@/views/admin/admin.types'

export default defineComponent({
  name: 'ActiveUserList',

  setup () {
    const tableHeaders = [
      { property: 'email', label: 'Email', minWidth: 130 },
      { property: 'firstname', label: 'First Name', minWidth: 100 },
      { property: 'login', label: 'Login', minWidth: 100 }
    ]

    const loading = computed((): boolean => vuex.admin.getLoadingActiveUser)
    const activeUsers = computed((): IActiveUser[] => vuex.admin.getActiveUsers)

    const activeDay = computed({
      get () {
        return vuex.admin.getActiveDay
      },
      set (value: number) {
        return value
      }
    })

    function handleActiveDayUpdate (day: number) {
      vuex.admin.updateActiveDay(day)
    }

    function handleGenerateFile () {
      vuex.admin.generateFile()
    }

    return {
      loading,
      tableHeaders,
      activeUsers,
      activeDay,
      handleActiveDayUpdate,
      handleGenerateFile
    }
  }
})
</script>

<style lang="scss" scoped>
.active-user-table  {
  min-height: 240px;
  max-height: 400px;
 }
</style>
