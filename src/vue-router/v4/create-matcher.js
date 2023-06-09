import createRouteMap from './create-route-map'

/**
 * @name 路由匹配器
 * @todo 1. 通过 createRouteMap() 获取扁平化的路由信息
 * @todo 2. 实现 addRoutes、addRoute、match方法
 */
export default function createMatcher (routes) {
  // pathList：收集所有的路由路径，['/', '/a', '/b', '/about', '/about/a', '/about/b']
  // pathMap：收集路径的对应路由记录，['/':{/的记录}, '/a':{/a的记录}, '/b':{/b的记录}, '/about':{/about的记录}, ...]
  const { pathList, pathMap } = createRouteMap(routes)

  console.log('pathList, pathMap', pathList, pathMap)

  // 动态添加多个路由规则 在v4.x中已废弃：使用 router.addRoute() 代替
  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap)
  }
  // 动态添加一条新路由规则
  function addRoute (route) {
    createRouteMap([route], pathList, pathMap)
  }
  // 根据一个路径获取对应的路由信息 在v4.x中已废弃：删除 router.match 改为 router.resolve
  function match (location) {
    return pathMap[location]
  }

  return {
    addRoutes,
    addRoute,
    match
  }
}
