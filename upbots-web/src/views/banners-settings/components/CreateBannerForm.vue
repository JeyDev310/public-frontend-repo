<template>
  <Form
    :validation-schema="CreateBannerSchema"
    class="w-full flex flex-col flex-grow space-y-30 bg-green"
    @submit="onFormSubmit"
  >
    <AppInput
      name="name"
      label="Banner name"
      placeholder="Banner name"
      :disabled="loading"
      size="lg"
    />

    <AppInput
      name="href"
      label="Banner link"
      placeholder="Banner link"
      :disabled="loading"
      size="lg"
    />

    <div>
      <label
        for="image"
        class="text-nile-blue dark:text-let-it-snow leading-1 mb-6 cursor-pointer
        text-base 4xl:text-md 5xl:text-lg"
      >
        Banner Image
      </label>
      <br>
      <input
        id="image"
        name="image"
        type="file"
        accept="image/png, image/jpeg"
        @change="handleFileChange"
      >
    </div>

    <AppButton class="w-full mt-auto" :disabled="loading">Add Banner</AppButton>
  </Form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IBanner } from '../types/banner'
import { CreateBannerSchema } from '../schemas/banner.schemas'
import { Form } from 'vee-validate'
import { bannerService } from '../services/banner.services'
import { appNotify } from '../../../components/stateless/notifications'
import { EErrorsMessage } from '@/types'

export default defineComponent({
  name: 'CreateBannerForm',

  components: { Form },

  props: {
    fetchBanners: {
      type: Function as PropType<() => Promise<void>>,
      required: true
    }
  },

  setup (props) {
    const loading = ref(false)
    const imageFile = ref<any>(null)

    const handleFileChange = (event: any) => {
      imageFile.value = event.target.files[0]
    }

    const onFormSubmit = async (banner: IBanner) => {
      loading.value = true
      try {
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          async () => {
            await bannerService.createBanner({
              ...banner,
              image: reader.result
            })
          }
        )
        if (imageFile?.value?.name) {
          reader.readAsDataURL(imageFile.value)
          await new Promise(resolve => setTimeout(resolve, 1500))
          await props.fetchBanners()
          appNotify({ type: 'success', message: 'banner has been added successfully' })
        } else {
          appNotify({ type: 'error', message: 'Missing banner image' })
        }
      } catch (error) {
        appNotify({ type: 'error', message: EErrorsMessage.DEFAULT })
      }
      loading.value = false
    }

    return {
      loading,
      handleFileChange,
      CreateBannerSchema,
      onFormSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
