/**
 * @name VueRouter类
 * @desc
 * @todo 1. 需要在 VueRouter类本身上挂载install方法
 */

import install from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/hash'
import Html5History from './history/html5'

class VueRouter {
  constructor (options) {
    // 用户传递的路由配置
    const routes = options.routes || []

    // 变成映射表 方便后续的匹配操作  可以匹配也可以添加新的路由
    this.matcher = createMatcher(routes)

    const mode = options.mode || 'hash'
    if (mode === 'hash') {
      this.history = new HashHistory(this)
    } else if (mode === 'history') {
      this.history = new Html5History(this)
    }
  }
}

// 当执行 Vue.use(VueRouter) 时，如果 VueRouter插件是一个对象，必须提供 install方法，install方法调用时，会将 Vue作为参数传入
VueRouter.install = install

export default VueRouter
