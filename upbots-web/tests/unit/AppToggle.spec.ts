import { mount, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppToggle from '@/components/stateless/AppToggle.vue'

const activeLabel = 'Resolve'
const inactiveLabel = 'Reject'
const modelValue = false
const factory = (mountOptions?: MountingOptions<TIndexedObject>) => mount(AppToggle, {
  props: {
    modelValue
  },
  ...mountOptions
})

describe('AppToggle.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppToggle.props).toHaveProperty('modelValue.required')
    expect(AppToggle.props.modelValue.required).toBe(true)
    expect(AppToggle.props.modelValue.type).toBe(Boolean)
  })

  it('"activeLabel" prop definition', () => {
    expect(AppToggle.props).toHaveProperty('activeLabel.default')
    expect(AppToggle.props.activeLabel.default).toBe('')
    expect(AppToggle.props.activeLabel.type).toBe(String)
  })

  it('"inactiveLabel" prop definition', () => {
    expect(AppToggle.props).toHaveProperty('activeLabel.default')
    expect(AppToggle.props.activeLabel.default).toBe('')
    expect(AppToggle.props.activeLabel.type).toBe(String)
  })

  it('"labelClick" prop definition', () => {
    expect(AppToggle.props).toHaveProperty('labelClick.default')
    expect(AppToggle.props.labelClick.default).toBe(false)
    expect(AppToggle.props.labelClick.type).toBe(Boolean)
  })

  it('"disabled" prop definition', () => {
    expect(AppToggle.props).toHaveProperty('disabled.default')
    expect(AppToggle.props.disabled.default).toBe(false)
    expect(AppToggle.props.disabled.type).toBe(Boolean)
  })

  it('mount with / without labels', async () => {
    const wrapper = factory()
    let $activeLabel = wrapper.find('[data-test="active-label"]')
    let $inactiveLabel = wrapper.find('[data-test="inactive-label"]')

    expect($activeLabel.exists()).toBe(false)
    expect($inactiveLabel.exists()).toBe(false)

    await wrapper.setProps({ activeLabel, inactiveLabel })

    $activeLabel = wrapper.find('[data-test="active-label"]')
    $inactiveLabel = wrapper.find('[data-test="inactive-label"]')

    expect($activeLabel.exists()).toBe(true)
    expect($activeLabel.html()).toContain(activeLabel)

    expect($inactiveLabel.exists()).toBe(true)
    expect($inactiveLabel.html()).toContain(inactiveLabel)
  })

  it('click and labels click must update "modelValue"', async () => {
    const wrapper = factory({
      props: { modelValue, activeLabel, inactiveLabel, labelClick: true }
    })

    const $toggle = wrapper.find('[data-test="toggler"]')
    const $activeLabel = wrapper.find('[data-test="active-label"]')
    const $inactiveLabel = wrapper.find('[data-test="inactive-label"]')

    await $toggle.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([true])

    await $activeLabel.trigger('click') // always emits false

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(2)
    expect(wrapper.emitted()['update:modelValue'][1]).toStrictEqual([false])

    await $inactiveLabel.trigger('click') // always emits true

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(3)
    expect(wrapper.emitted()['update:modelValue'][2]).toStrictEqual([true])
  })

  it('click on labels with disabled "labelClick" must not update "modelValue"', async () => {
    const wrapper = factory({
      props: { modelValue, activeLabel, inactiveLabel, labelClick: false }
    })

    const $activeLabel = wrapper.find('[data-test="active-label"]')
    const $inactiveLabel = wrapper.find('[data-test="inactive-label"]')

    await $activeLabel.trigger('click')

    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
    expect($activeLabel.classes('cursor-pointer')).toBeFalsy()

    await $inactiveLabel.trigger('click')

    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
    expect($inactiveLabel.classes('cursor-pointer')).toBeFalsy()
  })

  it('mount with different states / options', async () => {
    const wrapper = factory({
      props: {
        modelValue,
        disabled: true
      }
    })
    const $toggle = wrapper.find('[data-test="toggler"]')

    expect(wrapper.classes('is-disabled')).toBe(true)
    expect($toggle.classes('is-unchecked')).toBe(true)

    await wrapper.setProps({ modelValue: true })

    expect($toggle.classes('is-checked')).toBe(true)
  })

  it('disabled doesn\'t update "modelValue"', async () => {
    const wrapper = factory({
      props: {
        disabled: true
      }
    })
    const $toggle = wrapper.find('[data-test="toggler"]')

    await $toggle.trigger('click')

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
  })
})
