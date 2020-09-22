<template>
  <div class="comment_reply">
    <!-- 头部导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? comment.reply_count + '条回复' : '暂无回复'
      "
      left-arrow
      @click-left="$emit('close')"
    />
    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- 当前评论回复列表项 -->
    <comment-list :articleId="comment.com_id" type="c" :list="commentList" />
    <div class="post_wrap">
      <van-button class="post_btn" round size="small" @click="isShow = true"
        >写评论</van-button
      >
    </div>

    <!-- 评论弹出层 -->
    <van-popup v-model="isShow" position="bottom">
      <comment-post
        :target="comment.com_id"
        :articleId="articleId"
        type="comment"
        @post-success="onPostSuccess"
      />
    </van-popup>
    <!-- /评论弹出层 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'

export default {
  name: 'CommentReply',
  props: {
    articleId: {
      type: [Object, String, Number],
      required: true
    },
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isShow: false,
      commentList: []
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  methods: {
    onPostSuccess(data) {
      this.isShow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.post_wrap {
  width: 100%;
  height: 88px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .post_btn {
    width: 60%;
  }
}
</style>
