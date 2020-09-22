<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :error="error"
      error-text="加载失败，请点击重试"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell :title="type === 'a' ? '全部评论' : '所有回复'"></van-cell>
      <van-cell :key="index" v-for="(item, index) in list">
        <comment-item
          :comment="item"
          @reply-click="$emit('reply-click', $event)"
        />
      </van-cell>
    </van-list>
    <!-- /评论列表 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      type: Array,
      // 默认值
      default: () => []
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 请求下一页数据的页码
      error: false
    }
  },
  created() {
    this.onLoad()
  },
  components: {
    CommentItem
  },
  methods: {
    async onLoad() {
      try {
        const { data: res } = await getComments({
          type: this.type,
          source: this.articleId + '',
          offset: this.offset,
          limit: 10
        })
        this.list.push(...res.data.results)
        this.$emit('onload-success', res.data.total_count)
        // 加载状态结束
        this.loading = false
        if (res.data.results.length) {
          this.offset = res.data.last_id
        } else {
          // 结束加载
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.van-list {
  margin-bottom: 45px;
}
</style>
