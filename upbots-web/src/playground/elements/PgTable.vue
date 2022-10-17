<template>
  <div class="text-nile-blue dark:text-white">
    <AppTable
      v-model:dataset="dataset1"
      :headers="headers1"
      :rowClassChecker="markIneligibleRow"
      title="Table (sort on frontend side)"
      class="table-height-preview"
      sort-front-side
      @row-click="rowClick"
    >
      <template #firstName="{ row }">
        {{ row.firstName + ' ' + row.lastName }}
      </template>
    </AppTable>

    <AppTable
      v-model:dataset="dataset2"
      class="mt-30"
      :headers="headers2"
      @sort-by="onUpdateList"
      @row-click="rowClick"
    >
      <template #tableTitle>
        <p class="px-30 py-14">Table (sort on backend side) <span class="text-xs">*(check console)</span></p>
      </template>
    </AppTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ITableSort, TIndexedObject } from '@/types'

import AppTable from '@/components/stateless/AppTable.vue'

export default defineComponent({
  name: 'PgTable',

  components: { AppTable },

  setup () {
    const headers1 = [
      { property: 'firstName', label: 'Full name', sortable: true, minWidth: 200 },
      { property: 'email', label: 'Email', sortable: true, minWidth: 180 },
      { property: 'gender', label: 'Gender', sortable: true, minWidth: 180 },
      { property: 'phone', label: 'Phone', sortable: true, minWidth: 180 }
    ]
    const dataset1 = ref([
      {
        firstName: 'Mercedes',
        lastName: 'Dodswell',
        email: 'mdodswell0@cyberchimps.com',
        gender: 'Male',
        phone: '385-185-6926'
      }, {
        firstName: 'Estevan',
        lastName: 'Sacaze',
        email: 'esacaze1@deliciousdays.com',
        gender: 'Male',
        phone: '835-179-5554'
      }, {
        firstName: 'Serena',
        lastName: 'Stollenhof',
        email: 'sstollenhof2@webnode.com',
        gender: 'Female',
        phone: '999-648-3417'
      }, {
        firstName: 'Dorothee',
        lastName: 'Auld',
        email: 'dauld3@cpanel.net',
        gender: 'Male',
        phone: '263-385-9532'
      }, {
        firstName: 'Zackariah',
        lastName: 'Males',
        email: 'zmales4@indiegogo.com',
        gender: 'Male',
        phone: '312-723-3965'
      }, {
        firstName: 'Dalia',
        lastName: 'Marchello',
        email: 'dmarchello5@nifty.com',
        gender: 'Female',
        phone: '834-344-3996'
      }, {
        firstName: 'Berny',
        lastName: 'Garric',
        email: 'bgarric6@dailymotion.com',
        gender: 'Male',
        phone: '463-336-7730'
      }, {
        firstName: 'Michelina',
        lastName: 'McDaid',
        email: 'mmcdaid7@unesco.org',
        gender: 'Female',
        phone: '557-433-7104'
      }, {
        firstName: 'Douglass',
        lastName: 'Nesbitt',
        email: 'dnesbitt8@seattletimes.com',
        gender: 'Male',
        phone: '831-154-6179'
      }, {
        firstName: 'Whittaker',
        lastName: 'Ilott',
        email: 'wilott9@nbcnews.com',
        gender: 'Male',
        phone: '710-536-9314'
      }
    ])

    const headers2 = [
      { property: 'firstName', label: 'First name', sortable: true, minWidth: 200 },
      { property: 'lastName', label: 'Last name', sortable: true, minWidth: 250 },
      { property: 'email', label: 'Email', sortable: true, minWidth: 180 }
    ]
    const dataset2 = ref([
      { firstName: 'Karole', lastName: 'Muris', email: 'kmuris0@tripadvisor.com' },
      { firstName: 'Annamarie', lastName: 'Sperling', email: 'asperling1@yolasite.com' },
      { firstName: 'Amabelle', lastName: 'Hardingham', email: 'ahardingham2@myspace.com' },
      { firstName: 'Sidney', lastName: 'Roullier', email: 'sroullier3@hud.gov' }
    ])

    const onUpdateList = (e: ITableSort) => {
      console.log('onUpdateList: ', `{ orderBy: ${e.orderBy}, order: ${e.order} }`)
    }

    const rowClick = (row: TIndexedObject) => {
      console.log('row: ', row)
    }

    const markIneligibleRow = (row: { gender: string; }) => {
      return (row.gender === 'Male') ? 'text-blue-400 dark:text-blue-100' : 'text-red-400 dark:text-red-100'
    }

    return {
      dataset1,
      headers1,

      dataset2,
      headers2,

      onUpdateList,
      rowClick,
      markIneligibleRow
    }
  }
})
</script>

<style scoped>
.table-height-preview {
  height: 300px;
}
</style>
