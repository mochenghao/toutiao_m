<template>
  <div class="search_suggestion">
    <van-cell-group>
      <van-cell
        icon="search"
        :key="index"
        v-for="(item, index) in SearchSuggestions"
        @click="$emit('search', item)"
      >
        <div slot="title" v-html="highlightText(item)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
// lodash 支持按需加载，有利于打包结果优化
// import { debounce } from 'lodash'

var timeID = null

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {
      // 存储请求回来的联想建议数据
      SearchSuggestions: []
    }
  },
  created() {},
  methods: {
    // 获取联想建议
    async loadSearchSuggestion(q) {
      try {
        const { data: res } = await getSearchSuggestion(q)
        this.SearchSuggestions = res.data.options
      } catch (err) {
        this.$toast('获取联想建议失败')
      }
    },
    // 搜索关键字高亮显示
    highlightText(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      // text.replace(/匹配的内容/gi, highlightStr)
      return text.replace(reg, highlightStr)
    }
  },
  watch: {
    // 监听搜索框变化，发起请求
    searchText: {
      // 进行防抖操作：debounce(函数，防抖时间)，返回值：防抖之后的函数
      // handler: debounce(function(val) {
      //   this.loadSearchSuggestion(val)
      // }, 500),
      handler: function(val) {
        clearTimeout(timeID)
        timeID = setTimeout(() => {
          this.loadSearchSuggestion(val)
        }, 500)
      },
      // 首次监视触发
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.search_suggestion {
  /deep/.active {
    color: red;
  }
}
</style>
