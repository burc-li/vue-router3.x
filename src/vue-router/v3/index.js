/**
 * @name VueRouter类
 * @desc
 * @todo 1. 需要在 VueRouter类本身上挂载install方法
 * @todo 2. 在router初始化方法中，手动调用 history.transitionTo渲染对应的组件，并监控路由变化
 * @todo 3. 在router初始化方法中，手动调用 history.listen记录 更新_route的回调，在 history.transitionTo执行此回调
 * @todo 4. 点击router-link时，触发push方法，其调用 HashHistory or Html5History 的跳转逻辑，针对hash模式：window.location.hash；针对history模式：history.pushState
 */

import install from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/hash'
import Html5History from './history/html5'

class VueRouter {
  constructor (options) {
    // 用户传递的路由配置
    const routes = options.routes || []

    // 路由匹配器，可以匹配也可以添加新的路由
    this.matcher = createMatcher(routes)

    const mode = options.mode || 'hash'
    if (mode === 'hash') {
      this.history = new HashHistory(this) // popstate, hashchange
    } else if (mode === 'history') {
      this.history = new Html5History(this) // popstate
    }
  }

  // router初始化方法（只会在 根vue实例中的 beforeCreate钩子中调用一次）
  init (app) {
    console.log('router初始化方法（init）')
    const history = this.history
    // 手动根据当前路径去匹配对应的组件，渲染，之后监听路由变化
    history.transitionTo(history.getCurrentLocation(), () => {
      history.setupListener()
    })

    // 在 transitionTo 方法中执行这个回调，目的就是在 current变化时手动更新 app._route的值，数据变化会自动重新渲染视图
    history.listen((newRoute) => {
      app._route = newRoute
    })
  }

  // 简化用户调用层级  this.match ≈ this.matcher.match
  match (location) {
    return this.matcher.match(location)
  }

  // 调用 HashHistory or Html5History 的跳转逻辑（点击router-link触发）
  push (location) {
    // 针对hash模式： window.location.hash
    // 针对history模式： history.pushState
    return this.history.push(location)
  }
}

// 当执行 Vue.use(VueRouter) 时，如果 VueRouter插件是一个对象，必须提供 install方法，install方法调用时，会将 Vue作为参数传入
VueRouter.install = install

export default VueRouter
