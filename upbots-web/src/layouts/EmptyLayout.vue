<template>
  <div class="flex flex-col flex-grow w-full overflow-y-hidden custom-scrollbar">
    <router-view #default="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmptyLayout'
})
</script>
