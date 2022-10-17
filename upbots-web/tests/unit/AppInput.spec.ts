import { mount, flushPromises, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppInput from '@/components/stateless/AppInput.vue'

const modelValue = 'UBXT is supper cool!'
const factory = (mountOptions?: MountingOptions<TIndexedObject>) => {
  return mount(AppInput, {
    global: {
      components: { AppTruncatedTooltip: { template: '<span/>' } }
    },
    props: {
      modelValue
    },
    ...mountOptions
  })
}

describe('AppInput.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppInput.props).toHaveProperty('modelValue.default')
    expect(AppInput.props.modelValue.default).toBe('')
    expect(AppInput.props.modelValue.type).toBe(String)
  })

  it('"placeholder" prop definition', () => {
    expect(AppInput.props).toHaveProperty('placeholder.default')
    expect(AppInput.props.placeholder.default).toBe('')
    expect(AppInput.props.placeholder.type).toBe(String)
  })

  it('"name" prop definition', () => {
    expect(AppInput.props).toHaveProperty('name.default')
    expect(AppInput.props.name.default).toBe('')
    expect(AppInput.props.name.type).toBe(String)
  })

  it('"type" prop definition', () => {
    expect(AppInput.props).toHaveProperty('type.default')
    expect(AppInput.props.type.default).toBe('text')
    expect(AppInput.props.type.type).toBe(String)
  })

  it('"size" prop definition', () => {
    expect(AppInput.props).toHaveProperty('size.default')
    expect(AppInput.props.size.default).toBe('md')
    expect(AppInput.props.size.type).toBe(String)
  })

  it('"showLast" prop definition', () => {
    expect(AppInput.props).toHaveProperty('showLast.default')
    expect(AppInput.props.showLast.default).toBe(false)
    expect(AppInput.props.showLast.type).toBe(Boolean)
  })

  it('"allowCopy" prop definition', () => {
    expect(AppInput.props).toHaveProperty('allowCopy.default')
    expect(AppInput.props.allowCopy.default).toBe(false)
    expect(AppInput.props.allowCopy.type).toBe(Boolean)
  })

  it('"readonly" prop definition', () => {
    expect(AppInput.props).toHaveProperty('readonly.default')
    expect(AppInput.props.readonly.default).toBe(false)
    expect(AppInput.props.readonly.type).toBe(Boolean)
  })

  it('"disabled" prop definition', () => {
    expect(AppInput.props).toHaveProperty('disabled.default')
    expect(AppInput.props.disabled.default).toBe(false)
    expect(AppInput.props.disabled.type).toBe(Boolean)
  })

  it('"errorTooltipPlacement" prop definition', () => {
    expect(AppInput.props).toHaveProperty('errorTooltipPlacement.default')
    expect(AppInput.props.errorTooltipPlacement.default).toBe('bottom')
    expect(AppInput.props.errorTooltipPlacement.type).toBe(String)
  })

  it('mount with text', async () => {
    const wrapper = factory()

    const $input = wrapper.find('[ data-test="input"]').element as HTMLInputElement

    await flushPromises()
    expect($input.value).toBe(modelValue)
  })

  it('mount with different variations classes', async () => {
    const name = 'InputName'
    const type = 'password'
    const placeholder = 'InputPlaceholder'
    const wrapper = factory({
      props: {
        modelValue,
        size: 'xs',
        allowCopy: true,
        showLast: true,
        disabled: true,
        readonly: true,
        name,
        type,
        placeholder
      }
    })

    await flushPromises()

    const $input = wrapper.find('[data-test="input"]')
    const $innerWrap = wrapper.find('[data-test="inner-wrap"]')
    const $copy = wrapper.find('[data-test="copy-trigger"]')
    const $lastDigits = wrapper.find('[data-test="last-digits"]')

    expect($innerWrap.classes()).toContain('size-xs')
    expect(wrapper.classes()).toContain('is-copy')
    expect(wrapper.classes()).toContain('is-readonly')
    expect(wrapper.classes()).toContain('is-disabled')
    expect($input.attributes('name')).toBe(name)
    expect($input.attributes('placeholder')).toBe(placeholder)
    expect($input.attributes('type')).toBe(type)
    expect($copy.exists()).toBe(true)
    expect($lastDigits.exists()).toBe(true)
  })

  it('input update "modelValue"', async () => {
    const inputValueToBeInputted = 'UBXT'

    const wrapper = factory()
    const $input = wrapper.find('[data-test="input"]')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    $input.element.value = inputValueToBeInputted
    await $input.trigger('input')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([inputValueToBeInputted])
  })

  it('disabled doesn\'t update "modelValue"', async () => {
    const wrapper = factory({
      props: {
        disabled: true
      }
    })
    const $input = wrapper.find('[data-test="input"]')

    await $input.trigger('input')
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
  })

  it('prepend / append slots', async () => {
    const prependSlot = 'data-test="prepend-slot"'
    const appendSlot = 'data-test="append-slot"'

    const wrapper = factory({
      slots: {
        prepend: `<span ${prependSlot}>prepend</span>`,
        append: `<span ${appendSlot}>prepend</span>`
      }
    })

    await flushPromises()

    const $prependSlot = wrapper.find(`[${prependSlot}]`)
    const $appendSlot = wrapper.find(`[${appendSlot}]`)

    expect($prependSlot.exists()).toBe(true)
    expect($appendSlot.exists()).toBe(true)
  })
})
