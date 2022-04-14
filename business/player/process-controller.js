import usePlayerStore from './store/use-player-store'
import useController from './use-controller'
import { playMode as playModeConfig } from './config/player'
import teacherService from '@/packages/course/services/teacher'

/** Player中央控制器 */
export default class ProcessController {
  constructor() {
    // debugger
    const {
      guidConf,
      curIndex,
      playlist,
      playEvent,
      playMode,
      helpClick,
      firstOpenFollow,
      isLast,
      isLastEnd,
      isAutoPlay,
      isManualyPlay,
      setFirstOpenFollow,
      setIsLastEnd
    } = usePlayerStore()

    const {
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
    } = useController()

    this.playlist = playlist
    this.guidConf = guidConf
    this.playEvent = playEvent
    this.playMode = playMode
    this.curIndex = curIndex
    this.helpClick = helpClick
    this.isLast = isLast
    this.isLastEnd = isLastEnd
    this.isAutoPlay = isAutoPlay
    this.isManualyPlay = isManualyPlay
    this.firstOpenFollow = firstOpenFollow

    this.setFirstOpenFollow = setFirstOpenFollow
    this.showGuid = showGuid
    this.hideGuid = hideGuid
    this.showCountDown = showCountDown
    this.hideCountDown = hideCountDown
    this.showListenIcon = showListenIcon
    this.showReadIcon = showReadIcon
    this.showAgainButton = showAgainButton
    this.showRestartButton = showRestartButton
    this.playAudio = playAudio
    this.setResource = setResource
    this.setIsLastEnd = setIsLastEnd
  }

  /** 初始化控制器 */
  init() {
    this.watchEvent()
    this.runProcess()
  }

  /** 监听相关事件 */
  watchEvent() {
    const playEvent = this.playEvent.value

    playEvent.on('guidend', async () => {
      let flollwTipState = this.firstOpenFollow.value
      if (this.guidConf.emitType === 'user') {
        this.hideGuid({ emitType: 'user' })
      } else {
        this.hideGuid()
      }
      // 自动跟读 且第一次出现提示
      if (this.playMode.value === playModeConfig.AUTO && flollwTipState === 0) {
        flollwTipState = 1
        await teacherService.reportFollow(1)
        // 手动跟读 且第一次出现提示
      } else if (this.playMode.value !== playModeConfig.AUTO && [0, 1].includes(flollwTipState)) {
        flollwTipState = 3
        await teacherService.reportFollow(2)
      }
      this.setFirstOpenFollow(flollwTipState)
      // 自动跟读才出现倒计时
      if (!this.helpClick.value && flollwTipState === 1) {
        this.showCountDown()
      }
    })

    playEvent.on('countdownend', () => {
      this.hideCountDown()
      this.initPlayer()
      this.showListenIcon()
      this.playSystem()
    })

    playEvent.on('playsystemend', () => {
      this.followSystem()
    })

    playEvent.on('followsystemend', () => {

      if (this.isManualyPlay.value || this.isAutoPlay.value) {
        if (this.isLast.value) {
          this.setIsLastEnd(true)
          return this.showRestartButton()
        }

        this.setIsLastEnd(false)

        if (this.isManualyPlay.value) {
          return this.showAgainButton()
        } else {
          this.playNext()
        }
      } else {
        throw new Error('跟读模式（自动跟读 ｜ 手动跟读）检测不到！')
      }

      /* if (this.isManualyPlay.value) {
        if (this.isLast.value) {
          return this.showRestartButton()
        } else {
          return this.showAgainButton()
        }
      } else if (this.isAutoPlay.value) {
        if (this.isLast.value) {
          return this.showRestartButton()
        }
        this.playNext()
      } else {
        throw new Error('跟读模式（自动跟读 ｜ 手动跟读）检测不到！')
      } */
    })

    playEvent.on('playagain', () => {
      this.playSystem()
    })

    playEvent.on('restart', () => {
      this.restart()
    })
  }

  /** 启动流程 */
  runProcess() {
    this.initPlayer()
    if (this.firstOpenFollow.value === 0) {
      
    } else {
      this.showCountDown()
    }
  }

  /** 重置系统播放 */
  initPlayer() {
    const FIRST_RESOURCE = 0
    console.log('重新播放')
    this.setIsLastEnd(false)
    this.setResource(FIRST_RESOURCE)
  }

  /** 开始播放 */
  playSystem() {
    this.showListenIcon()
    this.playAudio()
  }

  /** 跟读播放 */
  followSystem() {
    this.showReadIcon()
    this.playAudio({ stepType: 'followsystem' })
  }

  /** 播放下一个 */
  playNext() {
    // debugger
    const NEXT_RESOURCE = this.curIndex.value + 1
    this.setResource(NEXT_RESOURCE)
    this.playSystem()
  }

  /** 重新开始 */
  restart() {
    this.initPlayer()
    this.playSystem()
  }
}
