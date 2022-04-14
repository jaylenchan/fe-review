import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(ObserveDOM)
BScroll.use(MouseWheel)
BScroll.use(ScrollBar)

export default function useScroll(wrapperRef, customRef, options, emit) {
  /** scroll */
  const scroll = ref(null)

  /** life hook */
  onMounted(() => {
    const scrollbar = options.scrollbar
      ? {
          fade: false,
          minSize: 57,
          customElements: [customRef.value]
        }
      : false

    const scrollVal = (scroll.value = new BScroll(wrapperRef.value, {
      ...options,
      observeDOM: true,
      mouseWheel: true,
      scrollbar,
      // 支持平板电脑鼠标和手指滑动配置
      disableMouse: false,
      disableTouch: false
    }))
    if (options.probeType > 0) {
      scrollVal.on('scroll', (pos) => {
        emit('scroll', pos)
      })
    }
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })

  return scroll
}
