import { reactive, toRefs } from 'vue'

const state = reactive({})

export const useAlgoBotsDetailed = function () {
  return {
    ...toRefs(state)
  }
}
