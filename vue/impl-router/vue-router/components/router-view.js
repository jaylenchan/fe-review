export default {
  name: 'router-view',
  functional: true,
  /**
   * parent时当前组件的父级组件
   * data时组件上的一些标识
   */
  render(h, { parent, data }) {
    // this.$route 有matched属性，这个属性有几个，那就以此地将这个属性中的元素对应的component赋值到router-view上去
    const route = parent.$route
    let depth = 0
    data.routerView = true // 标识路由属性

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
    }
    let record = route.matched[depth]
    if (!record) {
      return h() //表示渲染空的元素
    }
    return h(record.component, data)
  }
}
