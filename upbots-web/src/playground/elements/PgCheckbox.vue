<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppCheckbox sizes:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>Checkbox:</p>
          <AppCheckbox v-model="checkbox" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Checkbox with label:</p>
          <AppCheckbox v-model="checkbox">Label</AppCheckbox>
        </div>

        <div class="flex flex-col space-y-10">
          <p>Checkbox Multiple:</p>
          <div class="flex items-center space-x-10">
            <div v-for="(item, index) in checkboxMultipleItems" :key="index">
              <AppMultipleCheckbox v-model:items="checkboxMulipleSelected" :value="item.id" :fieldId="item.id" />
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-10">
          <p>Checkbox Multiple secondary:</p>
          <div class="flex items-center space-x-10">
            <div v-for="(item, index) in checkboxMultipleItems" :key="index">
              <AppMultipleCheckbox
                v-model:items="checkboxMulipleSelected"
                :value="item.id"
                :fieldId="item.id"
                type="secondary"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-10">
          <p>Checkbox Multiple with labels:</p>
          <div class="flex items-center space-x-10">
            <div v-for="(item, index) in checkboxMultipleItemsLabel" :key="index">
              <AppMultipleCheckbox v-model:items="checkboxMulipleSelectedLabel" :value="item.id" :fieldId="item.id">
                {{ item.label }}
              </AppMultipleCheckbox>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-10">
          <p>Checkbox custom size:</p>
          <AppCheckbox v-model="checkbox" checkbox-size="30" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Checkbox label size:</p>
          <AppCheckbox v-model="checkbox" label-size="xl">Label</AppCheckbox>
        </div>

        <div class="flex flex-col space-y-10">
          <p>Checkbox disabled:</p>
          <AppCheckbox v-model="checkbox" disabled />
        </div>
      </div>

      <h2 class="mb-20 text-xl font-semibold">AppCheckbox types:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>Checkbox primary:</p>
          <AppCheckbox v-model="checkboxPrimary" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Checkbox secondary:</p>
          <AppCheckbox v-model="checkboxPrimary" type="secondary" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Checkbox tetriary:</p>
          <AppCheckbox v-model="checkboxPrimary" type="tetriary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgCheckbox',

  setup () {
    const checkbox = ref(false)

    const checkboxMulipleSelected = ref<string[]>([])
    const checkboxMultipleItems = [
      { id: '1', label: 'Test 1' },
      { id: '2', label: 'Test 2' }
    ]

    const checkboxMulipleSelectedLabel = ref<string[]>([])
    const checkboxMultipleItemsLabel = [
      { id: '3', label: 'Test 1' },
      { id: '4', label: 'Test 2' }
    ]

    const checkboxPrimary = ref(false)

    return {
      checkbox,
      checkboxMulipleSelected,
      checkboxMultipleItems,
      checkboxMulipleSelectedLabel,
      checkboxMultipleItemsLabel,
      checkboxPrimary
    }
  }
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
