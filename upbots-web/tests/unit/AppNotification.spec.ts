import { mount, flushPromises, MountingOptions } from '@vue/test-utils'
import { TIndexedObject } from '@/types'
import Notification from '@/components/stateless/notifications/Notification.vue'
import AppNotification from '@/components/stateless/notifications/AppNotification.vue'
import { list, appNotify } from '@/components/stateless/notifications'

const wait = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

const factory = (mountOptions?: MountingOptions<TIndexedObject>) => mount(AppNotification, {
  global: {
    components: {
      Notification,
      AppButton: { template: '<button><slot/></button>' },
      AppIcon: { template: '<span></span>' }
    }
  },
  ...mountOptions
})

describe('AppNotification.vue', () => {
  beforeEach(() => {
    list.value = []
  })

  it('"notification" prop definition', () => {
    expect(Notification.props).toHaveProperty('notification.required')
    expect(Notification.props.notification.required).toBe(true)
    expect(Notification.props.notification.type).toBe(Object)
  })

  it('mount and show two notification, 1sec duration', async () => {
    const message = 'First!'
    const wrapper = factory()

    /*
      notifications will shown reversed
      1st - 'First!', 2nd - 'Here we go'
    */
    appNotify({ type: 'info', message: 'Here we go', duration: 1000 })
    appNotify({ type: 'info', message, duration: 1000 })

    await flushPromises()

    let $notifications = wrapper.findAll('[data-test="notification-item"]')

    expect($notifications[0].find('[data-test="message"]').text()).toBe(message)
    expect($notifications).toHaveLength(2)
    expect(list.value).toHaveLength(2)

    await wait(1100) // duration is 1sec

    $notifications = wrapper.findAll('[data-test="notification-item"]')

    expect($notifications).toHaveLength(0)
    expect(list.value).toHaveLength(0)
  })

  it('close on click and destroyed callback', async () => {
    const onClick = jest.fn()
    const destroyed = jest.fn()

    const wrapper = factory()
    appNotify({
      type: 'info',
      message: 'Here we go',
      onClick,
      destroyed
    })

    await flushPromises()

    const $notifications = wrapper.findAll('[data-test="notification-item"]')

    await $notifications[0].trigger('click')

    expect(onClick).toBeCalledTimes(1)
    expect(destroyed).toBeCalledTimes(1)
  })

  it('different notification types', async () => {
    const message = 'First!'
    const info = 'info'
    const warning = 'warning'
    const success = 'success'
    const error = 'error'

    const wrapper = factory()
    appNotify({ type: null, message })
    appNotify({ type: info, message })
    appNotify({ type: warning, message })
    appNotify({ type: success, message })
    appNotify({ type: error, message })

    await flushPromises()

    const $notifications = wrapper.findAll('[data-test="notification-item"]')

    expect($notifications[0].classes('is-error')).toBe(true)
    expect($notifications[1].classes('is-success')).toBe(true)
    expect($notifications[2].classes('is-warning')).toBe(true)
    expect($notifications[3].classes('is-info')).toBe(true)
    expect($notifications[4].classes('is-default')).toBe(true)
  })
})
