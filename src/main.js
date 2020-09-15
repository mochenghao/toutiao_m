import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
// 导入全局样式表
import './styles/index.less'
// 加载动态设置rem基准值
import 'amfe-flexible'
import './utils/dayjs'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
