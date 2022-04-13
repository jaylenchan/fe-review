import History from './base-history'

function ensureSlash() {
  if (!window.location.hash) {
    window.location.hash = '/' // 效果就是localhost:4000/变成localhost4000:/#/。多了一个#/
  }
}

export default class HashHistory extends History {
  constructor(router) {
    super(router)
    this.router = router
    /**
     * 如果使用hash模式，发现没有hash，应该跳转到首页xxx/#/
     */
    ensureSlash()
  }

  getCurrentLocation() {
    return window.location.hash.slice(1)
  }

  setupHashListener() {
    window.addEventListener('hashchange', () => {
      /** hash变化也需要再次执行匹配的操作 */
      
      this.transitionTo(this.getCurrentLocation())
      console.log('hash change')
    })
  }
}
