class Observer {
  constructor(data) {
    this.observe(data)
  }

  /** 将data中的属性一一改成getter和setter属性 */
  observe(data) {
    if (typeof data !== 'object' || !data) return
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(data, key, value) {
    const self = this
    // 每个变化的数据属性都会对音一个数组，这个数组可以存放很多watcher
    const dep = new Dep()
    /** 劫持 */
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newVal) {
        if (newVal !== value) {
            self.observe(newVal)
          value = newVal
          dep.notify() // 通知所有wacther去执行update
        }
      }
    })
    /** 深度递归劫持 */
    this.observe(value)
  }
}
