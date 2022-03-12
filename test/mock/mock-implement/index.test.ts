jest.mock('./index')
import { fetchData } from './index'

describe('mock implement', () => {
  test('使用__mocks__+jest.mock(./index)替换./index中的fetchData的实现，因此返回值应该是{name: "jaylen"}', async () => {
    const data = await fetchData()
    expect(data).toMatchObject({
      name: 'jaylen'
    })
  })
})

describe('use actual', () => {
  const { useActual } = jest.requireActual('./index')

  test('useActual调用后返回值应该是"Actual"', () => {
    expect(useActual()).toBe('Actual')
  })
})
