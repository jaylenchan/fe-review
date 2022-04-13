import { install } from './install'
import { createMatcher } from './create-mathcer'
import { HashHistory, Html5History } from './history'

export default class VueRouter {
  static install = install
  constructor({ routes = [], mode = 'hash' }) {
    // 创建匹配器
    /**
     * 匹配器功能：
     * 1. 匹配功能：啥路由匹配啥组件 match
     * 2. 添加匹配：动态路由添加（权限场景） addRoutes
     */
    this.matcher = createMatcher(routes)
    /**
     * 创建历史管理
     * 1. hash模式
     * 2. history模式
     */
    this.mode = mode

    switch (mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break
      case 'history':
        this.history = new Html5History(this)
        break
      default:
        console.warn(false, `invalid mode: ${mode}`)
    }
  }

  match(location) {
    return this.matcher.match(location)
  }

  init(app /*就是index.js当中的new Vue()*/) {
    /**
     * 初始化的时候，根据当前的路径，实现一下页面挑战的逻辑
     */
    const history = this.history
    const location = history.getCurrentLocation()
    function setupHashListener() {
      history.setupHashListener()
    }
    history.transitionTo(location, setupHashListener)
  }
}
