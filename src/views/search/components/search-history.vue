<template>
  <div class="search_history">
    <van-cell title="搜索历史...">
      <div v-if="isDeleteShow" class="right_box">
        <span class="deleteAll" @click="$emit('clear-search-history')"
          >全部删除</span
        >
        <van-icon name="checked" @click="isDeleteShow = false" />
      </div>
      <van-icon v-else name="delete" color="red" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :key="index"
      v-for="(item, index) in searchHistories"
      @click="searchHistoryClick(item, index)"
    >
      <div slot="title">{{ item }}</div>
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // 控制删除状态
      isDeleteShow: false
    }
  },
  methods: {
    searchHistoryClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态
        this.$emit('clear-search-history', index)
      } else {
        // 非删除状态
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search_history {
  .right_box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .van-icon-checked {
      color: skyblue;
    }
  }
  .deleteAll {
    color: red;
    margin-right: 20px;
  }
  .van-icon-delete,
  .van-icon-checked {
    font-size: 38px;
  }
}
</style>
