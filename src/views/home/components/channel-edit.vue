<template>
  <div class="channel_edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title_text">我的频道</div>
      <van-button
        class="edit_btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
      >{{ buttonText }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my_channel">
      <van-grid-item
        class="grid_item"
        :key="item.id"
        v-for="(item,index) in UserChannel"
        @click="onMyChannelClick(item,index)"
      >
        <span slot="text" :class="{active:index===active}">{{item.name}}</span>
        <van-icon slot="icon" name="close" v-show="isEdit && !fixedChannels.includes(item.id)" />
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title_text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend_channel">
      <van-grid-item
        class="grid_item"
        :key="item.id"
        v-for="item in recommendChannels"
        @click="onAddChannel(item)"
      >{{item.name}}</van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    UserChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // 所有频道数据
      AllChannels: [],
      // 控制删除状态
      isEdit: false,
      // 固定频道不允许被删除
      fixedChannels: [0]
    }
  },
  methods: {
    // 获取所有的频道列表
    async loadAllChannels() {
      try {
        const { data: res } = await getAllChannels()
        this.AllChannels = res.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    // 点击添加
    onAddChannel(channel) {
      this.$emit('addChannel', channel)
    },
    // 点击删除或切换频道
    onMyChannelClick(channel, index) {
      // console.log(channel, index)
      if (this.isEdit) {
        // 编辑状态，执行删除操作
        // 如果是固定频道，直接return，不执行删除操作
        // if (index === 0) return false
        if (this.fixedChannels.includes(channel.id)) return false
        this.$emit('delChannel', channel, index)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index)
      }
    }
  },
  created() {
    this.loadAllChannels()
  },
  computed: {
    buttonText() {
      if (this.isEdit) {
        return '完成'
      } else {
        return '编辑'
      }
    },
    recommendChannels() {
      // 筛选出两个数组相同索引的元素，再取反赋值
      return this.AllChannels.filter((AllChannels) => {
        return !this.UserChannel.find((UserChannel) => {
          return AllChannels.id === UserChannel.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel_edit {
  padding-top: 95px;
  // 标题
  .title_text {
    font-size: 32px;
    color: #333;
  }
  // 编辑按钮
  .edit_btn {
    width: 103px;
    height: 46px;
    font-size: 28px;
    color: #f85c5c;
    border: 1px solid #f85c5c;
  }
  // 去掉父元素相对定位
  /deep/.my_channel {
    .van-grid-item__icon-wrapper {
      position: unset;
      .van-icon-close {
        position: absolute;
        right: -10px;
        top: -10px;
        z-index: 99;
        font-size: 34px;
        color: #cacaca;
      }
    }
  }
  /deep/.grid_item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      color: #222;
      font-size: 28px;
      // 不允许换行
      white-space: nowrap;
      background-color: #f4f5f6;
      .active {
        color: red;
      }
    }
  }
}
</style>
