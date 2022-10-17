import { mount, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppButtonsGroup from '@/components/stateless/AppButtonsGroup.vue'
import Compute from '@/components/stateless/hoc/Compute.vue'

const options = [
  { value: 1, label: 'UBXT' },
  { value: 2, label: 'BTC' }
]
const modelValue = 1

const factory = (mountOptions?: MountingOptions<TIndexedObject>) => {
  return mount(AppButtonsGroup, {
    global: {
      components: { Compute }
    },
    ...mountOptions
  })
}

describe('AppButtonsGroup.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppButtonsGroup.props).toHaveProperty('modelValue.required')
    expect(AppButtonsGroup.props.modelValue.required).toBe(true)
    expect(AppButtonsGroup.props.modelValue.type).toStrictEqual(expect.arrayContaining([Number, String]))
  })

  it('"options" prop definition', () => {
    expect(AppButtonsGroup.props).toHaveProperty('options.required')
    expect(AppButtonsGroup.props.options.required).toBe(true)
    expect(AppButtonsGroup.props.options.type).toBe(Array)
    expect(AppButtonsGroup.props).toHaveProperty('options.validator')
  })

  it('"size" prop definition', () => {
    expect(AppButtonsGroup.props).toHaveProperty('size.default')
    expect(AppButtonsGroup.props.size.default).toBe('md')
    expect(AppButtonsGroup.props.size.type).toBe(String)
  })

  it('"type" prop definition', () => {
    expect(AppButtonsGroup.props).toHaveProperty('type.default')
    expect(AppButtonsGroup.props.type.default).toBe('')
    expect(AppButtonsGroup.props.type.type).toBe(String)
  })

  it('"disabledOptions" prop definition', () => {
    expect(AppButtonsGroup.props).toHaveProperty('disabledOptions.default')
    expect(AppButtonsGroup.props.disabledOptions.default).toStrictEqual([])
    expect(AppButtonsGroup.props.disabledOptions.type).toBe(Array)
  })

  it('"disabled" prop definition', () => {
    expect(AppButtonsGroup.props).toHaveProperty('disabled.default')
    expect(AppButtonsGroup.props.disabled.default).toBe(false)
    expect(AppButtonsGroup.props.disabled.type).toBe(Boolean)
  })

  it('mount with 2 options', () => {
    const wrapper = factory({
      props: { modelValue, options }
    })

    const groupItems = wrapper.findAll('[data-test="item"]')

    expect(groupItems).toHaveLength(2)

    expect(groupItems[0].text()).toBe('UBXT')
    expect(groupItems[1].text()).toBe('BTC')
  })

  it('active option and toggle active', async () => {
    const wrapper = factory({
      props: { modelValue, options }
    })

    const groupItems = wrapper.findAll('[data-test="item"]')
    expect(groupItems[0].classes('is-active')).toBe(true)

    await wrapper.setProps({ modelValue: 2 })
    expect(groupItems[1].classes('is-active')).toBe(true)
  })

  it('mount with different variations classes', () => {
    const wrapper = factory({
      props: {
        modelValue,
        options,
        type: 'underline',
        size: 'xs',
        disabled: true
      }
    })

    const groupItems = wrapper.findAll('[data-test="item"]')

    expect(wrapper.classes('size-xs')).toBe(true)

    expect(groupItems[0].classes('is-disabled')).toBe(true)
    expect(groupItems[1].classes('is-disabled')).toBe(true)

    expect(groupItems[0].classes('is-underline')).toBe(true)
    expect(groupItems[1].classes('is-underline')).toBe(true)
  })

  it('mount with second disabled', () => {
    const wrapper = factory({
      props: {
        modelValue,
        options,
        disabledOptions: [2]
      }
    })

    const groupItems = wrapper.findAll('[data-test="item"]')

    expect(groupItems[0].classes('is-disabled')).toBe(false)
    expect(groupItems[1].classes('is-disabled')).toBe(true)
  })

  it('emit value on click', async () => {
    const wrapper = factory({
      props: {
        modelValue,
        options
      }
    })

    const groupItems = wrapper.findAll('[data-test="item"]')

    await groupItems[1].trigger('click')

    expect(wrapper.emitted().change).toHaveLength(1)
    expect(wrapper.emitted().change[0]).toEqual([2])

    await groupItems[0].trigger('click')

    expect(wrapper.emitted().change).toHaveLength(2)
    expect(wrapper.emitted().change[1]).toEqual([1])
  })

  it('disabled doesn\'t emit "change"', async () => {
    const wrapper = factory({
      props: {
        modelValue,
        options,
        disabledOptions: [2]
      }
    })

    const groupItems = wrapper.findAll('[data-test="item"]')

    await groupItems[1].trigger('click')

    expect(wrapper.emitted().change).toBeFalsy()
  })
})
