/**
 * @name 路由映射
 * @todo 创建一个路由映射表，根据用户传入的 routes选项，生成扁平化的路由映射表
 */
export default function createRouteMap (routes, pathList, pathMap) {
  // 当第一次加载的时候没有 pathList 和 pathMap
  pathList = pathList || []
  pathMap = pathMap || {}
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap)
  })

  return {
    pathList,
    pathMap
  }
}

// 添加路由信息
// pathList：收集所有的路由路径，['/', '/a', '/b', '/about', '/about/a', '/about/b']
// pathMap：收集路径的对应路由记录，['/':{/的记录}, '/a':{/a的记录}, '/b':{/b的记录}, '/about':{/about的记录}, ...]
function addRouteRecord (route, pathList, pathMap, parentRecord) {
  const path = parentRecord ? `${parentRecord.path}${parentRecord.path.endsWith('/') ? '' : '/'}${route.path}` : route.path
  const record = {
    path,
    component: route.component,
    props: route.props,
    meta: route.meta,
    parent: parentRecord
  }

  // 维护路径对应的属性
  if (!pathMap[path]) {
    pathList.push(path)
    pathMap[path] = record
  }

  route.children && route.children.forEach(childRoute => {
    addRouteRecord(childRoute, pathList, pathMap, record)
  })
}
