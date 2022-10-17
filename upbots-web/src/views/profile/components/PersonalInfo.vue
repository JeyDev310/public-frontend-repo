<template>
  <Form :validation-schema="mainProfileSchema" @submit="isModalConfirmPasswordOpen = true">
    <div
      class="flex flex-col text-nile-blue dark:text-blair text-base xl:text-md space-y-20 4xl:space-y-40"
    >
      <div class="flex flex-col md:w-full xl:w-auto space-y-20 4xl:space-y-40">
        <!-- FIRST NAME -->
        <AppInput
          v-model="userProfile.firstname"
          name="firstname"
          label="First Name"
          placeholder="Type your first name"
          class="personal-info__input w-full"
        />

        <!-- LAST NAME -->
        <AppInput
          v-model="userProfile.lastname"
          name="lastname"
          label="Last name"
          placeholder="Type your last name"
          class="personal-info__input w-full"
        />

        <!-- USER NAME -->
        <AppInput
          v-model="userProfile.username"
          name="username"
          label="Username"
          placeholder="Type your username"
          class="personal-info__input w-full"
        />
      </div>

      <div class="flex flex-col md:w-full space-y-20 4xl:space-y-40">
        <!-- COUNTRY -->
        <AppInput
          v-model="userProfile.country"
          name="country"
          label="Country"
          placeholder="Country"
          class="personal-info__input w-full"
        />

        <!-- HOME ADDRESS -->
        <AppInput
          v-model="userProfile.homeAddress"
          name="homeAddress"
          label="Home Address"
          placeholder="Home Address"
          class="personal-info__input w-full"
        />

        <!-- PHONE -->
        <AppInput
          v-model="userProfile.phone"
          name="phone"
          label="Phone Number"
          placeholder="Phone Number"
          class="personal-info__input w-full"
        />
      </div>
    </div>

    <!-- SUBMIT BUTTON -->
    <AppButton class="w-full mt-20 4xl:mt-40" size="xlg" type="primary-border-filled">
      Edit Information
    </AppButton>

    <!-- MODAL -->
    <AppModal v-model="isModalConfirmPasswordOpen" modal-width="550">
      <ConfirmPasswordModal @update:current-password="currentPassword" />
    </AppModal>
  </Form>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { Form } from 'vee-validate'
import { mainProfileSchema } from '@/schemas'

import { vuex } from '@/store'

import ConfirmPasswordModal from '@/views/profile/components/ConfirmPasswordModal.vue'

export default defineComponent({
  name: 'PersonalInfo',

  components: { Form, ConfirmPasswordModal },

  setup () {
    const isModalConfirmPasswordOpen = ref<boolean>(false)

    const userProfile = computed(() => vuex.auth.user)

    async function currentPassword (password: string) {
      try {
        await vuex.auth.updateUser({ ...userProfile.value, password })

        isModalConfirmPasswordOpen.value = false
      } finally {}
    }

    return {
      mainProfileSchema,
      isModalConfirmPasswordOpen,
      userProfile,
      currentPassword
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.personal-info__input) {
  @media (max-width: 767px) {
    @apply grid items-center gap-x-10;
    grid-template-columns: 130px 1fr;
    label {
      @apply mb-0;
    }
  }
}
</style>
