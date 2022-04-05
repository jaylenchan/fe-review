import RouterLink from './components/router-link'
import RouterView from './components/router-view'
import createMatcher from './matcher'
import { BrowserHistory, HashHistory } from './history'

export default class VueRouter {
  static install(Vue) {
    VueRouter.Vue = Vue
    /** 注册全局组件 */
    this.registerComponent(Vue)
    /** 给所有组件注入router实例 */
    this.injectRouterToAllComponents(Vue)
    /** 给Vue原型注入$route和$router */
    this.injectVariable(Vue)
  }

  /** 注册全局组件 */
  static registerComponent(Vue) {
    Vue.component('router-link', RouterLink)
    Vue.component('router-view', RouterView)
  }

  /** 给所有组件注入router实例 + 用router实例传入root根实例进行初始化 */
  static injectRouterToAllComponents(Vue) {
    Vue.mixin({
      beforeCreate() {
        const isRoot = !!this.$options.router
        // _routerRoot其实就是根实例。就是new Vue({ router })
        if (isRoot) {
          // 如果是根实例，自己给自己起一个新名字叫做_routerRoot。接下来到子组件创建的时候，走else逻辑就会发现如果有这个属性说明就是根
          VueRouter._routerRoot = this
          this._routerRoot = this
          this._router = this.$options.router
          /** 在这个地方开始进行路由初始化注册，传入的this就是vue根组件 */
          this._router.init(this._routerRoot)
          Vue.util.defineReactive(this, '_route', this._router.history.currentRecord)
        } else {
          // 现在轮到儿子创建了，于是寻找它自己的父亲，如果找到了，直接获取父亲身上的_routerRoot属性
          // 由于组件上生命周期，轮到App的时候，App.$parent = root，所以可以拿到root._routerRoot，于是App._routerRoot = root._routerRoot
          // 而轮到App的子组件的时候，就可以拿到App身上的_routerRoot。
          this._routerRoot = this.$parent && this.$parent._routerRoot
          /** 经过上述分支语句后，所有的组件都会有this._routerRoot指向new Vue({ router }) */
          /** 这样一来，所有组件身上就可以有router实例了，而使用_router作为属性名，是只希望这个属性再插件内部使用 */
          this._router = this._routerRoot._router
        }
      }
    })
  }

  /** 给Vue原型注入变量 */
  static injectVariable(Vue) {
    /**
     * 注入
     */
    Object.defineProperty(Vue.prototype, '$route', {
      get() {
        return VueRouter._routerRoot._route
      }
    })
    Object.defineProperty(Vue.prototype, '$router', {
      get() {
        return VueRouter._routerRoot._router
      }
    })
  }

  constructor({ routes, mode }) {
    /** 1. 创建匹配器： 做出一个映射表：路径到组件的映射*/
    /**
     * matcher {
     *   match: Function 传入一个location字符串,通过location路径拿到对应的记录
     *   addRoutes: Function
     * }
     */
    this.matcher = createMatcher(routes)
    /**
     * 2. 创建历史管理
     * 页面打开要默认给一个#/（hash模式下）。但是路由是有两种格式的
     * 因为在用户传入的配置对象当中，我们还可以支持一个mode，通过判断这个mode我们可以知道用户想要使用什么模式的路由
     */
    this.mode = mode

    switch (this.mode) {
      case 'hash':
        this.history = new HashHistory(this) // 使用hash模式
        break
      case 'history':
        this.history = new BrowserHistory(this) // 使用历史模式
        break
    }
  }

  /**
   * 根据用户配置的routes
   */
  init(appRoot) {
    const history = this.history
    const currentLocation = history.getCurrentLocation()

    /**初始化路由器时，默认会使用一次transitionTo去跳转一次路径切换视图 */
    if (this.mode === 'hash') {
      history.setupHashListener() // 事件hashchange监听
    }
    history.transitionTo(currentLocation)
    // 初始化时都要调用更新_route的方法
    // 只要currentRecord变化的话，就传递过来赋值
    history.listen((route) => {
      appRoot._route = route
    })
  }

  match(location) {
    return this.matcher.match(location)
  }
}
