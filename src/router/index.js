import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 路由懒加载
  { path: '/login', component: () => import('@/views/login') },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      // 默认子路由加载首页
      { path: '', component: () => import('@/views/home') },
      { path: '/qa', component: () => import('@/views/qa') },
      { path: '/video', component: () => import('@/views/video') },
      { path: '/my', component: () => import('@/views/my') }
    ]
  },
  { path: '/search', component: () => import('@/views/search') },
  {
    path: '/article/:articleId',
    component: () => import('@/views/article'),
    props: true // 开启路由传参
  }
]

const router = new VueRouter({
  routes
})

export default router
