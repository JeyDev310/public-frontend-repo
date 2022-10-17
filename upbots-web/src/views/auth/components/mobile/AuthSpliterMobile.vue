<template>
  <div class="auth-spliter-mobile flex items-center space-x-20 text-let-it-snow px-20">
    <hr class="flex-grow">
    <span>Or</span>
    <hr class="flex-grow">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthSpliterMobile'
})
</script>

<style lang="scss" scoped>
.auth-spliter-mobile {
  font-weight: 300;
}
</style>
