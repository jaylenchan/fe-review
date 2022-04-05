import createRouteMap from './create-route-map'
import { createRoute } from '../history/hash-history'

/**
 * routes: 用户在router/index.js当中自定义配置的路由表
 * routes只是用户看着方便，VueRouter就使用不方便了，因为VueRouter更想要的是一个map结构，一个路径对应一个component
 * map {
 *  '/': Home
 *  '/about': About,
 * '/about/a': A
 * }
 */
export default function createMatcher(routes) {
  /** 1. 我们需要根据用户自定义的路由表创建出一个map方便之后用 */
  /**
   * pathList: 存放着所有的routes的路径
   * pathMap: path -> record 的映射表
   */
  const { pathList, pathMap } = createRouteMap(routes)

  /** 根据对应的location返回对应的记录
   * {
   *  path: 'xx',
   *  matched: ['x','xx ']
   * }
   */
  function match(location) {
    /**
     * 根据location到pathMap当中获取对应的记录
     * 但是直接拿返回是有疏漏的。因为/about/a这种，不止拿/about/a的record
     * 应该还要拿/about的record
     */
    /**
     * record: 
     * {
     *   path: 'xxx',
         component: 'x',
         parent: record {}
     * }
     */
    let record = pathMap.get(location)
    /**
     * createRoute返回：一个记录，里头存放着当前path，并可以从matched知道它匹配上了多少条记录
     * record {
     *   path: 'xx',
     *   component: 'x',
     *   parent: record {...}
     * }
     */
    const route = createRoute(record, {
      path: location
    })
  }

  /** 这里的routes也是用户额外自定义添加的routes表 */
  /** addRoutes就做了一件事：将新增的routes往pathList和pathMap两个结构中添加新的 */
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap)
  }

  return {
    match,
    addRoutes
  }
}
