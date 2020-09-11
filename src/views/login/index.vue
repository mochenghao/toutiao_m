<template>
  <div class="login_container">
    <!-- 导航栏 -->
    <van-nav-bar class="page_nav_bar" title="登录页面">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录面板 -->
    <van-form ref="loginFormRef" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        type="number"
        maxlength="6"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont toutiao-yanzhengma"></i>
        <!-- 倒计时组件 -->
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s后重新发送"
            @finish="isCountDownShow = false"
          />
          <!-- 发送验证码按钮 -->
          <van-button
            v-else
            size="small"
            round
            type="default"
            native-type="button"
            class="send_yzm_btn"
            @click="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login_btn_wrap">
        <van-button class="login_btn" round block type="info" native-type="submit">登 录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 按需导入
import { login, getSmsCode } from '@/api/user.js'

export default {
  name: 'LoginIndex',
  data() {
    return {
      // 用户登录的手机号和验证码
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单验证规则
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[34578]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // 控制倒计时组件的显示与隐藏
      isCountDownShow: false
    }
  },
  methods: {
    // 点击登录按钮
    async onSubmit() {
      this.$toast.loading({
        message: '登陆中...',
        // 禁用背景点击
        forbidClick: true,
        // 持续显示
        duration: 0
      })
      // try 捕获成功的结果
      try {
        const { data } = await login(this.user)
        this.$toast.success('登陆成功')
        this.$store.commit('setUser', data.data)
        // 编程式导航跳转到首页
        this.$router.push('/my')
      } catch (err) {
        // catch 捕获失败的结果
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    // 点击发送短信按钮
    async onSendSms() {
      // 1、校验手机号
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return this.$toast('验证失败')
      }
      // 2、验证通过，显示倒计时
      this.isCountDownShow = true
      // 3、请求发送验证码
      try {
        await getSmsCode(this.user.mobile)
        this.$toast('验证码发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
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
  border-left: 2px solid #ccc;
}
</style>
