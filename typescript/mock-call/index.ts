type IContext = {
  [prop: string]: any
}

export default function mockCall(
  this: (...arg: any[]) => any,
  context: IContext,
  ...args: any[]
) {
  context['fn'] = this
  const result = context!['fn'](...args)
  Reflect.deleteProperty(context, 'fn')
  return result
}
