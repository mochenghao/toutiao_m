// 导入请求模块
import request from '@/utils/request'

// 获取新闻频道列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
