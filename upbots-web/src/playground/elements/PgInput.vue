<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppInput:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>size xs:</p>
          <AppInput v-model="inputDefault" placeholder="Input size xs" size="xs" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size sm:</p>
          <AppInput v-model="inputDefault" placeholder="Input size sm" size="sm" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size md:</p>
          <AppInput v-model="inputDefault" placeholder="Input size md" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size lg:</p>
          <AppInput v-model="inputDefault" placeholder="Input size lg" size="lg" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size xlg:</p>
          <AppInput v-model="inputDefault" placeholder="Input size xlg" size="xlg" />
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <h2 class="mb-20 text-xl">Input states:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>default:</p>
          <AppInput v-model="inputDefault" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>name:</p>
          <AppInput v-model="inputName" name="input-name" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>label:</p>
          <AppInput v-model="inputDefault" name="label" label="label" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>label classes:</p>
          <AppInput v-model="inputDefault" name="label2" label="label2" label-classes="text-alexandria" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>label size:</p>
          <AppInput v-model="inputDefault" name="label3" label="label3" label-size="text-sm" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>radius:</p>
          <AppInput v-model="inputDefault" input-rounded="rounded-full" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>password:</p>
          <AppInput v-model="inputPassword" type="password" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>placeholder:</p>
          <AppInput v-model="inputPlaceholder" placeholder="Input placeholder" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>disabled:</p>
          <AppInput v-model="inputDisabled" placeholder="Input disabled" disabled />
        </div>

        <div class="flex flex-col space-y-10">
          <p>readonly:</p>
          <AppInput v-model="inputRaadonly" placeholder="Input readonly" readonly />
        </div>

        <div class="flex flex-col space-y-10">
          <p>show last digits:</p>
          <AppInput v-model="inputShowLastDigits" placeholder="Input show last digits" show-last />
        </div>

        <div class="flex flex-col space-y-10">
          <p>icon prepend:</p>
          <AppInput v-model="inputIconPrepend">
            <template #prepend>
              <i class="icon-keys flex items-center justify-center px-10" />
            </template>
          </AppInput>
        </div>

        <div class="flex flex-col space-y-10">
          <p>icon append:</p>
          <AppInput v-model="inputIconAppend">
            <template #append>
              <i class="icon-keys flex items-center justify-center px-10" />
            </template>
          </AppInput>
        </div>

        <div class="flex flex-col space-y-10">
          <p>copy:</p>
          <AppInput v-model="inputCopy" allow-copy />
        </div>

        <div class="flex flex-col space-y-10">
          <p>error:</p>
          <AppInput v-model="inputError" class="is-error" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgInput',

  setup () {
    const inputDefault = ref('Input default')
    const inputPassword = ref('123321123')
    const inputPlaceholder = ref('123321123')
    const inputDisabled = ref('Input disabled')
    const inputRaadonly = ref('Input readonly')
    const inputShowLastDigits = ref('Input show last digits')
    const inputName = ref('Input name')
    const inputCopy = ref('Input copy')
    const inputIconPrepend = ref('Input icon prepend')
    const inputIconAppend = ref('Input icon append')
    const inputError = ref('Input error')

    return {
      inputDefault,
      inputPassword,
      inputPlaceholder,
      inputDisabled,
      inputRaadonly,
      inputShowLastDigits,
      inputName,
      inputCopy,
      inputIconPrepend,
      inputIconAppend,
      inputError
    }
  }
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
