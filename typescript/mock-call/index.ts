type IContext = {
  [prop: string]: any
}

export default function mockCall(context: IContext, ...args: any[]) {
  // @ts-ignore
  context['fn'] = this
  return context!['fn'](...args)
  delete context!['fn']
}
