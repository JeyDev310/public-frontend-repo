<template>
  <div class="text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppDropdown:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>default:</p>
          <AppDropdown />
        </div>

        <div class="flex flex-col space-y-10">
          <p>title:</p>
          <AppDropdown title="title" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>title color:</p>
          <AppDropdown title="title" title-color="text-alexandria" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>actions:</p>
          <AppDropdown :actions="dropdownActions2" placement="right-start" @clone="clone" @remove="remove">
            qwdqwd
          </AppDropdown>
        </div>

        <div class="flex flex-col space-y-10">
          <p>actions + title:</p>
          <AppDropdown
            v-model="dropdownModel"
            title="Account2:"
            :actions="dropdownActions2"
            @clone="clone"
            @remove="remove"
          />
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom width:</p>
          <AppDropdown
            v-model="dropdownModel"
            title="Account2:"
            dropdown-width="300px"
            :actions="dropdownActions2"
            @clone="clone"
            @remove="remove"
          />
        </div>

        <div class="flex flex-col space-y-10">
          <p>action classes:</p>
          <AppDropdown
            v-model="dropdownModel"
            title="Account2:"
            dropdown-action-classes="flex items-center"
            :actions="dropdownActions2"
            @clone="clone"
            @remove="remove"
          />
        </div>

        <div class="flex flex-col space-y-10">
          <p>offset:</p>
          <AppDropdown
            v-model="dropdownModel"
            title="Account2:"
            :offset="40"
            :actions="dropdownActions2"
            @clone="clone"
            @remove="remove"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgDropdown',

  setup () {
    const dropdownActions = [
      { label: 'Edit', method: 'edit' },
      { label: 'Clone', method: 'clone' },
      { label: 'Remove', method: 'remove' }
    ]

    const dropdownActions2 = [
      { label: 'Clone', method: 'clone' },
      { label: 'Remove', method: 'remove' }
    ]

    const dropdownModel = ref({ label: 'Clone', method: 'clone' })

    function edit (id: string) {
      console.log('edit-id: ', id)
    }

    function clone () {
      console.log('clone')
    }

    function remove () {
      console.log('remove')
    }

    return {
      dropdownActions,
      dropdownActions2,
      dropdownModel,

      edit,
      clone,
      remove
    }
  }
})
</script>
