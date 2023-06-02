export default {
  functional: true,
  render (h, { parent, data }) {
    // 默认先渲染 app.vue中的 router-view；再渲染 Home 或 About中的 router-view

    data.routerView = true // 标识该组件是通过 route-view 渲染出来的
    const route = parent.$route // install.js中代理的$route

    // http://localhost:8080/#/
    // 1.app.vue 中 router-view，depth = 0，return h(Home, data)
    // 2.home.vue 中 router-view，depth = 1，return h()

    // http://localhost:8080/#/a
    // 1.app.vue 中 router-view，depth = 0，return h(Home, data)
    // 2.home.vue 中 router-view，depth = 1，return h({render: (h) => <h2>home a</h2>}, data)
    let depth = 0
    while (parent) {
      console.log('route-parent', parent.$vnode)
      // $vnode 指的是组件本身虚拟DOM
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent // 不停的向上查找父组件
    }

    // matched是一个包含上下父子路由记录的数组，格式如下：[aboutRecord, aboutARecord]
    const record = route.matched[depth]
    console.log('route-matched>>>>>>>>', route.matched, depth, record)

    // 没有匹配到组件直接return
    if (!record) {
      return h()
    }

    return h(record.component, data)
  }
}
