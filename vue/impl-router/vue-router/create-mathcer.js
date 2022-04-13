import { createRouteMap } from './create-route-map'
import { createRoute } from './history/base-history'
/**
 * routes只是用户自己写了看的方便如何渲染
 * 但是开发router库，我们肯定更希望通过路径->组件的map映射知道整个routes的情况
 */
export function createMatcher(routes) {
  /**
   * pathList: 把所有路由组成一个数组['/','/about', '/about/a']
   * pathMap: Map {
   *   '/' -> 父组件
   *   '/about' -> 子组件about
   *   '/about/a' -> 子组件about的子组件a
   * }
   */
  const { pathList, pathMap } = createRouteMap(routes)

  /**用于匹配用户输入的路径给到输出的组件 */
  function match(location) {
    const record = pathMap.get(location)
    return createRoute(record, { path: location })
  }

  function addRoutes(dynamicRoutes) {
    createRouteMap(dynamicRoutes, pathList, pathMap)
  }

  return {
    match,
    addRoutes
  }
}
