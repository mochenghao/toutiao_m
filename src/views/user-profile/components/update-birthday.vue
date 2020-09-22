<template>
  <div class="update_birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm(val) {
      const date = dayjs(val).format('YYYY-MM-DD')
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true, // 背景禁止点击
        duration: 0 // 一直持续
      })
      try {
        await updateUserProfile({
          birthday: date
        })
        this.$emit('input', date)
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
</style>
