function SuperType() {
  this.colors = ['red', 'blue', 'yellow']
  this.func = function () {
    console.log('无法实现方法复用')
  }
}

function SubType() {
  SuperType.call(this)
}

/**
 * subInstance1 -> SubType.prototype -> Object.prototype -> null
 */
const subInstance1 = new SubType()
subInstance1.colors.push('black')

const subInstance2 = new SubType()
console.log('subInstance2', subInstance2.colors)

/**
 * 弊端：
 * 1. 只能继承父类的实例属性和方法，不能继承原型属性/方法
 * 2. 无法实现复用，每个子类都有父类实例函数的副本，影响性能
 */
