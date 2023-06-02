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
