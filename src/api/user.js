/**
 *
 * 用户请求模块
 */

// 导入请求模块
import request from '@/utils/request'
import store from '@/store'

// 用户登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 用户发送验证码请求
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: '/app/v1_0/sms/codes/' + mobile
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    // 发送请求头数据
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
