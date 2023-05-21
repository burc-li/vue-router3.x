class Base {
  constructor (router) {
    this.router = router
  }

  // 所有的跳转逻辑都在这个方法中实现（根据路径匹配对应的组件，然后渲染）
  transitionTo (location, listener) {
    // 根据一个路径匹配对应的路由信息
    const record = this.router.match(location)
    console.log('record', record)

    listener && listener()
  }
}

export default Base
