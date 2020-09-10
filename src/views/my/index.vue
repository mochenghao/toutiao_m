<template>
  <div class="my_container">
    <div class="header not_login">
      <div class="login_btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style lang="less" scoped>
// 未登录页面样式
.my_container {
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
}
</style>
