import { flushPromises, mount, MountingOptions } from '@vue/test-utils'
import { sortArrayByKey } from '@/core/helpers'
import { TIndexedObject } from '@/types'

import AppTable from '@/components/stateless/AppTable.vue'

const headers = [
  { property: 'firstName', label: 'First name', sortable: true, minWidth: 200 },
  { property: 'lastName', label: 'Last name', sortable: true, minWidth: 250 },
  { property: 'email', label: 'Email', sortable: true, minWidth: 180 }
]
const dataset = [
  { firstName: 'Karole', lastName: 'Muris', email: 'kmuris0@tripadvisor.com' },
  { firstName: 'Annamarie', lastName: 'Sperling', email: 'asperling1@yolasite.com' },
  { firstName: 'Amabelle', lastName: 'Hardingham', email: 'ahardingham2@myspace.com' },
  { firstName: 'Sidney', lastName: 'Roullier', email: 'sroullier3@hud.gov' }
]

const factory = (mountOptions?: MountingOptions<TIndexedObject>) => {
  return mount(AppTable, {
    global: {
      components: {
        AppTruncatedTooltip: { template: '<span />' },
        AppTooltip: { template: '<span />' },
        AppIcon: { template: '<span />' },
        MqLayout: { template: '<template> <slot /> </template>' }
      }
    },
    props: {
      headers,
      dataset
    },
    ...mountOptions
  })
}

describe('AppTable.vue', () => {
  it('"headers" prop definition', () => {
    expect(AppTable.props).toHaveProperty('headers.required')
    expect(AppTable.props.headers.required).toBe(true)
    expect(AppTable.props.headers.type).toBe(Array)
  })

  it('"dataset" prop definition', () => {
    expect(AppTable.props).toHaveProperty('dataset.required')
    expect(AppTable.props.dataset.required).toBe(true)
    expect(AppTable.props.dataset.type).toBe(Array)
  })

  it('"rowHeight" prop definition', () => {
    expect(AppTable.props).toHaveProperty('rowHeight.default')
    expect(AppTable.props.rowHeight.default).toBe('32px')
    expect(AppTable.props.rowHeight.type).toStrictEqual(String)
  })

  it('has correct column labels', async () => {
    const wrapper = factory()

    await flushPromises()

    const desktopHeaders = wrapper.findAll('[data-test="table-header"]')
    const mobileHeaders = wrapper.findAll('[data-test="table-mobile-header"]')

    expect(desktopHeaders).toHaveLength(3)
    expect(mobileHeaders).toHaveLength(12)

    expect(desktopHeaders[0].text()).toBe('First name')
    expect(desktopHeaders[1].text()).toBe('Last name')
    expect(desktopHeaders[2].text()).toBe('Email')

    expect(mobileHeaders[0].text()).toBe('First name')
    expect(mobileHeaders[1].text()).toBe('Last name')
    expect(mobileHeaders[2].text()).toBe('Email')
  })

  it('has correct column width', async () => {
    const wrapper = factory()
    const headersWrappers = wrapper.findAll('[data-test="table-header-wrapper"]')

    expect(headersWrappers[0].attributes('style')).toBe('min-width: 200px;')
    expect(headersWrappers[1].attributes('style')).toBe('min-width: 250px;')
    expect(headersWrappers[2].attributes('style')).toBe('min-width: 180px;')
  })

  it('click by the header', async () => {
    const wrapper = factory()
    const header = wrapper.find('[data-test="table-header"]')
    const chevronUp = wrapper.find('[data-test="table-chevron-up"]')
    const chevronDown = wrapper.find('[data-test="table-chevron-down"]')
    const chevronNotActiveClass = 'opacity-40'
    const emitName = 'sortBy'

    await header.trigger('click')
    expect(chevronUp.classes()).toContain(chevronNotActiveClass)
    expect(chevronDown.classes()).not.toContain(chevronNotActiveClass)

    await header.trigger('click')
    expect(chevronUp.classes()).not.toContain(chevronNotActiveClass)
    expect(chevronDown.classes()).toContain(chevronNotActiveClass)

    await header.trigger('click')
    expect(chevronUp.classes()).toContain(chevronNotActiveClass)
    expect(chevronDown.classes()).toContain(chevronNotActiveClass)

    expect(wrapper.emitted()).toHaveProperty(emitName)
    expect(wrapper.emitted()[emitName][0]).toEqual([{ order: 'asc', orderBy: expect.any(String) }])
    expect(wrapper.emitted()[emitName][1]).toEqual([{ order: 'desc', orderBy: expect.any(String) }])
    expect(wrapper.emitted()[emitName][2]).toEqual([{ order: '', orderBy: '' }])
  })

  it('click by the header(sortFrontSide)', async () => {
    const datasetCopy = dataset.slice()
    const wrapper = factory({ props: { headers, dataset, sortFrontSide: true } })
    const header = wrapper.find('[data-test="table-header"]')
    const emitName = 'update:dataset'

    const datasetAsc = dataset.slice().sort(sortArrayByKey('firstName'))
    const datasetDesc = dataset.slice().sort(sortArrayByKey('firstName', 'desc'))

    await header.trigger('click')
    expect(wrapper.emitted()).toHaveProperty(emitName)
    expect(wrapper.emitted()[emitName][0]).toEqual([datasetAsc])

    await header.trigger('click')
    expect(wrapper.emitted()[emitName][1]).toEqual([datasetDesc])

    await header.trigger('click')
    expect(wrapper.emitted()[emitName][2]).toEqual([datasetCopy])
  })
})
