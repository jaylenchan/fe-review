import parseUrl from './index'

describe('parseUrl', () => {
  test('parse url', () => {
    const url = 'www.baidu.com/a/b?name=chen&age=10#q'

    expect(parseUrl(url)).toEqual({
      domain: 'www.baidu.com',
      path: '/a/b',
      params: { name: 'chen', age: '10' },
      hash: 'q'
    })
  })
})
