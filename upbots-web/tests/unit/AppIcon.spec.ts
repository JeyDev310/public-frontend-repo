import { mount, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppIcon from '@/components/stateless/AppIcon.vue'

const iconName = 'chevron-down'

const factory = (mountOptions: MountingOptions<TIndexedObject>) => mount(AppIcon, mountOptions)

describe('AppIcon.vue', () => {
  it('"name" prop definition', () => {
    expect(AppIcon.props).toHaveProperty('name.required')
    expect(AppIcon.props.name.required).toBe(true)
    expect(AppIcon.props.name.type).toBe(String)
  })

  it('"size" prop definition', () => {
    expect(AppIcon.props).toHaveProperty('size.default')
    expect(AppIcon.props.size.default).toBe(15)
    expect(AppIcon.props.size.type).toStrictEqual(expect.arrayContaining([String, Number]))
  })

  it('mount with a name', () => {
    const wrapper = factory({ props: { name: iconName } })

    expect(wrapper.classes()).toContain(`icon-${iconName}`)
  })

  it('mount with a name and size 10', () => {
    const wrapper = factory({ props: { name: iconName, size: 10 } })

    expect(wrapper.attributes('style')).toBe('font-size: 10px;')
  })
})
