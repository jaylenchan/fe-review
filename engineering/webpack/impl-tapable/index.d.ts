declare type Expand<T> = T extends infer O ? { [key in keyof O]: O[key] } : never

declare type ITap = Expand<{
  name: string
  handler: (...args: any[]) => any
}>

declare type IHook = Expand<{
  args: Array<string>
  taps: Array<ITap>
  _x: Array<(...args: any[]) => any>

  tap(name: string, handler: (...args: any[]) => any): void
  _insert(item: ITap): void
  call(...args: Array<any>): void
}>

declare type ICallFunction = (...args: Array<any>) => void

declare type ICompileOptions = Expand<{
  taps: Array<ITap>
  args: Array<string>
}>

declare interface IHookCodeFactory {
  setup(instance: IHook, options: ICompileOptions): void
  create(options: ICompileOptions): void
  args(): string
  header(): string
  content(): string
}
