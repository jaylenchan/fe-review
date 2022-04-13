import RouterLink from './components/router-link'
import RouterView from './components/router-view'

export let Vue

export function install(_Vue) {
  Vue = _Vue
  Vue.component('router-link', RouterLink)
  Vue.component('router-view', RouterView)
  Vue.mixin({
    beforeCreate() {
      /** 也就是一开始只有根root有router，this.$options.router有值，其他的子组件都没有的 */
      if (this.$options.router) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
}
