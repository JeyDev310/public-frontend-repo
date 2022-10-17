<template>
  <div class="playground-input-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col">
      <h2 class="mb-20 text-xl">Form validation via vee-validate:</h2>

      <Form #default="{ values, errors, meta: { valid } }" :validation-schema="loginSchema" @submit="onSubmit">
        <div class="flex flex-col playground-input-container">
          <AppInput name="email" type="email" placeholder="Email" class="mb-24" />
          <AppInput name="password" type="password" placeholder="Password" class="mb-24" />
        </div>
        <AppTooltip placement="right" content="Please fill out the form." :disabled="valid">
          <AppButton class="mt-10" :disabled="!valid">Submit</AppButton>
        </AppTooltip>

        <!-- Debug -->
        <div class="mt-30">
          <div class="mb-20">
            Fields - {{ values }}
          </div>
          <div class="mb-20">
            Errors - {{ errors }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form } from 'vee-validate'

import { loginSchema } from '@/schemas'
import { IVeeValidateLogin } from '@/types'

export default defineComponent({
  name: 'PgForm',

  components: {
    Form
  },

  setup () {
    function onSubmit (values: IVeeValidateLogin) {
      console.log('onSubmit', values)
    }

    return {
      loginSchema,

      onSubmit
    }
  }
})
</script>

<style scoped>
.playground-input-container {
  max-width: 500px;
}
</style>
