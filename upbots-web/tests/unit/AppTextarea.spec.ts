import { mount, flushPromises, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppTextarea from '@/components/stateless/AppTextarea.vue'

const modelValue = 'UBXT is supper cool!'
const factory = (mountOptions?: MountingOptions<TIndexedObject>) => {
  return mount(AppTextarea, {
    props: {
      modelValue
    },
    ...mountOptions
  })
}

describe('AppTextarea.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppTextarea.props).toHaveProperty('modelValue.default')
    expect(AppTextarea.props.modelValue.default).toBe('')
    expect(AppTextarea.props.modelValue.type).toBe(String)
  })

  it('"placeholder" prop definition', () => {
    expect(AppTextarea.props).toHaveProperty('placeholder.default')
    expect(AppTextarea.props.placeholder.default).toBe('')
    expect(AppTextarea.props.placeholder.type).toBe(String)
  })

  it('"resize" prop definition', () => {
    expect(AppTextarea.props).toHaveProperty('resize.default')
    expect(AppTextarea.props.resize.default).toBe(false)
    expect(AppTextarea.props.resize.type).toBe(Boolean)
  })

  it('"readonly" prop definition', () => {
    expect(AppTextarea.props).toHaveProperty('readonly.default')
    expect(AppTextarea.props.readonly.default).toBe(false)
    expect(AppTextarea.props.readonly.type).toBe(Boolean)
  })

  it('"disabled" prop definition', () => {
    expect(AppTextarea.props).toHaveProperty('disabled.default')
    expect(AppTextarea.props.disabled.default).toBe(false)
    expect(AppTextarea.props.disabled.type).toBe(Boolean)
  })

  it('mount with text', async () => {
    const wrapper = factory()
    const $textarea = wrapper.find('[ data-test="textarea"]').element as HTMLTextAreaElement

    await flushPromises()
    expect($textarea.value).toBe(modelValue)
  })

  it('mount with different variations classes', async () => {
    const placeholder = 'InputPlaceholder'
    const wrapper = factory({
      props: {
        modelValue,
        disabled: true,
        readonly: true,
        resize: true,
        placeholder
      }
    })
    const $textarea = wrapper.find('[ data-test="textarea"]')

    expect(wrapper.classes()).toContain('is-readonly')
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.classes('resize-none')).toBeFalsy()
    expect($textarea.attributes('placeholder')).toBe(placeholder)
  })

  it('input update "modelValue"', async () => {
    const inputValueToBeInputted = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, necessitatibus.'
    const wrapper = factory()
    const $textarea = wrapper.find('[ data-test="textarea"]')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    $textarea.element.value = inputValueToBeInputted
    await $textarea.trigger('textarea')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([inputValueToBeInputted])
  })

  it('disabled doesn\'t update "modelValue"', async () => {
    const wrapper = factory({
      props: {
        disabled: true
      }
    })
    const $textarea = wrapper.find('[ data-test="textarea"]')

    await $textarea.trigger('textarea')
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
  })
})
