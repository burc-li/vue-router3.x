import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const vm = new Vue({
  name: 'root',
  router,
  render: (h) => h(App) // 渲染组件, 内部_c 发现是对象的话会调用组件的render方法进行渲染
}).$mount('#app')

console.log('vm', vm)

// 路由：后端路由 and 前端路由？
// 后端路由：我们提交一个表单元素，服务端会根据提交内容，校验提交结果，最终在服务端发生跳转（重定向），例如登录认证重定向
// 前端路由：根据不同路径，渲染不同的组件。不经过服务端，也不会刷新页面

// 前端路由有 hash模式 and history模式
// hash模式：根据hash值的不同，可以渲染不同组件。可以通过window.addEventListener('hashchange')可以监控到hash值的变化 https://www.baidu.com/#a
// hash缺点： 1. 丑，所有的路径都有# (锚点)  2. 服务端无法获取锚点，无法根据对应的路径来解析内容，无法实现seo优化

// history模式：这个是H5提供的api。可以通过window.addEventListener('popstate')可以监控到pathname值的变化 https://www.baidu.com/a
// history优点：1. 没有#  2. 强制刷新时，会带上路径，服务端可以解析此路径。支持seo优化（需要服务端支持的）

// 问题
// 前端路由需要服务端获取锚点做什么用 ？（服务端获取不到）
// seo收集的是url地址，hash路由（锚点）不会被收集。但是切换的histrory路由，如果不走服务器，也不会被收集吧？
// history路由一定会走服务器路径的（如果只是通过history.pushState在前端页面跳转，并没有刷新页面，就不走服务器）
// 服务端渲染的特点是根据路径渲染出一个完整的html字符串返回给浏览器（需要服务端支持的）
