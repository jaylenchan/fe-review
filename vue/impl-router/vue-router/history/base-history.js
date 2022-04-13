export function createRoute(record, location) {
  const matched = []

  if (record) {
    while (record) {
      matched.unshift(record)
      record = record.parent
    }
  }
  return {
    ...location,
    matched
  }
}

export default class History {
  constructor(router) {
    this.router = router
    /** 当前路径匹配出来的记录 */
    this.current = createRoute(null, {
      path: '/'
    })
  }

  transitionTo(location, onComplete) {
    /** 获取当前路径，匹配出对应的记录。当路径变化时，获取到对应的记录 */
    /** 通过路径，拿到对应的记录 */
    const routes = this.router.match(location)
    this.current = routes
    console.log('this.current=>', this.current)
    onComplete && onComplete()
  }
}
