<template>
  <div class="article_list">
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="isLoadingRefresh"
      :success-duration="1500"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onload"
      >
        <!-- 子组件 -->
        <article-item :key="item.art_id" v-for="item in list" :article="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  props: {
    Channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 存储获取到的数据
      list: [],
      // 上拉加载更多的 loading 状态
      loading: false,
      // 是否加载结束
      finished: false,
      // 请求下一页数据的时间戳
      timestamp: null,
      // 是否加载失败
      error: false,
      // 控制下拉刷新的状态
      isLoadingRefresh: false
    }
  },
  methods: {
    // 初始化或滚动到底部的时候会触发onload事件：上拉加载
    async onload() {
      try {
        const { data: res } = await getArticles({
          channel_id: this.Channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 2. 把数据添加到 list 数组中
        this.list.push(...res.data.results)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (res.data.results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = res.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        const { data: res } = await getArticles({
          channel_id: this.Channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // this.list = res.data.results
        this.list.unshift(...res.data.results)
        // 获取到数据改变刷新状态
        this.isLoadingRefresh = false
      } catch (err) {
        // 关闭下拉刷新的 loading 状态
        this.isLoadingRefresh = false
        this.$toast('刷新失败')
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped>
.article_list {
  // 视口（在移动端是布局视口）单位：vw和vh，不收父元素影响
  // 1vw = 视口宽度的百分之一
  // 1vh = 视口高度的百分之一
  height: 79vh;
  overflow: auto;
}
</style>
