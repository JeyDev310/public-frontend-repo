import { mount, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppSkeleton from '@/components/stateless/AppSkeleton.vue'

const factory = (mountOptions?: MountingOptions<TIndexedObject>) => mount(AppSkeleton, mountOptions)

describe('AppSkeleton.vue', () => {
  it('"default" prop definition', () => {
    expect(AppSkeleton.props).toHaveProperty('type.default')
    expect(AppSkeleton.props.type.default).toBe('')
    expect(AppSkeleton.props.type.type).toBe(String)
  })

  it('mount without props', () => {
    const wrapper = factory()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('mount type "pieChart"', () => {
    const wrapper = factory({
      props: { type: 'pieChart' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('mount type "lineChart"', () => {
    const wrapper = factory({
      props: { type: 'lineChart' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('mount type "card"', () => {
    const wrapper = factory({
      props: { type: 'card' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('mount type "table"', () => {
    const wrapper = factory({
      props: { type: 'table' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
