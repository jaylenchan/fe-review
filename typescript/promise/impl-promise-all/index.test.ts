import MyPromise from './index'

describe('impl Promise.all', () => {
  test('全部成功，整个才会成功', async () => {
    const p1 = new Promise((res) => {
      setTimeout(() => {
        res('成功')
      }, 1000)
    })
    /** 请求成功就会把请求的结果按照请求的顺序放入一个数组中 */
    /**data是一个数组 */
    try {
      const data = await MyPromise.all([1, 2, 3, p1])
      expect(data).toEqual([1, 2, 3, '成功'])
    } catch (err) {
      console.log('err =>', err)
    }
  })

  // TODO: 如何测试Promise.all失败的情况
  // test('有一个失败，则整个就失败', async () => {
  //   expect.assertions(1)

  //   const p1 = new Promise((_, rej) => {
  //     setTimeout(() => {
  //       rej('失败')
  //     }, 1000)
  //   })

  //   return MyPromise.all([1, 2, 3, p1]).catch((err: any) => {
  //     console.log('err', err)
  //     expect(err).toMatch('失败')
  //   })
  // })
})
