export default function bindPlaySystemend(controller) {
  controller.hooks.playsystemend('', () => {
    this.followSystem()
  })
}
