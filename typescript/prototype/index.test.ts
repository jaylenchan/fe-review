import { __proto__ } from './index'

// Object.prototype不知道是谁构造出来的，Object.prototype的原型是null
describe('JS万物皆对象，有两种对象：函数对象和普通对象。原型链的顶端是null', () => {
  test('Object.prototype.__proto__ is null', () => {
    expect(__proto__(Object.prototype)).toBe(null)
  })
})

describe('所有函数实例的原型都是Function.prototype', () => {
  // Function构造了Object函数，因此Object的原型是Function.prototype
  test('Object.__proto__ is Function.prototype', () => {
    expect(__proto__(Object)).toBe(Function.prototype)
  })

  // Function构造了Array函数，因此Array的原型是Function.prototype
  test('Array.__proto__ is Function.prototype', () => {
    expect(__proto__(Array)).toBe(Function.prototype)
  })

  // Function可以看作自己构造了自己的实例，因此它的原型也是Function.prototype
  test('Function.__proto is Function.prototype', () => {
    expect(__proto__(Function)).toBe(Function.prototype)
  })
})

describe('Object函数相关情况', () => {
  test('Object作为构造函数，Object的实例的原型是Object.prototype,因为Object实例是由Object创造出来的', () => {
    expect(__proto__(new Object())).toBe(Object.prototype)
  })

  test('Object自己作为实例，Object.__proto__是Function.prototype，因为Object是由Function创造出来的', () => {
    expect(__proto__(Object)).toBe(Function.prototype)
  })
})

describe('Array函数相关情况', () => {
  test('Array作为构造函数，Array的实例的原型是Array.prototype，因为Array实例是由Array构造出来的', () => {
    expect(__proto__(new Array())).toBe(Array.prototype)
  })

  test('Array自己作为实例，Array.__proto__是Function.prototype，因为Array是由Function创造出来的', () => {
    expect(__proto__(Array)).toBe(Function.prototype)
  })
})

describe('prototype对象相关情况', () => {
  test('普通函数的protoype对象(Array.prototype)的__proto__是Object.prototype', () => {
    expect(__proto__(Array.prototype)).toBe(Object.prototype)
  })

  test('Function函数的prototype对象的__proto__是Object.prototype', () => {
    expect(__proto__(Function.prototype)).toBe(Object.prototype)
  })

  test('Object函数的prototype对象(Object.prototype)的__proto__是null', () => {
    expect(__proto__(Object.prototype)).toBe(null)
  })
})
