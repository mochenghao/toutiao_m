/**
 *
 * 用户请求模块
 */

// 导入请求模块
import request from '@/utils/request'

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
