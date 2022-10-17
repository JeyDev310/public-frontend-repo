import { mount, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppPagination from '@/components/stateless/AppPagination.vue'

const pages = 20
const totalVisible = 7
const currentPage = 1

const total = 200
const limit = 10

const factory = (mountOptions?: MountingOptions<TIndexedObject>) => {
  return mount(AppPagination, {
    global: {
      components: { AppIcon: { template: '<span />' } }
    },
    props: {
      modelValue: currentPage,
      pages
    },
    ...mountOptions
  })
}

describe('AppPagination.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppPagination.props).toHaveProperty('modelValue.required')
    expect(AppPagination.props.modelValue.required).toBe(true)
    expect(AppPagination.props.modelValue.type).toBe(Number)
  })

  it('"length" prop definition', () => {
    expect(AppPagination.props).toHaveProperty('length.default')
    expect(AppPagination.props.length.default).toBe(0)
    expect(AppPagination.props.length.type).toBe(Number)
  })

  it('"pages" prop definition', () => {
    expect(AppPagination.props).toHaveProperty('pages.default')
    expect(AppPagination.props.pages.default).toBe(null)
    expect(AppPagination.props.pages.type).toBe(Number)
  })

  it('"total" prop definition', () => {
    expect(AppPagination.props).toHaveProperty('total.default')
    expect(AppPagination.props.total.default).toBe(null)
    expect(AppPagination.props.total.type).toBe(Number)
  })

  it('"limit" prop definition', () => {
    expect(AppPagination.props).toHaveProperty('limit.default')
    expect(AppPagination.props.limit.default).toBe(7)
    expect(AppPagination.props.limit.type).toBe(Number)
  })

  it('"totalVisible" prop definition', () => {
    expect(AppPagination.props).toHaveProperty('totalVisible.default')
    expect(AppPagination.props.totalVisible.default).toBe(7)
    expect(AppPagination.props.totalVisible.type).toBe(Number)
  })

  it('"disabled" prop definition', () => {
    expect(AppPagination.props).toHaveProperty('disabled.default')
    expect(AppPagination.props.disabled.default).toBe(false)
    expect(AppPagination.props.disabled.type).toBe(Boolean)
  })

  it('mount with 20 pages', () => {
    const wrapper = factory()
    const $items = wrapper.findAll('[data-test="item"]')

    expect($items[0].text()).toContain(1)
    expect($items[0].classes()).toContain('is-active')
    expect($items[1].text()).toContain(2)
    expect($items[2].text()).toContain(3)
    expect($items[3].text()).toContain('...')
    expect($items[4].text()).toContain(18)
    expect($items[5].text()).toContain(19)
    expect($items[6].text()).toContain(20)
    expect($items).toHaveLength(totalVisible)
  })

  it('correct calculation for total and limit', async () => {
    const wrapper = factory({
      props: { modelValue: currentPage, total, limit }
    })

    const $items = wrapper.findAll('[data-test="item"]')

    expect($items[0].text()).toContain(1)
    expect($items[0].classes()).toContain('is-active')
    expect($items[1].text()).toContain(2)
    expect($items[2].text()).toContain(3)
    expect($items[3].text()).toContain('...')
    expect($items[4].text()).toContain(18)
    expect($items[5].text()).toContain(19)
    expect($items[6].text()).toContain(20)
    expect($items).toHaveLength(totalVisible)
  })

  it('next / prev disabled if first and last is active', async () => {
    const wrapper = factory()

    const $prev = wrapper.find('[data-test="prev"]')
    const $next = wrapper.find('[data-test="next"]')

    await $prev.trigger('click')

    expect($prev.classes()).toContain('is-disabled')
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()

    await wrapper.setProps({ modelValue: 20 })
    await $next.trigger('click')

    expect($next.classes()).toContain('is-disabled')
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
  })

  it('pagination selection update "modelValue"', async () => {
    const wrapper = factory()

    const $prev = wrapper.find('[data-test="prev"]')
    const $next = wrapper.find('[data-test="next"]')
    const $items = wrapper.findAll('[data-test="item"]')

    await $items[2].trigger('click') // 3

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([3])
    expect(wrapper.emitted().change).toHaveLength(1)
    expect(wrapper.emitted().change[0]).toStrictEqual([3])

    await wrapper.setProps({ modelValue: 2 })
    await $prev.trigger('click') // 1

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(2)
    expect(wrapper.emitted()['update:modelValue'][1]).toStrictEqual([1])
    expect(wrapper.emitted().change).toHaveLength(2)
    expect(wrapper.emitted().change[1]).toStrictEqual([1])

    await wrapper.setProps({ modelValue: 2 })
    await $next.trigger('click') // 3

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(3)
    expect(wrapper.emitted()['update:modelValue'][2]).toStrictEqual([3])
    expect(wrapper.emitted().change).toHaveLength(3)
    expect(wrapper.emitted().change[2]).toStrictEqual([3])
  })

  it('disabled doesn\'t emit anything', async () => {
    const wrapper = factory({
      props: { modelValue: 3, pages, disabled: true }
    })

    const $items = wrapper.findAll('[data-test="item"]')

    await $items[2].trigger('click')

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
    expect(wrapper.emitted().change).toBeFalsy()
  })
})
