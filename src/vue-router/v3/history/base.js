class Base {
  constructor (router) {
    this.router = router
  }

  // 所有的跳转逻辑都在这个方法中实现（根据路径匹配对应的组件，然后渲染）
  transitionTo (location, listener) {
    // 根据一个路径匹配对应的路由信息
    const record = this.router.match(location)

    // 如果是 hash模式，并且使用 hashchange监听路由时，初始化页面 和 通过route-link跳转页面时
    // transitionTo方法执行了两次（此处打印了两遍），需要去重处理，当前跳转的路由location 和 上次的跳转的路由（v3中实现此属性）作比较；若一致，则return，
    console.log('transitionTo（record）', record)

    listener && listener()
  }
}

export default Base
