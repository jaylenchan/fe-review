export default function mockApply(
  this: (...arg: any[]) => any,
  context: Record<string, any>,
  arr: any[]
) {
  context['fn'] = this
  const result = context['fn'](...arr)
  Reflect.deleteProperty(context, 'fn')
  return result
}
