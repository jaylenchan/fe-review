import stringify from '.'

describe('strinify', () => {
  test('', () => {
    const testCase = {
      input: [1, 2, [3, 4, 5]],
      output: '[ 1 2 [ 3 4 5 ] ]'
    }
    expect(stringify(testCase.input)).toBe(testCase.output)
  })

  test('', () => {
    const testCase = {
      input: [79, [[88, 98], 99]],
      output: '[ 79 [ [ 88 98 ] 99 ] ]'
    }
    expect(stringify(testCase.input)).toBe(testCase.output)
  })

  test('', () => {
    const testCase = {
      input: [11, [22, [23, 24], 25, [26]]],
      output: '[ 11 [ 22 [ 23 24 ] 25 [ 26 ] ] ]'
    }
    expect(stringify(testCase.input)).toBe(testCase.output)
  })
})
