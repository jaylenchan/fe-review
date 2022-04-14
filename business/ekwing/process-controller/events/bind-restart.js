export default function bindRestart(controller) {
  controller.hooks.restart.tap('', () => {
    this.restart()
  })
}
