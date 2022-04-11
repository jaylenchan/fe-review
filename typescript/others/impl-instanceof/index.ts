// 获取某个实例的prototype
function __proto__(obj: any) {
  return Reflect.getPrototypeOf(obj)
}

export default function mockInstanceof(obj: any, objConstructor: any): boolean {
  // 目的：通过不断的拿obj的__proto__，判断objConstructor.prototype是不是最终在obj的原型链上
  if (objConstructor === null) throw new Error('null can not be a constructor!')

  const target = objConstructor.prototype
  let curParent = __proto__(obj)

  while (true) {
    if (curParent === null) return false
    if (curParent === target) return true
    curParent = __proto__(curParent)
  }
}
