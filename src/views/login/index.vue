<template>
  <div class="login_container">
    <!-- 导航栏 -->
    <van-nav-bar class="page_nav_bar" title="登录页面" />
    <!-- 登录面板 -->
    <van-form @submit="onSubmit">
      <van-field v-model="user.mobile" name="手机号" placeholder="请输入手机号">
        <i slot="left-icon" class="iconfont toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code" name="验证码" placeholder="请输入验证码">
        <i slot="left-icon" class="iconfont toutiao-yanzhengma"></i>
        <van-button slot="button" size="small" round type="default" class="send_yzm_btn">发送验证码</van-button>
      </van-field>
      <div class="login_btn_wrap">
        <van-button class="login_btn" round block type="info" native-type="submit">登 录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'

export default {
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async onSubmit() {
      // try 捕获成功的结果
      try {
        const res = await login(this.user)
        this.$toast.success('登陆成功')
        window.sessionStorage.setItem('token', res.data.data.token)
        // 编程式导航跳转到首页
        // this.$router.push('')
        // console.log(res.data.data)
      } catch (err) {
        // catch 捕获失败的结果
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  // 字体图标的大小
  .iconfont {
    font-size: 37px;
  }
  .send_yzm_btn {
    width: 152px;
    height: 47px;
    line-height: 47px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    padding: 0;
  }
  .login_btn_wrap {
    padding: 53px 29px;
    .login_btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
// 样式穿透
.van-cell /deep/ .van-field__button {
  border-left: 2px solid #eee;
  padding-left: 20px;
}
</style>
