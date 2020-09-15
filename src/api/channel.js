/**
 * 频道请求模块
 */
import request from '@/utils/request'

// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 修改频道列表
export const addUserChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除指定用户频道列表
export const deleteUserChannels = channel => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/channels/' + channel
  })
}
