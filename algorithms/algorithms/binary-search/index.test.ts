import binarySearch from '.'

describe('binary search', () => {
  const testCase = [3, 5, 19, 22, 25, 33, 45, 47, 57, 66, 71, 78]

  test('search 88 index: -1', () => {
    const result = binarySearch(testCase, 88)
    expect(result).toBe(-1)
  })

  test('search 68 index: -1', () => {
    const result = binarySearch(testCase, 68)
    expect(result).toBe(-1)
  })

  test('search 22 index: 3', () => {
    const result = binarySearch(testCase, 22)
    expect(result).toBe(3)
  })
})
