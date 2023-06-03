class Base {
  constructor (router) {
    this.router = router
    this.current = createRoute(null, {
      path: '/'
    })
  }

  // 缓存更新_route的回调（this._route = route）
  listen (cb) {
    this.cb = cb
  }

  // 所有的跳转逻辑都在这个方法中实现（根据路径匹配对应的组件，然后渲染）
  transitionTo (location, listener) {
    // 根据一个路径匹配对应的路由信息
    const record = this.router.match(location)

    const route = createRoute(record, { path: location })

    // 去重：当前跳转的路径location 和 我们之前存的current.path 相同，而且匹配结果也相同（初始化path:'/'需要额外判断匹配结果matched），则不再跳转了
    if (location === this.current.path && route.matched.length === this.current.matched.length) {
      return
    }
    // 如果是 hash模式，并且使用 hashchange监听路由时，初始化页面 和 通过route-link跳转页面时
    // transitionTo方法执行了两次（此处打印了两遍），需要去重处理，当前跳转的路由location 和 上次的跳转的路由（v3中实现此属性）作比较；若一致，则return
    console.log('transitionTo（record）', record, route)

    this.current = route // 更新当前的 current对象， 稍后我们就可以切换页面显示

    // 添加路由监听器 or 更改地址栏url
    listener && listener()

    // 更新 app._route
    this.cb && this.cb(route)
  }
}

export default Base

/**
 * @desc 根据树形结构record路由信息 返回一个 扁平化的上下级路由数据
 * 返回示例：{path:'/', matched:[]}
 * 返回示例：{path:'/about/a', matched:[aboutRecord, aboutARecord]}
 */
function createRoute (record, location) {
  const matched = []
  if (record) {
    while (record) {
      matched.unshift(record) // [about, about/a]
      record = record.parent
    }
  }
  return {
    ...location,
    matched
  }
}
