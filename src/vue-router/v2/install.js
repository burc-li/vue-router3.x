/**
 * @name install
 * @desc Vue.use(plugin) 安装 Vue.js 插件时调用，如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
 * @todo 1. beforeCreate混入
 * @todo 1.1. 要将 main.js中根实例注入的 router属性共享给每个组件（我们把根应用 new Vue()做了共享）
 * @todo 1.2. 调用 router初始化方法，router.init（调用 history.transitionTo渲染对应的组件，并监控路由变化）
 * @todo 2. 代理 this.$router 和 this.$route 属性
 * @todo 3. 注册全局组件 router-link 和 router-view
 */

import routerLink from './components/router-link'
// 静态全局变量
export let Vue

function install (_Vue) {
  Vue = _Vue

  // mixin 内部会调用 mergeOptions方法， 所有组件初始化都会调用这个方法
  // 这里不能直接将属性定义在原型上, 只有在 new Vue 中传入了 router路由实例 才能被后代组件共享
  Vue.mixin({
    beforeCreate () {
      // 组件渲染是从父到子的
      // 这样保证了有 router路由实例才加，没有 router路由实例就不加
      if (this.$options.router) {
        this._routerRoot = this // 根实例
        this._router = this.$options.router // router路由实例

        this._router.init(this) // this 就是我们的根应用 new Vue()

        // this._router 可以拿到路由实例
        // this._route 可以拿到current对象
      } else {
        // 在所有后代组件上都增加 _routerRoot，其指向根实例
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })

  // 代理实例上的 $router 属性，this.$router
  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return this._routerRoot && this._routerRoot._router
    }
  })

  // 代理实例上的 $route 属性，this.$route
  // Object.defineProperty(Vue.prototype, '$route', {
  //   get () {
  //     return this._routerRoot && this._routerRoot._route
  //   }
  // })

  // 注册 router-link 全局组件
  Vue.component('router-link', routerLink)

  // 注册 router-view 全局组件
  Vue.component('router-view', {
    render () {
      return <div></div>
    }
  })
}
export default install
