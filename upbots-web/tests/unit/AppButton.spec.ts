import { createRouter, createWebHistory } from 'vue-router'
import { mount, flushPromises, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import AppButton from '@/components/stateless/AppButton.vue'

const Component = {
  template: '<div>Main</div>'
}

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    component: Component
  }, {
    path: '/test',
    component: Component
  }]
})

const buttonText = 'Buy UBXT'
const factory = async (mountOptions?: MountingOptions<TIndexedObject>) => {
  router.push('/')
  await router.isReady()

  return mount(AppButton, {
    slots: {
      default: buttonText
    },
    global: {
      plugins: [router]
    },
    ...mountOptions
  })
}

describe('AppButton.vue', () => {
  it('"to" prop definition', () => {
    expect(AppButton.props).toHaveProperty('to.default')
    expect(AppButton.props.to.default).toBe('')
    expect(AppButton.props.to.type).toStrictEqual(expect.arrayContaining([String, Object]))
  })

  it('"type" prop definition', () => {
    expect(AppButton.props).toHaveProperty('type.default')
    expect(AppButton.props.type.default).toBe('primary')
    expect(AppButton.props.type.type).toBe(String)
  })

  it('"size" prop definition', () => {
    expect(AppButton.props).toHaveProperty('size.default')
    expect(AppButton.props.size.default).toBe('md')
    expect(AppButton.props.size.type).toBe(String)
  })

  it('"rounded" prop definition', () => {
    expect(AppButton.props).toHaveProperty('rounded.default')
    expect(AppButton.props.rounded.default).toBe('sm')
    expect(AppButton.props.rounded.type).toBe(String)
  })

  it('"isUppercase" prop definition', () => {
    expect(AppButton.props).toHaveProperty('isUppercase.default')
    expect(AppButton.props.isUppercase.default).toBe(false)
    expect(AppButton.props.isUppercase.type).toBe(Boolean)
  })

  it('"disabled" prop definition', () => {
    expect(AppButton.props).toHaveProperty('disabled.default')
    expect(AppButton.props.disabled.default).toBe(false)
    expect(AppButton.props.disabled.type).toBe(Boolean)
  })

  it('mount with text', async () => {
    const wrapper = await factory()

    expect(wrapper.html()).toContain(buttonText)
  })

  it('mount with different variations classes', async () => {
    const wrapper = await factory({
      props: {
        type: 'outlined',
        size: 'xs',
        rounded: 'xs',
        isUppercase: true,
        disabled: true
      }
    })

    const btnWrapper = wrapper.find('button')

    expect(btnWrapper.classes('size-xs')).toBe(true)
    expect(btnWrapper.classes()).toContain('size-xs')
    expect(btnWrapper.classes()).toContain('rounded-xs')
    expect(btnWrapper.classes()).toContain('is-outlined')
    expect(btnWrapper.classes()).toContain('uppercase')
    expect(btnWrapper.classes()).toContain('is-disabled')
  })

  it('click must be emitted', async () => {
    const wrapper = await factory()
    const btnWrapper = wrapper.find('button')

    await btnWrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')

    await btnWrapper.trigger('click')
    await btnWrapper.trigger('click')
    expect(wrapper.emitted().click).toHaveLength(3)
  })

  it('disabled doesn\'t emit "click"', async () => {
    const wrapper = await factory({
      props: {
        disabled: true
      }
    })
    const btnWrapper = wrapper.find('button')

    await btnWrapper.trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('navigate to "/test"', async () => {
    const wrapper = await factory({
      props: {
        to: '/test'
      }
    })
    const btnWrapper = wrapper.find('button')

    await btnWrapper.trigger('click')
    await flushPromises()

    expect(wrapper.vm.$route.path).toBe('/test')
  })
})
