import { playMode, playTypeCode } from '../config/player'

const playerGetters = {
  isLast: (state) => state.curIndex + 1 === state.playlist?.length,
  isAutoPlay: (state) => state.playMode === playMode.AUTO,
  isManualyPlay: (state) => state.playMode === playMode.MANUALY,
  isNotWordType: (state) => state.playType !== playTypeCode.WORD,
  isFirstContent: (state) => state.curIndex === 0,
  isShowGuide: (state) => (state.firstOpenFollow - 1) & 1 // 利用位运算来判断是否展示提示，计算值为0则不展示
}

export default playerGetters
