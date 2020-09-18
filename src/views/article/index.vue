<template>
  <div class="article_container ">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page_nav_bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail markdown-body">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 关注按钮子组件 -->
          <follow-user :article="article" v-model="article.is_followed" />
          <!--
            子组件接收父组件的传值，又要修改，使用v-model更方便
            :is_followed="article.is_followed"
            @update-follow="article.is_followed = $event"
          -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          v-html="article.content"
          ref="articleDetailRef"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  created() {
    this.loadArticleInfo()
  },
  data() {
    return {
      // 文章详情信息对象
      article: {},
      // 控制loading的显示状态
      isLoading: true,
      // http请求返回的状态码
      errStatus: 0
    }
  },
  methods: {
    // 点击导航栏左侧箭头返回
    onClickLeft() {
      this.$router.back()
    },
    // 根据文章Id 获取文章详情
    async loadArticleInfo() {
      try {
        const { data: res } = await getArticleById(this.articleId)
        // console.log(res.data)
        this.article = res.data
        // 关闭loading状态
        this.isLoading = false
        // 获取img图片
        this.$nextTick(() => {
          this.previewImg()
        })
      } catch (err) {
        // 关闭loading状态
        this.isLoading = false
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取文章详情失败')
      }
    },
    // 获取文章内容图片点击预览
    previewImg() {
      const articleContent = this.$refs.articleDetailRef
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = function() {
          ImagePreview({
            images,
            // 图片展示起始位置
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import 'github-mardown.css';

.article_container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
