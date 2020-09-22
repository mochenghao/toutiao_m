<template>
  <div id="app">
    <!-- 路由占位符 -->
    <!-- 开启组件缓存 include：只缓存这个组件；exclude：缓存除此之外的组件 -->
    <keep-alive include="LayoutIndex">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'AppIndex'
}
</script>

<style lang="less"></style>
