/**
 * @name hash路由类
 * @desc
 * @todo 1. new 一个hash路由时，给一个默认的 hash路径 /
 * @todo 2. 优先使用 popstate，不支持则使用 hashchange
 * @todo 3. 监测到hash值变化后，需要执行 transitionTo渲染对应的组件（前进后退，ensureSlash添加默认hash值/......）
 * @todo 4. 地址栏手动输入 http://localhost:8080/#/about 并回车，这时还没有添加路由监听器呢，需要在router.init中手动调用 transitionTo
 * @todo 5. 点击router-link时，执行push跳转页面，先手动执行 transitionTo渲染组件，后改变URL地址（window.history.pushState 不会触发 popstate事件）
 */

import Base from './base'

const supportsPushState = window.history && typeof window.history.pushState === 'function'

class HashHistory extends Base {
  constructor (router) {
    super(router)

    // 初始化 hash路由时，给一个默认的 hash路径 /
    ensureSlash()
  }

  getCurrentLocation () {
    return getHash()
  }

  // 添加监听器，监听hash值的变化（在 vueRouter类的init方法中调用）
  // window.location.hash = 'xxx' 会触发 popstate事件 和 hashchange事件
  // window.history.pushState({},'','xxx') 都不会触发！！！
  setupListener () {
    console.log('添加路由监听器（setupListener）')
    const eventType = supportsPushState ? 'popstate' : 'hashchange'
    window.addEventListener(eventType, () => {
      this.transitionTo(getHash()) // 初始化执行的 ensureSlash方法也会触发此回调
    })
  }

  // 跳转页面
  // 为什么要手动执行 transitionTo，而不是直接改变地址，通过路由监听器去间接执行 transitionTo？
  // 因为 window.history.pushState() 不会触发 popstate事件！！！
  push (location) {
    this.transitionTo(location, () => {
      if (supportsPushState) {
        window.history.pushState({}, '', getUrl(location))
      } else {
        window.location.hash = location
      }
    })
  }
}

// http://localhost:8080/  ==>  http://localhost:8080/#/
function ensureSlash () {
  if (window.location.hash) {
    return
  }
  console.log('ensureSlash')
  window.location.hash = '/'
}

// 获取当前hash值（去掉 #）
// '#/assets/1522392838?id=1522392838'  ==>  '/assets/1522392838?id=1522392838'
function getHash () {
  return window.location.hash.slice(1)
}

// 绝对路径
function getUrl (path) {
  const href = window.location.href
  const i = href.indexOf('#')
  const base = i >= 0 ? href.slice(0, i) : href
  return `${base}#${path}`
}

export default HashHistory
