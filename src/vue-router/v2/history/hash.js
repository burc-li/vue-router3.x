/**
 * @name hash路由类
 * @desc
 * @todo 1. 初始化 hash路由时，给一个默认的 hash路径 /
 */

import Base from './base'

class HashHistory extends Base {
  constructor (router) {
    super(router)

    // 初始化 hash路由时，给一个默认的 hash路径 /
    ensureSlash()
  }
}

// http://localhost:8080/  ==>  http://localhost:8080/#/
function ensureSlash () {
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'
}

export default HashHistory
