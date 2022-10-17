import { mount, flushPromises, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import Confirmation from '@/components/stateless/confirms/Confirmation.vue'
import AppConfirm from '@/components/stateless/confirms/AppConfirm.vue'
import { list, appConfirm } from '@/components/stateless/confirms/confirm.state'

const factory = (mountOptions?: MountingOptions<TIndexedObject>) => mount(AppConfirm, {
  global: {
    components: {
      Confirmation,
      AppButton: { template: '<button><slot/></button>' },
      AppIcon: { template: '<span></span>' }
    }
  },
  ...mountOptions
})

describe('AppConfirm.vue', () => {
  beforeEach(() => {
    list.value = []
  })

  it('"maxWidth" prop definition', () => {
    expect(Confirmation.props).toHaveProperty('maxWidth.default')
    expect(Confirmation.props.maxWidth.default).toBe(500)
    expect(Confirmation.props.maxWidth.type).toStrictEqual(expect.arrayContaining([String, Number]))
  })

  it('"confirm" prop definition', () => {
    expect(Confirmation.props).toHaveProperty('confirm.required')
    expect(Confirmation.props.confirm.required).toBe(true)
    expect(Confirmation.props.confirm.type).toBe(Object)
  })

  it('"index" prop definition', () => {
    expect(Confirmation.props).toHaveProperty('index.default')
    expect(Confirmation.props.index.default).toBe(0)
    expect(Confirmation.props.index.type).toBe(Number)
  })

  it('mount and show two confirms and match title', async () => {
    const title = 'First!'
    const wrapper = factory()

    appConfirm({ title: title })
    appConfirm({ title: 'Hello!' })

    await flushPromises()

    const $confirms = wrapper.findAll('[data-test="confirmation-item"]')

    expect($confirms[0].find('[data-test="title"]').text()).toBe(title)
    expect($confirms).toHaveLength(2)
    expect(list.value).toHaveLength(2)
  })

  it('close on cancel', async () => {
    const wrapper = factory()
    const confirm = appConfirm({ title: 'Hello!' })

    await flushPromises()

    const $cancel = wrapper.find('[data-test="cancel"]')
    await $cancel.trigger('click')

    const isConfirmed = await confirm
    expect(isConfirmed).toBe(false)
  })

  it('close on confirm', async () => {
    const wrapper = factory()
    const confirm = appConfirm({ title: 'Hello!' })

    await flushPromises()

    const $confirm = wrapper.find('[data-test="confirm"]')
    await $confirm.trigger('click')

    const isConfirmed = await confirm
    expect(isConfirmed).toBe(true)
  })
})
