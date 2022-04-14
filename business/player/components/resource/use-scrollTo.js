import { useStore } from 'vuex'
import { ref, onMounted, computed, watch } from 'vue'
import { playTypeCode } from '../../config/player'
import usePlayerStore from '../../store/use-player-store'

export default function useScrollTo() {
  const groupRef = ref(null)
  const scrollRef = ref(null)

  /** store */
  const store = useStore()
  const curIndex = computed(() => store.state.player.curIndex)
  const playType = computed(() => store.state.player.playType)
  const { playEvent } = usePlayerStore()
  /** func */
  function scrollTo(index) {
    if (isNaN(index)) return
    if (index > 1) {
      const targetEl = groupRef.value.children[index - 1]
      const scroll = scrollRef.value.scroll
      
      if(playType.value !== playTypeCode.WORD) {
        const top = targetEl.offsetTop + Math.floor(targetEl.offsetHeight/2)
        scroll.scrollTo(0, -top, 1000)
      } else {
        scroll.scrollToElement(targetEl, 1000, true, true)
      }
      
    }
  }

  watch(curIndex, () => {
    if (playType.value !== playTypeCode.WORD) scrollTo(curIndex.value)
    // if (playType.value === playTypeCode.ARTICLE) {
    //   const greaterStartTime = []
    //   const allStartTime = playlist.value[0].startTimeList

    //   allStartTime.forEach((startTime) => {
    //     if (+startTime.start / 1000 < newTime) {
    //       greaterStartTime.push(startTime.index)
    //     }
    //   })
    //   const index = Math.max(...greaterStartTime)
    //   scrollTo(index)
    // }
  })

  // watch(currentTime, (newTime) => {
  //   if (playType.value === playTypeCode.ARTICLE) {
  //     const greaterStartTime = []
  //     const allStartTime = playlist.value[0].startTimeList

  //     allStartTime.forEach((startTime) => {
  //       if (+startTime.start / 1000 < newTime) {
  //         greaterStartTime.push(startTime.index)
  //       }
  //     })
  //     const index = Math.max(...greaterStartTime)
  //     scrollTo(index)
  //   }
  // })

  onMounted(() => {
    playEvent.value.on('restart', () => {
      console.log('1=>')
      const scroll = scrollRef.value.scroll
      scroll.scrollTo(0, 0, 500, 'easing')
    })
  })

  return {
    groupRef,
    scrollRef,
    curIndex
  }
}
