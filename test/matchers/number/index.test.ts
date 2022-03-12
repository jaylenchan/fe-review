describe('number matchers', () => {
  test('toBe | toEqual：count应该等于1', () => {
    const count = 1

    expect(count).toBe(1)
    expect(count).toEqual(1)
  })

  test('toBeGreaterThan：count应该大于1', () => {
    const count = 2

    expect(count).toBeGreaterThan(1)
  })

  test('toBeGreaterThanOrEqual：count应该大于等于1', () => {
    const count = 2

    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('toBeLessThan：count应该小于1', () => {
    const count = 0

    expect(count).toBeLessThan(1)
  })

  test('toBeLessThanOrEqual：count应该小于等于1', () => {
    const count = 1

    expect(count).toBeLessThanOrEqual(1)
  })

  test('toBeCloseTo： count1 + count2 应该接近0.3', () => {
    const count1 = 0.1
    const count2 = 0.2

    expect(count1 + count2).toBeCloseTo(0.3)
  })
})
