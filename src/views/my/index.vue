<template>
  <div class="my_container">
    <!-- 我的-未登录页面 -->
    <div class="header not_login" v-if="!user">
      <div class="login_btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 我的-登录页面 -->
    <div class="header user_info" v-else-if="user">
      <!-- 上面盒子 -->
      <div class="top_box">
        <!-- 左边头像盒子 -->
        <div class="left_box">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <!-- 右边按钮盒子 -->
        <div class="right_box">
          <van-button round size="mini">编辑资料</van-button>
        </div>
      </div>
      <!-- 下面的盒子 -->
      <div class="bottom_box">
        <div class="items">
          <span class="num">{{userInfo.art_count}}</span>
          <span class="text">文章</span>
        </div>
        <div class="items">
          <span class="num">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="items">
          <span class="num">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="items">
          <span class="num">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 宫格导航 -->
    <van-grid class="grid_nav" :column-num="2" clickable>
      <van-grid-item class="grid_item">
        <i slot="icon" class="iconfont toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid_item">
        <i slot="icon" class="iconfont toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- cell 单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小爱同学" is-link />
    <!-- 退出登录按钮 -->
    <van-button type="danger" block v-if="user" @click="logout_btn">退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'

export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    // 获取用户信息
    async loadUserInfo() {
      try {
        const { data: res } = await getUserInfo()
        // console.log(res)
        this.userInfo = res.data
      } catch (err) {
        this.$toast('获取用户信息失败')
      }
    },
    // 退出按钮点击事件
    logout_btn() {
      this.$dialog
        .confirm({
          title: '确认退出？'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          this.$toast('已取消退出！')
        })
    }
  },
  computed: {
    // 把 state 中的 user 映射为组件的计算属性
    ...mapState(['user'])
  },
  created() {
    // 用户如果是登录状态再获取用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.my_container {
  // 我的-未登录页面样式
  .header {
    height: 360px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not_login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login_btn {
      display: flex;
      // 垂直方向排布
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      img {
        width: 134px;
        height: 134px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 30px;
      }
    }
  }
  // 我的-已登录页面样式
  .user_info {
    .top_box {
      height: 230px;
      padding: 75px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left_box {
        display: flex;
        align-items: center;
        .avatar {
          width: 136px;
          height: 136px;
          border: 3px solid #fff;
        }
        .name {
          color: #fff;
          font-size: 30px;
          margin-left: 25px;
        }
      }
    }
    .bottom_box {
      height: 130px;
      display: flex;
      .items {
        flex: 1;
        display: flex;
        // 垂直布局
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .num {
          font-size: 30px;
          margin-bottom: 14px;
        }
        .text {
          font-size: 24px;
        }
      }
    }
  }
  // 宫格导航
  .grid_nav {
    // height: 141px;
    .iconfont {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .text {
      font-size: 28px;
    }
  }
  // 单元格
  .van-cell {
    margin: 10px 0;
  }
}
</style>
