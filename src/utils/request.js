// 请求模块
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 请求接口基础路径
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(err) {
    // 请求本身出错经过这里（请求还未发出）
    return Promise.reject(err)
  }
)

// 响应拦截器
// request.interceptors.response.use(function (res) {
//   // console.log(res)
//   var data = res.data;
//   return data;
// }, function (err) {
//   console.log(err)
// })

export default request
