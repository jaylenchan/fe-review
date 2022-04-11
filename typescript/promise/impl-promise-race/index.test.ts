import MyPromise from './index'

describe('', () => {
  test('', () => {
    const promise1 = new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve('成功')
      }, 1000)
    })
    const promise2 = new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject('失败')
      }, 1000)
    })

    return MyPromise.race([promise1, promise2])
      .then((data: any) => {
        expect(data).toBe('成功')
      })
      .catch((err: any) => {
        expect(err).toBe('失败')
      })
  })
})
