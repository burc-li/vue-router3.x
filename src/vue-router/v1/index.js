/**
 * @name VueRouter类
 * @desc
 * @todo 1. 需要在 VueRouter类本身上挂载install方法
 */

import install from './install'

class VueRouter {
  constructor (options) {
    // 用户传递的路由配置
    const routes = options.routes || []
  }
}

// 当执行 Vue.use(VueRouter) 时，如果 VueRouter插件是一个对象，必须提供 install方法，install方法调用时，会将 Vue作为参数传入
VueRouter.install = install

export default VueRouter
