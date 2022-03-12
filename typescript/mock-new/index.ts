function setProto(obj: Record<string, any>, objProto: Record<string, any> | null) {
  Reflect.setPrototypeOf(obj, objProto)
}

export default function mockNew(
  objConstructor: any,
  ...args: any[]
): Record<string, any> {
  /**
   * 目标：
   * 生成的新对象要能够访问objConstructor中写的this.xxx中的xxx属性
   * 生成的新对象要能够访问objConstructor.prototype.bbb中的bbb属性
   * 返回判断：
   * 如果是对象实例直接显示返回， 否则返回obj
   */
  const obj = new Object()
  // 生成的新对象要能够访问objConstructor中写的this.xxx中的xxx属性
  const result = objConstructor.call(obj, ...args)
  // 生成的新对象要能够访问objConstructor.prototype.bbb中的bbb属性
  setProto(obj, objConstructor.prototype)
  // 如果是对象实例直接显示返回， 否则返回obj
  return result instanceof Object ? result : obj
}
