import curring from './index'

describe('curring', () => {
  function add(a: number, b: number, c: number) {
    return a + b + c
  }

  test('test curring', () => {
    const curringAdd = curring(add)
    const sum = curringAdd(1)(2)(3)

    expect(sum).toBe(6)
  })

  test('传入的参数不够的时候应该得到一个函数', () => {
    const curringAdd = curring(add)
    const addFunc = curringAdd(1)
    expect(typeof addFunc).toBe('function')
  })
})
