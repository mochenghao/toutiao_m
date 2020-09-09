import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // redirect路由重定向
  { path: '/', redirect: '/login' },
  // 路由懒加载
  { path: '/login', component: () => import('@/views/login') }
]

const router = new VueRouter({
  routes
})

export default router
