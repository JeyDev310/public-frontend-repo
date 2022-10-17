import { mount, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppRadio from '@/components/stateless/AppRadio.vue'

const label = 'Buy UBXT'
const factory = (mountOptions?: MountingOptions<TIndexedObject>) => mount(AppRadio, mountOptions)

describe('AppRadio.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppRadio.props).toHaveProperty('modelValue.default')
    expect(AppRadio.props.modelValue.default).toBe(null)
    expect(AppRadio.props.modelValue.type).toBe(String)
  })

  it('"inputValue" prop definition', () => {
    expect(AppRadio.props).toHaveProperty('inputValue.default')
    expect(AppRadio.props.inputValue.default).toBe(null)
    expect(AppRadio.props.inputValue.type).toBe(String)
  })

  it('"label" prop definition', () => {
    expect(AppRadio.props).toHaveProperty('label.require')
    expect(AppRadio.props.label.require).toBe(true)
    expect(AppRadio.props.label.type).toBe(String)
  })

  it('"disabled" prop definition', () => {
    expect(AppRadio.props).toHaveProperty('disabled.default')
    expect(AppRadio.props.disabled.default).toBe(false)
    expect(AppRadio.props.disabled.type).toBe(Boolean)
  })

  it('mount with label', () => {
    const wrapper = factory({
      props: { label }
    })
    const $label = wrapper.find('[data-test="label"]')

    expect($label.html()).toContain(label)
  })

  it('click must update "modelValue" (label only)', async () => {
    const wrapper = factory({
      props: { label }
    })
    const $radio = wrapper.find('[data-test="radio"]')

    await $radio.trigger('change')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([label])
  })

  it('click must update "modelValue" (label and inputValue)', async () => {
    const inputValue = 'ubxt'
    const wrapper = factory({
      props: { label, inputValue }
    })
    const $radio = wrapper.find('[data-test="radio"]')

    await $radio.trigger('change')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([inputValue])
  })

  it('disabled doesn\'t update "modelValue"', async () => {
    const wrapper = factory({
      props: { label, disabled: true }
    })
    const $radio = wrapper.find('[data-test="radio"]')

    await $radio.trigger('change')

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
  })
})
