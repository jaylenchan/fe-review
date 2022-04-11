import mockApply from './index'

describe('mock apply', () => {
  test('apply', () => {
    const jaylen = {
      name: 'jaylen'
    }

    const showName = function (this: Record<string, any>, age: string, nickName: string) {
      return `${this['name']}-${age}-${nickName}`
    }

    showName.mockApply = mockApply

    expect(showName.mockApply(jaylen, ['11', 'xiaowang'])).toBe('jaylen-11-xiaowang')
    expect(jaylen).toEqual({
      name: 'jaylen'
    })
  })
})
