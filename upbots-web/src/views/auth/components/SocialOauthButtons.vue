<template>
  <!-- DESKTOP -->
  <mq-layout mq="lg+">
    <div class="flex flex-col md:grid md:grid-cols-2 md:gap-x-10 4xl:gap-x-20 mt-20 4xl:mt-30">
      <button class="google-btn google-bg mb-16 4xl:mb-30" @click="signin('google')">
        <img src="/img/social/google-secondary.svg" alt="google" class="google-btn__img w-20 h-20 mr-18">
        <p class="google-btn__text">Google</p>
      </button>

      <button class="facebook-btn facebook-bg" @click="signin('facebook')">
        <img src="/img/social/facebook.svg" alt="facebook" class="facebook-btn__img w-20 h-20 mr-10">
        <p class="facebook-btn__text">Facebook</p>
      </button>
    </div>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md" class="flex justify-center">
    <div class="flex flex-col">
      <button class="flex items-center mb-20" @click="signin('google')">
        <div class="bg-white rounded-full p-6 mr-16">
          <img src="/img/social/google.svg" alt="google" class="w-14 h-14">
        </div>
        <p class="text-white font-medium">Continue with Google</p>
      </button>

      <button class="flex items-center" @click="signin('facebook')">
        <div class="facebook-bg rounded-full p-6 mr-16">
          <img src="/img/social/facebook.svg" alt="facebook" class="w-14 h-14">
        </div>
        <p class="text-white font-medium">Continue with Facebook</p>
      </button>
    </div>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from '@/router'

export default defineComponent({
  name: 'SocialOauthButtons',

  setup () {
    const route = useRoute()

    /**
     * @param  {Object} options
     * @return {Window}
     */
    function openOauthWindow (url: any, title: any, options = {} as any) {
      if (typeof url === 'object') {
        options = url
        url = ''
      }
      options = { url, title, width: 600, height: 720, ...options }
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : (window.screen as any).left
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : (window.screen as any).top
      const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
      const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height
      options.self = '_self'
      options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
      options.top = ((height / 2) - (options.height / 2)) + dualScreenTop
      const optionsStr = Object.keys(options).reduce((acc: any[], key) => {
        acc.push(`${key}=${options[key]}`)
        return acc
      }, []).join(',')
      const newWindow = window.open(url, title, optionsStr)
      if (!newWindow) {
        console.log('Please unblock popups in your browser settings to login with Github')
        return newWindow
      }
      return newWindow
    }

    function signin (provider: string) {
      const refCode = route.query.ref ? `&ref=${route.query.ref}` : ''
      const url = `${process.env.VUE_APP_ROOT_API}/api/auth/${provider}?target=next${refCode}`
      openOauthWindow(url, 'Login')
    }

    return { signin }
  }
})
</script>

<style lang="scss" scoped>
.google-btn,
.facebook-btn {
  @apply flex items-center justify-center rounded-sm px-20 py-4;

  box-shadow: 0px 12px 27px rgba(0, 0, 0, 0.15);

  &__text {
    @apply font-semibold text-white;
  }
}

.facebook-bg {
  background: #4267B2;
}

.google-bg {
  background: #DB4437;
}

@media (min-width: 3000px) {
  .google-btn,
  .facebook-btn {
    height: 44px;
  }
}

@media (max-width: 2999px) {
  .google-btn,
  .facebook-btn {
    height: 40px;
  }
}

@media (max-width: 2499px) {
  .google-btn,
  .facebook-btn {
    height: 36px;
  }
}
</style>
