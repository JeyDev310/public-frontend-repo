<template>
  <div class="home-banner-carousel w-full lg:w-1/2">
    <!-- LOADER -->
    <AppCard v-if="loading" class="relative w-full h-full" rounded="md:rounded-xl">
      <AppLoader class="md:rounded-xl" />
    </AppCard>

    <!-- SWIPER -->
    <Swiper
      v-else
      :slides-per-view="1"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 5000 }"
      class="flex flex-col h-full"
    >
      <SwiperSlide
        v-for="item in bannerData"
        :key="item._id"
        class="flex xl:flex-col cursor-pointer"
      >
        <a
          :href="item.href"
          target="_blank"
          class="flex xl:flex-col h-full w-full"
        >
          <AppImage
            :src="item.image"
            :alt="item.name"
            class="flex flex-col h-full"
            img-class="flex xl:flex-col w-full h-full md:rounded-xl object-cover"
          />
        </a>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Autoplay, Pagination } from 'swiper'

import { bannerService } from '../../banners-settings/services/banner.services'
import { IBanner } from '../../banners-settings/types/banner'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

SwiperCore.use([Pagination, Autoplay])

export default defineComponent({
  name: 'HomeBannerCarousel',

  components: { Swiper, SwiperSlide },

  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  setup () {
    const { isMD } = useCustomBreakpoints()

    const bannerData = ref<IBanner[]>([])

    onMounted(async () => {
      const { data } = await bannerService.getBanners()
      bannerData.value = data
    })

    return {
      isMD,
      bannerData
    }
  }
})
</script>

<style lang="scss">
.home-banner-carousel {
  .swiper-pagination-bullets {
    @apply flex items-center w-auto left-1/2 transform -translate-x-1/2;
  }

  .swiper-pagination-bullet {
    @apply flex items-center bg-white shadow-100 w-8 h-8 ml-0 my-0 mr-5 last:mr-0 rounded-full opacity-100;

    &:not(.swiper-pagination-bullet-active) {
      &:hover {
        @apply transform scale-125 transition duration-300;
        background: linear-gradient(128.47deg, #41536D 21.26%, rgba(45, 59, 80, 0.56) 78.06%),
        linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
      }
    }

    &.swiper-pagination-bullet-active {
      background: linear-gradient(128.47deg, #41536D 21.26%, rgba(45, 59, 80, 0.56) 78.06%),
      linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
    }
  }

  @media(max-width: 1500px) {
    @apply w-2/5;
  }

  @media(max-width: 1279px) {
    height: 160px;
    @apply w-full;
  }

  @media(max-width: 767px) {
    height: 80px;
  }
}
</style>
