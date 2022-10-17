<template>
  <component :is="tutorialStep.currentStep.componentName" @next="tutorialNext">
    <h2 class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-20">
      {{ tutorialStep.currentStep.title }}
    </h2>
  </component>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import TutorialModalStepFirst from '@/views/home/components/tutorial/TutorialModalStepFirst.vue'
import TutorialModalStepSecond from '@/views/home/components/tutorial/TutorialModalStepSecond.vue'
import TutorialModalStepThird from '@/views/home/components/tutorial/TutorialModalStepThird.vue'
import TutorialModalStepFourth from '@/views/home/components/tutorial/TutorialModalStepFourth.vue'
import TutorialModalStepFifth from '@/views/home/components/tutorial/TutorialModalStepFifth.vue'
import TutorialModalStepSixth from '@/views/home/components/tutorial/TutorialModalStepSixth.vue'
import TutorialModalStepSeventh from '@/views/home/components/tutorial/TutorialModalStepSeventh.vue'
import TutorialModalStepEight from '@/views/home/components/tutorial/TutorialModalStepEight.vue'

type TModalComponent = { step: number; componentName: string; title: string; };

export default defineComponent({
  name: 'TutorialModals',

  components: {
    TutorialModalStepFirst,
    TutorialModalStepSecond,
    TutorialModalStepThird,
    TutorialModalStepFourth,
    TutorialModalStepFifth,
    TutorialModalStepSixth,
    TutorialModalStepSeventh,
    TutorialModalStepEight
  },

  emits: ['close'],

  setup (_, { emit }) {
    const tutorialStep = reactive<{ currentStep: TModalComponent; }>({
      currentStep: { step: 1, componentName: 'TutorialModalStepFirst', title: 'Welcome to Upbots!' }
    })

    const modalComponent: TModalComponent[] = [
      { step: 1, componentName: 'TutorialModalStepFirst', title: 'Welcome to Upbots!' },
      { step: 2, componentName: 'TutorialModalStepSecond', title: 'Trading activity summary' },
      { step: 3, componentName: 'TutorialModalStepThird', title: 'All your Balances in one place' },
      { step: 4, componentName: 'TutorialModalStepFourth', title: 'How is your wealth growing?' },
      { step: 5, componentName: 'TutorialModalStepFifth', title: 'A complete trading room' },
      // { step: 6, componentName: 'TutorialModalStepSixth', title: 'Automate your strategy' }, // TODO //
      { step: 6, componentName: 'TutorialModalStepSeventh', title: 'Access a trading superstore' },
      { step: 7, componentName: 'TutorialModalStepEight', title: 'Conclusion!' }
    ]

    function tutorialNext () {
      if (tutorialStep.currentStep.step > 6) {
        emit('close')
      } else {
        tutorialStep.currentStep = modalComponent.find((i: TModalComponent) => {
          return i.step === tutorialStep.currentStep.step + 1
        }) as TModalComponent
      }
    }

    return { tutorialNext, tutorialStep }
  }
})
</script>
