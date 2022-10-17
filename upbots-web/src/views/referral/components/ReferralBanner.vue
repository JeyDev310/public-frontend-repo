<template>
  <div class="referral__banner flex flex-col md:flex-row md:items-center rounded-xlg py-20 md:py-20 px-20">
    <!-- IMG -->
    <mq-layout mq="lg+" class="referral__banner-img-wrap w-full">
      <img src="/img/referral/refer-friends.png" alt="refer-friends">
    </mq-layout>

    <!-- DESCRIPTION -->
    <div class="flex flex-col flex-grow items-center md:items-start ml-20 md:ml-30 xl:ml-40 3xl:ml-60">
      <h2 class="text-md md:text-xl 2xl:text-4xl font-semibold text-white mb-20 md:mb-12">
        Refer friends, Get rewards!
      </h2>

      <mq-layout mq="sm-md" class="referral__banner-img-wrap w-full mb-12 -ml-40">
        <img src="/img/referral/refer-friends.png" alt="refer-friends">
      </mq-layout>

      <ul class="flex flex-col w-full list-disc text-sm md:text-base text-white 2xl:text-md2 3xl:text-lg">
        <li><span class="font-semibold">200 Virtual credits</span> for you and your friends</li>
        <li><span class="font-semibold">Up to 10% of the performance fees</span> paid by your friends</li>
        <li><span class="font-semibold">2% of the performance fees</span> paid by your 2nd level friends</li>
      </ul>

      <!-- TODO ADD LINK -->
      <!--<a
        href="#"
        class="w-full text-blair 2xl:text-md2 font-semibold underline hover:no-underline mt-10 cursor-pointer"
      >
        More Infos
      </a>-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ReferralBanner'
})
</script>

<style lang="scss" scoped>
.referral {
  &__banner {
    background: linear-gradient(128.47deg, #378C9C 21.26%, #8482D2 78.06%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
  }

  @media(min-width: 1440px) {
    &__banner {
      min-height: 247px;
    }

    &__banner-img-wrap {
      max-width: 245px;
    }
  }

  @media(min-width: 1280px) and (max-width: 1439px) {
    &__banner {
      min-height: 192px;
    }

    &__banner-img-wrap {
      max-width: 180px;
    }
  }

  @media(min-width: 768px) and (max-width: 1279px) {
    &__banner {
      min-height: 180px;
    }

    &__banner-img-wrap {
      max-width: 160px;
    }
  }

  @media(max-width: 767px) {
    &__banner {
      min-height: 273px;
    }

    &__banner-img-wrap {
      max-width: 100px;
    }
  }
}
</style>
