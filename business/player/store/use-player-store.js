import { useStore } from 'vuex'
import { computed } from 'vue'

export default function usePlayerStore() {
  const store = useStore()

  /** state */
  const playerState = computed(() => store.state.player)
  const state = {
    guidConf: computed(() => playerState.value.guidConf) /** 用户指引控制数据 */,
    showCountDown: computed(() => playerState.value.showCountDown) /** 倒计时控制数据 */,
    mediaType: computed(() => playerState.value.mediaType) /** 媒体播放类型 */,
    curIndex: computed(() => playerState.value.curIndex) /** 当前播放内容索引 */,
    curContent: computed(() => playerState.value.curContent) /** 当前播放内容 */,
    curUrl: computed(() => playerState.value.curUrl) /** 当前播放audio url */,
    playlist: computed(() => playerState.value.playlist) /** 播放列表 */,
    playEvent: computed(() => playerState.value.playEvent) /** 播放发布订阅对象 */,
    playMode: computed(() => playerState.value.playMode) /** 播放模式 */,
    playType: computed(() => playerState.value.playType) /** 播放资源类型 */,
    helpClick: computed(() => playerState.value.helpClick) /** 是不是点击了使用帮助 */,
    firstOpenFollow: computed(() => playerState.value.firstOpenFollow), /** 是不是第一次打开跟读功能 */
    isLastEnd: computed(() => playerState.value.isLastEnd)
  }

  /** getters */
  const getters = {
    isLast: computed(() => store.getters['player/isLast']),
    isAutoPlay: computed(() => store.getters['player/isAutoPlay']),
    isManualyPlay: computed(() => store.getters['player/isManualyPlay']),
    isNotWordType: computed(() => store.getters['player/isNotWordType']),
    isFirstContent: computed(() => store.getters['player/isFirstContent']),
    isShowGuide: computed(() => store.getters['player/isShowGuide'])
  }

  const mutations = {
    setGuidConf: (guidConf) => store.commit('player/setGuidConf', guidConf),
    setShowCountDown: (showCountDown) => store.commit('player/setShowCountDown', showCountDown),
    setMediaType: (mediaType) => store.commit('player/setMediaType', mediaType),
    setCurIndex: (curIndex) => store.commit('player/setCurIndex', curIndex),
    setCurContent: (curContent) => store.commit('player/setCurContent', curContent),
    setCurUrl: (curUrl) => store.commit('player/setCurUrl', curUrl),
    setCurrentTime: (currentTime) => store.commit('player/setCurrentTime', currentTime),
    setPlaylist: (playlist) => store.commit('player/setPlaylist', playlist),
    setPlayMode: (playMode) => store.commit('player/setPlayMode', playMode),
    setPlayType: (playType) => store.commit('player/setPlayType', playType),
    setHelpClick: (helpClick) => store.commit('player/setHelpClick', helpClick),
    setFirstOpenFollow: (firstOpenFollow) => store.commit('player/setFirstOpenFollow', firstOpenFollow),
    setStepType: (stepType) => store.commit('player/setStepType', stepType),
    setIsLastEnd: (isLastEnd) => store.commit('player/setIsLastEnd', isLastEnd),
  }

  return {
    store,
    ...state,
    ...getters,
    ...mutations
  }
}
