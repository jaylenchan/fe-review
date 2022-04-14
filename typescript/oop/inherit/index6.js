/**
 寄生组合式继承 = 原型继承+构造函数借用
 instance -> SubType.prototype -> SuperType.prototype -> Object.prototype -> null
 */
function inheritPrototype(subType, superType) {
  /** 完全重写subType.prototype */
  subType.prototype = Object.create(superType)
  subType.prototype.constructor = subType
}

function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.say = function () {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

/**
 * subInstance -> subType.prototype -> superType.prototype
 */
inheritPrototype(SubType, SuperType)

SubType.prototype.sayAge = function () {
  console.log(this.age)
}

var instance1 = new SubType('jaylen', 23)
var instance2 = new SubType('ashley', 24)

instance1.colors.push('2') // ["red", "blue", "green", "2"]
instance1.colors.push('3') // ["red", "blue", "green", "3"]

console.log(instance1)
console.log(instance2)
