<template>
  <ShareNetwork
    v-for="network in networks"
    :key="network.network"
    :network="network.network"
    :url="sharing.url"
    :title="sharing.title"
    :description="sharing.description"
    :quote="sharing.quote"
    :hashtags="sharing.hashtags"
    :twitterUser="sharing.twitterUser"
    :style="{ backgroundColor: network.color }"
    class="flex items-center justify-center w-30 h-30 rounded-full p-10"
  >
    <AppIcon :name="network.icon" class="text-white" />
  </ShareNetwork>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type TSharing = {
  url: string;
  title: string;
  description: string;
  quote: string;
  hashtags: string;
  twitterUser: string;
}

type TNetwork = {
  network: string;
  name: string;
  icon: string;
  color: string;
}

export default defineComponent({
  name: 'AppShareSocialMedia',

  props: {
    sharing: {
      type: Object as PropType<TSharing>,
      required: true
    },

    networks: {
      type: Array as PropType<TNetwork[]>,
      required: true
    }
  }
})
</script>
