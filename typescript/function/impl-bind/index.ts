type IContext = {
  [key: string]: any
}

export default function mockBind(this: Function, context: IContext, ...args: any[]) {
  const fnToBind = this
  const outSideArgs = args
  const bound: Function = function (this: any, ...args: any[]) {
    if (this instanceof bound) {
      return new (fnToBind as any)(...outSideArgs, ...args)
    }
    return fnToBind.apply(context, outSideArgs.concat(args))
  }

  return bound
}
