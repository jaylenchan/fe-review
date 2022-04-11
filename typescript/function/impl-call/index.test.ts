import mockCall from './index'

describe('mock-call', () => {
  test('call', () => {
    const jaylen = {
      name: 'jaylen'
    }

    const showName = function (this: Record<string, any>, name: string) {
      return this['name'] == name
    }

    showName.mockCall = mockCall

    expect(showName.mockCall(jaylen, 'jaylen')).toBe(true)
    expect(jaylen).toEqual({
      name: 'jaylen'
    })
  })
})
