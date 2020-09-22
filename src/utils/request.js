// 请求模块
import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'

const request = axios.create({
  // 请求接口基础路径
  baseURL: 'http://ttapi.research.itcast.cn',

  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function(data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return data
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = 'Bearer ' + user.token
    }
    return config
  },
  function(err) {
    // 请求本身出错经过这里（请求还未发出）
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function(res) {
    return res
  },
  async function(err) {
    // console.dir(err)
    // 捕获错误信息，刷新token有效期
    if (err.response && err.response.status === 401) {
      const refreshToken = store.state.user.refresh_token
      // console.log(refreshToken)
      const res = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: 'Bearer ' + refreshToken
        }
      })
      // console.log(res)
      // 修改state中的数据，存入正确的token
      store.commit('setUser', {
        token: res.data.data.token,
        refresh_token: refreshToken
      })
      return request(err.config)
    }
    return Promise.reject(err)
  }
)

export default request
