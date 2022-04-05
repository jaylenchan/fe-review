function addRouteRecord(route, pathList, pathMap, parentRecord = null) {
  let { path, component, children } = route
  path = parentRecord ? `${parentRecord.path}/${path}` : path

  const record = {
    path,
    component,
    parent: parentRecord
  }

  /** 防止用户编写路由的时候有重复的 */
  if (!pathMap.get(path)) {
    pathMap.set(path, record)
    pathList.push(path)
  }

  if (children && children.length > 0) {
    route.children.forEach((routeItem) =>
      addRouteRecord(routeItem, pathList, pathMap, record)
    )
  }
}

/**
 * createRouteMap做的事情：
 *  将用户自定义的routes当中的路径依次给它拿出来。由于这歌routes是一棵树，所以要递归添加
 *  返回一个对象
 */
export default function createRouteMap(routes, oldPathList, oldPathMap) {
  const pathList = oldPathList || []
  const pathMap = oldPathMap || new Map()

  routes.forEach((route) => {
    addRouteRecord(route, pathList, pathMap)
  })
  return {
    pathList /** pathList: 将routes中的所有路由扁平化成一个一维的数组 ['/', '/about', '/about/a']*/,
    pathMap /** pathMap: 将routes中的所有路由做成“路径 -> 组件”的map映射表 */
  }
}
