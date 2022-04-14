import { computed, onMounted, ref, watch } from 'vue'
import usePlayerStore from '../../store/use-player-store'
import { playTypeCode } from '../../config/player'

/** 侧边栏动画 */
function useAnimation() {
  const showContent = ref(true)

  const transitionClass = computed(() => (showContent.value ? 'slide-enter' : 'slide-leave'))

  function onHeaderClick() {
    showContent.value = !showContent.value
  }

  return {
    showContent,
    transitionClass,
    onHeaderClick
  }
}

/** 中间滚动内容 */
function useScorllContent() {
  const {
    curIndex,
    playlist,
    playEvent,
    playType,
    setCurIndex,
    setCurContent,
    setCurUrl,
    setCurrentTime,
    setMediaType
  } = usePlayerStore()

  const scrollRef = ref(null)
  const groupRef = ref(null)

  const wordlist = computed(() => playlist.value?.map((item) => item.content.text))
  const haveContent = computed(() => playType.value === playTypeCode.WORD)

  /** 单词滚动 */
  function scrollTo(index, first = true) {
    if (isNaN(index)) return
    let targetEl
    // 当某个类型的题目读完后，返回，重新获取数据渲染,元素可能还没有
    if (!groupRef.value?.children) return
    if (first) targetEl = groupRef.value.children[index]
    if (index > 2) {
      targetEl = groupRef.value.children[index - 2]
    }
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 1000)
  }

  /** 内容选择 */
  function onItemSelect(e) {
    setCurIndex(+e.target.dataset.index)
    setCurContent(playlist.value[curIndex.value].content)
    setCurUrl(playlist.value[curIndex.value].url)
    setMediaType('listen')
    playEvent.value.emit('playAudio', { stepType: 'playsystem' })
  }

  watch(curIndex, (newIndex) => {
    if (playType.value === playTypeCode.WORD) {
      if (newIndex === 0) {
        setCurrentTime(0)
        return scrollTo(newIndex, true)
      }
      if (newIndex > 2) {
        console.log('xxxxx', 123)
        return scrollTo(newIndex)
      }
    }
  })
  /** life hook */
  onMounted(() => {
    // const scroll = scrollRef.value.scroll
    // scroll.on('scrollEnd', () => {
    //   if (curIndex.value > 2) {
    //     return scroll.scrollToElement(groupRef.value.children[curIndex.value - 2], 3000)
    //   }
    //   scroll.scrollToElement(groupRef.value.children[curIndex.value], 3000)
    // })
  })

  return {
    scrollRef,
    groupRef,
    wordlist,
    haveContent,
    onItemSelect,
    scrollTo
  }
}

/** 上一个按钮 */
function usePrevButton() {
  const {
    curIndex,
    playlist,
    playEvent,
    playType,
    isFirstContent,
    setCurIndex,
    setCurContent,
    setCurUrl,
    setMediaType
  } = usePlayerStore()

  /** 按钮文案 */
  const prevBtnText = computed(() => {
    const btnTextMaper = {
      [playTypeCode.ARTICLE]: '上一句',
      [playTypeCode.SENTENCE]: '上一句',
      [playTypeCode.WORD]: '上一个'
    }
    return btnTextMaper[playType.value] ? btnTextMaper[playType.value] : ''
  })

  /** 按钮事件 */
  function onPrev() {
    if (isFirstContent.value) return
    setCurIndex(curIndex.value - 1)
    setCurContent(playlist.value[curIndex.value].content)
    setCurUrl(playlist.value[curIndex.value].url)
    setMediaType('listen')
    playEvent.value.emit('playAudio', { stepType: 'playsystem' })
  }

  return {
    prevBtnText,
    onPrev
  }
}

/** 下一个按钮 */
function useNextButton() {
  const {
    curIndex,
    playlist,
    playEvent,
    playType,
    isLast,
    setCurIndex,
    setCurContent,
    setCurUrl,
    setMediaType
  } = usePlayerStore()

  /** 按钮文案 */
  const btnTextMaper = {
    [playTypeCode.ARTICLE]: '下一句',
    [playTypeCode.SENTENCE]: '下一句',
    [playTypeCode.WORD]: '下一个'
  }
  const nextBtnText = computed(() => {
    if (btnTextMaper[playType.value] && !isLast.value) {
      return btnTextMaper[playType.value]
    } else if (isLast.value) {
      return '重新开始'
    }
    return ''
  })

  /** 按钮事件 */
  function onNext() {
    if (!isLast.value) {
      setCurIndex(curIndex.value + 1)
      setCurContent(playlist.value[curIndex.value].content)
      setCurUrl(playlist.value[curIndex.value].url)
      setMediaType('listen')
      playEvent.value.emit('playAudio', { stepType: 'playsystem' })
    } else {
      if (playType.value !== playTypeCode.WORD) return playEvent.value.emit('restart')
      setCurIndex(0)
      setCurContent(playlist.value[curIndex.value].content)
      setCurUrl(playlist.value[curIndex.value].url)
      setMediaType('listen')
      playEvent.value.emit('playAudio', { stepType: 'playsystem' })
    }
  }

  return {
    nextBtnText,
    onNext
  }
}

export default function useSideBar() {
  const { showContent, transitionClass, onHeaderClick } = useAnimation()
  const { prevBtnText, onPrev } = usePrevButton()
  const { nextBtnText, onNext } = useNextButton()
  const { scrollRef, groupRef, wordlist, haveContent, onItemSelect, scrollTo } = useScorllContent()

  return {
    showContent,
    transitionClass,
    prevBtnText,
    nextBtnText,
    scrollRef,
    groupRef,
    wordlist,
    haveContent,
    onHeaderClick,
    onPrev,
    onNext,
    onItemSelect,
    scrollTo
  }
}
