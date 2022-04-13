class Vue {
  constructor(options) {
    /** 初始化，先将options当中的所有数据绑定到实例上，方便之后使用 */
    const { el, data } = options
    this.$el = el
    this.$data = data

    /** 判断是否有需要编译的模板，然后开始编译
     * 这里的el其实就是给指定了一个模板，为了给vue编译的
     */
    if (this.$el) {
      /**
       * 数据劫持，使用Object.defineProperty将数据的属性改成set和get
       */
      new Observer(this.$data)
      /**
       * 用数据和元素进行编译
       *
       */
      this.proxyData(this.$data)
      new Compile(this.$el /** 哪个模板 */, this /** 为了方便用，直接传入整个vue */)
    }
  }

  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newVal) {
          if (newVal !== data[key]) {
            data[key] = newVal
          }
        }
      })
    })
  }
}
