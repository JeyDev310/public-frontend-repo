<template>
  <div class="tutorial flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <transition name="fade" mode="out-in">
      <component :is="tutorialStep.currentStep.componentName" @click="tutorialClick">
        <div class="flex flex-col w-full mb-40">
          <div class="flex flex-col self-end mb-10">
            <AppIcon
              name="close-circle"
              size="34"
              class="text-white"
              @click="$emit('on-close', false)"
            />
          </div>

          <div class="flex items-center text-white">
            <span>{{ tutorialStep.currentStep.step }}/7</span>
          </div>
        </div>
      </component>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import TutorialStep1 from '@/views/tutorial/components/TutorialStep1.vue'
import TutorialStep2 from '@/views/tutorial/components/TutorialStep2.vue'
import TutorialStep3 from '@/views/tutorial/components/TutorialStep3.vue'
import TutorialStep4 from '@/views/tutorial/components/TutorialStep4.vue'
import TutorialStep5 from '@/views/tutorial/components/TutorialStep5.vue'
import TutorialStep6 from '@/views/tutorial/components/TutorialStep6.vue'
import TutorialStep7 from '@/views/tutorial/components/TutorialStep7.vue'

type TModalComponent = { step: number; componentName: string; title: string; };

export default defineComponent({
  name: 'Tutorial',

  components: {
    TutorialStep1,
    TutorialStep2,
    TutorialStep3,
    TutorialStep4,
    TutorialStep5,
    TutorialStep6,
    TutorialStep7
  },

  emits: ['on-close'],

  setup (_, { emit }) {
    const tutorialStep = reactive<{ currentStep: TModalComponent; }>({
      currentStep: { step: 1, componentName: 'TutorialStep1', title: 'Step1' }
    })

    const modalComponent: TModalComponent[] = [
      { step: 1, componentName: 'TutorialStep1', title: 'Step1' },
      { step: 2, componentName: 'TutorialStep2', title: 'Step2' },
      { step: 3, componentName: 'TutorialStep3', title: 'Step3' },
      { step: 4, componentName: 'TutorialStep4', title: 'Step4' },
      { step: 5, componentName: 'TutorialStep5', title: 'Step5' },
      { step: 6, componentName: 'TutorialStep6', title: 'Step6' },
      { step: 7, componentName: 'TutorialStep7', title: 'Step7' }
    ]

    function tutorialClick (type: string) {
      if (type === 'finish') {
        emit('on-close', false)
        return false
      }

      tutorialStep.currentStep = modalComponent.find((i: TModalComponent) => {
        if (type === 'next') {
          return i.step === tutorialStep.currentStep.step + 1
        }
        if (type === 'prev') {
          return i.step === tutorialStep.currentStep.step - 1
        }
      }) as TModalComponent
    }

    return { tutorialStep, tutorialClick }
  }
})
</script>

<style lang="scss" scoped>
  .tutorial {
    background: url('/img/tutorial/tutorial-mobile-bg.jpg') no-repeat top center / cover,
    linear-gradient(128.47deg, #378C9C 21.26%, #8482D2 78.06%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%) no-repeat top center / cover;
  }
</style>
