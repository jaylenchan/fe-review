export default function bindFollowsystemend(controller) {
  controller.hooks.followsystemend.tap('', () => {
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
}
