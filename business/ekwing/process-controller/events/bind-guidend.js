export default function bindGuidend(controller) {
  controller.hooks.guidend.tap('', async () => {
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
    } else if (
      this.playMode.value !== playModeConfig.AUTO &&
      [0, 1].includes(flollwTipState)
    ) {
      flollwTipState = 3
      await teacherService.reportFollow(2)
    }
    this.setFirstOpenFollow(flollwTipState)
    // 自动跟读才出现倒计时
    if (!this.helpClick.value && flollwTipState === 1) {
      this.showCountDown()
    }
  })
}
