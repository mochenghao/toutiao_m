<template>
  <div class="update_name">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="修改"
      @click-left="$emit('close')"
      @click-right="onUserName"
    />
    <!-- 文本输入框 -->
    <van-field
      v-model="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    }
  },
  methods: {
    // 更新用户昵称
    async onUserName() {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true, // 背景禁止点击
        duration: 0 // 一直持续
      })
      try {
        if (this.localName.trim() === '') return this.$toast('请输入昵称')
        await updateUserProfile({
          name: this.localName
        })
        this.$emit('input', this.localName)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败，请稍后重试')
      }
      // 不管修改成功与否，都关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.van-hairline--bottom {
  margin-bottom: 20px;
}
</style>
