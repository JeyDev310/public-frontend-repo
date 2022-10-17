<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- PAGE TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Banners Settings</h2>
    </Portal>

    <div class="flex flex-col flex-shrink-0 w-full lg:px-20 space-y-20">
      <!-- SECION TITLE -->
      <h2 class="text-nile-blue dark:text-blair text-md 4xl:text-2xl font-medium">
        Add a new banner
      </h2>

      <CreateBannerForm :fetchBanners="fetchBanners" />
    </div>

    <div class="flex flex-col flex-shrink-0 w-full lg:px-20 space-y-20 mt-36">
      <!-- SECTION TITLE -->
      <h2 class="text-nile-blue dark:text-blair text-md 4xl:text-2xl font-medium">
        Existing Banners List
      </h2>

      <BannersList :banners="banners" :fetchBanners="fetchBanners" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import { bannerService } from './services/banner.services'
import { IBanner } from './types/banner'

import CreateBannerForm from '@/views/banners-settings/components/CreateBannerForm.vue'
import BannersList from '@/views/banners-settings/components/BannersList.vue'

export default defineComponent({
  name: 'BannersSettings',

  components: { CreateBannerForm, BannersList },

  setup () {
    const banners = ref<IBanner[]>([])

    const fetchBanners = async () => {
      const { data } = await bannerService.getBanners()
      banners.value = data
    }

    onMounted(() => { fetchBanners() })

    return {
      banners,
      fetchBanners
    }
  }
})
</script>
