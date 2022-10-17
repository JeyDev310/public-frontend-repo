import { mount, flushPromises, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppSelect from '@/components/stateless/AppSelect.vue'
import Compute from '@/components/stateless/hoc/Compute.vue'

const options = [
  { value: 1, label: 'UBXT' },
  { value: 2, label: 'BTC' },
  { value: 3, label: 'USDT' },
  { value: 4, label: 'ETH' },
  { value: 5, label: 'FTX' }
]
const disabledOptions = [3, 5]
const modelValue = { value: 1, label: 'UBXT' }
const multiple = [1, 2]
const placeholder = 'Select stuff'

const factory = (mountOptions?: MountingOptions<TIndexedObject>) => {
  return mount(AppSelect, {
    global: {
      components: { Compute, AppIcon: { template: '<span />' } },
      stubs: ['app-icon']
    },
    ...mountOptions
  })
}

describe('AppSelect.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppSelect.props).toHaveProperty('modelValue.required')
    expect(AppSelect.props.modelValue.required).toBe(true)
    expect(AppSelect.props.modelValue.type).toStrictEqual(expect.arrayContaining([Object, Array]))
  })

  it('"placeholder" prop definition', () => {
    expect(AppSelect.props).toHaveProperty('placeholder.default')
    expect(AppSelect.props.placeholder.default).toBe('Select options')
    expect(AppSelect.props.placeholder.type).toBe(String)
  })

  it('"options" prop definition', () => {
    expect(AppSelect.props).toHaveProperty('options.required')
    expect(AppSelect.props.options.required).toBe(true)
    expect(AppSelect.props.options.type).toBe(Array)
  })

  it('"size" prop definition', () => {
    expect(AppSelect.props).toHaveProperty('size.default')
    expect(AppSelect.props.size.default).toBe('md')
    expect(AppSelect.props.size.type).toBe(String)
  })

  it('"itemKey" prop definition', () => {
    expect(AppSelect.props).toHaveProperty('itemKey.default')
    expect(AppSelect.props.itemKey.default).toBe('value')
    expect(AppSelect.props.itemKey.type).toBe(String)
  })

  it('"itemLabel" prop definition', () => {
    expect(AppSelect.props).toHaveProperty('itemLabel.default')
    expect(AppSelect.props.itemLabel.default).toBe('label')
    expect(AppSelect.props.itemLabel.type).toBe(String)
  })

  it('"disabledOptions" prop definition', () => {
    expect(AppSelect.props).toHaveProperty('disabledOptions.default')
    expect(AppSelect.props.disabledOptions.default).toBe(null)
    expect(AppSelect.props.disabledOptions.type).toBe(Array)
  })

  it('"multiple" prop definition', () => {
    expect(AppSelect.props).toHaveProperty('multiple.default')
    expect(AppSelect.props.multiple.default).toBe(false)
    expect(AppSelect.props.multiple.type).toBe(Boolean)
  })

  it('"disabled" prop definition', () => {
    expect(AppSelect.props).toHaveProperty('disabled.default')
    expect(AppSelect.props.disabled.default).toBe(false)
    expect(AppSelect.props.disabled.type).toBe(Boolean)
  })

  it('mount with options, default placeholder', () => {
    const wrapper = factory({
      props: { modelValue, options }
    })

    expect(wrapper.html()).toContain('UBXT')
  })

  it('options visibility / length / disability, arrow rotation', async () => {
    const wrapper = factory({
      props: { modelValue, options, disabledOptions }
    })

    const previewArea = wrapper.find('[data-test="preview"]')

    await previewArea.trigger('click')
    await flushPromises()

    const $options = wrapper.findAll('[data-test="option"]')

    expect(wrapper.find('[data-test="options-list"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="arrow"]').classes('rotate-180')).toBe(true)
    expect($options).toHaveLength(options.length)
    expect($options[2].classes()).toContain('is-disabled')
    expect($options[4].classes()).toContain('is-disabled')

    await previewArea.trigger('click')
    await flushPromises()

    expect(wrapper.find('[data-test="options-list"]').exists()).toBe(false)
  })

  it('options selection', async () => {
    const wrapper = factory({
      props: { modelValue, options }
    })

    const previewArea = wrapper.find('[data-test="preview"]')

    await previewArea.trigger('click')
    await flushPromises()

    const $options = wrapper.findAll('[data-test="option"]')
    await $options[1].trigger('click')

    expect(wrapper.emitted().change).toHaveLength(1)
    expect(wrapper.emitted().change[0]).toStrictEqual([options[1]])
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([options[1]])
    expect(wrapper.find('[data-test="options-list"]').exists()).toBe(false)
  })

  it('multiple options selection', async () => {
    const wrapper = factory({
      props: { modelValue: multiple, options, multiple: true }
    })

    const previewArea = wrapper.find('[data-test="preview"]')

    await previewArea.trigger('click')
    await flushPromises()

    const $options = wrapper.findAll('[data-test="option"]')
    await $options[2].trigger('click') // should push 3

    expect(wrapper.emitted().change).toHaveLength(1)
    expect(wrapper.emitted().change[0]).toStrictEqual([[1, 2, 3]])
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([[1, 2, 3]])
    expect(wrapper.find('[data-test="options-list"]').exists()).toBe(true) // won't close
  })

  it('disabled won\'t open options', async () => {
    const wrapper = factory({
      props: { modelValue, options }
    })

    const previewArea = wrapper.find('[data-test="preview"]')

    await previewArea.trigger('click')
    await flushPromises()

    expect(wrapper.find('[data-test="options-list"]').exists()).toBe(true)
  })

  it('disabled options don\'t emit "change"', async () => {
    const wrapper = factory({
      props: { modelValue, options, disabledOptions }
    })

    const previewArea = wrapper.find('[data-test="preview"]')

    await previewArea.trigger('click')
    await flushPromises()

    const $options = wrapper.findAll('[data-test="option"]')
    await $options[2].trigger('click')
    await $options[4].trigger('click')

    expect(wrapper.emitted().change).toBeFalsy()
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
    expect(wrapper.find('[data-test="options-list"]').exists()).toBe(true)
  })

  it('mount with different sizes and custom placeholder', () => {
    const wrapper = factory({
      props: {
        modelValue: {},
        options,
        size: 'xs',
        placeholder
      }
    })

    expect(wrapper.classes('size-xs')).toBe(true)
    expect(wrapper.html()).toContain(placeholder)
  })
})
