<template>
  <div class="user_profile">
    <!-- 头部导航栏 -->
    <van-nav-bar class="page_nav_bar" title="个人信息" left-arrow @click-left="$router.back()">
      <van-icon slot="right" name="ellipsis" size="24" @click="$toast.fail('你点了没用')" />
    </van-nav-bar>
    <van-cell class="avatar_box" title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow = true" />
    <van-cell
      title="性别"
      :value="user.gender ? '女' : '男'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow = true" />

    <!-- 头像修改弹出层 -->
    <input type="file" ref="file" hidden @change="onFileChange" />
    <van-popup
      v-if="isUpdatePhotoShow"
      v-model="isUpdatePhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avatar
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-avatar="user.photo = $event"
      />
    </van-popup>
    <!-- 修改昵称弹出层 -->
    <van-popup
      v-if="isUpdateNameShow"
      v-model="isUpdateNameShow"
      round
      position="bottom"
      :style="{ height: '80%' }"
    >
      <update-name @close="isUpdateNameShow = false" v-model.trim="user.name" />
    </van-popup>

    <!-- 修改性别弹出层 -->
    <van-popup v-if="isUpdateGenderShow" v-model="isUpdateGenderShow" round position="bottom">
      <update-gender @close="isUpdateGenderShow = false" v-model="user.gender" />
    </van-popup>

    <!-- 修改生日弹出层 -->
    <van-popup v-if="isUpdateBirthdayShow" v-model="isUpdateBirthdayShow" round position="bottom">
      <update-birthday @close="isUpdateBirthdayShow = false" v-model="user.birthday" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdateAvatar from './components/update-avatar'

export default {
  name: 'UserProfile',
  data() {
    return {
      // 用户个人信息对象
      user: {},
      // 控制修改昵称弹出层的显示隐藏
      isUpdateNameShow: false,
      // 控制修改性别弹出层的显示隐藏
      isUpdateGenderShow: false,
      // 控制修改生日弹出层的显示隐藏
      isUpdateBirthdayShow: false,
      // 控制修改头像弹出层的显示隐藏
      isUpdatePhotoShow: false,
      // 图片地址
      img: ''
    }
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    // 获取用户信息
    async loadUserProfile() {
      try {
        const { data: res } = await getUserProfile()
        this.user = res.data
      } catch (err) {
        this.$toast('获取信息失败，请重试')
      }
    },

    onFileChange(val) {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 获取blob数据
      const imgUrl = window.URL.createObjectURL(file)
      this.img = imgUrl
      this.isUpdatePhotoShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.user_profile {
  .van-cell__value {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .avatar_box {
    display: flex;
    align-items: center;
    .avatar {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
