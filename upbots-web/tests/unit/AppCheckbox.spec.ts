import { mount, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppCheckbox from '@/components/stateless/AppCheckbox.vue'

const label = 'Are you sure?'
const modelValue = false
const factory = (mountOptions?: MountingOptions<TIndexedObject>) => mount(AppCheckbox, mountOptions)

describe('AppCheckbox.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppCheckbox.props).toHaveProperty('modelValue.default')
    expect(AppCheckbox.props.modelValue.default).toBe(false)
    expect(AppCheckbox.props.modelValue.type).toBe(Boolean)
  })

  it('"disabled" prop definition', () => {
    expect(AppCheckbox.props).toHaveProperty('disabled.default')
    expect(AppCheckbox.props.disabled.default).toBe(false)
    expect(AppCheckbox.props.disabled.type).toBe(Boolean)
  })

  it('mount with label', () => {
    const wrapper = factory({
      slots: {
        default: label
      }
    })
    const $label = wrapper.find('[data-test="label"]')

    expect($label.html()).toContain(label)
  })

  it('click must update "modelValue"', async () => {
    const wrapper = factory({
      props: { modelValue }
    })
    const $checkbox = wrapper.find('[data-test="checkbox"]')

    await $checkbox.trigger('input')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([false])
  })

  it('mount with different states / options', async () => {
    const wrapper = factory({
      props: {
        disabled: true
      }
    })
    const $icon = wrapper.find('[data-test="icon"]')

    expect(wrapper.classes('is-disabled')).toBe(true)

    expect(wrapper.classes('is-checked')).toBe(false)
    expect($icon.classes('icon-checkbox')).toBe(true)
    expect($icon.classes('icon-checkbox-checked')).toBe(false)

    await wrapper.setProps({ modelValue: true })

    expect(wrapper.classes('is-checked')).toBe(true)
    expect($icon.classes('icon-checkbox')).toBe(false)
    expect($icon.classes('icon-checkbox-checked')).toBe(true)
  })

  it('disabled doesn\'t update "modelValue"', async () => {
    const wrapper = factory({
      props: {
        disabled: true
      }
    })
    const $checkbox = wrapper.find('[data-test="checkbox"]')

    await $checkbox.trigger('input')

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
  })
})
