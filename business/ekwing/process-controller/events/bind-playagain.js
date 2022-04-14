export default function bindPlayAgain(controller) {
  controller.hooks.playagain.tap('', () => {
    this.playSystem()
  })
}
