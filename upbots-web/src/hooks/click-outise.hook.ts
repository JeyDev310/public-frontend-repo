import { getCurrentInstance, onMounted, onUnmounted } from 'vue'

interface IChromeEvent extends Event {
    path: EventTarget[];
}

export const onClickOutside = (
  hook: (e?: Event) => void,
  target = getCurrentInstance()
): void => {
  function handleEvent (e: Event) {
    if (!target) return

    // not support IE now
    const path: EventTarget[] = (e as IChromeEvent).path ?? e.composedPath()
    const nodes: EventTarget[] = []

    if (typeof target.subTree.type === 'symbol') {
      // Fragment
      Array.prototype.map.call(target.subTree.children, ({ el }) => {
        nodes.push(el)
      })
    } else {
      // Single root
      nodes.push(target.subTree.el as EventTarget)
    }

    const isNotClickOutside = nodes.some((el) => ~path.indexOf(el))

    if (isNotClickOutside) return

    hook(e)
  }

  onMounted(() => {
    document.addEventListener('click', handleEvent)
    document.addEventListener('touchend', handleEvent)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleEvent)
    document.removeEventListener('touchend', handleEvent)
  })
}
