import { timer } from './'

describe('mock time', () => {
  test('jest.runAllTimers', () => {
    jest.useFakeTimers() // 必须在顶层调用useFakeTimers
    const callback = jest.fn()
    timer(callback)

    jest.runAllTimers()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('jest.advanceTimersByTime', () => {
    const callback = jest.fn()
    timer(callback)

    jest.advanceTimersByTime(3000) // 这个多次调用的话会从上一个快进的基础继续，所以可以使用hooks每次都重新useFakeTimers
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
