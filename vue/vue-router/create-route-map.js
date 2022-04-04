function addRouteRecord(route, pathList, pathMap, parentRecord = null) {
  let { path, component } = route

  if (parentRecord) {
    path = `${parentRecord.path}/${path}`
  }
  /**
   * 根据当前路由产生一个路由记录
   */
  let record = {
    path,
    component,
    parent: parentRecord
  }

  if (!pathMap.get(path)) {
    pathMap.set(path, record)
    pathList.push(path)
  }

  if (route.children) {
    route.children.forEach((childRoute) => {
      addRouteRecord(childRoute, pathList, pathMap, record)
    })
  }
}

/**
 * createRouteMap：用于格式化routes并返回pathList和pathMap
 */
export function createRouteMap(routes, oldPathList, oldPathMap) {
  const pathList = oldPathList || []
  const pathMap = oldPathMap || new Map()

  routes.forEach((route) => {
    addRouteRecord(route, pathList, pathMap)
  })

  return {
    pathList,
    pathMap
  }
}
