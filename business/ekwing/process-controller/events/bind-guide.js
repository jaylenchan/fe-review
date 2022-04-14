export default function bindGuide(controller) {
  controller.hooks.guid.tap('', () => {
    this.showGuid()
  })
}
