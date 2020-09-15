<template>
  <van-cell class="article_item">
    <!-- 标题 -->
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <!-- 中间三张图片 -->
      <div class="cover_wrap" v-if="article.cover.type === 3">
        <div
          class="cover_item"
          :key="index"
          v-for="(item, index) in article.cover.images"
        >
          <van-image class="cover_item_img" fit="cover" :src="item" />
        </div>
      </div>
      <!-- 底部信息 -->
      <div class="lable_info">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 右边一张图片 -->
    <van-image
      slot="default"
      class="right_cover"
      fit="cover"
      v-if="article.cover.type === 1"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  .title {
    font-size: 30px;
    color: #3a3a3a;
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 234px;
    height: 148px;
    padding-left: 25px;
  }
  .right_cover {
    width: 234px;
    height: 148px;
  }
  .lable_info span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover_wrap {
    display: flex;
    padding: 30px 0;
    .cover_item {
      flex: 1;
      height: 148px;
      &:not(:last-child) {
        padding-right: 5px;
      }
      .cover_item_img {
        width: 100%;
        height: 148px;
      }
    }
  }
}
</style>
