<template>
  <!-- 关注和未关注按钮 -->
  <van-button
    v-if="article.is_followed"
    :loading="isloading"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    :loading="isloading"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollowed, delFollowed } from '@/api/user'

export default {
  name: 'buttonIndex',
  // 自定义 v-model 的数据名，事件名称
  model: {
    prop: 'is_followed',
    event: 'update-follow'
  },
  props: {
    article: {
      type: Object,
      required: true
    },
    is_followed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // 控制loading效果
      isloading: false
    }
  },
  methods: {
    async onFollow() {
      try {
        // 开启loading效果
        this.isloading = true
        if (this.article.is_followed) {
          // 已关注
          await delFollowed(this.article.aut_id)
        } else {
          // 未关注
          await addFollowed(this.article.aut_id)
        }
        // 更新视图
        this.$emit('update-follow', !this.is_followed)
        // this.$emit('input', !this.value)
      } catch (err) {
        this.$toast('请求失败，请稍后重试！')
        if (err.response && err.response.status === 400) {
          this.$toast('用户不能关注自己！')
        }
      }
      // 关闭loading效果
      this.isloading = false
    }
  }
}
</script>

<style></style>
