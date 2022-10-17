<template>
  <ul class="flex flex-col space-y-14 mb-20 md:mb-60">
    <!-- ITEM -->
    <li
      v-for="(item, index) in steps"
      :key="index"
      class="intro-hero__step-item flex items-center"
      :class="{'is-active': item.isChecked}"
    >
      <div
        class="
          intro-hero__step-item-checkbox
          flex
          flex-col
          items-center
          justify-center
          flex-shrink-0
          w-24
          md:w-30
          h-24
          md:h-30
          bg-alexandria
          rounded-full
        "
      >
        <!-- CHECK ICON -->
        <AppIcon
          :name="`${item.isChecked ? 'notify-success' : 'cross-medium'}`"
          :size="`${isLG ? item.isChecked ? '14' : '10' : item.isChecked ? '18' : '14'}`"
          class="text-white"
        />
      </div>

      <!-- TITLE -->
      <p
        class="
          intro-hero__step-item-title
          font-medium
          md:text-md
          text-seal-blue
          dark:text-light-steel-blue
          ml-10
          md:ml-20
        "
      >
        {{ item.title }}
      </p>
    </li>
  </ul>

  <!-- STEP ACTION BTN -->
  <AppButton v-if="getStepButtonText" @click="stepClick">
    {{ getStepButtonText }}
  </AppButton>

  <!-- VERIFY EMAIL MODAL -->
  <AppModal v-model="isVerifyEmailModalOpen">
    <h2
      class="
        text-xl
        md:text-2xl
        text-seal-blue
        dark:text-white-lilac
        text-center
        font-semibold
        mb-32
        md:mb-60
      "
    >
      Verify your email
    </h2>

    <!-- MODAL ACTION BUTTONS -->
    <div class="flex justify-center w-full space-x-40">
      <AppButton
        type="grey-outlined"
        class="w-full"
        @click="isVerifyEmailModalOpen = false"
      >
        Close
      </AppButton>

      <AppButton
        type="primary-border-filled"
        class="w-full"
        @click="verifyEmail"
      >
        Verify
      </AppButton>
    </div>
  </AppModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { routeNames } from '@/router'

import { vuex } from '@/store'
import { authService } from '@/services'
import { EErrorsMessage } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

interface IStep {
  id: number;
  title: string;
  btnName: string;
  action: boolean;
  route: string;
  isChecked: boolean;
}

export default defineComponent({
  name: 'IntroHeroSteps',

  setup () {
    /* USE ROUTER */
    const router = useRouter()

    const { getPerfeesUserWalletAmount, accounts } = useGlobal()
    const { isLG } = useCustomBreakpoints()
    const { subscriptedBots } = useBots()

    /* EMAIL | EMAILVERIFIED VALUES */
    const { email, emailVerified } = toRefs(vuex.auth.user)

    const isVerifyEmailModalOpen = ref<boolean>(false)

    const steps = computed((): IStep[] => {
      return [
        {
          id: 1,
          title: 'Confirm your email',
          btnName: 'Confirm email',
          action: true,
          route: '',
          isChecked: emailVerified.value
        },
        {
          id: 2,
          title: 'Connect an exchange API key',
          btnName: 'Connect API key',
          action: false,
          route: routeNames.keys,
          isChecked: !!accounts.value.length
        },
        {
          id: 3,
          title: 'Deposit UBXT for performance fees',
          btnName: 'Deposit UBXT',
          action: false,
          route: routeNames.ubxtBalance,
          isChecked: !!getPerfeesUserWalletAmount.value
        },
        {
          id: 4,
          title: 'Activate an Algobot',
          btnName: 'Activate an Algobot',
          action: false,
          route: routeNames.algoBots,
          isChecked: !!subscriptedBots.value.length
        }
      ]
    })

    function stepClick (): void {
      const isCheckedFltr = steps.value.filter((el) => !el.isChecked)

      if (!isCheckedFltr.length) {
        router.push({ name: routeNames.algoBots })
      }

      if (isCheckedFltr[0].id === 1 && isCheckedFltr[0].action) {
        isVerifyEmailModalOpen.value = true
      } else if (isCheckedFltr[0].route) {
        router.push(isCheckedFltr[0].route)
      }
    }

    const getStepButtonText = computed((): string => {
      const isCheckedFltr = steps.value.filter((el) => !el.isChecked)
      return isCheckedFltr.length ? isCheckedFltr[0].btnName : 'Go To AlgoBots'
    })

    async function verifyEmail (): Promise<void> {
      try {
        await authService.verifyEmail({ email: email.value })
        appNotify({ type: 'success', message: 'A new verify email has just been sent to you!' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        isVerifyEmailModalOpen.value = false
      }
    }

    return {
      isLG,
      steps,
      getStepButtonText,
      isVerifyEmailModalOpen,
      verifyEmail,
      stepClick
    }
  }
})
</script>

<style lang="scss" scoped>
.intro-hero {
  &__title {
    font-size: 42px;
  }

  &__step-item {
    &.is-active {
      .intro-hero {
        &__step-item-checkbox {
          @apply bg-tradewind;
        }

        &__step-item-title {
          @apply text-tradewind
        }
      }
    }
  }
}
</style>
