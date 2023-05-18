import install from './install'

class VueRouter {
  constructor (options) {
    // 用户传递的路由配置
    const routes = options.routes || []
  }
}

// 为什么额外写一个install方法，原因就是：当执行 Vue.use(VueRouter) 时，如果VueRouter插件是一个对象，必须提供 install 方法，install 方法调用时，会将 Vue 作为参数传入
// 1. 要将 main.js中 根实例注入的 router属性 共享给每个组件
// 2. 代理 this.$router 和 this.$route 属性
// 3. 注册全局组件 router-link 和 router-view
VueRouter.install = install

export default VueRouter
