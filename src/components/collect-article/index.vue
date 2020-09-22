<template>
  <!-- 收藏组件 -->
  <van-icon :class="{collect_btn:value}" :name="value?'star':'star-o'" @click="onCollect" />
  <!-- <div>{{value}}</div> -->
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'

export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data() {
    return { str: '' }
  },
  // watch: {
  //   value(val) {
  //     // console.log(val)
  //     if (!val) {
  //       this.str = '收藏成功'
  //     } else {
  //       this.str = '已取消收藏'
  //     }
  //   }
  // },
  methods: {
    // 收藏图标点击事件
    async onCollect() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        if (this.value) {
          // 已收藏，取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏，添加收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '已取消收藏' : '收藏成功')
        // this.$toast.success(this.str)
      } catch (err) {
        this.$toast.fail('操作失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.collect_btn {
  color: orange;
}
</style>
