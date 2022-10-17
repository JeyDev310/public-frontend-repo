<template>
  <div class="header relative flex items-end flex-shrink-0 px-20 mb-20 4xl:mb-24 z-10">
    <div class="flex items-center w-full">
      <div class="flex items-center">
        <!-- PORTAL MOBILE MENU TRIGGER -->
        <PortalTarget name="mobile-menu-trigger" />

        <div class="flex items-center flex-grow">
          <!-- PORTAL TITLE -->
          <PortalTarget name="h-title" />
        </div>
      </div>

      <!-- PORTAL ONE -->
      <PortalTarget name="h-one" />

      <div class="flex items-center flex-grow justify-end">
        <!-- PORTAL TWO -->
        <PortalTarget name="h-two" />

        <div class="flex">
          <!-- UBXT WALLET -->
          <HeaderUBXTWallet />

          <!-- NOTIFICATIONS -->
          <HeaderNotifications class="mr-10 md:mr-16 4xl:mr-30 last:mr-0" />

          <!-- BUY UBXT -->
          <HeaderBuyUBXT />

          <!-- PORTAL THREE -->
          <PortalTarget name="h-three" />
        </div>

        <!-- USER -->
        <HeaderUser />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import HeaderUser from './components/HeaderUser.vue'
import HeaderNotifications from './components/HeaderNotifications.vue'
import HeaderUBXTWallet from './components/HeaderUBXTWallet.vue'
import HeaderBuyUBXT from './components/HeaderBuyUBXT.vue'

export default defineComponent({
  name: 'Header',

  components: {
    HeaderUser,
    HeaderNotifications,
    HeaderUBXTWallet,
    HeaderBuyUBXT
  }
})
</script>

<style lang="scss" scoped>
.header {
  @media(min-width: 2500px) {
    height: 100px;
  }

  @media(min-width: 1920px) and (max-width: 2499px) {
    height: 70px;
  }

  @media(min-width: 768px) and (max-width: 1919px) {
    height: 58px;
  }

  @media(max-width: 767px) {
    height: 64px;
  }
}
</style>
