import { TCallback } from '@/types'

export class Timer {
  startedAt: number
  callback: TCallback
  delay: number
  timer: ReturnType<typeof setTimeout>

  constructor (callback: TCallback, delay: number) {
    this.startedAt = Date.now()
    this.callback = callback
    this.delay = delay

    this.timer = setTimeout(callback, delay)
  }

  pause () {
    this.stop()
    this.delay -= Date.now() - this.startedAt
  }

  resume () {
    this.stop()
    this.startedAt = Date.now()
    this.timer = setTimeout(this.callback, this.delay)
  }

  stop () {
    clearTimeout(this.timer)
  }
}
