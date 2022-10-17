/* eslint-disable max-len */
import { flushPromises, mount, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppModal from '@/components/stateless/AppModal.vue'

document.body.innerHTML = `
  <div id="app">
    <div id="modals"></div>
  </div>
`

const mountedHTML = (slot?: string) => `
  <div id="app">
    <div id="modals"><transition-stub><div class="fixed top-0 left-0 w-full h-full bg-dark-void bg-opacity-60 z-100"></div></transition-stub><transition-stub><div class="
          fixed top-0 left-0 right-0 bottom-0 w-fit m-auto z-100 pointer-events-auto
          h-full sm:h-fit overflow-y-auto" data-test="modal-wrap"><div class="relative px-10 py-30 md:p-40 rounded-sm bg-white-lilac dark:bg-gable-green max-w-500"><span class="icon-cross-medium modal__close absolute text-nile-blue dark:text-white cursor-pointer" style="font-size: 10px;"></span>${slot || null}</div></div></transition-stub></div>
  <div data-v-app=""><!--teleport start--><!--teleport end--></div></div>
`

const defaultSlot = '<div>Hello</div>'

const factory = (mountOptions: MountingOptions<TIndexedObject>) => mount(AppModal, {
  attachTo: document.getElementById('app') as HTMLElement,
  slots: {
    default: defaultSlot
  },
  ...mountOptions
})

describe('AppModal.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppModal.props).toHaveProperty('modelValue.required')
    expect(AppModal.props.modelValue.required).toBe(true)
    expect(AppModal.props.modelValue.type).toBe(Boolean)
  })

  it('"modalClasses" prop definition', () => {
    expect(AppModal.props).toHaveProperty('modalClasses.default')
    expect(AppModal.props.modalClasses.default).toBe('max-w-500')
    expect(AppModal.props.modalClasses.type).toBe(String)
  })

  it('"beforeClose" prop definition', () => {
    expect(AppModal.props).toHaveProperty('beforeClose.default')
    expect(AppModal.props.beforeClose.default).toBe(null)
    expect(AppModal.props.beforeClose.type).toBe(Function)
  })

  it('"closeOnBackdrop" prop definition', () => {
    expect(AppModal.props).toHaveProperty('closeOnBackdrop.default')
    expect(AppModal.props.closeOnBackdrop.default).toBe(true)
    expect(AppModal.props.closeOnBackdrop.type).toBe(Boolean)
  })

  it('mount with default slot', () => {
    const wrapper = factory({
      props: { modelValue: true }
    })

    wrapper.vm.close()

    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.vm).toHaveProperty('$slots.default')
    expect(document.body.innerHTML).toBe(mountedHTML(defaultSlot))
  })

  it('open / close events', () => {
    const wrapper = factory({
      props: { modelValue: true }
    })

    wrapper.vm.close()

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()).toHaveProperty('closed')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted().closed).toHaveLength(1)
    expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([false])

    wrapper.vm.open()

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(2)
    expect(wrapper.emitted()['update:modelValue'][1]).toStrictEqual([true])
  })

  it('beforeClose event', async () => {
    const beforeClose = jest.fn().mockImplementation(() => Promise.resolve(false))

    const wrapper = factory({
      props: { modelValue: true, beforeClose }
    })

    wrapper.vm.close()

    await flushPromises()

    expect(wrapper.emitted().closed).toBeFalsy()
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
    expect(beforeClose).toHaveBeenCalledTimes(1)
  })
})
