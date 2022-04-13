import factory from './syncHookCodeFactory'

export default class SyncHook implements IHook {
  public args: Array<string>
  public taps: Array<ITap>
  public _x: Array<(...args: any[]) => any>

  public constructor(args: Array<string>) {
    this.args = args
    this.taps = []
    this._x = []
  }

  public tap(name: string, handler: (...args: any[]) => any) {
    const item = {
      name,
      handler
    }
    this._insert(item)
  }

  public _insert(item: ITap) {
    this.taps.push(item)
  }

  public call(...args: Array<any>) {
    const _call = this.createCall()
    _call.apply(this, args)
  }

  private createCall(): Function {
    return this.compile({
      taps: this.taps,
      args: this.args
    })
  }

  private compile(options: ICompileOptions): Function {
    factory.setup(this, options)
    return factory.create(options)
  }
}
