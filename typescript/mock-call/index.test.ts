import mockCall from './index'

describe('mock-call', () => {
  test('call', () => {
    const jaylen = {
      name: 'jaylen'
    }

    const showName = function (name: string) {
      // @ts-ignore
      return this.name == name
    }

    showName.mockCall = mockCall

    expect(showName.mockCall(jaylen, 'jaylen')).toBe(true)
  })
})
