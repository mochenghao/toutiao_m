<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px;"
      :src="comment.aut_photo"
    />
    <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
    <div slot="label">
      <p style="color: #363636;">{{ comment.content }}</p>
      <p>
        <span style="margin-right: 10px;">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button
          size="mini"
          type="default"
          @click="$emit('reply-click', comment)"
          >回复&nbsp;{{ comment.reply_count }}</van-button
        >
      </p>
    </div>
    <van-icon
      :class="{ active: comment.is_liking }"
      :name="comment.is_liking ? 'good-job' : 'good-job-o'"
      @click="onCommentLike"
      >{{ comment.like_count || '赞' }}</van-icon
    >
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'

export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isloading: false
    }
  },
  watch: {},
  created() {},
  methods: {
    async onCommentLike() {
      try {
        // 如果已经赞了则取消点赞
        if (this.comment.is_liking) {
          await deleteCommentLike(this.comment.com_id)
          this.comment.like_count--
        } else {
          // 如果没有赞，则点赞
          await addCommentLike(this.comment.com_id)
          this.comment.like_count++
        }
        // 更新视图状态
        this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        this.$toast.fail('操作失败,请重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .van-icon {
    font-size: 40px;
  }
  .active {
    color: red;
  }
}
</style>
