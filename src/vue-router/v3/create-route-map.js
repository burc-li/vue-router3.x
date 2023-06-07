/**
 * @name 路由映射
 * @todo 根据用户传入的 routes选项，生成扁平化的路由信息
 */
export default function createRouteMap (routes, pathMap) {
  pathMap = pathMap || {}
  routes.forEach(route => {
    addRouteRecord(route, pathMap)
  })

  return {
    pathMap
  }
}

// 添加路由信息
function addRouteRecord (route, pathMap, parentRecord) {
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
    pathMap[path] = record
  }

  route.children && route.children.forEach(childRoute => {
    addRouteRecord(childRoute, pathMap, record)
  })
}
