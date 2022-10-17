<template>
  <div class="flex flex-col">
    <p class="text-md lg:text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-nile-blue dark:text-white">
      Connect your portfolio to monitor your balance and start trading
    </p>
    <p class="text-base lg:text-md 2xl:text-lg 3xl:text-xl text-chicory-flower dark:text-white mt-10">
      On UpBots you can trade manually or completely hands free on your
      favorite exchanges securly via API key.
    </p>
    <p class="text-base lg:text-md 2xl:text-lg 3xl:text-xl text-chicory-flower dark:text-white mt-10">
      Add your first exchange below to get started .....
    </p>
    <a
      class="text-sm 2xl:text-base 3xl:text-md text-nile-blue dark:text-hidden-sea-glass underline cursor-pointer mt-10"
      href="https://upbots.gitbook.io/upbots/2.-features/wallets-manager/connect-an-exchange"
      target="_blank"
    >
      API what ?!? Step by step tutorial here
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConnectAPIKeyTuto'

})
</script>
