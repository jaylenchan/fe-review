import { playMode, playTypeCode } from '../config/player'
import EventEmitter from '@/utils/EventEmitter'

const playerState = {
  guidConf: {
    showGuid: false,
    emitType: 'system'
  },
  showCountDown: false,
  mediaType: 'listen',
  curIndex: 0,
  playMode: playMode.AUTO,
  helpClick: false,
  followStart: false,
  firstOpenFollow: 0,
  playEvent: new EventEmitter(),
  curContent: {},
  curUrl: '',
  playlist: null,
  // 是否是最后一个音频播放完毕
  isLastEnd: false,
  playType: playTypeCode.WORD,
  currentTime: 0,
  stepType: 'playsystem'
}

export default playerState
