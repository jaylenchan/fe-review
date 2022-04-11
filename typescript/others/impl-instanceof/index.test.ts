import mockInstanceof from './index'

describe('mock instanceof', () => {
  test('Array instanceof Object is true, because Array.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototype ', () => {
    expect(mockInstanceof(Array, Object)).toBe(true)
  })

  test('Object intanceof Object true, becuase Object.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototype ', () => {
    expect(mockInstanceof(Object, Object)).toBe(true)
  })

  test('Function instanceof Function is true, because Function.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototye', () => {
    expect(mockInstanceof(Function, Function)).toBe(true)
  })

  test('Function instanceof Object is true, because Function.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototype', () => {
    expect(mockInstanceof(Function, Object)).toBe(true)
  })

  test('arr instanceof Object is true, because arr.__proto__ === Array.prototype, Array.prototype.__proto__ === Object.prototype', () => {
    const arr = new Array()
    expect(mockInstanceof(arr, Object)).toBe(true)
  })

  test('fn instanceOf Object  is true , because fn.__proto__ === Function.prototype, Function.prototype.__proto__ === Object.prototype', () => {
    const fn = new Function()
    expect(mockInstanceof(fn, Object)).toBe(true)
  })

  test.skip('Object.prototype instanceof null throw error, because null can not be a constructor! ', () => {})
})
