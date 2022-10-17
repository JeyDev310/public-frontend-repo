<template>
  <AppModal v-model="isSubmnitting">
    <div class="pb-10 text-hidden-sea-glass font-bold text-md">{{ botName }}</div>
    <template v-if="prevVote">
      <div class="pb-10 flex items-center">
        <div class="text-hidden-sea-glass">Previous rating:&nbsp;</div>
        <div v-for="idx in prevVote" :key="idx">
          <img
            src="@/assets/images/icons/star1.svg"
            alt="star"
            class="w-18 md:w-20 4xl:w-22 mr-1 md:mr-2 4xl:mr-4"
          >
        </div>
      </div>
    </template>
    <div class="pb-10 flex items-center">
      <div class="text-hidden-sea-glass">Your {{ prevVote ? 'new' : '' }} rating:&nbsp;</div>
      <!-- gold stars -->
      <div v-for="idx in numOfStars" :key="idx">
        <img
          src="@/assets/images/icons/star1.svg"
          alt="star"
          class="w-18 md:w-20 4xl:w-22 mr-1 md:mr-2 4xl:mr-4 cursor-pointer"
          @click="onClickStar(idx)"
        >
      </div>
      <!-- grey stars -->
      <div v-for="idx in 5 - numOfStars" :key="idx">
        <img
          src="@/assets/images/icons/star2.svg"
          alt="star"
          class="w-18 md:w-20 4xl:w-22 mr-1 md:mr-2 4xl:mr-4 cursor-pointer"
          @click="onClickStar(numOfStars + idx)"
        >
      </div>
    </div>
    <div class="pb-10 text-hidden-sea-glass">Comment:</div>
    <AppInput
      v-model="comment"
      name="comment"
      class="w-full"
      size="lg"
      @change="onChangeComment"
    />
    <AppButton
      type="primary-border-filled"
      class="mt-20 w-full"
      @click="onSubmit"
    >
      Submit
    </AppButton>
  </AppModal>
  <div class="relative flex gap-10 items-center cursor-pointer" @click="canReview ? onStartReview() : goReview()">
    <div
      class="flex items-center"
      :title="ratingInfo ? ratingInfo.ratings : num"
    >
      <div
        v-if="neededToReview"
        class="w-10 h-10 bg-red-400 rounded-full"
        title="You have this bot used more than 1 month. Could you please review it?"
      />
      <img
        src="@/assets/images/icons/star1.svg"
        alt="star"
        class="w-18 md:w-20 4xl:w-22 mr-1 md:mr-2 4xl:mr-4"
      >
      <span class="text-hidden-sea-glass font-medium text-base 4xl:text-lg">
        {{ (ratingInfo ? ratingInfo.ratings : num).toFixed(1) }}
      </span>

      <!-- <div v-for="idx in ratingInfo ? ratingInfo.ratings : num" :key="idx">
        <img
          src="@/assets/images/icons/star1.svg"
          alt="star"
          class="w-18 md:w-20 4xl:w-22 mr-1 4xl:mr-2"
        >
      </div>
      <div v-for="idx in 5 - (ratingInfo ? ratingInfo.ratings : num)" :key="idx">
        <img
          src="@/assets/images/icons/star2.svg"
          alt="star"
          class="w-18 md:w-20 4xl:w-22 mr-1 4xl:mr-2"
        >
      </div> -->
    </div>
    <span class="text-hidden-sea-glass font-medium text-base 4xl:text-lg">
      ({{ ratingInfo ? ratingInfo.raters : raters }})
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { algoBotsService } from '@/services'
import { appNotify } from '@/components/stateless/notifications'

export default defineComponent({
  name: 'RatingStars',
  props: {
    num: {
      type: Number,
      default: 0
    },

    raters: {
      type: Number,
      default: 0
    },

    botId: {
      type: String
    },

    botName: {
      type: String
    },

    reviewed: {
      type: Boolean
    },

    createdAt: {
      type: String
    },

    goReview: {
      type: Function
    }
  },

  setup (props: {
    num: number;
    raters: number;
    botId?: string;
    botName?: string;
    reviewed: boolean;
    createdAt?: string;
  }) {
    const ratingInfo = ref<{ ratings: number; raters: number; myRating: number; myComment: string; } | null>(null)
    const isSubmnitting = ref<boolean>(false)
    const numOfStars = ref<number>(0)
    const comment = ref<string>('')
    const prevVote = ref<number>(0)

    const canReview = computed(() => {
      if (props.createdAt) {
        const days = (new Date().getTime() - new Date(props.createdAt).getTime()) / 86400000 // in days
        return Math.ceil(days) > 30
      }
      return false
    })

    const neededToReview = computed(() => {
      return canReview.value && !props.reviewed
    })

    if (neededToReview.value) {
      appNotify({ type: 'info', message: `You have used the ${props.botName} more than 1 month. Please review about it.` })
    }

    async function onStartReview () {
      const res = await algoBotsService.getAlgobotRating({ botId: props.botId ?? '' })
      comment.value = res ? res.data.myComment : ''
      numOfStars.value = prevVote.value = res ? res.data.myRating : 0
      isSubmnitting.value = true
    }

    async function onClickStar (value: number) {
      numOfStars.value = value
    }

    function onChangeComment (e: any) {
      comment.value = e.target.value
    }

    async function onSubmit () {
      const payload: {
        botId: string;
        vote: number;
        comment: string;
      } = {
        botId: props.botId ?? '',
        vote: numOfStars.value,
        comment: comment.value
      }

      await algoBotsService.submitAlgobotRating(payload)

      const res = await algoBotsService.getAlgobotRating({ botId: props.botId ?? '' })
      ratingInfo.value = res ? res.data : null

      isSubmnitting.value = false
    }

    return {
      ratingInfo,
      isSubmnitting,
      numOfStars,
      comment,
      prevVote,
      canReview,
      neededToReview,

      onStartReview,
      onClickStar,
      onChangeComment,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
