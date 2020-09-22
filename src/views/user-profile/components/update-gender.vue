<template>
  <div class="update_gender">
    <van-picker
      title="设置性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    // 更新用户性别
    async onConfirm(value, index) {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true, // 背景禁止点击
        duration: 0 // 一直持续
      })
      try {
        await updateUserProfile({
          gender: index
        })
        this.$emit('input', index)
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

<style lang="less" scoped></style>
