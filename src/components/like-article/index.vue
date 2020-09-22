<template>
  <!-- 点赞组件 -->
  <van-icon :class="{like_btn:value===1}" :name="value===1?'good-job':'good-job-o'" @click="onLike"></van-icon>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    // 点击点赞图标触发事件
    async onLike() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        if (this.value === 1) {
          // 已点赞，取消点赞
          await deleteLike(this.articleId)
          // 更新视图
          this.$emit('input', -1)
        } else {
          // 未点赞，添加点赞
          await addLike(this.articleId)
          // 更新视图
          this.$emit('input', 1)
        }
        this.$toast.success(this.value === 1 ? '已取消点赞' : '点赞成功')
      } catch (err) {
        this.$toast.fail('操作失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.like_btn {
  color: red;
}
</style>
