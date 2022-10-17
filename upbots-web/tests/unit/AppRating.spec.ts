import { mount, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppRating from '@/components/stateless/AppRating.vue'

const modelValue = 2.5
const fillLineWidth = (100 * modelValue) / 5

const factory = (mountOptions: MountingOptions<TIndexedObject>) => mount(AppRating, mountOptions)

describe('AppRating.vue', () => {
  it('"modelValue" prop definition', () => {
    expect(AppRating.props).toHaveProperty('modelValue.required')
    expect(AppRating.props.modelValue.required).toBe(true)
    expect(AppRating.props.modelValue.type).toBe(Number)

    const validator = AppRating.props.modelValue.validator
    expect(validator(2)).toBe(true)
    expect(validator(6)).toBe(false)
  })

  it('mount with rating 2.5', () => {
    const wrapper = factory({ props: { modelValue } })
    const $fillLine = wrapper.find('[data-test="fill-line"]')

    expect($fillLine.attributes('style')).toBe(`width: ${fillLineWidth}%;`)
  })
})
