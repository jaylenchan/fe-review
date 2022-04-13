function SuperType() {
  this.colors = ['red', 'blue', 'yellow']
}
function SubType() {}

/** 实现继承
 * subType_instance -> SubType.prototype -> SuperType.prototype  -> Object.prototype -> null
 */
SubType.prototype = new SuperType() // 提供__proto__给SubType.prototype访问SuperType.prototype

/**
 * 原型继承 - 弊端
 */
const subInstance1 = new SubType()

subInstance1.colors.push('black')

/** 影响到2的实例了 */
const subInstance2 = new SubType()
console.log('subInstance2', subInstance2.colors)
