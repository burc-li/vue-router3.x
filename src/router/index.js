import Vue from 'vue'
// import VueRouter from 'vue-router' // 官方 vue router
import VueRouter from '@/vue-router/v4'
import Home from '@/views/Home.vue'
import About from '@/views//About.vue'

// 安装 Vue.js 插件
// 如果插件是一个对象，必须提供 install 方法；如果插件是一个函数，它会被作为 install 方法
// install 方法调用时，会将 Vue 作为参数传入
Vue.use(VueRouter)

// { '/':Home, '/a':HomeA, '/b':HomeB, '/about':About }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'a', // children中路径不能增加 /
        component: {
          render: (h) => <h2>home a</h2>
        }
      },
      {
        path: 'b',
        component: {
          render: (h) => <h2>home b</h2>
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'a', // children中路径不能增加 /
        component: {
          render: (h) => <h2>about a</h2>
        }
      },
      {
        path: 'b',
        component: {
          render: (h) => <h2>about b</h2>
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((from, to, next) => {
  setTimeout(() => {
    console.log('beforeEach__________第一个钩子')
    next()
  }, 2000)
})
router.beforeEach((from, to, next) => {
  setTimeout(() => {
    console.log('beforeEach__________第二个钩子')
    next()
  }, 1000)
})

export default router
