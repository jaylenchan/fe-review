import usePlayerStore from './store/use-player-store'

export default function useController() {
  const {
    playlist,
    playEvent,
    setGuidConf,
    setShowCountDown,
    setMediaType,
    setCurIndex,
    setCurContent,
    setCurUrl
  } = usePlayerStore()

  /** 展示指引 */
  function showGuid({ emitType = 'system' } = {}) {
    setGuidConf({
      showGuid: true,
      emitType
    })
  }

  /** 隐藏指引 */
  function hideGuid({ emitType = 'system' } = {}) {
    setGuidConf({
      showGuid: false,
      emitType
    })
  }

  /** 展示倒计时 */
  function showCountDown() {
    setShowCountDown(true)
  }

  /** 隐藏倒计时 */
  function hideCountDown() {
    setShowCountDown(false)
  }

  /** 展示“听”的图案 */
  function showListenIcon() {
    setMediaType('listen')
  }

  /** 展示”读“的图案 */
  function showReadIcon() {
    setMediaType('read')
  }

  /** 展示”再读一次“的图案 */
  function showAgainButton() {
    setMediaType('again')
  }

  /** 展示”重新开始“的图案 */
  function showRestartButton() {
    setMediaType('restart')
  }

  /** 播放音频 */
  function playAudio({ stepType = 'playsystem' } = {}) {
    playEvent.value.emit('playAudio', { stepType })
  }

  /** 设置资源 */
  function setResource(curIndex) {
    showListenIcon()
    setCurIndex(curIndex)
    setCurContent(playlist.value[curIndex].content)
    setCurUrl(playlist.value[curIndex].url + `#${JSON.stringify(new Date())}`)
  }

  return {
    showGuid,
    hideGuid,
    showCountDown,
    hideCountDown,
    showListenIcon,
    showReadIcon,
    showAgainButton,
    showRestartButton,
    playAudio,
    setResource
  }
}
