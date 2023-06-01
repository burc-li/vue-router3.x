import Base from './base'

class HTML5History extends Base {
  constructor (router) {
    super(router)
  }

  // 添加监听器，监听pathname变化（在 vueRouter类的init方法中调用）
  // 当用户在浏览器点击后退、前进，或者在js中调用 history.back()，history.go()，history.forward()等，会触发popstate事件
  // 但 pushState、replaceState不会触发这个事件
  setupListener () {
    window.addEventListener('popstate', () => {
      console.log('>>>history模式发生变化了')
      this.transitionTo(window.location.pathname)
    })
  }

  // 获取pathname  http://192.168.21.144/framework-assets#/assets/1522392838?id=1522392838 => '/framework-assets'
  getCurrentLocation () {
    return window.location.pathname
  }

  // 跳转页面
  // 为什么要手动执行 transitionTo，而不是直接改变地址，通过路由监听器去间接执行 transitionTo？
  // 因为 window.history.pushState() 不会触发 popstate事件！！！
  push (location) {
    this.transitionTo(location, () => {
      window.history.pushState({}, '', location)
    })
  }
}

export default HTML5History
