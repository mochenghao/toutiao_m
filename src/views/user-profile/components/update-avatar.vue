<template>
  <div class="update_avatar">
    <img id="image" :src="img" />
    <div class="toolbar">
      <div @click="$emit('close')">取消</div>
      <div @click="confirm">完成</div>
    </div>
  </div>
</template>

<script>
import { updateUserAvatar } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdateAvatar',
  props: {
    img: {
      type: [String, Object],
      retuired: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  mounted() {
    const image = document.getElementById('image')
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  methods: {
    confirm() {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      // console.log(this.cropper.getData())
      try {
        this.cropper.getCroppedCanvas().toBlob(async (blob) => {
          // 创建formData数据
          const formData = new FormData()
          formData.append('photo', blob)
          const { data: res } = await updateUserAvatar(formData)
          // 关闭弹层，更新视图
          // console.log(res)
          this.$emit('update-avatar', res.data.photo)
          this.$emit('close')
          this.$toast.success('更新成功')
        })
      } catch (err) {
        this.$toast.fail('更新失败，请重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update_avatar {
  background-color: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    width: 100%;
    height: 88px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 36px;
  }
}
</style>
