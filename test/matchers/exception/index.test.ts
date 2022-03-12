describe('exception matchers', () => {
  function compileAndroidCode() {
    throw new Error('you are using the wrong JDK')
  }
  test('toThrow：compileAndroidCode应该抛出错误', () => {
    expect(() => compileAndroidCode()).toThrow()
    expect(() => compileAndroidCode()).toThrow(Error)
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK')
    expect(() => compileAndroidCode()).toThrow(/JDK/)
  })
})
