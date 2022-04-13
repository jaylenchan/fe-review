function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue', 'yellow']
}

SuperType.prototype.say = function () {
  console.log('superType', this.name)
}

function SubType(name, age) {
  // 第一次调用SuperType是为了让SubType实例继承Super Type写的属性
  SuperType.call(this, name)
  this.age = age
}

/**
 * subInstance -> SubType.prototype -> SuperType.prototype -> Object.prototype -> null
 */

/** 第二次调用SubType是为了让SubType.prototype拥有__proto__扩展原型链 */
SubType.prototype = new SubType()
SubType.prototype.constructor = SubType

SubType.prototype.say = function () {
  console.log('subType', this.name)
}

const subInstance1 = new SubType('jaylen')
console.log(subInstance1.name)
subInstance1.colors.push('black')

const subInstance2 = new SubType('ashley')
console.log(subInstance2.name)
console.log(subInstance2.colors)
