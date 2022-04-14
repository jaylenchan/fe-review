const playerMutations = {
  setGuidConf(state, guidConf) {
    state.guidConf = guidConf
  },
  setMediaType(state, mediaType) {
    state.mediaType = mediaType
  },
  setShowGuid(state, showGuid) {
    state.showGuid = showGuid
  },
  setCurIndex(state, curIndex) {
    state.curIndex = curIndex
  },
  setPlayMode(state, playMode) {
    state.playMode = playMode
  },
  setShowCountDown(state, showCountDown) {
    state.showCountDown = showCountDown
  },
  setHelpClick(state, helpClick) {
    state.helpClick = helpClick
  },
  setFollowStart(state, followStart) {
    state.followStart = followStart
  },
  setFirstOpenFollow(state, firstOpenFollow) {
    state.firstOpenFollow = firstOpenFollow
  },
  setCurContent(state, curContent) {
    state.curContent = curContent
  },
  setCurUrl(state, curUrl) {
    state.curUrl = curUrl
  },
  setPlaylist(state, playlist) {
    state.playlist = playlist
  },
  setPlayType(state, playType) {
    state.playType = playType
  },
  setCurrentTime(state, currentTime) {
    state.currentTime = currentTime
  },
  setStepType(state, stepType) {
    state.stepType = stepType
  },
  setIsLastEnd(state, isLastEnd) {
    state.isLastEnd = isLastEnd
  }
}

export default playerMutations
