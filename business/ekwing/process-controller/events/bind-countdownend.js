export default function bindCountdownend(controller) {
  controller.hooks.countdownend.tap('', () => {
    this.hideCountDown()
    this.initPlayer()
    this.showListenIcon()
    this.playSystem()
  })
}
