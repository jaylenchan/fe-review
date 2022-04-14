const { SyncHook } = require('tapable')
const bindGuide = require('./events/bind-guide')
const bindGuidend = require('./events/bind-guidend')
const bindCountdownend = require('./events/bindCountdownend')
const bindPlaySystemend = require('./events/bind-playsystemend')
const bindFollowsystemend = require('./events/bind-followsystemend')
const bindPlayagain = require('./events/bind-playagain')
const bindRestart = require('./events/bind-restart')

class ProcessController {
  constructor(events) {
    this.hooks = {
      beforeGuide: new SyncHook(),
      guide: new SyncHook(),
      guideEnd: new SyncHook(),
      beforeCountdown: new SyncHook(),
      countDown: new SyncHook(),
      countdownEnd: new SyncHook(),
      beforePlaySystem: new SyncHook(),
      playSystem: new SyncHook(),
      playSytemEnd: new SyncHook(),
      beforeFollow: new SyncHook(),
      follow: new SyncHook(),
      followEnd: new SyncHook(),
      beforeRestart: new SyncHook(),
      restart: new SyncHook(),
      restartEnd: new SyncHook(),
      playAudio: new SyncHook(),
      pauseAudio: new SyncHook()
    }
    events.forEach((event) => event(this))
  }

  init() {
    this.runProcess()
  }
  runProcess() {
    if (this.firstOpenFollow.value === 0) {
      this.hooks.beforeGuide.call()
      this.hooks.guide.call()
    } else {
      this.showCountDown()
    }

    this.hooks.guideEnd.call()
    this.hooks.beforeCountdown.call()
    this.hooks.countDown.call()
    this.hooks.countdownEnd.call()
    this.hooks.beforePlaySystem.call()
    this.hooks.playSystem.call()
    this.hooks.playSytemEnd.call()
    this.hooks.beforeFollow.call()
    this.hooks.follow.call()
    this.hooks.followEnd.call()
    this.hooks.beforeRestart.call()
    this.hooks.restart.call()
    this.hooks.restartEnd.call()
  }
}

const processController = new ProcessController([
  bindGuide,
  bindGuidend,
  bindCountdownend,
  bindPlaySystemend,
  bindFollowsystemend,
  bindPlayagain,
  bindRestart
])

export default processController
