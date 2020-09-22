<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button class="post-btn" @click="releaseComment" :disabled="flag"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
  name: 'CommentPost',
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    },
    type: {
      type: String,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      default: () => {}
    }
  },
  data() {
    return {
      message: '',
      // 控制发布按钮的显示状态
      flag: true
    }
  },
  watch: {
    message(val) {
      if (val) {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  },
  created() {},
  methods: {
    async releaseComment() {
      try {
        this.$toast.loading({
          message: '发布中...',
          // 禁用背景点击
          forbidClick: true,
          // 持续显示
          duration: 0
        })

        const { data: res } = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.type === 'article' ? null : this.articleId + ''
        })
        // console.log(res)
        // 清空文本框的值
        this.message = ''
        this.$emit('post-success', res.data)
        this.$toast.success('发布评论成功')
      } catch (err) {
        this.$toast.fail('发布评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: rgb(247, 0, 255);
    font-size: 38px;
    &::before {
      display: none;
    }
  }
}
</style>
