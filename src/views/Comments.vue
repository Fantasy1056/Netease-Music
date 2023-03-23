<template>
  <div class="comment-list">
    <div class="list-header">
      <div class="header-left">
        <van-icon name="arrow-left" @click="goBack"></van-icon>
        <span class="default" v-if="data.total === 0"> 网易云音乐 </span>
        <span v-else>评论 ({{ data.total }})</span>
      </div>
      <div class="header-right">
        <van-icon name="share-o"></van-icon>
      </div>
    </div>
    <div class="music-details">
      <img :src="currenMusic.al.picUrl" alt="" />
      <span class="name van-ellipsis">{{ currenMusic.name }}</span>
      <div class="singers">
        <span class="singer" v-for="names in currenMusic.ar" :key="names.id">
          &nbsp;-{{ names.name }}
        </span>
      </div>
    </div>
    <div class="list-body">
      <div class="body-header">
        <span class="title">评论区</span>
        <div class="list-switch">
          <span
            :class="data.currentListName === 'hot' ? 'active' : ''"
            @click="data.currentListName = 'hot'"
            >最热</span
          >
          <span
            :class="data.currentListName === 'new' ? 'active' : ''"
            @click="data.currentListName = 'new'"
            >最新</span
          >
        </div>
      </div>
      <CommentListBody :commentList="currentList"></CommentListBody>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useStore } from '@/store/store'
import { reqGetCommentsById } from '@/api/index'
import { useRoute, useRouter } from 'vue-router'
import CommentListBody from '@/components/item/CommentListBody.vue'
interface music {
  al: {
    picUrl: string
  }
  name: string
  id: number
  ar: any[]
}
const store = useStore()
const route = useRoute()
const router = useRouter()
// 获取当前播放的音乐以渲染评论页的歌曲图片，名字，歌手
const currenMusic = computed((): music => store.playList[store.playListIndex])

const data = reactive({
  hotCommentList: [],
  newCommentList: [],
  currentListName: 'hot',
  total: 0
})
const goBack = () => {
  router.go(-1)
}
// 发送ajax请求获取评论内容
const getCommentsById = async () => {
  const { data: res } = await reqGetCommentsById(
    parseInt(route.params.id as string)
  )

  data.newCommentList = res.comments
  data.hotCommentList = res.hotComments
  data.total = res.total
}
// 根据点击评论类型改变评论列表名称决定向评论区组件发送哪个列表
const currentList = computed(() => {
  return data.currentListName === 'hot'
    ? data.hotCommentList
    : data.newCommentList
})
getCommentsById()
</script>

<style lang="less" scoped>
.comment-list {
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    font-size: 0.48rem;
    background-color: #fff;
    padding: 0 0.3rem;
    .header-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-weight: 700;
        font-size: 0.35rem;
        margin-left: 0.3rem;
      }
    }
  }
  .music-details {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1rem;
    padding: 0 0.3rem;
    background-color: #fff;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .name {
      height: 100%;
      font-size: 0.3rem;
      font-weight: 600;
      line-height: 1rem;
      padding-left: 0.2rem;
      margin-right: 0.2rem;
    }
    .singers {
      display: flex;
      align-items: center;
      .singer {
        color: #6a6a6a;
        font-size: 0.24rem;
        font-weight: 600;
      }
    }
  }
  .list-body {
    flex: 1;
    margin-top: 0.2rem;
    padding: 0 0.3rem;
    background-color: #fff;
    padding-bottom: 1.5rem;
    .body-header {
      display: flex;
      width: 100%;
      height: 1rem;
      justify-content: space-between;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 0.3rem;
      }
      .list-switch {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1.5rem;
        font-size: 0.26rem;
        span {
          line-height: 0.26rem;
        }
        .active {
          font-weight: 700;
        }
      }
    }
    .body-items {
      width: 100%;
      overflow: hidden;
      overflow: scroll;
      .item {
        width: 100%;
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 0.8rem;
          .header-left {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            .avatar {
              width: 0.7rem;
              height: 0.7rem;
              border-radius: 50%;
            }
            .username-time {
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              margin-left: 0.2rem;
              .name {
                font-size: 0.24rem;
                font-weight: 700;
                color: #6a6a6a;
                margin-bottom: 0.1rem;
              }
              .time {
                font-size: 0.2rem;
                color: #bbb;
                font-weight: 700;
              }
            }
          }
          .header-right {
            font-size: 0.26rem;
            color: #bbb;
            font-weight: 700;
          }
        }
        .item-context {
          font-size: 0.28rem;
          font-weight: 700;
          margin-left: 0.9rem;
          padding: 0rem 0rem 0.3rem 0rem;
          color: #333;
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
}
</style>
