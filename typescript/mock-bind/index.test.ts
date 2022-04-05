import mockBind from './index'

describe('mock bind', () => {
  function Person(this: any, a: number, b: number) {
    return a + b + this.a + this.b
  }

  Person.mockBind = mockBind
  test('normal invoke', () => {
    const a = Person.mockBind({ a: 3, b: 4 }, 1, 2)
    expect(a()).toBe(10)
  })

  test('new invoke', () => {
    const A = Person.mockBind({ a: 3, b: 4 }, 1, 2)
    expect(new (A as new (...args: any[]) => any)() instanceof Person).toBe(true)
  })
})
