import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  // 提供公共共享数据
  state: {
    // 一个对象存储用户登陆之后的token信息
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
    // comment: {}
  },
  // 修改state中的数据
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了保持token持久性，保存到本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
    // replyClick(state, comment) {
    //   console.log(comment)
    //   state.comment = comment
    // }
  },
  actions: {},
  getters: {},
  modules: {}
})
