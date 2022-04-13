function inheritPrototype(subType, superType) {
  const prototype = Object.create(superType)
  prototype.constructor = subType
  /** 完全重写subType.prototype */
  subType.prototype = prototype
  /**
   * subInstance -> subType.prototype -> superType.prototype
   */
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
