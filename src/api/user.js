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

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取用户频道列表
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 关注用户
export const addFollowed = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export const delFollowed = target => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/followings/' + target
  })
}
