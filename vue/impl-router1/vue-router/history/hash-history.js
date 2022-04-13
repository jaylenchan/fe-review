/**
 *  record {
 *   path: 'x',
 *  component: 'x',
 *  parent: record {...}
 * }
 *
 */

export function createRoute(record, location) {
  const matched = []

  while (record) {
    matched.unshift(record)
    record = record.parent
  }
  return {
    ...location,
    matched
  }
}

export default class HashHistory {
  constructor(router) {
    this.router = router

    // 在初始化hash历史管理的时候，判断一下是否界面有hash，
    // 如果没有的话默认给个#/，即给window.location.hash = '/'
    this.ensureSlash()

    // 当前路径匹配出来的记录
    /**
     * {
     *   path: '/',
     *   matched: []
     * }
     */
    /**
     * currentRecord就是一个普通的对象，他的变化并不会引起视图同步更新
     * 需要想办法让currentRecord变成响应式的
     */
    this.currentRecord = createRoute(null, {
      path: '/'
    })
  }

  ensureSlash() {
    if (!window.location.hash) {
      window.location.hash = '/'
    }
  }

  getCurrentLocation() {
    return window.location.hash.slice(1) // 去掉#，比如#/aa就是/aa
  }

  setupHashListener() {
    window.addEventListener('hashchange', (e) => {
      const currentLocation = this.getCurrentLocation()
      this.transitionTo(currentLocation)
    })
  }

  /**
   * transitionTo内部执行完监听函数后，监听函数就会立即执行监听了。
   * 比如说：
   * ;(function() {
   *   window.location.hash = '/a'
   *   window.onhashchange = () => { console.log('change') }
   * }())
   * 回车执行，会立马打印一次change
   */
  transitionTo(location) {
    /** 获取到当前的路径，然后匹配出对应的记录。当路径变化的时候  获取对应的记录，然后渲染页面 */
    /** this.currentRecord放的就是当前hash对应的记录 */
    /** match: Function 传入一个location字符串,通过location路径拿到对应的记录 */
    let record = this.router.match(location)

    // 如果匹配到的个数和路径都是相同的，就不需要再次跳转
    if (
      record.path === location &&
      this.currentRecord.matched.length === record.matched.length
    ) {
      return
    }
    this.currentRecord = record
    this.cb && this.cb(record)
  }

  listen(cb) {
    this.cb = cb
  }
}
