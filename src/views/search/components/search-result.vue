<template>
  <div class="search_result">
    <!-- 上拉加载更多 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="loadSearchResult"
    >
      <van-cell
        icon="search"
        :title="item.title"
        :key="index"
        v-for="(item, index) in list"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 请求的页数
      page: 1,
      // 请求每页的数量
      per_page: 20,
      // 存储获取到的数据
      list: [],
      // 上拉加载更多的 loading 状态
      loading: false,
      // 是否加载结束
      finished: false,
      // 是否加载失败
      error: false
    }
  },
  created() {
    this.loadSearchResult()
  },
  methods: {
    // 获取搜索结果
    async loadSearchResult() {
      try {
        const { data: res } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // 测试失败的结果
        // if (Math.random() > 0.5) {
        //   JSON.parse('sahsua')
        // }
        // 2. 把数据添加到 list 数组中
        this.list.push(...res.data.results)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (res.data.results.length) {
          // 更新获取下一页数据
          this.page++
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
