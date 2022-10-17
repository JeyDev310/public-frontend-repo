<template>
  <AppLoader v-if="isLoading" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { vuex } from '@/store'
import { routeNames } from '@/router'

export default defineComponent({
  name: 'Oauth',

  setup () {
    const isLoading = ref<boolean>(false)

    onBeforeMount(() => {
      const route = useRoute()
      const router = useRouter()
      const userToken = route.query?.token?.toString()
      const totpRequired = route.query?.totpRequired?.toString()
      const noRedirect = route.query?.noRedirect?.toString()
      if (window.opener && !window.opener.closed && !noRedirect) {
        window.close()
        window.opener.location.href = `/auth/oauth?token=${userToken}&totpRequired=${totpRequired}&noRedirect=true`
        return
      }
      if (!(!userToken || userToken === 'false')) {
        vuex.auth.setToken(userToken)
        if (!(!totpRequired || totpRequired === 'false')) {
          router.push({ name: routeNames.twoFactorAuth })
        } else {
          isLoading.value = true
          vuex.auth.fetchUserInfo().then(() => {
            isLoading.value = false
            router.push('/')
          }).catch(() => {
            isLoading.value = false
            vuex.auth.setToken(null)
            vuex.auth.setUser(null)
          })
        }
      }
    })
    return {
      isLoading
    }
  }
})
</script>
