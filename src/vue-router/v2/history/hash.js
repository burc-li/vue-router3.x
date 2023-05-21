/**
 * @name hash路由类
 * @desc
 * @todo 1. new 一个hash路由时，给一个默认的 hash路径 /
 * @todo 2. 监测到hash值变化后，需要执行 transitionTo渲染对应的组件（前进后退，ensureSlash添加默认hash值/......）
 * @todo 3. 地址栏手动输入 http://localhost:8080/#/about 并回车，这时还没有添加路由监听器呢，需要在router.init中手动调用 transitionTo
 * @todo 4. popstate / hashchange
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
  setupListener () {
    console.log('setupListener')

    // const eventType = supportsPushState ? 'popstate' : 'hashchange'
    const eventType = 'hashchange'
    window.addEventListener(eventType, () => {
      this.transitionTo(getHash()) // 初始化执行的 ensureSlash方法也会触发此回调
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

export default HashHistory
