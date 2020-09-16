<template>
  <div class="home_container">
    <!-- 顶部搜索栏 -->
    <van-nav-bar class="page_nav_bar" fixed>
      <van-button
        slot="title"
        class="serach_btn"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 头部tab标签页
        通过 animated 属性可以开启切换标签内容时的转场动画。
        通过 swipeable 属性可以开启滑动切换标签页。
    -->
    <van-tabs v-model="active" class="channel_tabs" animated swipeable color="#3296fa">
      <van-tab :title="item.name" :key="item.id" v-for="item in UserChannel">
        <!-- 子路由占位符 -->
        <article-list :Channel="item" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div class="Hamburger_btn" slot="nav-right" @click="isEditChannelShow = true">
        <i class="iconfont toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup
      v-model="isEditChannelShow"
      position="bottom"
      :style="{ height: '93%' }"
      closeable
      round
      close-icon-position="top-left"
    >
      <channel-edit
        :UserChannel="UserChannel"
        :active="active"
        @addChannel="onAddChannel"
        @update-active="onUpdateActive"
        @delChannel="onDelChannel"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user'
import { addUserChannels, deleteUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
// 子组件
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'

const TOUTIAO_KEY = 'TOUTIAO_CHANNELS'

export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      // 用户频道信息对象
      UserChannel: [],
      // 控制频道弹出层的显示与隐藏
      isEditChannelShow: false
    }
  },
  methods: {
    // 获取用户频道
    async loadUserChannel() {
      try {
        if (this.user) {
          // 已登录
          const { data: res } = await getUserChannel()
          this.UserChannel = res.data.channels
        } else {
          // 未登录
          if (getItem(TOUTIAO_KEY)) {
            this.UserChannel = getItem(TOUTIAO_KEY)
          } else {
            const { data: res } = await getUserChannel()
            this.UserChannel = res.data.channels
          }
        }
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    // 点击添加频道
    async onAddChannel(channel) {
      this.UserChannel.push(channel)
      try {
        // 判断用户有没有登录
        if (this.user) {
          // 已登录
          await addUserChannels({
            id: channel.id,
            seq: this.UserChannel.length
          })
        } else {
          // 未登录
          setItem(TOUTIAO_KEY, this.UserChannel)
        }
      } catch (err) {
        this.$toast('添加失败，请稍后重试')
      }
    },
    // 点击切换频道
    onUpdateActive(index) {
      this.active = index
      this.isEditChannelShow = false
    },
    // 点击删除频道
    async onDelChannel(channel, index) {
      try {
        // 判断用户有没有登录
        if (this.user) {
          // 已登录
          await deleteUserChannels(channel.id)
          this.UserChannel.splice(index, 1)
        } else {
          // 未登录
          this.UserChannel.splice(index, 1)
          setItem(TOUTIAO_KEY, this.UserChannel)
        }
      } catch (err) {
        return this.$toast('删除失败，请稍后重试')
      }
      // 如果删除频道的索引在当前激活的频道项之前，则让当前激活项active值减一
      if (index <= this.active) {
        this.active--
      }
    }
  },
  // 子组件
  components: {
    ArticleList,
    ChannelEdit
  },
  created() {
    this.loadUserChannel()
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.home_container {
  padding-top: 96px;
  .page_nav_bar {
    /deep/ .van-nav-bar__title {
      // 不设置最大宽度
      max-width: unset;
    }
    .serach_btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
  }
  /deep/.channel_tabs {
    .van-tabs__wrap {
      height: 82px;
      .van-tabs__nav {
        padding: 0;
        .van-tab {
          min-width: 200px;
          border-right: 1px solid #edeff3;
          border-bottom: 1px solid #edeff3;
          font-size: 30px;
          color: #777;
        }
        .van-tabs__line {
          width: 32px;
          height: 6px;
          bottom: 8px;
        }
        .van-tab--active {
          color: #333;
        }
      }
    }
    .placeholder {
      // 不参与flex布局平分
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    // 汉堡按钮
    .Hamburger_btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.8;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
      .iconfont {
        font-size: 35px;
      }
    }
  }
}
</style>
