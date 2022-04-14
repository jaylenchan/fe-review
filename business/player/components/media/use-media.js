import { ref, computed, onMounted, watch, onUnmounted, watchEffect } from 'vue'
import lottie from 'lottie-web'
import againImg from './again.png'
import listenImg from './listen.png'
import readImg from './read.png'
import usePlayerStore from '../../store/use-player-store'
import { useStore } from 'vuex'
import { playTypeCode } from '../../config/player'

export default function useMedia(props) {
  const mediaTypes = {
    listen: {
      img: listenImg,
      text: '听'
    },
    read: {
      img: readImg,
      text: '读'
    },
    again: {
      img: againImg,
      text: '再读一次'
    }
  }

  /** store */
  // const store = useStore()
  const { store, mediaType, curUrl, playEvent, playType, curContent, setStepType } =
    usePlayerStore()
  const img = computed(() => mediaTypes[mediaType.value].img)
  const text = computed(() => mediaTypes[mediaType.value].text)

  const animationRef = ref(null)

  /** audio */
  const audioRef = ref(null)
  const step = ref('')
  const playbackRate = computed(() =>
    step.value === 'followsystem' ? +(1 / 1.5).toFixed(2) : 1
  )

  /** 音频开始时间 */
  const startTime = computed(() => {
    if (playType.value !== playTypeCode.WORD) return curContent.value.start / 1000
    return 0
  })

  /** 音频持续时间 */
  const duration = ref(0)

  /** 音频结束时间 */
  const endTime = computed(() => {
    if (playType.value !== playTypeCode.WORD) return startTime.value + duration.value
    return audioRef.value?.duration
  })

  /** 音频当前播放时间 */
  const currentTime = computed(() => store.state.player.currentTime)

  const percentage = computed(() => {
    if (playType.value !== playTypeCode.WORD) {
      return Math.ceil(((currentTime.value - startTime.value) / duration.value) * 100)
    }
    return Math.ceil((currentTime.value / (startTime.value + duration.value)) * 100)
  })

  /** life hook */
  watch(curUrl, () => {
    audioRef.value.currentTime = startTime.value
  })

  watch(audioRef, (newRef) => {
    console.log('new Audio=>', newRef)
  })

  watchEffect(() => {
    //如果当前是非单词,重置当前时间跟开始时间一致
    if (
      audioRef.value &&
      playType.value !== playTypeCode.WORD &&
      currentTime.value === 0
    ) {
      store.commit('player/setCurrentTime', startTime.value)
    }
  })

  onMounted(() => {
    controller.hooks.playAudio.tap('playAudio', ({ stepType }) => {
      step.value = stepType
      setStepType(step.value)
      if (audioRef.value) {
        audioRef.value.src = curUrl.value
        audioRef.value.currentTime = startTime.value
        setTimeout(() => audioRef.value.play(), 300)
      }
    })
    controller.hooks.pauseAudio.tap('pauseAudio', () => {
      if (audioRef.value) {
        audioRef.value.pause()
      }
    })

    lottie.loadAnimation({
      container: animationRef.value, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: resourceUrl + '/animation/voice-wave/data.json' // the path to the animation json
    })
  })

  onUnmounted(() => {
    console.log('unMounted=>', audioRef.value)
  })
  /** event func */
  function onEnded() {
    audioRef.value.currentTime = 0
    if (step.value === 'playsystem') {
      setTimeout(() => {
        playEvent.value.emit('playsystemend')
      }, 300)
    } else if (step.value === 'followsystem') {
      setTimeout(() => {
        playEvent.value.emit('followsystemend')
      }, 300)
    }
  }

  function onPlayAgain() {
    playEvent.value.emit('playagain')
  }

  function onRestart() {
    playEvent.value.emit('restart')
  }

  function onTimeUpdate() {
    /** 更新当前时间 */
    if (audioRef.value) store.commit('player/setCurrentTime', audioRef.value.currentTime)
    if (
      playType.value !== playTypeCode.WORD &&
      audioRef.value.currentTime > endTime.value
    ) {
      audioRef.value.pause()
      audioRef.value.currentTime = 0
      if (step.value === 'playsystem') {
        setTimeout(() => {
          playEvent.value.emit('playsystemend')
        }, 300)
      } else if (step.value === 'followsystem') {
        setTimeout(() => {
          playEvent.value.emit('followsystemend')
        }, 300)
      }
    }
  }

  function onDurationchange() {
    if (playType.value !== playTypeCode.WORD) {
      duration.value = curContent.value.duration / 1000
    } else {
      duration.value = audioRef.value.duration
    }
  }

  function onCanPlay() {
    console.log('onCanPlay')
  }

  return {
    audioRef,
    animationRef,
    img,
    text,
    percentage,
    mediaType,
    curUrl,
    currentTime,
    step,
    playbackRate,
    onEnded,
    onPlayAgain,
    onRestart,
    onTimeUpdate,
    onDurationchange,
    onCanPlay
  }
}
