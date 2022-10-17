import { App } from 'vue'

export const directives = {
  install: (app: App): void => {
    app.directive('lazyload', {
      mounted (el) {
        function loadImage () {
          const imageElement: any = Array.from(el.children).find((el: any) => el.nodeName === 'IMG')
          if (imageElement) {
            imageElement.addEventListener('load', () => {
              setTimeout(() => el.classList.add('lazy-img-loaded'), 100)
            })
            imageElement.addEventListener('error', () => console.log('error'))
            imageElement.src = imageElement.dataset.url
          }
        }

        function handleIntersect (entries: any, observer: any) {
          entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
              loadImage()
              observer.unobserve(el)
            }
          })
        }

        function createObserver () {
          const options: any = { root: null, threshold: '0' }
          const observer = new IntersectionObserver(handleIntersect, options)
          observer.observe(el)
        }

        if (window.IntersectionObserver) {
          createObserver()
        } else {
          loadImage()
        }
      }
    })
  }
}
