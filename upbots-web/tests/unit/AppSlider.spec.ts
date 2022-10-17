import { mount, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppSlider from '@/components/stateless/AppSlider.vue'

const factory = (mountOptions?: MountingOptions<TIndexedObject>) => mount(AppSlider, mountOptions)

describe('AppSlider.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppSlider.props).toHaveProperty('modelValue.default')
    expect(AppSlider.props.modelValue.default()).toStrictEqual(expect.arrayContaining([0, 0]))
    expect(AppSlider.props.modelValue.type).toBe(Array)
  })

  it('"multiple" prop definition', () => {
    expect(AppSlider.props).toHaveProperty('multiple.default')
    expect(AppSlider.props.multiple.default).toBe(false)
    expect(AppSlider.props.multiple.type).toBe(Boolean)
  })

  it('"min" prop definition', () => {
    expect(AppSlider.props).toHaveProperty('min.default')
    expect(AppSlider.props.min.default).toBe(0)
    expect(AppSlider.props.min.type).toStrictEqual(expect.arrayContaining([String, Number]))
  })

  it('"max" prop definition', () => {
    expect(AppSlider.props).toHaveProperty('max.default')
    expect(AppSlider.props.max.default).toBe(100)
    expect(AppSlider.props.max.type).toStrictEqual(expect.arrayContaining([String, Number]))
  })

  it('"step" prop definition', () => {
    expect(AppSlider.props).toHaveProperty('step.default')
    expect(AppSlider.props.step.default).toBe(1)
    expect(AppSlider.props.step.type).toStrictEqual(expect.arrayContaining([String, Number]))
  })

  it('mount with [50] range', () => {
    const wrapper = factory({
      props: { modelValue: [50]}
    })
    const $rangeWrap = wrapper.find('[data-test="range-wrap"]')
    const $rangeOne = wrapper.find('[data-test="range-one"]')
    const $rangeTwo = wrapper.find('[data-test="range-two"]')

    expect($rangeOne.exists()).toBeTruthy()
    expect($rangeTwo.exists()).toBeFalsy()
    expect($rangeWrap.attributes('style').split(';').includes('--a: 50')).toBe(true)
  })

  it('mount with [30, 40] range and multiple', () => {
    const wrapper = factory({
      props: { modelValue: [30, 40], multiple: true }
    })

    const $rangeWrap = wrapper.find('[data-test="range-wrap"]')
    const $rangeOne = wrapper.find('[data-test="range-one"]')
    const $rangeTwo = wrapper.find('[data-test="range-two"]')

    expect($rangeOne.exists()).toBeTruthy()
    expect($rangeTwo.exists()).toBeTruthy()

    expect($rangeWrap.attributes('style').split(';').includes('--a: 30')).toBe(true)
    expect($rangeWrap.attributes('style').split(';').includes(' --b: 40')).toBe(true)
  })

  it('mount with min 10 and max 30', () => {
    const wrapper = factory({
      props: { modelValue: [20], min: 10, max: 30 }
    })

    const $rangeWrap = wrapper.find('[data-test="range-wrap"]')

    expect($rangeWrap.attributes('style').split(';').includes(' --min: 10')).toBe(true)
    expect($rangeWrap.attributes('style').split(';').includes(' --max: 30')).toBe(true)
  })
})
