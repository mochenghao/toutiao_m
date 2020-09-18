<template>
  <div class="search_container">
    <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        shape="round"
        background="#4fc08d"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />
    <!-- 历史记录 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
      @clear-search-history="deleteSearch"
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'

const SEARCH_KEY = 'SEARCH_HISTORIES'

export default {
  name: 'SearchIndex',
  data() {
    return {
      // 文本框内容
      searchText: '',
      // 控制组件的显示与隐藏
      isResultShow: false,
      // 存储历史记录数据
      searchHistories: getItem(SEARCH_KEY) || []
    }
  },
  methods: {
    // 搜索触发该事件
    onSearch(val) {
      // 更新搜索框内容
      this.searchText = val
      // 渲染搜索结果
      this.isResultShow = true

      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
    },
    // 点击取消触发该事件
    onCancel() {
      this.$router.back()
    },
    // 删除搜索历史
    deleteSearch(index) {
      if (index === undefined) {
        this.searchHistories = []
      } else {
        this.searchHistories.splice(index, 1)
      }
    }
  },
  watch: {
    // 监听历史记录数据变化，存储到本地
    searchHistories(val) {
      setItem(SEARCH_KEY, val)
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  mounted() {
    // 页面加载，搜索框获取焦点
    document.querySelector('.van-field__control').focus()
  }
}
</script>

<style lang="less" scoped>
.search_container {
  padding-top: 110px;
  .van-search--show-action {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 99;
  }
  .van-search__action {
    color: #fff;
  }
  .van-search__action:hover {
    background-color: #4fc08d;
  }
}
</style>
