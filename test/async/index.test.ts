import { fetchData, fetchError } from './index'

describe('async test', () => {
  test('fetchData 应该正确获取数据', async () => {
    const data = await fetchData()
    expect(data).toEqual({
      success: true
    })
  })

  test('fetchError 应该抛出错误', async () => {
    try {
      await fetchError()
    } catch (err: any) {
      expect(err.toString()).toBe('Error: Request failed with status code 404')
    }
  })
})
