// 请求模块
import axios from 'axios'

const request = axios.create({
  // 请求接口基础路径
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 请求拦截器
// axios.interceptors.request.use(function (config) {
//   console.log(config.url)
//   config.headers.mytoken = 'nihao';
//   return config;
// }, function (err) {
//   console.log(err)
// })

// 响应拦截器
// axios.interceptors.response.use(function (res) {
//   // console.log(res)
//   var data = res.data;
//   return data;
// }, function (err) {
//   console.log(err)
// })

export default request
