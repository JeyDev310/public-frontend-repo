<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col space-y-40">
      <h2 class="mb-20 text-xl font-semibold">AppCollapse sizes:</h2>

      <div class="flex flex-col space-y-10">
        <h3>Default state:</h3>

        <AppCollapse v-model="openedItems" :data="data" class="flex flex-col flex-grow w-full">
          <AppCollapseItem v-for="(item, index) of data" :key="index" :name="index.toString()">
            <!-- PREVIEW -->
            <template #header="{ collapsed }">
              <div class="flex items-center py-20">
                <span>{{ item.id }}</span>
                <span v-if="!collapsed">IsCollapsed</span>
              </div>
            </template>

            <!-- CONTENT -->
            <template #content="{ collapsed }">
              <div class="flex items-center">
                <span>{{ item.name }}</span>
                <span v-if="!collapsed">IsCollapsed</span>
              </div>
            </template>
          </AppCollapseItem>
        </AppCollapse>
      </div>

      <div class="flex flex-col space-y-10">
        <h3>State with AppCard:</h3>

        <AppCard class="px-20">
          <AppCollapse v-model="openedItems" :data="data" class="flex flex-col flex-grow w-full">
            <AppCollapseItem v-for="(item, index) of data" :key="index" :name="index.toString()">
              <!-- PREVIEW -->
              <template #header="{ collapsed }">
                <div class="flex items-center py-20">
                  <span>{{ item.id }}</span>
                  <span v-if="!collapsed">IsCollapsed</span>
                </div>
              </template>

              <!-- CONTENT -->
              <template #content="{ collapsed }">
                <div class="flex items-center">
                  <span>{{ item.name }}</span>
                  <span v-if="!collapsed">IsCollapsed</span>
                </div>
              </template>
            </AppCollapseItem>
          </AppCollapse>
        </AppCard>
      </div>

      <div class="flex flex-col space-y-10">
        <h3>Opened items by default state:</h3>

        <AppCard class="px-20">
          <AppCollapse v-model="openedItemsByDefault" :data="data" class="flex flex-col flex-grow w-full">
            <AppCollapseItem v-for="(item, index) of data" :key="index" :name="index.toString()">
              <!-- PREVIEW -->
              <template #header="{ collapsed }">
                <div class="flex items-center py-20">
                  <span>{{ item.id }}</span>
                  <span v-if="!collapsed">IsCollapsed</span>
                </div>
              </template>

              <!-- CONTENT -->
              <template #content="{ collapsed }">
                <div class="flex items-center">
                  <span>{{ item.name }}</span>
                  <span v-if="!collapsed">IsCollapsed</span>
                </div>
              </template>
            </AppCollapseItem>
          </AppCollapse>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgCollapse',

  setup () {
    const openedItems = ref<string[]>([])
    const openedItemsByDefault = ref<string[]>(['0'])

    const data = ref<{ id: number; name: string; }[]>([
      { id: 1, name: 'Test 1' },
      { id: 2, name: 'Test 2' },
      { id: 3, name: 'Test 3' },
      { id: 4, name: 'Test 4' }
    ])

    return { openedItems, openedItemsByDefault, data }
  }
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
