import { runCallback, forEach } from './index'

describe('mock function', () => {
  test('runCallback的参数callback是一个函数，它应该在runCallback函数里头被调用', () => {
    const callback = jest.fn()
    runCallback(callback)

    expect(callback).toBeCalled()
  })

  test('callback应该被调用3次', () => {
    const callback = jest.fn()

    forEach(['one', 'two', 'three'], callback)

    expect(callback.mock.calls.length).toBe(3)
  })

  test('callback.mock.calls应该是：[ [ "one", 0 ],[ "two", 1 ],[ "three", 2 ]]', () => {
    const callback = jest.fn()

    forEach(['one', 'two', 'three'], callback)

    expect(callback.mock.calls[0]).toEqual(['one', 0])
    expect(callback.mock.calls[1]).toEqual(['two', 1])
    expect(callback.mock.calls[2]).toEqual(['three', 2])
  })

  test('callback.mock.results应该是 [{ type: "return", value: "one-0" },{ type: "return", value: "two-1" },{ type: "return", value: "three-2" }]', () => {
    const callback = jest.fn((value, index) => {
      console.log(`${value}-${index}`)
      return `${value}-${index}`
    })

    forEach(['one', 'two', 'three'], callback)

    expect(callback.mock.results[0]).toMatchObject({
      value: 'one-0'
    })
    expect(callback.mock.results[1]).toMatchObject({
      value: 'two-1'
    })
    expect(callback.mock.results[2]).toMatchObject({
      value: 'three-2'
    })
  })
})
