<template>
  <div v-for="banner of banners" :key="banner.name" class="flex items-center gap-x-32">
    <img :src="banner.image" :alt="banner.name" style="width: 256px">
    <p class="text-nile-blue dark:text-let-it-snow leading-1 mb-6
        text-base 4xl:text-md 5xl:text-lg"
    >
      <strong>Name:</strong>
      <span class="ml-4">{{ banner.name }}</span>
    </p>

    <p class="text-nile-blue dark:text-let-it-snow leading-1 mb-6
        text-base 4xl:text-md 5xl:text-lg"
    >
      <strong>Link:</strong>
      <a :href="banner.href" class="ml-4">{{ banner.href }}</a>
    </p>
    <AppButton type="grey-outlined" @click="removeBanner(banner._id)">Remove</AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { bannerService } from '../services/banner.services'
import { appNotify } from '../../../components/stateless/notifications'
import { IBanner } from '../types/banner'
import { EErrorsMessage } from '@/types'

export default defineComponent({
  name: 'BannersList',

  props: {
    banners: {
      type: Object as PropType<IBanner[]>,
      required: true
    },

    fetchBanners: {
      type: Function as PropType<() => Promise<void>>,
      required: true
    }
  },

  setup (props) {
    const removeBanner = async (bannerId: string) => {
      try {
        await bannerService.removeBanner(bannerId)
        await props.fetchBanners()
        appNotify({ type: 'success', message: 'banner has been removed successfully' })
      } catch (error) {
        appNotify({ type: 'error', message: EErrorsMessage.DEFAULT })
      }
    }

    return {
      removeBanner
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
