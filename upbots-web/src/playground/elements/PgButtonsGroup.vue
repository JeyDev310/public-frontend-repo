<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppButtonGroup sizes:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>size xs:</p>
          <AppButtonsGroup v-model="buttonsValue" size="xs" :options="buttonsData" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size sm:</p>
          <AppButtonsGroup v-model="buttonsValue" size="sm" :options="buttonsData" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size md (default):</p>
          <AppButtonsGroup v-model="buttonsValue" :options="buttonsData" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size lg:</p>
          <AppButtonsGroup v-model="buttonsValue" size="lg" :options="buttonsData" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size xlg:</p>
          <AppButtonsGroup v-model="buttonsValue" size="xlg" :options="buttonsData" />
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppButtonsGroup custom width:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>width 200px:</p>
          <AppButtonsGroup v-model="buttonsValue" size="xs" :options="buttonsData" width="200px" />
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppButtonsGroup multiple items:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>(3 items):</p>
          <AppButtonsGroup v-model="buttonDefaultValueMultiple" size="xlg" :options="buttonDefaultDataMultiple" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>(3 items) + disabled:</p>
          <AppButtonsGroup
            v-model="buttonDefaultValueMultiple"
            size="xlg"
            :options="buttonDefaultDataMultiple"
            :disabled-options="disabledMultipleButtonDefault"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppButtonsGroup default state:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>(3 items):</p>
          <AppButtonsGroup v-model="buttonDefaultValueMultiple" size="xlg" :options="buttonDefaultDataMultiple" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>(3 items) + disabled:</p>
          <AppButtonsGroup
            v-model="buttonDefaultValueMultiple"
            size="xlg"
            :options="buttonDefaultDataMultiple"
            :disabled-options="disabledMultipleButtonDefault"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppButtonsGroup outlined state:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>Buttons badge (3 items):</p>
          <AppButtonsGroup v-model="buttonOutlinedValue" :options="buttonOutlinedData" type="outlined" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Buttons badge (3 items) + disabled:</p>
          <AppButtonsGroup
            v-model="buttonOutlinedValueMultiple"
            :options="buttonOutlinedDataMultiple"
            :disabled-options="disabledMultipleButtonOutlined"
            type="outlined"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppButtonsGroup badge state:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>Buttons badge (3 items):</p>
          <AppButtonsGroup v-model="buttonBadge" :options="buttonBadgeData" type="badge" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Buttons badge (3 items) + disabled:</p>
          <AppButtonsGroup
            v-model="buttonsBadgeValueMultiple"
            :options="buttonsBadgeDataMultiple"
            :disabled-options="disabledMultipleButtonsBadge"
            type="badge"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppButtonsGroup underline state:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>Buttons underline (3 items):</p>
          <AppButtonsGroup v-model="buttonUnderline" :options="buttonUnderlineData" type="underline" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Buttons underline (3 items) + disabled:</p>
          <AppButtonsGroup
            v-model="buttonsUnderlineValueMultiple"
            :options="buttonsUnderlineDataMultiple"
            :disabled-options="disabledMultipleButtonsUnderline"
            type="underline"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppButtonsGroup filled state:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>Buttons filled (2 items):</p>
          <AppButtonsGroup v-model="buttonsValue" :options="buttonsData" width="100%" type="filled" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Buttons filled (2 items): + disabled:</p>
          <AppButtonsGroup v-model="buttonsValue" :options="buttonsData" width="100%" type="filled" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgButtonsGroup',

  setup () {
    const buttonsValue = ref(1)
    const buttonsData = [
      { value: 1, label: 'Button 1' },
      { value: 2, label: 'Button 2' }
    ]
    const disabledButtons = [1]

    const buttonsValueMultiple = ref(1)
    const buttonsDataMultiple = [
      { value: 1, label: 'Button 1' },
      { value: 2, label: 'Button 2' },
      { value: 3, label: 'Button 3' }
    ]
    const disabledMultipleButtons = [1, 3]

    // BUTTON DEFAULT //
    const buttonDefaultValue = ref(1)
    const buttonDefaultData = [
      { value: 1, label: 'Button 1' },
      { value: 2, label: 'Button 2' },
      { value: 3, label: 'Button 3' }
    ]
    const disabledButtonDefault = [1, 3]

    const buttonDefaultValueMultiple = ref(1)
    const buttonDefaultDataMultiple = [
      { value: 1, label: 'Button 1' },
      { value: 2, label: 'Button 2' },
      { value: 3, label: 'Button 3' }
    ]
    const disabledMultipleButtonDefault = [1, 3]

    // BUTTON OUTLINED //
    const buttonOutlinedValue = ref(1)
    const buttonOutlinedData = [
      { value: 1, label: 'Button 1' },
      { value: 2, label: 'Button 2' },
      { value: 3, label: 'Button 3' }
    ]
    const disabledButtonOutlined = [1, 3]

    const buttonOutlinedValueMultiple = ref(1)
    const buttonOutlinedDataMultiple = [
      { value: 1, label: 'Button 1' },
      { value: 2, label: 'Button 2' },
      { value: 3, label: 'Button 3' }
    ]
    const disabledMultipleButtonOutlined = [1, 3]

    // BUTTON BADGE //
    const buttonBadge = ref(1)
    const buttonBadgeData = [
      { value: 1, label: 'Button 1' },
      { value: 2, label: 'Button 2' },
      { value: 3, label: 'Button 3' }
    ]
    const disabledButtonBadge = [1, 3]

    const buttonsBadgeValueMultiple = ref(1)
    const buttonsBadgeDataMultiple = [
      { value: 1, label: 'Button 1' },
      { value: 2, label: 'Button 2' },
      { value: 3, label: 'Button 3' }
    ]
    const disabledMultipleButtonsBadge = [1, 3]

    // BUTTON UNDERLINE //
    const buttonUnderline = ref(1)
    const buttonUnderlineData = [
      { value: 1, label: 'Button 1' },
      { value: 2, label: 'Button 2' },
      { value: 3, label: 'Button 3' }
    ]
    const disabledButtonUnderline = ref([1, 3])

    const buttonsUnderlineValueMultiple = ref(1)
    const buttonsUnderlineDataMultiple = [
      { value: 1, label: 'Button 1' },
      { value: 2, label: 'Button 2' },
      { value: 3, label: 'Button 3' }
    ]
    const disabledMultipleButtonsUnderline = [1, 3]

    return {
      buttonsValue,
      buttonsData,
      disabledButtons,
      buttonsValueMultiple,
      buttonsDataMultiple,
      disabledMultipleButtons,

      buttonDefaultValue,
      buttonDefaultData,
      disabledButtonDefault,
      buttonDefaultValueMultiple,
      buttonDefaultDataMultiple,
      disabledMultipleButtonDefault,

      buttonOutlinedValue,
      buttonOutlinedData,
      disabledButtonOutlined,
      buttonOutlinedValueMultiple,
      buttonOutlinedDataMultiple,
      disabledMultipleButtonOutlined,

      buttonBadge,
      buttonBadgeData,
      disabledButtonBadge,
      buttonsBadgeValueMultiple,
      buttonsBadgeDataMultiple,
      disabledMultipleButtonsBadge,

      buttonUnderline,
      buttonUnderlineData,
      disabledButtonUnderline,
      buttonsUnderlineValueMultiple,
      buttonsUnderlineDataMultiple,
      disabledMultipleButtonsUnderline
    }
  }
})
</script>

<style scoped>
.playground-container {
  max-width: 1200px;
}
</style>
