class SyncHookCodeFactory implements IHookCodeFactory {
  public options: ICompileOptions = {
    taps: [],
    args: []
  }

  setup(instance: IHook, options: ICompileOptions) {
    options.taps.forEach(({ handler }) => {
      instance._x.push(handler)
    })
  }

  create(options: ICompileOptions) {
    this.options = options
    return new Function(this.args(), this.header() + this.content())
  }

  args() {
    return this.options.args.join(',')
  }

  header() {
    return `var _x = this._x;`
  }

  content() {
    const handlers = this.options.taps.map((_tap, index) => {
      return `
        var _fn${index} = _x[${index}];\n
        _fn${index}(${this.args()});\n
      `
    })
    return handlers.join('')
  }
}

export default new SyncHookCodeFactory()
